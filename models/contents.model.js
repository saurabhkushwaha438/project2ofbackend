import mongoose from "mongoose";
const{Schema} = mongoose;
const usercontents = new Schema({
    email:"String",
    contents:[
        {type:String}
    ]
})

const contents = mongoose.model('contents',usercontents);
export default contents;