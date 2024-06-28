const { validationResult } = require("express-validator");
const Item = require("../models/items-model");

const itemCtrl = {};

itemCtrl.create = async (req, res) => {
  const body = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(body);
    const user = await Item.create(body);
    return res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
    console.log(body);
  }
};

itemCtrl.show=async(req,res)=>{
    try{
    const items=await Item.find()
    res.status(200).json(items)
    }
    catch(err){
        res.status(500).json({ error: "something went wrong" });
    }
}

itemCtrl.update=async(req,res)=>{
const id=req.params.id
const body=req.body
    try{
        const item=await Item.findByIdAndUpdate(id,body,{new:true})
        if(!item){
            return res.status(400).json({error:"bad request"})
        }
        res.status(200).json(item)
    }
    catch(err){
        res.status(500).json({ error: "something went wrong" });
    }
}

module.exports = itemCtrl;
