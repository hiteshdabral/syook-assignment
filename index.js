require("dotenv").config()
const express=require("express")
const app=express()
const {checkSchema}=require("express-validator")
app.use(express.json())



//imports db config
const  dbConnect=require( "./config/dbConfig") 
dbConnect()

//import Controllers
const userCtrl=require("./app/controller/user-controller")
const itemCtrl=require("./app/controller/item-controller")
const customerCtrl=require("./app/controller/customer-controller")

//import validation
const {userLoginValidation,userRegistrationValidation}=require("./app/validations/user-schema-validation")
const itemsValidation =require("./app/validations/items-validation-schema")
const customerValidation=require("./app/validations/customer-validation-schema")
//import middleware
const authenticateUser=require("./app/middleware/authenticate")
const deliveryCtrl = require("./app/controller/delivery-controller")




//api - FOR USER REGISTER & LOGIN
app.post('/register',checkSchema(userRegistrationValidation),userCtrl.register)
app.post('/login',checkSchema(userLoginValidation),userCtrl.login)

//api - FOR Item creation
app.post('/item-creation',authenticateUser,checkSchema(itemsValidation),itemCtrl.create)

//api: FOR customer creation 
app.post('/customer-creation',authenticateUser,checkSchema(customerValidation),customerCtrl.create)

//api -FOR delivery vehicle
app.post("/delivery-vehicle/registration",authenticateUser,deliveryCtrl.create)

app.listen(process.env.PORT,()=>{
    console.log("listening on port :"+process.env.PORT)
})