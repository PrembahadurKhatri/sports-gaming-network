import { Request, Response } from "express";
import {
    addEvent,
    getTimeline,
    updateEvent,
    deleteEvent,
} from "../services/matchevent.service";

export const addMatchEvent = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = (req as any).user.id;
        const matchId = req.params.matchId;

        if (!matchId) {
            return res.status(400).json({
                success: false,
                message: "Match ID is required.",
            });
        }

        const event = await addEvent(
            matchId,
            userId,
            req.body
        );
        return res.status(201).json({
            success: true,
            message: "Match event added successfully.",
            event,
        });
    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to add match event.",
        });
    }
};

export const getMatchTimeline = async (
    req: Request,
    res: Response
) => {
    try {
        const { matchId } = req.params;

        const timeline = await getTimeline(matchId);

        return res.status(200).json({
            success: true,
            total: timeline.length,
            timeline,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch match timeline.",
        });
    }
};

export const updateMatchEvent = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = (req as any).user.id;
        const { eventId } = req.params;

        const event = await updateEvent(
            eventId,
            userId,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Match event updated successfully.",
            event,
        });
    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update match event.",
        });
    }
};

export const deleteMatchEvent = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = (req as any).user.id;
        const { eventId } = req.params;

        await deleteEvent(
            eventId,
            userId
        );

        return res.status(200).json({
            success: true,
            message: "Match event deleted successfully.",
        });
    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete match event.",
        });
    }
};