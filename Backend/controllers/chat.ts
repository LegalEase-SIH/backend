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
        const chatSessions=await chat.find({userId:req.params})
        res.status(200).json(chatSessions)

    }
    catch(err){
        next(err)
    }
}
