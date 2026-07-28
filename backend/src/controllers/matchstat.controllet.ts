import { Request, Response } from "express";
import {
  incrementStat,
  decrementStat,
  getMatchStats as getMatchStatsService,
  getPlayerStats as getPlayerStatsServce,
  getTeamStats as getTeamStatsService,
  getTopTeamsByStat as  getTopTeamsByStatService,
getTopPlayersByStat as getTopPlayerByStatService,
 deleteStat as deleteStatService
} from "../services/matchstat.service";

export const addMatchStat = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      matchId,
      teamId,
      playerId,
      sport,
      stat,
      value,
    } = req.body;

    const result = await incrementStat(
      matchId,
      teamId,
      playerId,
      sport,
      stat,
      value
    );

    return res.status(200).json({
      success: true,
      message: "Match stat updated successfully.",
      stat: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update match stat.",
    });
  }
};

export const removeMatchStat = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      matchId,
      teamId,
      playerId,
      sport,
      stat,
      value,
    } = req.body;

    const result = await decrementStat(
      matchId,
      teamId,
      playerId,
      sport,
      stat,
      value
    );

    return res.status(200).json({
      success: true,
      message: "Match stat reduced successfully.",
      stat: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to reduce stat.",
    });
  }
};

export const getMatchStatistics = async (
  req: Request,
  res: Response
) => {
  try {
    const { matchId } = req.params;

    const stats = await getMatchStatsService(matchId as string);

    return res.status(200).json({
      success: true,
      total: stats.length,
      stats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch match statistics.",
    });
  }
};

export const getPlayerStatistics = async (
  req: Request,
  res: Response
) => {
  try {
    const { playerId } = req.params;

    const stats = await getPlayerStatsServce (playerId as string);

    return res.status(200).json({
      success: true,
      total: stats.length,
      stats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch player statistics.",
    });
  }
};

export const getTeamStatistics = async (
  req: Request,
  res: Response
) => {
  try {
    const { teamId } = req.params;

    const stats = await getTeamStatsService(teamId as string);

    return res.status(200).json({
      success: true,
      total: stats.length,
      stats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch team statistics.",
    });
  }
};
export const getTopPlayers = async (
  req: Request,
  res: Response
) => {
  try {
    const {stat } = req.params;

if (!stat) {
    return res.status(400).json({
        success: false,
        message: "Stat is required.",
    });
}

const players = await getTopPlayerByStatService(stat as string);
    return res.status(200).json({
      success: true,
      total: players.length,
      players,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch top players.",
    });
  }
};

export const getTopTeams = async (
  req: Request,
  res: Response
) => {
  try {
    const { stat } = req.params;

    const teams = await getTopTeamsByStatService(stat as string);

    return res.status(200).json({
      success: true,
      total: teams.length,
      teams,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch top teams.",
    });
  }
};

export const deleteMatchStat = async (
  req: Request,
  res: Response
) => {
  try {
    const { statId } = req.params;

    await deleteStatService(statId as string);

    return res.status(200).json({
      success: true,
      message: "Match stat deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete match stat.",
    });
  }
};