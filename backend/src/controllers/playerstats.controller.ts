import { Request, Response } from "express";
import {
  getPlayerStats,
  getPlayerStatsBySport,
  deletePlayerStat,
} from "../services/playerstats.service";

export const getPlayerStatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { playerId } = req.params;

    const stats = await getPlayerStats(playerId as string);

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPlayerStatsBySportController = async (
  req: Request,
  res: Response
) => {
  try {
    const { playerId, sport } = req.params;

    const stats = await getPlayerStatsBySport(
      playerId as string,
      sport as string
    );

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePlayerStatController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await deletePlayerStat(id as string);

    return res.status(200).json({
      success: true,
      message: "Player stat deleted successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};