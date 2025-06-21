const express = require("express");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const router = require("./routers/router");
const errorHandler = require('./middlewares/errorHandler'); // Import error handler
const cors = require("cors");
require("dotenv").config();

// Environment variable checks
const requiredEnvVars = [
  'DB_URL',
  'JWT_SECRET',
  'CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'EMAIL_USER',
  'EMAIL_PASS'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`FATAL ERROR: Environment variable ${envVar} is not defined.`);
    process.exit(1);
  }
}

const PORT = process.env.SERVER_PORT || 5000;
const URI = process.env.DB_URL + "/petscan";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(router);

(async () => {
  try {
    await mongoose.connect(URI).then(() => {
      console.log(`🦆 Database connected @ port ${`Atlas`}!`);
    });
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
