import { Request, Response } from "express";
import {
  createMvp,
  getAllMvps,
  getMvpById,
  getPlayerMVPs,
  getMatchMVP,
  getTournamentMVPs,
  getSeasonMVPs,
  deleteMVP,
} from "./../services/mvp.services"

export const createMvpController = async (
  req: Request,
  res: Response
) => {
  try {
    const MVP = await createMvp(req.body);

    return res.status(201).json({
      success: true,
      message: "MVP created successfully.",
      MVP,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllMvpsController = async (
  req: Request,
  res: Response
) => {
  try {
    const MVPs = await getAllMvps();

    return res.status(200).json({
      success: true,
      count: MVPs.length,
      MVPs,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMvpByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const MVP = await getMvpById(id as string);

    return res.status(200).json({
      success: true,
      MVP,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPlayerMVPsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { playerId } = req.params;

    const MVPs = await getPlayerMVPs(playerId as string) ;

    return res.status(200).json({
      success: true,
      count: MVPs.length,
      MVPs,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMatchMVPController = async (
  req: Request,
  res: Response
) => {
  try {
    const { matchId } = req.params;

    const MVP = await getMatchMVP(matchId as string);

    return res.status(200).json({
      success: true,
      MVP,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTournamentMVPsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { tournamentId } = req.params;

    const MVPs = await getTournamentMVPs(tournamentId as string);

    return res.status(200).json({
      success: true,
      count: MVPs.length,
      MVPs,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSeasonMVPsController = async (
  req: Request,
  res: Response
) => {
  try {
    const MVPs = await getSeasonMVPs();

    return res.status(200).json({
      success: true,
      count: MVPs.length,
      MVPs,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMVPController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await deleteMVP(id as string);

    return res.status(200).json({
      success: true,
      message: "MVP deleted successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};