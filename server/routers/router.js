const express = require("express");
const { createNewAccount } = require("../Controllers/signup.control.js");

const router = express.Router();

router.post("/signup", createNewAccount);

module.exports = router;
