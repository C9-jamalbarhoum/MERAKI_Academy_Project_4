const express = require("express");
const cors = require("cors");
require("./models/db")
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// import Router 
const userRouter = require("./routes/users")
const roleRouter = require("./routes/role")
app.use("/users",userRouter)
app.use("/roles",roleRouter)








// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
