const express = require("express");

const { createOrder, getOrder,getAllOrder } = require("../controllers/order");
const { SendMassage } = require("../controllers/SendMassage");

const orderRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

orderRouter.post(
  "/",
  authentication,
  authorization("add_to_cart"),
  createOrder,
  SendMassage
);
orderRouter.get("/get", authentication, getOrder);
orderRouter.get("/getAll", authentication, getAllOrder);

module.exports = orderRouter;
