const Client = require("../models/client.model");
const Pet = require("../models/pet.model");
const jwt = require("jsonwebtoken");
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
    res.status(200).json(client);
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
    res.status(201).json(savedPet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = authClient;
