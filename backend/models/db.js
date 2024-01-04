const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URI).then((result)=>{
    console.log("Linked with DB");
}).catch((err)=>{
    console.log(err);
})