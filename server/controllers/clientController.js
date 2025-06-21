const Client = require("../models/client.model");
const Pet = require("../models/pet.model");
const Question = require("../models/question.model");
const Appointment = require("../models/appointment");
const { appointmentMail } = require("../config/mailoptions");
const transport = require("../config/nodemailer");
const Vet = require("../models/vet.model");
const { generateToken } = require("../config/generateToken");
const bcrypt = require("bcrypt");

const authClient = {};

/**
 * Registers a new pet parent (client).
 * Validates input, checks for existing users, hashes password, and saves the new client.
 * @param {Object} req - Express request object. Expected body: { firstName, lastName, email, password, ...otherClientData }.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const clientExist = await Client.findOne({ email });
    if (clientExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    if (password === "") {
        const err = new Error("Password is required");
        err.statusCode = 400;
        throw err;
    }
    const hash = await bcrypt.hash(password, salt);

    const newClient = new Client({
      ...req.body,
      password: hash,
    });

    const savedClient = await newClient.save();
    const sendData = {
      id: savedClient._id,
      firstName: savedClient.firstName,
      lastName: savedClient.lastName,
      email: savedClient.email,
      accessToken: generateToken(savedClient),
      user: "petParent",
    };
    res.status(201).send(sendData);
  } catch (error) {
    next(error);
  }
};

/**
 * Signs in an existing client.
 * Validates input, checks for user existence, verifies password, and returns an access token.
 * @param {Object} req - Express request object. Expected body: { email, password }.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }
  try {
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateToken(client);
    res
      .status(200)
      .send({ accessToken, user: "petParent", userId: client._id });
  } catch (error) {
    error.statusCode = error.statusCode || 401;
    error.message = error.message || "Invalid credentials due to server error during sign-in";
    next(error);
  }
};

/**
 * Fetches the profile of the currently authenticated client.
 * Uses client ID from JWT payload (set by auth middleware).
 * @param {Object} req - Express request object. Expected `req.client.id` from auth middleware.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.profile = async (req, res, next) => {
  try {
    const client = await Client.findById(req.client.id).select("-password");
    res.status(200).send(client);
  } catch (error) {
    next(error);
  }
};

/**
 * Adds a new pet for the authenticated client.
 * Validates input and associates the pet with the client.
 * @param {Object} req - Express request object. Expected pet data in body and `req.client.id` from auth middleware.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.addPet = async (req, res, next) => {
  try {
    const {
      petName,
      petWeight,
      weightUnit,
      petAge,
      ageUnit,
      petSpecies,
      petGender,
    } = req.body;
    if (
      !petName ||
      !petWeight ||
      !weightUnit ||
      !petAge ||
      !ageUnit ||
      !petSpecies ||
      !petGender
    ) {
      return res
        .status(400)
        .json({ message: "Please enter all fields of petinfo" });
    }

    const newPet = new Pet({
      ...req.body,
      owner: req.client.id,
    });
    const savedPet = await newPet.save();
    const client = await Client.findById(req.client.id);
    client.pets.push(newPet._id); // Store pet ID
    await client.save();
    res.status(201).send(savedPet);
  } catch (error) {
    next(error);
  }
};

/**
 * Fetches pet information for the authenticated client.
 * Populates the 'pets' field in the client document.
 * @param {Object} req - Express request object. Expected `req.client.id` from auth middleware.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.petInfo = async (req, res, next) => {
  try {
    const client = await Client.findById(req.client.id).populate("pets");
    res.status(200).send(client);
  } catch (error) {
    next(error);
  }
};

/**
 * Finds veterinarians based on pet species and concern.
 * @param {Object} req - Express request object. Expected body: { pet: { petSpecies }, concern }.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.findVet = async (req, res, next) => {
  try {
    // Ensure req.body.pet exists before trying to access petSpecies
    if (!req.body.pet || !req.body.pet.petSpecies || !req.body.concern) {
        const err = new Error("Missing pet species or concern for finding a vet.");
        err.statusCode = 400;
        throw err;
    }
    const vet = await Vet.find({
      specializedField: { $all: [req.body.pet.petSpecies] },
      topRatedFor: { $all: [req.body.concern] },
    });
    res.status(200).send(vet);
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new appointment for the authenticated client with a specified vet.
 * Sends a confirmation email.
 * @param {Object} req - Express request object. Expected body: { vet (vetId), pet (petId), ...otherAppointmentData }. `req.client.id` from auth.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.createAppointment = async (req, res, next) => {
  try {
    const client = await Client.findById(req.client.id);
    const vet = await Vet.findById(req.body.vet);

    if (!client || !vet) {
        const err = new Error("Client or Vet not found");
        err.statusCode = 404;
        throw err;
    }

    const clientName = `${client.firstName} ${client.lastName}`;
    const clientProfile = client.profilePicture;
    const clientEmail = client.email;
    const vetName = `${vet.firstName} ${vet.lastName}`;
    const vetProfile = vet.vetProfile;

    const pet = await Pet.findById(req.body.pet);
    if (!pet) {
        const err = new Error("Pet not found");
        err.statusCode = 404;
        throw err;
    }
    const petName = pet.petName;

    const mailoptions = appointmentMail(
      process.env.EMAIL_USER,
      clientEmail,
      "Your appointment has been scheduled",
      clientName
    );

    const newAppointment = new Appointment({
      ...req.body,
      petName,
      pet: pet._id,
      client: req.client.id,
      clientName,
      vetName,
      clientProfile,
      vetProfile,
      clientEmail,
    });
    const savedAppointment = await newAppointment.save();

    client.bookedAppointments.push(savedAppointment._id);
    await client.save();

    vet.upcomingAppointments.push(savedAppointment._id);
    await vet.save();

    transport(mailoptions);

    res.status(201).send(savedAppointment);
  } catch (error) {
    next(error);
  }
};

/**
 * Posts a new question from the authenticated client.
 * @param {Object} req - Express request object. Expected question data in body and `req.client.id` from auth.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.postQuestion = async (req, res, next) => {
  try {
    const newQuestion = new Question({
      ...req.body,
      clientId: req.client.id,
      clientName: `${req.client.firstName} ${req.client.lastName}`,
    });
    const savedQuestion = await newQuestion.save();
    const client = await Client.findById(req.client.id);
    client.askedQuestions.push(savedQuestion._id);
    await client.save();
    res.status(201).send(savedQuestion);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a question posted by the authenticated client.
 * @param {Object} req - Express request object. Expected `req.params.id` (questionId) and `req.body.userId` (client's ID for verification, though `req.client.id` should be used).
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.deleteQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const questionToDelete = await Question.findById(questionId);
    if (!questionToDelete) {
        const err = new Error("Question not found");
        err.statusCode = 404;
        throw err;
    }

    // Verify that the user deleting the question is the one who posted it.
    // req.client.id comes from authentication middleware (assumed)
    if (questionToDelete.clientId.toString() !== req.client.id.toString()) {
        const err = new Error("User not authorized to delete this question");
        err.statusCode = 403; // Forbidden
        throw err;
    }

    const client = await Client.findById(req.client.id); // Use authenticated user ID
    if (!client) {
        const err = new Error("Client not found"); // Should not happen if user is authenticated
        err.statusCode = 404;
        throw err;
    }

    const index = client.askedQuestions.map(id => id.toString()).indexOf(questionId.toString());
    if (index > -1) {
      client.askedQuestions.splice(index, 1);
      await client.save();
    }

    await Question.findByIdAndDelete(questionId);
    res.status(200).send(questionToDelete);
  } catch (error) {
    next(error);
  }
};

/**
 * Fetches all questions for the news feed, sorted by post date.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.feed = async (req, res, next) => {
  try {
    const allQuestions = await Question.find({}).sort({ postDate: "desc" });
    res.status(200).send(allQuestions);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles voting (upvote/downvote) on a question by a client.
 * If client has not voted, adds vote. If already voted, removes vote.
 * @param {Object} req - Express request object. Expected body: { questionId, userId }. `userId` should ideally be `req.client.id` from auth.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
authClient.postVote = async (req, res, next) => {
  try {
    const { questionId } = req.body;
    const userId = req.client.id; // Use authenticated user's ID
    const userIdString = userId.toString();

    const updateQuestion = await Question.findById(questionId); // Changed from findOne
    if (!updateQuestion) {
        const err = new Error("Question to vote on not found");
        err.statusCode = 404;
        throw err;
    }

    const client = await Client.findById(userId);
     if (!client) {
        const err = new Error("Client not found for voting"); // Should not happen if user is authenticated
        err.statusCode = 404;
        throw err;
    }

    const voteIndexInQuestion = updateQuestion.votedClients.indexOf(userIdString);
    const voteIndexInClient = client.votedQuestions.map(id => id.toString()).indexOf(questionId.toString());

    if (voteIndexInQuestion === -1) {
      // User has not voted yet: Add vote
      updateQuestion.votedClients.push(userIdString);
      if (voteIndexInClient === -1) { // Ensure consistency, though ideally this should align
          client.votedQuestions.push(updateQuestion._id);
      }
    } else {
      // User has already voted: Remove vote
      updateQuestion.votedClients.splice(voteIndexInQuestion, 1);
      if (voteIndexInClient > -1) {
          client.votedQuestions.splice(voteIndexInClient, 1);
      }
    }

    await updateQuestion.save();
    await client.save();

    // Return all questions sorted by date, perhaps updated question is enough or a success message
    const sortQuestionByDate = await Question.find({}).sort({
      postDate: "desc",
    });
    res.status(200).send(sortQuestionByDate);

  } catch (error) {
    next(error);
  }
};

module.exports = authClient;
