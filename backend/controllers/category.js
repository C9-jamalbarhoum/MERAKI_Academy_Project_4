const CategoryModule = require("../models/category");

const createCategory = (req, res) => {
  const { title, image } = req.body;

  const newCategory = new CategoryModule({
    title,
    image,
  });
  newCategory
    .save()
    .then((result) => {
      res.status(201).json({
        massage: "created new category ",
        Category: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        massage: " false is  created  to fail  ",
        error: err.massage,
      });
    });
};
const getAllCategory = (req, res) => {
  CategoryModule.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        err: err.massage,
      });
    });
};

const gitCategoryById = (req, res) => {
  const { id } = req.params;
  console.log(id);
  CategoryModule.findById({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.massage);
    });
};
const deleteCategoryById = (req, res) => {
  const { id } = req.params;
  CategoryModule.findByIdAndDelete({ _id: id }).then((result) => {
    res.status(202).json({
      massage: "Sccussfal deleted this Category",
      itmDeleted: result,
    });
  });
};
const updateCategoryById = (req, res) => {
  const { id } = req.params;

  CategoryModule
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err.massage);
    });
};

module.exports = {
  createCategory,
  getAllCategory,
  gitCategoryById,
  deleteCategoryById,
  updateCategoryById
};
