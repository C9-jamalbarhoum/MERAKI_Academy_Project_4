const express = require("express");

const { createOrder, getOrder } = require("../controllers/order");
const { SendMassage } = require("../controllers/SendMassage");

const orderRouter = express();
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

module.exports = orderRouter;
