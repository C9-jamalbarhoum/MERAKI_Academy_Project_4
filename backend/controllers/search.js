const productModule = require("../models/product");

// !  API => =>    for Search    => =>     http://localhost:5000/search?q= e.target.value

const SearchByNameProduct = (req, res) => {
  const { q } = req.query;
  productModule
    .find({ title: { $regex: q, $options: "i" } })
    .limit(20)
    .then((result) => {
      res.status(200).json({
        massage: "successful",
        result: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        massage: "this itm no exist",
        error: err,
      });
    });
};

module.exports = { SearchByNameProduct };
