const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  role: { type: String },
  email: { type: String },
});

module.exports = mongoose.model("User", userSchema);
