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
const deliveryCtrl = require("./app/controller/delivery-controller")
const orderCtrl=require("./app/controller/order-controller")

//import validation
const {userLoginValidation,userRegistrationValidation}=require("./app/validations/user-schema-validation")
const itemsValidation =require("./app/validations/items-validation-schema")//import validation
const customerValidation=require("./app/validations/customer-validation-schema")
const deliveryVehicleValidation=require("./app/validations/delivery-vehicle-validation")

//import middleware
const authenticateUser=require("./app/middleware/authenticate")


//api - FOR USER REGISTER & LOGIN
app.post('/register',checkSchema(userRegistrationValidation),userCtrl.register)
app.post('/login',checkSchema(userLoginValidation),userCtrl.login)

//api - FOR Item creation
app.post('/item-creation',authenticateUser,checkSchema(itemsValidation),itemCtrl.create)
app.get("/item-show",authenticateUser,itemCtrl.show)
app.put("/item-update/:id",authenticateUser,itemCtrl.update)



//api -FOR delivery vehicle
app.post("/delivery-vehicle/registration",authenticateUser,checkSchema(deliveryVehicleValidation),deliveryCtrl.create)
app.get("/delivery-vehicle-show",authenticateUser,deliveryCtrl.show)
app.put("/delivery-vehicle-update/:id",authenticateUser,deliveryCtrl.update)

//api-FOR ORDER CREATION
app.post("/order-creation",orderCtrl.create)
app.get("/order-show",authenticateUser,orderCtrl.show)
app.patch("/order-update/:id",authenticateUser,orderCtrl.updateOrder)


app.listen(process.env.PORT,()=>{
    console.log("listening on port :"+process.env.PORT)
})