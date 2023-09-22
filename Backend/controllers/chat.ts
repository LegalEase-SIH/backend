import chat from "../models/chat";
import { NextFunction, Request, Response } from "express"

// CRUD for chat

// @desc Create new chat session
// @route POST /api/session
// @access public 

export const creatNewSession=async(req:Request,res:Response,next:NextFunction)=>{
    const newSession=new chat({userId:req.body.userId,sessionName:req.body.sessionName})

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
// @access public 

export const getAllChatSessions=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const chatSessions=await chat.find({userId:req.params.userId})
        res.status(200).json(chatSessions)

    }
    catch(err){
        next(err)
    }
}

// @desc get chat session by sessionId
// @route GET /api/session/sessionReq/:sessionId
// @access public

export const getSessionById=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const chatSession=await chat.findById({_id:req.params.sessionId})
        res.status(200).json(chatSession)
    }
    catch(err){
        next(err)
        console.log(err)
    }
}

// @desc update session name
/// @route PUT /api/session/sessionname/:sessionId

export const updateSessionName=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        // get the new name
        const newName=req.body.sessionName
        const sessionId=req.params.sessionId
        const chatSession=await chat.findById(sessionId)

        if (chatSession===null || chatSession === undefined){
            return res.status(404).json({message:"Session not found"})
        }
           // update the session name
        chatSession.sessionName=newName
        chatSession.save()


        res.status(200).json(chatSession)

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
        
         if (chatSession===null || chatSession === undefined){
            return res.status(404).json({message:"Session not found"})
         }

         const userId=req.body.userId
         
         const question=req.body.question
         const currDate=new Date()
         
        // fetch the reply from the model
         const reply="Here is the answer for your question"
        
         const currChat={"userQuestion":question,"reply":reply,"time":currDate}
         
        //  console.log("Current session chats: ",chatSession?.chats)

        //  console.log(currChat)

        
         let prevChats=chatSession.chats
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
