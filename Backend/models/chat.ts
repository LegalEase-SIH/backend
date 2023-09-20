import mongoose from "mongoose";

const ChatSchema=new mongoose.Schema({
    sessionCreatedAt:{
        type: Date,
        default:()=>Date.now()
    },
    userId:{
        type:String
    },
    lastUpdatedAt:{
        type:Date
    },
    chats:[
        {
            userQuestion:String,
            reply: String,
            time:{
                type:Date,
                default:()=>Date.now()
            }

        }
    ]
})

export default mongoose.model("Chat",ChatSchema)