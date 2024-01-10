const express = require("express");

const {
  UpdateCart,
  deleteCartById,
  getCartByUser,
  deleteOneProductByIdOfCart,
} = require("../controllers/cart,");
const cartRouter = express();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

cartRouter.get("/",authentication, getCartByUser);
cartRouter.delete(
  "/:id",
  authentication,
  authorization("delete_to_cart"),
  deleteCartById
);
cartRouter.delete(
  "/",
  authorization,
  authorization,
  deleteOneProductByIdOfCart
);
cartRouter.put("/:id", authentication, UpdateCart);

module.exports = cartRouter;
