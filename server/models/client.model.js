const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
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
  pets: {
    type: [String],
    // required: true,
  },
  prescriptions: {
    type: [String],
    // required: true,
  },
  appointments: {
    type: [String],
  },
});

const Client = model("Client", clientSchema);

module.exports = Client;
