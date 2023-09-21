import express, { Request, Response } from "express";
import { creatNewSession ,createNewChatResponse,getAllChatSessions, getSessionById,updateSessionName} from "../controllers/chat";


const router = express.Router();

// CREAT SESSION

router.post("/",creatNewSession)
router.get("/:sessionId",getSessionById)
router.get("/user/:userId",getAllChatSessions)
router.put("/sessionName/:sessionId",updateSessionName)
router.put("/:sessionId",createNewChatResponse)



export default router

