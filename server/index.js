const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routers/router");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT;
const URI = process.env.DB_URL + DB_PORT + "/PetScan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

(async () => {
  try {
    await mongoose.connect(URI).then(() => {
      console.log(`🦆 Database connected @ port ${DB_PORT}!`);
    });
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
