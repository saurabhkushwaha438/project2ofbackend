import mongoose from "mongoose";
const {Schema}=mongoose;

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    date:{type:Date,default:Date.now}
})

const user =  mongoose.model('user',userSchema);
export default user;