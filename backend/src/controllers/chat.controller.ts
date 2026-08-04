import { Request, Response } from "express";
import { sendMessage } from "../services/chat.service";

export const chat = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user.id;

        // Get the message sent by the frontend
        const { message } = req.body;
        const result = await sendMessage(userId , message);
        res.status(200).json(result);

    } catch (error) {

        // Return error response
        res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
        });

    }
};