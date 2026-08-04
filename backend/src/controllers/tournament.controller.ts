import { Request, Response } from "express";
import {
    createTournament as createTournamentService, getAllTournaments as getAllTournamentService, getTournamentById as getTournamentService
    , updateTournament as updateTournamentService, deleteTournament as deleteTournamentService, registerTeam as registerTeamService, withdrawTeam as withdrawTeamService,
    startTournament as startTournamentService, getTournamentMVP as getTournamentMVPService, generateNextRound as generateNextRoundService, finishTournament as finishTournamentService, getFixtures as getFixturesService
} from "../services/tournament.service";

export const createTournament = async (req: Request, res: Response) => {
    try {
        const organizerId = req.user.id;

        const result = await createTournamentService(
            organizerId,
            req.body,
            req.file
        );

        return res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to create tournament.",
        });
    }
};

export const getAllTournaments = async (req: Request, res: Response) => {
    try {
        const result = await getAllTournamentService();
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch tournaments.",
        });
    }
};

export const getTournamentById = async (req: Request, res: Response) => {
    try {

        const result = await getTournamentService(req.params.id as string);

        return res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error instanceof Error ? error.message : "Tournament not found.",
        });
    }
};

export const updateTournament = async (req: Request, res: Response) => {
    try {
        const organizerId = req.user.id;

        const result = await updateTournamentService(
            req.params.id as string,
            organizerId,
            req.body,
            req.file
        );
        return res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to update tournament.",
        });
    }
};

export const deleteTournament = async (req: Request, res: Response) => {
    try {
        const organizerId = req.user.id;

        const result = await deleteTournamentService(
            req.params.id as string,
            organizerId
        );

        return res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to delete tournament.",
        });
    }
};

export const registerTeam = async (req: Request, res: Response) => {
    try {
        const ownerId = req.user.id;
        const { teamId } = req.body;

        const result = await registerTeamService(
            req.params.id as string,
            ownerId,
            teamId
        );

        return res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to register team.",
        });
    }
};

export const withdrawTeam = async (req: Request, res: Response) => {
    try {
        const ownerId = req.user.id;
        const { teamId } = req.body;

        const result = await withdrawTeamService(
            req.params.id as string,
            ownerId,
            teamId
        );
        return res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to withdraw team.",
        });
    }
};

export const startTournament = async (req: Request, res: Response) => {
    try {
        const organizerId = req.user.id;

        const result = await startTournamentService(
            req.params.id as string,
            organizerId
        );

        return res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to start tournament.",
        });
    }
};

export const finishTournament = async (req: Request, res: Response) => {
    try {
        const organizerId = req.user.id;
        const { winnerId } = req.body;

        const result = await finishTournamentService(
            req.params.id as string,
            organizerId,
            winnerId
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to finish tournament.",
        });
    }
};

export const getFixtures = async (req: Request, res: Response) => {
    try {
        const result = await getFixturesService(req.params.id as string);

        return res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch fixtures.",
        });
    }
};


export const generateNextRound = async (
    req: Request,
    res: Response
) => {
    try {
        const organizerId = req.user.id;

        const result = await generateNextRoundService(
            req.params.id as string,
            organizerId
        );

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTournamentMVPController = async (
    req: Request,
    res: Response
) => {
    try {
        const result = await getTournamentMVPService(
            req.params.id as string
        );

        res.status(200).json({
            success: true,
            mvp: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};