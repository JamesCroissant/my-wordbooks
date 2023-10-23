const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Word", WordSchema);