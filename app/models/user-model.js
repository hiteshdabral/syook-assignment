const mongoose=require("mongoose")
const {Schema,model}=mongoose

const userSchema=new Schema({
    email:String,
   password:String,
 
})

const User=model("User",userSchema)

module.exports=User