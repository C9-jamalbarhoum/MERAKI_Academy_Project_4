const express = require("express");
require("dotenv").config()
const cors = require("cors");
require("./models/db")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// import Router 
const userRouter = require("./routes/users")
const roleRouter = require("./routes/role")
const categoryRouter = require("./routes/category")
const productRouter = require("./routes/product")
const reviewsRouter = require("./routes/reviews")
const cartRouter =require("./routes/cart")
const orderRouter = require("./routes/order")
const SearchRouter = require("./routes/search")


app.use("/users",userRouter)
app.use("/roles",roleRouter)
app.use("/category",categoryRouter)
app.use("/product",productRouter)
app.use("/",reviewsRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)
app.use("/search",SearchRouter)









// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
