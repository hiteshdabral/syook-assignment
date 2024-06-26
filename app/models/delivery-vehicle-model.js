const mongoose=require("mongoose")
const {Schema,model}=mongoose

const deliveryVehicleSchema=new Schema({
   registrationNumber: {
    type: String,
    unique: true,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['bike', 'truck'],
    required: true
  },
  city: {
    type: String,
    required: true
  },
  activeOrdersCount: {
    type: Number,
    default: 0,
    max: 2
  }
})





const DeliveryVehicle=model("DeliveryVehicle",deliveryVehicleSchema)


module.exports=DeliveryVehicle