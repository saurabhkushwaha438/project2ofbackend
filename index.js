import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './database/mongodb.js';
import authRouter from './router/auth.router.js';
import userdataRouter from './router/userdata.router.js';
import errorHandler from '../firstday/middleware/errorhandle.js';

const app = express();
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api',userdataRouter);
app.get('/',(req,res)=>{
    res.send("hi user");
})

app.use(errorHandler);
const PORT = Number(process.env.PORT);

app.listen(PORT,async () => {
    console.log(`server is listening at ${process.env.PORT}`);
    await connectDB();
})