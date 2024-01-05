const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products : [{type: mongoose.Schema.Types.ObjectId , ref : "product"}],
    total : {type :Number},
    user : {type: mongoose.Schema.Types.ObjectId , ref : "users"}
});
module.exports = mongoose.model("cart", cartSchema);
