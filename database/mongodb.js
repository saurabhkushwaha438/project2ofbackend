import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config({path:'./.env'});


if(!process.env.DB_CONFIG){
    console.log("DB config is not present");
}


const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DB_CONFIG);

        console.log("mongodb is connected");
    }catch(err){
        console.log("mongodb connection failed", err);
        process.exit(1);
    }
}

export default connectDB;