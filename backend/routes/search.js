const express = require("express")

const {SearchByNameProduct} = require("../controllers/search")

const SearchRouter = express()

SearchRouter.get("/",SearchByNameProduct)

module.exports = SearchRouter