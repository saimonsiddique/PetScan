const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  clietId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  vetId: {
    type: Schema.Types.ObjectId,
    ref: "Vet",
  },

  clientName: {
    type: String,
  },
  vetName: {
    type: String,
  },
  question: {
    type: String,
    required: true,
  },

  postDate: {
    type: Date,
    default: Date.now,
  },
  answer: {
    type: String,
  },
  category: {
    type: String,
  },
  answeredDate: {
    type: Date,
    default: Date.now,
  },
  isAnswered: {
    type: Boolean,
    default: false,
  },

  upVotes: {
    type: Number,
    default: 0,
  },

  downVotes: {
    type: Number,
    default: 0,
  },

  isVoted: {
    type: Boolean,
    default: false,
  },
  aiSuggestion: {
    type: Boolean,
    default: false,
  },

  // aiSuggestedAnswer: {
  //   type: String,
  // },

  // verifiedAiAnswer: {
  //   type: Boolean,
  //   default: false,
  // },
});

const Question = model("Question", questionSchema);

module.exports = Question;
