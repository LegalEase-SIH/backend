import express, { Request, Response } from "express";
import { creatNewSession ,createNewChatResponse,getAllChatSessions, getSessionById} from "../controllers/chat";


const router = express.Router();

// CREAT SESSION

router.post("/",creatNewSession)
router.get("/sessionReq/:sessionId",getSessionById)
router.get("/:userId",getAllChatSessions)
router.put("/:sessionId",createNewChatResponse)


export default router

