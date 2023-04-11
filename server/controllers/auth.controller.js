const Client = require("../models/client.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (req, res) => {
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
  const hash = await bcrypt.hash(password, salt);

  // Create new user
  const client = new Client({
    firstName,
    lastName,
    email,
    password: hash,
  });
  try {
    const savedClient = await client.save();
    res.status(201).send(savedClient);
  } catch (err) {
    res.status(400).json({ err });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check for existing user
  const client = await Client.findOne({ email });
  if (!client) {
    return res.status(400).json({ msg: "User does not exist" });
  }
  try {
    // from authMiddleware
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    // Create token
    const token = jwt.sign({ client }, JWT_SECRET, {
      expiresIn: 3600,
    });
    res.status(200).json({
      token,
      client: {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  signUp,
  signIn,
};
