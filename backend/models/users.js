const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number },
  location: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
});

module.exports = mongoose.model("users", userSchema);
