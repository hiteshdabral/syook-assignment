const mongoose=require("mongoose")
const {Schema,model}=mongoose

const customerSchema=new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
})

const Customer=model("Customer",customerSchema)


module.exports=Customer