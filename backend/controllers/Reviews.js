const reviewsModule = require("../models/reviews");
const productModule = require("../models/product");
const reviews = require("../models/reviews");

// ! for create Reviews => => => https://joy-joy-i0iy.onrender.com/product/:id    ==> {id : productID}
const CreateReviews = (req, res) => {
  // Comment: [{ type: String }],
  // reviews: { type: Number },
  const { id } = req.params;
  const { comment, reviews } = req.body;
  console.log(id);
  const userId = req.token.userId;
  const NewReviews = new reviewsModule({
    comment,
    reviews,
    commenter: userId,
  });
  NewReviews.save().then((result) => {
    productModule
      .findOneAndUpdate(
        { _id: id },
        { $push: { reviews: result._id } },
        { new: true }
      )
      .then((results) => {
        res.status(201).json({
          success: true,
          message: `reviews added`,
          comment: results,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
          err: err,
        });
      });
  });
};

//! API for delete reviews => => https://joy-joy-i0iy.onrender.com/?reviewsId=1&productId=2
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
          res.status(203).json({ massage: "deleted Reviews", result: result });
        })
        .catch((err) => {
          res.json(err.message);
        });
    })
    .catch((err) => {
      res.json(err.message);
    });
};

//! api => => https://joy-joy-i0iy.onrender.com/getAll/:id   { id => product}
const getAllCommentByIdProduct = (req, res) => {
  const { id } = req.params;
  productModule
    .findById({ _id: id })
    .populate("reviews")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

module.exports = { CreateReviews, deleteReviews, getAllCommentByIdProduct };
