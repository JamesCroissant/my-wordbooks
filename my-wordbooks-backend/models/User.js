const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 15,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 30,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);