import chat from "../models/chat";
import express, { NextFunction, Request, Response, request } from "express"

// CRUD for chat

// @desc Create new chat session
// @route POST /api/session
// @access public 

export const creatNewSession=async(req:Request,res:Response,next:NextFunction)=>{
    const newSession=new chat()

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

