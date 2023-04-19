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

  postNominal: {
    type: String,
  },

  licenseNumber: {
    type: Number,
    // required: true,
  },

  education: {
    type: String,
    // required: true,
  },

  passingYear: {
    type: Number,
    // required: true,
  },

  phone: {
    type: String,
    // required: true,
  },

  vetProfile: {
    type: String,
  },

  specializedField: {
    type: [String],
    // required: true,
  },
  topRatedFor: {
    type: [String],
    // required: true,
  },
  appointments: {
    type: [Schema.Types.Object],
  },

  upcomingAppointments: {
    type: [Schema.Types.Object],
  },

  answeredQuestions: {
    type: [Schema.Types.Object],
  },
});

const Vet = model("Vet", vetSchema);

module.exports = Vet;
