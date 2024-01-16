const express = require("express")

const {createOrder,getOrder} =require("../controllers/order")
const orderRouter = express()
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

orderRouter.post("/",authentication,authorization("add_to_cart"),createOrder)
orderRouter.get("/get",authentication,getOrder)


module.exports = orderRouter
