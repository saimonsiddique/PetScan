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
    default:
      "https://res.cloudinary.com/dru7kzv3i/image/upload/v1681601995/dog-photo_znt6lo.jpg",
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
