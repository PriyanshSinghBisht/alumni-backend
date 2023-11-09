const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
   await mongoose.connect(process.env.MONGODB_URL);
   console.log("databse connected successfully");
    }
    catch(e){
        console.error('mongodb: connection error: ' + e)
    }
}

module.exports = connectDB;
