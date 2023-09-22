import express, { NextFunction, Request, Response } from "express"
import mongoose from "mongoose";
import petitionRoute from "./routes/petition.route"
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.route.ts"

import {v2 as cloudinary} from 'cloudinary';
import middleware from "./middlewares/auth.ts";
          
dotenv.config()
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

const port = process.env.PORT
const app = express()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to mongoDB")
    }
    catch (error) {
        throw error
    }
}

// send json data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(middleware.decodeToken)

// app.use("/api/session")
app.use("/api", petitionRoute);
app.use("/api/session",chatRoute)
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// app.use("/api/session")
app.use("/api", petitionRoute);

// error handling middleware
app.use((err: any, req: Request, res: Response, next:NextFunction) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

// checking if mongodb is connected
mongoose.connection.on("discconncted", () => {
    console.log('mongodb disconnected')

})

// checking if the connection is on
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected")
})

app.listen(port, () => {
    connect()
    console.log("Connected to backend.")
    console.log(`Listening on http://localhost:${port} ...`);
})
