const { Schema, model } = require("mongoose");

const vetSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  specializedIn: {
    type: [String],
    // required: true,
  },
  topRatedFor: {
    type: [String],
    // required: true,
  },
  appointments: {
    type: [String],
  },
});

const Vet = model("Vet", vetSchema);

module.exports = Vet;
