import express from "express"
import mongoose from "mongoose";

const port = process.env.PORT

const app=express()

const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to mongoDB")
    }
    catch(error){
       
        throw error
    }
}
    
// checking if mongodb is connected
mongoose.connection.on("discconncted",()=>{
    console.log('mongodb disconnected')

})

// checking if the connection is on
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected")
})

app.listen(port,()=>{
    connect()
    console.log("Connected to backend.")
    console.log(`Listening on http://localhost:${port} ...`);
}) 
  