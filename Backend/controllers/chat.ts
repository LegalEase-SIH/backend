import { CryptoHasher } from "bun";
import chat from "../models/chat";
import express, { NextFunction, Request, Response, request } from "express"

// CRUD for chat

// @desc Create new chat session
// @route POST /api/session
// @access public 

export const creatNewSession=async(req:Request,res:Response,next:NextFunction)=>{
    const newSession=new chat({userId:req.body.userId})

    try{
        const savedSession=await newSession.save()
        res.status(200).json(savedSession)
    }
    catch(err){
        next(err)
    }
}

// @desc Get all chat sessions
// @route  GET /api/session/:userId
// @acess public 

export const getAllChatSessions=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const chatSessions=await chat.find({userId:req.params.userId})
        res.status(200).json(chatSessions)

    }
    catch(err){
        next(err)
    }
}


// @desc add new chat response to chat session
// @route PUT /api/session/:sessionId

export const createNewChatResponse=async(req:Request,res:Response,next:NextFunction)=>{
    try{
         // getting the chat session
        const sesId=req.params.sessionId
         const chatSession=await chat.findById(sesId)
         const userId=req.body.userId
         
         const question=req.body.question
         const currDate=new Date()
         
        // fetch the reply from the model
         const reply="Here is the answer for your question"
        
         const currChat={"userQuestion":question,"reply":reply,"time":currDate}
         
        //  console.log("Current session chats: ",chatSession?.chats)

        //  console.log(currChat)

        
         let prevChats=chatSession?.chats
         prevChats.push(currChat)

         chatSession.chats=prevChats
         chatSession.save()


      
       res.status(200).json(chatSession)
    }
    catch(err){
         next(err)
        console.log(err)
    }
}
