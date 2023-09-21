import express, { Request, Response } from "express";
import { createPetition, getAllPetitions, getPetitionById, calculateNer, handleSuccessRate } from "../controllers/petition.controller";
import uploadFile from "../middlewares/multer";

const route = express.Router();

route.get("/petition/:id/ner", calculateNer)

route.get("/petition/:id/user/:userId/successRate", handleSuccessRate)

route.post("/user/:userId/petition", uploadFile, createPetition)

route.get("/user/:userId/petition/:petitionId", getPetitionById)
route.get("/user/:userId/petition", getAllPetitions)


export default route;