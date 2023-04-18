const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  petName: {
    type: String,
    required: true,
  },
  petWeight: {
    type: Number,
    required: true,
  },
  weightUnit: {
    type: String,
    required: true,
  },
  petAge: {
    type: Number,
    required: true,
  },
  ageUnit: {
    type: String,
    required: true,
  },
  petSpecies: {
    type: String,
    required: true,
  },

  petGender: {
    type: String,
    required: true,
  },
  previousMedicalHistory: {
    type: [String],
  },
  neutered: {
    type: Boolean,
    required: true,
  },

  petPhoto: {
    type: String,
    default:
      "https://res.cloudinary.com/dru7kzv3i/image/upload/v1681601995/dog-photo_znt6lo.jpg",
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    // required: true,
  },
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
