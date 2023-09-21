import express, { Request, Response } from "express";
import { createPetition } from "../controllers/petition.controller";
import uploadFile from "../middlewares/multer";

const route = express.Router();

route.get("/petition/:id/ner", (req: Request, res: Response) => {

})

route.get("/petition/:id/user/:userId/successRate", (req: Request, res: Response) => {

})

route.get("/petition/:id/user/:userId", (req: Request, res: Response) => {

})

route.post("/user/:userId/petition", uploadFile, createPetition)

route.get("/petition", (req: Request, res: Response) => {

})


export default route;