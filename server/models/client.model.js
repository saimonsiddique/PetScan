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

  profilePicture: {
    type: String,
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
  askedQuestions: {
    type: [Schema.Types.Object],
  },
  votedQuestions: {
    type: [Schema.Types.Object],
  },
});

const Client = model("Client", clientSchema);

module.exports = Client;
