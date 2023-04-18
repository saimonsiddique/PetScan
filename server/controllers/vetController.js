const Vet = require("../models/vet.model");
const Client = require("../models/client.model");
const Question = require("../models/question.model");
const { generateToken } = require("../config/generateToken");
const bcrypt = require("bcrypt");

const authVet = {};

authVet.signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Missing Information" });
    }
    // Check for existing user
    const vetExist = await Vet.findOne({ email });
    if (vetExist) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // Create salt & hash
    const salt = await bcrypt.genSalt(10);

    // Hash password
    if (password === "") throw new Error("Password is required");
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    const newVet = new Vet({
      ...req.body,
      password: hash,
    });

    const savedVet = await newVet.save();

    // generate token
    const accessToken = generateToken(savedVet);
    const sendData = {
      accessToken,
      fullName: `${savedVet.firstName} ${savedVet.lastName}`,
      email: savedVet.email,
      user: "petParent",
    };
    res.status(201).send(sendData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

authVet.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Missing credentials" });
    }
    // Check for existing user
    const vetUser = await Vet.findOne({ email });
    if (!vetUser) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, vetUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // generate token
    const accessToken = generateToken(vetUser);
    const sendData = {
      accessToken,
      user: "vet",
    };
    res.status(200).send(sendData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

authVet.profile = async (req, res) => {
  try {
    const vetUser = await Vet.findById(req.vet.id).select("-password");
    res.status(200).send(vetUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

authVet.postAnswer = async (req, res) => {
  try {
    const { answer, questionId } = req.body;
    const vetId = req.vet.id;

    if (!answer) {
      return res.status(400).json({ msg: "Missing Information" });
    }

    // Update question with answer
    const newAnswer = await Question.findByIdAndUpdate(questionId, {
      $set: {
        ...req.body,
        vetId,
        vetName: `${req.vet.firstName} ${req.vet.lastName}`,
        answeredDate: Date.now(),
        isAnswered: true,
      },
    });
    const findAnsweredVet = await Vet.findById(vetId);
    const answered = await Question.findById(questionId);
    findAnsweredVet.answeredQuestions.push(answered);
    await findAnsweredVet.save();

    // On client side, this will be used to update the state of the question
    const findClient = await Client.findById(answered.clietId);
    const findQuestionIndex = findClient.askedQuestions.findIndex(
      (question) => question._id == questionId
    );

    findClient.askedQuestions[findQuestionIndex] = {
      ...findClient.askedQuestions[findQuestionIndex],
      answer,
      vetId,
      vetName: `${req.vet.firstName} ${req.vet.lastName}`,
      answeredDate: Date.now(),
      isAnswered: true,
    };
    await findClient.save();
    const sendUpdatedAnsweredInfo = await Question.find({ isAnswered: false });
    res.status(200).send(sendUpdatedAnsweredInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

authVet.vetInfo = async (req, res) => {
  console.log("I am here with vetInfo", req.body);
  try {
    const {
      postNominal,
      specializedField,
      licenseNumber,
      education,
      passingYear,
      phone,
    } = req.body;
    const vetId = req.vet.id;
    const addNewInfo = await Vet.findByIdAndUpdate(vetId, {
      $set: {
        ...req.body,
        postNominal,
        specializedField,
        licenseNumber,
        education,
        passingYear,
        phone,
      },
    });
    // save new info
    await addNewInfo.save();
    res.status(200).send(addNewInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = authVet;
