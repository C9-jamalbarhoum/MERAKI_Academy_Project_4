const express = require("express")

const {createRole} = require("../controllers/role")
const roleRouter = express()

roleRouter.post("/",createRole)



module.exports = roleRouter