
import { Request, Response } from "express";
import {
  getTeamStats,
  getTeamStatsBySport,
  deleteTeamStat,
} from "../services/teamstats.service";

export const getTeamStatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { teamId } = req.params;

    const stats = await getTeamStats(teamId as string);

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTeamStatsBySportController = async (
  req: Request,
  res: Response
) => {
  try {
    const { teamId, sport } = req.params;

 const stats = await getTeamStatsBySport(
  teamId as string,
  sport as string
);

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTeamStatController = async (
  req: Request,
  res: Response
) => {
  try {
await deleteTeamStat(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Team stat deleted successfully.",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};