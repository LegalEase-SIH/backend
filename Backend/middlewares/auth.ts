import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

export const authorizeUser = async (req:Request, res: Response, next: NextFunction) => {
    const header = req.header("Authorization")
    if (header === undefined || header==null) {
        return next(new Error("Authorization Token not found"))
    }
    try {
        const token = header.split(" ")[1];
        const userId = await getAuth().verifyIdToken(token)
        next();
    } catch(err) {
        return next(new Error("User not authorized"))
    }
}
