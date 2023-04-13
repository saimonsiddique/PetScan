const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  petname: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  neutered: {
    type: Boolean,
    required: true,
  },
  previousMedicalHistory: {
    type: [String],
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    // required: true,
  },
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
