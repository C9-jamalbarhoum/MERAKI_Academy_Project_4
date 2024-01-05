const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number, require: true },
  image: [{ type: String }],
  stockQuantity: { type: Number },
  qty : {type:Number},
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
});

module.exports = mongoose.model("product", productSchema);
