const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {
  CreateReviews,
  deleteReviews,
  getAllCommentByIdProduct,
} = require("../controllers/Reviews");

const reviewsRouter = express();

reviewsRouter.post("/product/:id",authentication, CreateReviews);
reviewsRouter.delete("/",authentication, deleteReviews);
reviewsRouter.get("/getAll/:id",authentication, getAllCommentByIdProduct);

module.exports = reviewsRouter;
