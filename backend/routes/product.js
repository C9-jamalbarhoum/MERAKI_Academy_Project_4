const express =require("express")
const product = require("../models/product")
const {getAllProduct,getProductById,deleteProductById,createProduct} =require("../controllers/product")

const  productRouter = express()

productRouter.get("/", getAllProduct)
productRouter.get("/:id", getProductById)
productRouter.delete("/delete/:id", deleteProductById)
productRouter.post("/create", createProduct)





module.exports = productRouter