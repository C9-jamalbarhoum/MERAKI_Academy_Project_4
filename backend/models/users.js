const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String, required: true, unique: true },
  password : {type:String, required:true},
  phoneNumber: { type: Number },
  location: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
});


userSchema.pre("save",async function(){
  try{
      this.password = await bcrypt.hash(this.password,5)
      this.email =  this.email.toLowerCase()
  }
  catch(err){
        console.log(err);
  }
})
module.exports = mongoose.model("users", userSchema);
