import express, { Request, Response } from "express";
import { creatNewSession } from "../controllers/chat";


const router = express.Router();

// CREAT SESSION

router.post("/",creatNewSession)


export default router

