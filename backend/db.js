const mongoose = require("mongoose")
require("dotenv").config();


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDb connected successfully");
        
    } catch (error) {
        console.error({messge:error});
        
    }
    
}
module.exports = connectDB