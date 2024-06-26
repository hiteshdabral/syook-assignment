const DeliveryVehicle = require("../models/delivery-vehicle-model")


const deliveryCtrl={}

deliveryCtrl.create=async(req,res)=>{
 const body=req.body
 try{
const deliveryVehicle=await DeliveryVehicle.create(body)
return res.status(200).json(deliveryVehicle)
 } 
 catch(err){
    return res.status(400).json({error:"something went wrong"})
 } 
}






module.exports=deliveryCtrl