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

  pet: {
    type: String,
    required: true,
  },
  concern: {
    type: String,
    required: true,
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
