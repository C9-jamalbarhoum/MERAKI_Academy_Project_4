const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: { type: String },
  permissions: [{ type: String, required: true }],
});
module.exports = mongoose.model("role", roleSchema);
