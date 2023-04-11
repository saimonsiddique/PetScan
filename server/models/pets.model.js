const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  previousMedicalHistory: {
    type: [String],
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
