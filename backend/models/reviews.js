const mongoose = require("mongoose")

const reviewsSchema = new mongoose.Schema({
    Comment:[{type:String}],
    reviews: {type:Number},
})

module.exports = mongoose.model("reviews",reviewsSchema)