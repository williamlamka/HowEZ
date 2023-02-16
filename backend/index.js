import express from"express";
import dotenv from "dotenv";
import authRouter from "./route/auth.js";
import productRouter from "./route/product.js";
import userRouter from "./route/user.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";

const app = express();
dotenv.config();
const corsOptions ={
    origin:'https://howez.vercel.app', 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(passport.initialize());

//api
app.use("/api/product", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

mongoose.connect(process.env.MONGO);

app.listen(3005, function(){
    console.log("Server is running on port 3005!");
})