const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
      quantity: { type: Number, default: 1 },
      price: {type:Number} 
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});
module.exports = mongoose.model("cart", cartSchema);


