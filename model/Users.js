const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required !"],
  },
  email: {
    type: String,
    required: [true, "Email is required !"],
  },
  photo: {
    type: String,
    required: [true, "Image is required !"],
  },
  googleID: {
    type: String,
    required: [true, "Google id is required"],
  },
  joined: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
