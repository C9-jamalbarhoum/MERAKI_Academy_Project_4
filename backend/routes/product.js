const express =require("express")
const product = require("../models/product")
const {getAllProduct,getProductById,deleteProductById,createProduct,updateProduct,getAllProductByIdCategory} =require("../controllers/product")

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const  productRouter = express()

productRouter.get("/", getAllProduct)
productRouter.get("/:id", getProductById)
productRouter.delete("/:id", deleteProductById)
productRouter.post("/create", createProduct)
productRouter.put("/:id",authentication, authorization("update_product"),updateProduct)
productRouter.get("/idCate/:id", getAllProductByIdCategory)





module.exports = productRouter