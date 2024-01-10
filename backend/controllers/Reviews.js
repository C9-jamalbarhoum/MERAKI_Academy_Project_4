const reviewsModule = require("../models/reviews");
const productModule = require("../models/product");
const reviews = require("../models/reviews");

// ! for create Reviews => => => http://localhost:5000/product/:id    ==> {id : productID}
const CreateReviews = (req, res) => {
  const id = req.params.id;
  // Comment: [{ type: String }],
  // reviews: { type: Number },

  const { comment, reviews } = req.body;

  const userId = req.token.userId;
  const NewReviews = new reviewsModule({
    comment,
    reviews,
    commenter: userId,
  });
  NewReviews.save().then((result) => {
    productModule
      .findByIdAndUpdate(
        { _id: userId },
        { $push: { reviews: result._id } },
        { new: true }
      )
      .then(() => {
        res.status(201).json({
          success: true,
          message: `reviews added`,
          comment: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message:err.message,
          err: err,
        });
      });
  });
};

//! API for delete reviews => => http://localhost:5000/?reviewsId=1&productId=2
const deleteReviews = (req, res) => {
  const { reviewsId, productId } = req.query;

  console.log({ reviewsId, productId });

  reviewsModule
    .findByIdAndDelete({ _id: reviewsId })
    .then((result) => {
      productModule
        .findByIdAndUpdate(
          { _id: productId },
          { $pullAll: { reviews: [reviewsId] } },
          { new: true }
        )
        .then((result) => {
          res.status(203).json("deleted reviews");
        })
        .catch((err) => {
          res.json(err.message);
        });
    })
    .catch((err) => {
      res.json(err.message);
    });
};
const getAllCommentByIdProduct = (req, res) => {};

module.exports = { CreateReviews, deleteReviews, getAllCommentByIdProduct };
