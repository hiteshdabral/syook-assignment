const {validationResult}=require("express-validator")
const Item=require("../models/items-model")
const itemCtrl={}

itemCtrl.create=async(req,res)=>{
const body=req.body
try{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    console.log(body)
        const user=await Item.create(body)
        return res.status(201).json(user)
}
catch(err){
    res.status(500).json({error:"something went wrong"})
    console.log(body)
}


}




module.exports=itemCtrl