const express = require("express");

const {
  CreateReviews,
  deleteReviews,
  getAllCommentByIdProduct,
} = require("../controllers/Reviews");

const reviewsRouter = express();

reviewsRouter.post("/product/:id", CreateReviews);
reviewsRouter.delete("/", deleteReviews);
reviewsRouter.get("/", getAllCommentByIdProduct);

module.exports = reviewsRouter;
