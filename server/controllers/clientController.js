const Client = require("../models/client.model");
const Pet = require("../models/pet.model");
const Question = require("../models/question.model");
const Booking = require("../models/book.appointment");
const { generateToken } = require("../config/generateToken");
const bcrypt = require("bcrypt");
const openai = require("../index");

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
    res.status(200).send({ accessToken, user: "petParent" });
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

authClient.createAppointment = async (req, res) => {
  try {
    console.log("Create new Booking", req.body);
    const newBooking = new Booking({
      ...req.body,
      client: req.client.id,
    });
    const savedBooking = await newBooking.save();
    const client = await Client.findById(req.client.id);
    client.bookedAppointments.push(newBooking);
    await client.save();
    res.status(201).send(savedBooking);
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
    client.askedQuestions.push(newQuestion);
    await client.save();
    res.status(201).send(savedQuestion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

authClient.feed = async (req, res) => {
  try {
    const allQuestions = await Question.find({}).sort({ postDate: "desc" });
    res.status(200).send(allQuestions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

authClient.vote = async (req, res) => {
  try {
    const { questionId, vote } = req.body;
    const updateVote = await Question.findByIdAndUpdate(questionId, {
      $inc: { votes: vote },
    });
    res.status(200).send(updateVote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

authClient.search = async (req, res) => {
  try {
    const { search } = req.body;
    const searchResult = await Question.find({
      $text: { $search: search },
    }).sort({ postDate: "desc" });
    res.status(200).send(searchResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = authClient;
