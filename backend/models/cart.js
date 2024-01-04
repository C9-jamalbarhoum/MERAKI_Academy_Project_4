const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  total: { type: Number },
  image: { type: String },
  cartFinish: { typeof: mongoose.Schema.Types.ObjectId, ref: "cartFinish" },
});
module.exports = mongoose.model("cart", cartSchema);
