import { Request, Response } from "express";
import { SPORT_RULES } from "../models/sportrules";
import {
    getEvents,
    getSpecificEvents,
} from "./../services/sportsevent.service";

import { SportName } from "../models/sportsevent";

export const getAllSportEvents = async (
    req: Request,
    res: Response
) => {
    try {
        const sport = req.params.sport as SportName;

        if (!(sport in SPORT_RULES)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sport.",
            });
        }

        const events = getEvents(sport as keyof typeof SPORT_RULES);

        return res.status(200).json({
            success: true,
            sport,
            total: events.length,
            events,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch events.",
        });
    }
};

export const getSportOnlyEvents = async (
    req: Request,
    res: Response
) => {
    try {
        const sport = req.params.sport as SportName;

        if (!(sport in SPORT_RULES)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sport.",
            });
        }

        const events = getSpecificEvents(
            sport as keyof typeof SPORT_RULES
        );

        return res.status(200).json({
            success: true,
            sport,
            total: events.length,
            events,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch sport events.",
        });
    }
};