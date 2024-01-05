const AccessorsWomenIDforCategory = "6596d444dd4a36e2cef57543";
const AccessorsMenIDforCategory = "6596d51e458fdaf4e588d530";
const babyIDforCategory = "6596d5df29ed08afeaac8d47";

const productModule = require("../models/product");
// {title
// description
// price
// image
// stockQuantity
// reviews
// category}

const createProduct = (req, res) => {
  const { title, description, price, image, stockQuantity, category } =
    req.body;

  const NewProduct = new productModule({
    title,
    description,
    price,
    image,
    stockQuantity,
    category,
  });
  NewProduct.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllProduct = (req, res) => {
  productModule.find({}).populate("reviews").then((result)=>{
        res.status(200).json(result)
  }).catch((err)=>{
      res.status(404).json(err)
  })
};

const getProductById = (req, res) => {};
const deleteProductById = (req, res) => {};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
};
