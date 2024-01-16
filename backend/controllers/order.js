
const orderModule = require("../models/order")



const createOrder = (req, res) => {
    const {products,total,status} =req.body
    const userId = req.token.userId;

    const newOrder = new orderModule({
        products,user:userId,total,status
    })
    newOrder.save().then((result)=>{
            res.status(201).json("successful created order")
    }).catch((err)=>{
        res.status(500).json(err)
    })
};

module.exports = { createOrder };
