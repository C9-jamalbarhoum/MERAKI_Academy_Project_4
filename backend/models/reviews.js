const mongoose = require("mongoose")

const reviewsSchema = new mongoose.Schema({
    Comment:[{type:String}],
    reviews: {type:Number},
    user: {type: mongoose.Schema.Types.ObjectId , ref:"users"}
})

module.exports = mongoose.model("reviews",reviewsSchema)