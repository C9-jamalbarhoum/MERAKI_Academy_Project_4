const cartModule = require("../models/cart");
///  get cart  by id for user => =>  { id => User Id}
const getCartByUser = (req, res) => {
  const userId = req.token.userId;

  cartModule
    .findOne({ user: userId })
    .populate("products.product")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((Err) => {
      console.log(Err);
      res.status(500).json(Err);
    });
};

///  user create new itm for cart => =>  { id => User Id}

const UpdateCart = (req, res) => {
  const userId = req.token.userId;
  console.log(userId);
  cartModule
    .findOneAndUpdate(
      { user: userId },
      { $push: { products: req.body } },
      { new: true }
    )
    .populate("products")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
// delete cart  by id => =>   { id => cartID}
const deleteCartById = (req, res) => {
  cartModule
    .findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((Err) => {
      res.status(404).json(Err.massage);
    });
};

//  Update for cart  => =>  => delete One product of cart
const deleteOneProductByIdOfCart = (req, res) => {
  const { cartId, productId } = req.query;
  cartModule
    .findByIdAndUpdate(
      { _id: cartId },
      { $pullAll: { products: [productId] } },
      { new: true }
    )
    .then((result) => {
      res
        .status(201)
        .json({ productDeleted: result, massage: "Successful deleted" });
    })
    .catch((err) => {
      res.status(404).json(res.massage);
    });
};

module.exports = {
  getCartByUser,
  deleteCartById,
  UpdateCart,
  deleteOneProductByIdOfCart,
};
