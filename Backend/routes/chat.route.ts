import express, { Request, Response } from "express";
import { creatNewSession ,getAllChatSessions} from "../controllers/chat";


const router = express.Router();

// CREAT SESSION

router.post("/",creatNewSession)
router.get("/:userId",getAllChatSessions)


export default router

