import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js"

export const signup = async(req,res,next)=>{
      
        try {
            const{name,email,password}=req.body;
            const existingUser = await User.findOne({email});
            if(existingUser){
                 const error = new Error("User already exists");
                 error.statusCode = 400;
                 throw error;
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword =await bcrypt.hash(password,salt);
            const newUser = await User.create([{name,email,password:hashedPassword}]);
            const token = jwt.sign({userId:newUser[0]._id},process.env.JWT_TOKEN,{expiresIn:'1d'});

            // Remove password from user object before sending
            const userWithoutPassword = {
                _id: newUser[0]._id,
                name: newUser[0].name,
                email: newUser[0].email,
                date: newUser[0].date
            };

            res.status(201).json({
                success:true,
                message:"user created successfully",
                data:{token,user:userWithoutPassword}
            })

        } catch (error) {
           
            next(error);
        }
}

export const signin = async(req,res,next)=>{

    const {email,password}=req.body;
    const isValid =await User.findOne({email});
    if(!isValid){
        console.error("user didnt exits");
        res.statusCode = 404;
        throw new Error("wrong credentials");
    }
    const isPasswordValid = await bcrypt.compare(password,isValid.password);
    if(!isPasswordValid){
        const error = new Error("invalid password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({userId:isValid._id},process.env.JWT_TOKEN,{expiresIn:'1d'});
    
    // Remove password from user object before sending
    const userWithoutPassword = {
        _id: isValid._id,
        name: isValid.name,
        email: isValid.email,
        date: isValid.date
    };
    
    res.status(200).json(
        {
            success:true,
            message:"user signed in successfully",
            data:{
                token,
                user: userWithoutPassword
            }
        }
    )
}