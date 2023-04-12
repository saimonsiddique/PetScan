const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "is this a secret?";

const generateToken = (user) => {
  const { id } = user;
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  generateToken,
};
