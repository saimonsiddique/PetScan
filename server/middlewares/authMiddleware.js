const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const Client = require("../models/client.model");

const authMiddleware = async (req, res, next) => {
  // Get token from header Bearer token
  const token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.client = decoded.client;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
