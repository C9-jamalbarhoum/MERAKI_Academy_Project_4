const express = require("express")

const {UpdateCart,deleteCartById,getCartByUser,deleteOneProductById} =require("../controllers/cart,")
const cartRouter = express()


cartRouter.get("/:id",getCartByUser)
cartRouter.delete("/:id",deleteCartById)
cartRouter.delete("/",deleteOneProductById)
cartRouter.put("/",UpdateCart)

module.exports = cartRouter


