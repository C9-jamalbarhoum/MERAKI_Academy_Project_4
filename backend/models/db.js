const mongoose = require("mongoose");
// "mongodb://localhost:27017/E-Commerce" 
mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    console.log("Linked with DB");
  })
  .catch((err) => {
    console.log(err);
  });
