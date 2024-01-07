const AccessorsWomenIDforCategory = "6596d444dd4a36e2cef57543";
const AccessorsMenIDforCategory = "6596d51e458fdaf4e588d530";
const babyIDforCategory = "6596d5df29ed08afeaac8d47";
const BooksIDforCategory = "6599290d344bfdedbfb978f4";
const GamingAccessoriesIDforCategory = "659931e9344bfdedbfb9790e";
const FitnessIDforCategory = "659944fc5e3182f25afa60b3";

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
  productModule
    .find({})
    .populate("reviews")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const getProductById = (req, res) => {
  const { id } = req.params;

  productModule
    .findById({ _id: id })
    .populate("reviews")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err.massage);
    });
};
const deleteProductById = (req, res) => {
  const { id } = req.params;

  productModule
    .findByIdAndDelete({ _id: id })
    .then((result) => {
      res.status(201).json("deleted product");
    })
    .catch((err) => {
      res.status(404).json(err.massage);
    });
};
const updateProduct = (req, res) => {
  const { id } = req.params;

  productModule
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
//!  http://localhost:5000/product/idCate/:id
const getAllProductByIdCategory =(req,res)=>{

     const {id} = req.params 
     console.log(id);
  productModule.find({category:id}).then((result)=>{
    res.json(result)
  }).catch((Err)=>{
    console.log(Err);
  })
}
module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProduct,
  getAllProductByIdCategory
};
