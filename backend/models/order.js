const mongoose = require("mongoose");

const order = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart"},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

});
module.exports = mongoose.model("cartFinish", order);
