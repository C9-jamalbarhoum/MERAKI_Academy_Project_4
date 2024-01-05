const express = require("express")

const {CreateReviews,deleteReviews} = require("../controllers/Reviews")

const reviewsRouter = express() 


reviewsRouter.post("/product/:id",CreateReviews)
reviewsRouter.delete("/",deleteReviews)





module.exports = reviewsRouter