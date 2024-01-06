
const orderModule = require("../models/order")



const createOrder = (req, res) => {
    const {products,user,total,status} =req.body
    

    const newOrder = new orderModule({
        products,user,total,status
    }).save().then((result)=>{
            res.status(201).json("successful created order")
    }).catch((err)=>{
        res.status(500).json(err.massage)
    })
};

module.exports = { createOrder };
