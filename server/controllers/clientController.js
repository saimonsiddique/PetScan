const Client = require("../models/client.model");
const Pet = require("../models/pet.model");
const Question = require("../models/question.model");
const Appointment = require("../models/appointment");
const createMailOptions = require("../config/mailoptions");
const transport = require("../config/nodemailer");
const Vet = require("../models/vet.model");
const { generateToken } = require("../config/generateToken");
const bcrypt = require("bcrypt");

const authClient = {};

authClient.signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check for existing user
  const clientExist = await Client.findOne({ email });
  if (clientExist) {
    return res.status(400).json({ msg: "User already exists" });
  }
  // Create salt & hash
  const salt = await bcrypt.genSalt(10);

  // Hash password
  if (password === "") throw new Error("Password is required");
  const hash = await bcrypt.hash(password, salt);

  // Create new user
  const newClient = new Client({
    ...req.body,
    password: hash,
  });
  try {
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
  } catch (err) {
    res.status(400).json({ err });
  }
};

authClient.signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Missing credentials" });
  }
  try {
    // Check for existing user
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    // Create token
    const accessToken = generateToken(client);
    res
      .status(200)
      .send({ accessToken, user: "petParent", userId: client._id });
  } catch (error) {
    res.status(401).send({ error: "Invalid credentials" });
  }
};

authClient.profile = async (req, res) => {
  try {
    const client = await Client.findById(req.client.id).select("-password");
    res.status(200).send(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

authClient.addPet = async (req, res) => {
  try {
    const {
      petName,
      petWeight,
      weightUnit,
      petAge,
      ageUnit,
      petSpecies,
      petGender,
      previousMedicalHistory,
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
        .json({ msg: "Please enter all fields of petinfo" });
    }

    const newPet = new Pet({
      ...req.body,
      owner: req.client.id,
    });
    const savedPet = await newPet.save();
    const client = await Client.findById(req.client.id);
    client.pets.push(newPet);
    await client.save();
    res.status(201).send(savedPet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

authClient.petInfo = async (req, res) => {
  try {
    const client = await Client.findById(req.client.id).populate("pets");
    res.status(200).send(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

authClient.findVet = async (req, res) => {
  console.log("I am here to find vet", req.body);
  try {
    const vet = await Vet.find({
      specializedField: { $all: [req.body.pet.petSpecies] },
      topRatedFor: { $all: [req.body.concern] },
    });
    res.status(200).send(vet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

authClient.createAppointment = async (req, res) => {
  try {
    console.log("Create new appointment", req.body);
    const client = await Client.findById(req.client.id);
    const vet = await Vet.findById(req.body.vet);
    // set clientName
    const clientName = `${client.firstName} ${client.lastName}`;
    const clientProfile = client.profilePicture;
    const clientEmail = client.email;
    // set vetName
    const vetName = `${vet.firstName} ${vet.lastName}`;
    const vetProfile = vet.vetProfile;

    //

    const mailoptions = createMailOptions(
      "hello.petscan@gmail.com",
      clientEmail,
      "Your appointment has been scheduled",
      "<h1>Thank for using petScan</h1>"
    );

    // create new appointment
    const newAppointment = new Appointment({
      ...req.body,
      client: req.client.id,
      clientName,
      vetName,
      clientProfile,
      vetProfile,
      clientEmail,
    });
    const savedAppointment = await newAppointment.save();
    // push the appointment to the client
    client.bookedAppointments.push(newAppointment);
    await client.save();
    // find the selected vet and push the appointment to the vet
    vet.upcomingAppointments.push(newAppointment);
    await vet.save();

    // invoke transport to send mail

    transport(mailoptions);

    res.status(201).send(savedAppointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

authClient.postQuestion = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const newQuestion = new Question({
      ...req.body,
      clietId: req.client.id,
      clientName: `${req.client.firstName} ${req.client.lastName}`,
    });
    const savedQuestion = await newQuestion.save();
    const client = await Client.findById(req.client.id);
    client.askedQuestions.push(savedQuestion);
    await client.save();
    // sende savedQuestion to the front end
    res.status(201).send(savedQuestion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

authClient.feed = async (req, res) => {
  try {
    const allQuestions = await Question.find({}).sort({ postDate: "desc" });
    // console.log("allQuestions", allQuestions);
    res.status(200).send(allQuestions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

authClient.postVote = async (req, res) => {
  console.log("I am here to update votes", req.body);
  try {
    const { questionId, userId } = req.body;
    // make userId a string
    const userIdString = userId.toString();
    // find the question
    const updateQuestion = await Question.findOne({ _id: questionId });
    // check if the user has already voted
    const hasVoted = updateQuestion.votedClients.includes(userIdString);
    // if the user not voted yet
    if (!hasVoted) {
      // update the question
      updateQuestion.votedClients.push(userIdString);
      await updateQuestion.save();
      // find client and update the votedQuestions array in client askedQuestions
      const client = await Client.findOne({ _id: userId });
      console.log("client", client);
      client.askedQuestions.map((question) => {
        if (question._id.toString() === questionId) {
          question.votedClients.push(userIdString);
        }
      });
      // update votedQuestions array in client
      client.votedQuestions.push(updateQuestion);
      await client.save();
      const sortQuestionByDate = await Question.find({}).sort({
        postDate: "desc",
      });
      res.status(200).send(sortQuestionByDate);
    }
    // if the user has already voted
    else {
      //remove the user from the votedClients array
      const index = updateQuestion.votedClients.indexOf(userIdString);
      if (index > -1) {
        updateQuestion.votedClients.splice(index, 1);
      }
      await updateQuestion.save();
      // find client and update the votedQuestions array in client askedQuestions
      const client = await Client.findOne({ _id: userId });
      client.askedQuestions.map((question) => {
        if (question._id.toString() === questionId) {
          const index = question.votedClients.indexOf(userIdString);
          if (index > -1) {
            question.votedClients.splice(index, 1);
          }
        }
      });

      // remove the question from the votedQuestions array in client
      client.votedQuestions.map((question) => {
        if (question._id.toString() === questionId) {
          const index = client.votedQuestions.indexOf(question);
          if (index > -1) {
            client.votedQuestions.splice(index, 1);
          }
        }
      });
      await client.save();
      const sortQuestionByDate = await Question.find({}).sort({
        postDate: "desc",
      });
      res.status(200).send(sortQuestionByDate);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = authClient;
