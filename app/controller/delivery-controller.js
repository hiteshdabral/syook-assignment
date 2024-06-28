const DeliveryVehicle = require("../models/delivery-vehicle-model");
const { validationResult } = require("express-validator");

const deliveryCtrl = {};

deliveryCtrl.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  try {
    console.log(body);
    const deliveryVehicle = await DeliveryVehicle.create(body);
    return res.status(200).json(deliveryVehicle);
  } catch (err) {
    return res.status(400).json({ error: "something went wrong" });
  }
};


deliveryCtrl.show=async(req,res)=>{
  try{
  const deliveryVehicle=await DeliveryVehicle.find()
  res.status(200).json(deliveryVehicle)
  }
  catch(err){
      res.status(500).json({ error: "something went wrong" });
  }
}

deliveryCtrl.update=async(req,res)=>{
const id=req.params.id
const body=req.body
  try{
      const deliveryVehicle=await DeliveryVehicle.findByIdAndUpdate(id,body,{new:true})
      if(!deliveryVehicle){
          return res.status(400).json({error:"bad request"})
      }
      res.status(200).json(deliveryVehicle)
  }
  catch(err){
      res.status(500).json({ error: "something went wrong" });
  }
}


module.exports = deliveryCtrl;
