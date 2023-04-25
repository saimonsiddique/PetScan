const { Schema, model } = require("mongoose");

const AppiontmentSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  vet: {
    type: Schema.Types.ObjectId,
    ref: "Vet",
  },

  clientName: {
    type: String,
  },

  vetName: {
    type: String,
  },

  pet: {
    type: String,
    required: true,
  },

  petName: {
    type: String,
  },

  concern: {
    type: String,
    required: true,
  },

  clientEmail: {
    type: String,
  },

  clientProfile: {
    type: String,
  },

  vetProfile: {
    type: String,
  },

  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },

  calendly: {
    type: String,
  },
});

const Appointment = model("Appointment", AppiontmentSchema);
module.exports = Appointment;
