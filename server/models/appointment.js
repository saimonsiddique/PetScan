const { Schema, model } = require("mongoose");

const AppiontmentSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  petName: {
    type: String,
    required: true,
  },
  concern: {
    type: String,
    required: true,
  },
});

const Appointment = model("Appointment", AppiontmentSchema);
module.exports = Appointment;
