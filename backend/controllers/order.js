const orderModule = require("../models/order");

const createOrder = (req, res, next) => {
  const { products, total, status } = req.body;
  const userId = req.token.userId;

  const newOrder = new orderModule({
    products,
    user: userId,
    total,
    status,
  });
  newOrder
    .save()
    .then((result) => {
     return  next();

      // res.status(201).json("successful created order");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const getOrder = (req, res) => {
  const userId = req.token.userId;

  orderModule
    .find({ user: userId })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      if (!result) {
        console.log(err);
        res.status(404).json(err);
      } else {
        res.status(500).json(err);
      }
    });
};
const getAllOrder = (req,res)=>{

  orderModule.find({}).populate("user").then((result)=>{
    res.status(200).json(result)
  }).catch((Err)=>{
    res.status(500).json(Err)
  })


}

module.exports = { createOrder, getOrder , getAllOrder};
