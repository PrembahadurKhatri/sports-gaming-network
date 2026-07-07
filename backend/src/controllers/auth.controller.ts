import { Request, Response } from "express";
import { registerUser } from "../services/auth.service"
export const register = async (req: Request, res: Response) => {
    try {
        const result = await registerUser(req.body,req.file);
        res.status(201).json({
            success: result.success,
            message: result.message,
            user: result.user,
        });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
};