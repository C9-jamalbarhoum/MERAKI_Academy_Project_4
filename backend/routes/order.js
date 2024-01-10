const express = require("express")

const {createOrder} =require("../controllers/order")
const orderRouter = express()
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

orderRouter.post("/",authentication,authorization("add_to_cart"),createOrder)


module.exports = orderRouter
