const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
  // process.exit(1); // Optionally exit if JWTs are critical for app startup.
                   // For now, we'll let it run, but token generation will fail or use an undefined secret.
}
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  if (!JWT_SECRET) {
    // This check is important if process.exit(1) is not used above,
    // to prevent using an undefined secret.
    throw new Error("JWT_SECRET is not configured, cannot generate token.");
  }
  const { id } = user;
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  generateToken,
};
