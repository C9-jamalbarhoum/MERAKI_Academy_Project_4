
const roleModule = require("../models/role")
const createRole =(req,res)=>{
    const {role,permissions} = req.body
const newRole = new roleModule({
    role,
    permissions
}).save().then((result)=>{
    console.log(result);
    res.status(202).json(result)
}).catch((err)=>{
    res.json(err)
})
}
module.exports = {createRole}