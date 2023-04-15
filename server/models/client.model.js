const { Schema, model } = require("mongoose");
const Pet = require("./pet.model");

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
    type: [Schema.Types.Object],
    // required: true,
  },
  prescriptions: {
    type: [Schema.Types.Object],
    // required: true,
  },
  appointments: {
    type: [Schema.Types.Object],
  },
  bookedAppointments: {
    type: [Schema.Types.Object],
  },
});

const Client = model("Client", clientSchema);

module.exports = Client;
