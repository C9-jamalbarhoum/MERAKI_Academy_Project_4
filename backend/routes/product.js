const express =require("express")
const product = require("../models/product")
const {getAllProduct,getProductById,deleteProductById,createProduct,updateProduct,getAllProductByIdCategory} =require("../controllers/product")

const  productRouter = express()

productRouter.get("/", getAllProduct)
productRouter.get("/:id", getProductById)
productRouter.delete("/:id", deleteProductById)
productRouter.post("/create", createProduct)
productRouter.put("/:id", updateProduct)
productRouter.get("/idCate/:id", getAllProductByIdCategory)





module.exports = productRouter