import { Request, Response } from "express";
import {
  createMatch as createMatchService,
  getMyMatches as getMyMatchesService,
  getMatchById as getMatchByIdService,
  acceptMatch as acceptMatchService,
  rejectMatch as rejectMatchService,
  startMatch as startMatchService,
  finishMatch as finishMatchService,
  cancelMatch as cancelMatchService,
} from "../services/match.service"


export const createMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.user.id ;

    const result = await createMatchService(ownerId, req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};

export const getMyMatches = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;

    const result = await getMyMatchesService(userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};

export const getMatchById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await getMatchByIdService(id as string);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};

export const acceptMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;

    const result = await acceptMatchService(id as string, ownerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};

export const rejectMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.user.id ;
    const { id } = req.params;

    const result = await rejectMatchService(id as string, ownerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};

export const startMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;

    const result = await startMatchService(id as string, ownerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};
export const finishMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;
    const { teamAScore, teamBScore } = req.body;

    // Validate input first
    if (
      typeof teamAScore !== "number" ||
      typeof teamBScore !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Both scores must be numbers.",
      });
    }

    const result = await finishMatchService(
      id as string,
      ownerId,
      teamAScore,
      teamBScore
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};

export const cancelMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;

    const result = await cancelMatchService(id as string, ownerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};