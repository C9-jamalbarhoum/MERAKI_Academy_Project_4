const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI||"mongodb://localhost:27017/E-Commerce" )
  .then((result) => {
    console.log("Linked with DB");
  })
  .catch((err) => {
    console.log(err);
  });
