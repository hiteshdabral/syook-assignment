require("dotenv").config()
const mongoose=require("mongoose")


async function dbConnect() {
  try {
    const db = await mongoose.connect(process.env.URI) 
    console.log('connected to db')
} catch(err) {
    console.log(err) 
}
}
module.exports = dbConnect;
