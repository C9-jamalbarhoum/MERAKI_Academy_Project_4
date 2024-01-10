const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  comment: { type: String },
  reviews: { type: Number },
  commenter : { type: mongoose.Schema.Types.ObjectId , ref : "user"},
  product : { type: mongoose.Schema.Types.ObjectId , ref : "product"}
});


module.exports = mongoose.model("reviews", reviewsSchema);
