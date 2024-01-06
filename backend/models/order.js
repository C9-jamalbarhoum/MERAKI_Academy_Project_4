const mongoose = require("mongoose");

const order = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      price: Number,
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  total: { type: Number },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "confirm", "Cancelled"],
  },
});
module.exports = mongoose.model("order", order);



    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 //////                                    ///

 // ?  cart && order && checkout ==>>>
 // Cart On click   ===> no itm     ==> { product : [], user : id for user }
 // on add itm of cart    ===>  update in cart for push itm of product 
 // on click  checkout  ==>  login == > copy {product of cart} ===> {product of order}
