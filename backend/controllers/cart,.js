const cartModule = require("../models/cart");
const product = require("../models/product");
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

///  user create for push product of cart ==> new itm for cart => =>  { id => User Id}

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
  const userId = req.token.userId;
  cartModule
    .findOneAndUpdate({user:userId },{products:req.body},{new:true})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((Err) => {
      res.status(404).json(Err.massage);
    });
};

//  Update for cart  => =>  => delete One product of cart
const deleteOneProductByIdOfCart = (req, res) => {
  const { id } = req.params;

  const userId = req.token.userId;
  console.log("jojo");
  console.log(id);
  cartModule
    .findOneAndUpdate(
      { user: userId },
      { products: [{ $pull: id }] },
      { new: true }
    )
    .then((result) => {
      res
        .status(201)
        .json({ productDeleted: result, massage: "Successful deleted" });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
const UpdateShangCart = (req, res) => {
  const userId = req.token.userId;
  console.log( userId);
  console.log("xqx");
    console.log(req.body);
  cartModule.findOneAndUpdate({ user: userId },{ products:req.body}, { new: true }).then((result)=>{
    res.status(201).json(result)
  }).catch((err)=>{
      res.status(404).json(err)
  })
};

module.exports = {
  getCartByUser,
  deleteCartById,
  UpdateCart,
  deleteOneProductByIdOfCart,
  UpdateShangCart,
};
