require("dotenv").config()
const jwt=require("jsonwebtoken")
const {validationResult}=require("express-validator")
const bcryptjs=require("bcryptjs")
const User=require("../models/user-model")
const userCtrl={}

userCtrl.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        console.log("hi")
        const salt=await bcryptjs.genSalt()
        const hashPassword=await bcryptjs.hash(body.password,salt)
        body.passwordHash=hashPassword
       const user= await User.create(body)
       console.log(user)
       return  res.status(201).json((user))
    }
    catch(err){
        res.status(500).json({ error: 'something went wrong'})
        console.log(body)
    }
}



userCtrl.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const body=req.body
    try{
        const user=await User.findOne({email:body.email})
        if(user){
            const isAuth=bcryptjs.compare(body.password,user.password)
            if(isAuth){
                    const tokenData={
                        id:user._id
                    }
                    const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'7d'})
                    return res.json( {token:token} )
            }
            res.status(404).json({ errors: 'invalid email/ password'})
        }
        res.status(404).json({ errors: 'invalid email/ password'})
    }
    catch(err){
        res.status(500).json({ error: 'something went wrong'})
    }
}


module.exports=userCtrl