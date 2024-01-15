const express = require("express");

const {
  UpdateCart,
  deleteCartById,
  getCartByUser,
  deleteOneProductByIdOfCart,
  UpdateShangCart,
} = require("../controllers/cart,");
const cartRouter = express();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

cartRouter.get("/", authentication, getCartByUser);
cartRouter.put("/deleteCart", authentication, deleteCartById);
cartRouter.delete("/one/:id", authentication, deleteOneProductByIdOfCart);

cartRouter.put("/", authentication, UpdateCart);
cartRouter.put("/Shang/:id", authentication, UpdateShangCart);
module.exports = cartRouter;
