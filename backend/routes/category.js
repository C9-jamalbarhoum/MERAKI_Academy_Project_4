const express = require("express");
const {createCategory,getAllCategory,gitCategoryById,deleteCategoryById,updateCategoryById} = require("../controllers/category")
const categoryRouter = express();

categoryRouter.get("/",getAllCategory)
categoryRouter.get("/:id", gitCategoryById)

categoryRouter.post("/create",createCategory)
categoryRouter.delete("/:id",deleteCategoryById)
categoryRouter.put("/:id",updateCategoryById)



module.exports = categoryRouter;
