import { Request, Response } from "express";
import {
  getLeaderboard,
  getPlayerRanking,
  getTopPlayers,
} from "../services/playerranking.service";

export const leaderboard = async (req: Request, res: Response) => {
  try {
    const { sport } = req.params;

    const data = await getLeaderboard(sport as string);

    res.json({
      success: true,
      leaderboard: data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const topPlayers = async (req: Request, res: Response) => {
  try {
    const { sport } = req.params;
    const limit = Number(req.query.limit) || 10;

    const data = await getTopPlayers(sport as string, limit);

    res.json({
      success: true,
      players: data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myRanking = async (req: Request, res: Response) => {
  try {
    const playerId = (req as any).user.id;
    const sport = req.query.sport as string | undefined;

    const ranking = await getPlayerRanking(playerId, sport);

    res.json({
      success: true,
      ranking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};