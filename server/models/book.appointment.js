const { Schema, model } = require("mongoose");

const BookingSchema = new Schema({
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

const Booking = model("Booking", BookingSchema);

module.exports = Booking;
