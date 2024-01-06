const express = require("express")

const {createOrder} =require("../controllers/order")
const orderRouter = express()


orderRouter.post("/",createOrder)


module.exports = orderRouter
