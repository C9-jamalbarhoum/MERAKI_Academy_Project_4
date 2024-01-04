const express = require("express");
const {createCategory,getAllCategory,gitCategoryById,deleteCategoryById} = require("../controllers/category")
const categoryRouter = express();

categoryRouter.get("/",getAllCategory)
categoryRouter.get("/:id", gitCategoryById)

categoryRouter.post("/create",createCategory)
categoryRouter.get("/delete/:id",deleteCategoryById)



module.exports = categoryRouter;
