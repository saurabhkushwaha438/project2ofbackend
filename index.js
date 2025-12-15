import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import connectDB from './database/mongodb.js';
import authRouter from './router/auth.router.js';
import errorHandler from '../firstday/middleware/errorhandle.js';


const app = express();
app.use(express.json());
app.use('/api/auth',authRouter);
app.get('/',(req,res)=>{
    res.send("hi user");
})

app.use(errorHandler);

app.listen(5000,async () => {
    console.log(`server is listening at ${5000}`);
    await connectDB();
})