const express = require("express");
const {
  signUp,
  // signIn,
  // profile,
  // signOut,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signUp);

module.exports = router;
