import { NextFunction, Request, Response } from "express";
import admin from "../auth/firebase.service";

class Middleware {
    async decodeToken(req: Request, res: Response, next: NextFunction) {
        const header = req.headers.authorization;

        if (header === undefined || header === null) {
            return next(new Error("No token provided"));
        }

        const token = header.split(" ")[1];

        try {
            const decodedValue = await admin.auth().verifyIdToken(token);
            if (decodedValue) {
                console.log(decodedValue);
                next();
            }
            return res.json({message: "Unauthorized"})
        } catch(err) {
            return res.json({message: "Internal error"})
        }
    }
}

export default new Middleware();