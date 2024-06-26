const User=require("../models/user-model")

const userRegistrationValidation={

    
    email:{
        exists: {
            errorMessage: 'email is required'            
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be a valid format'
        },
        custom:{
            options:async function (value){
                const user=await User.findOne({email:value})
                if(user){
                    throw new Error('email already taken')
                }
                else{
                    return true
                }
            }
        },
        trim :true,
        normalizeEmail:true
    },
    password:{
        exists: {
            errorMessage: 'password is required'            
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isLength: {
            options: {min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters'
        },
        trim: true 
    }
}
const userLoginValidation={
    email:{
        exists: {
            errorMessage: 'email is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be blank'
        },
        isEmail: {
            errorMessage: 'invalid email format'
        },
        normalizeEmail: true,
        trim: true 
    },
    password:{
        exists: {
            errorMessage: 'password is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be blank'
        }, 
        isLength: {
            options: { min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters'
        },
        trim: true 
    }
}


module.exports={userRegistrationValidation,userLoginValidation}