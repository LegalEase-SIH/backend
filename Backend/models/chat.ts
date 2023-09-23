import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    sessionCreatedAt: {
        type: Date,
        default: () => Date.now()
    },
    userId: {
        type: String,
        index: true,

    },
    lastUpdatedAt: {
        type: Date
    },
    sessionName: {
        type: String,
    },
    chats: [
        {
            userQuestion: String,
            reply: String,
            time: {
                type: Date,
                default: () => Date.now()
            }

        }
    ]
})

export default mongoose.model("Chat", ChatSchema)