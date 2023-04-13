const clientController = require("../controllers/clientController");
const vetController = require("../controllers/vetController");
const Client = require("../models/client.model");
const Vet = require("../models/vet.model");

const signInMiddleware = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Missing credentials" });
  }
  try {
    // Check for existing user in client collection
    const user = await Client.findOne({ email });
    if (user) {
      return clientController.signIn(req, res);
    } else {
      // Check for existing user in vet collection
      const vet = await Vet.findOne({ email });
      if (vet) {
        return vetController.signIn(req, res);
      }
    }
    return res.status(400).json({ msg: "User does not exist" });
  } catch (error) {
    res.status(401).send({ error: "Invalid credentials" });
  }
};

module.exports = signInMiddleware;
