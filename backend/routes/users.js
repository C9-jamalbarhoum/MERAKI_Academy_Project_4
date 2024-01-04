const express = require("express")
const {login,register} = require("../controllers/users")
const userRouter = express()

userRouter.post("/register", register)
userRouter.post("/login", login)



module.exports = userRouter