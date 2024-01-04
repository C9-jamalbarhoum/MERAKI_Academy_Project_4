const mongoose = require("mongoose");

const cartFinish = new mongoose.Schema({
  product: [],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});
module.exports = mongoose.model("cartFinish", cartFinish);
