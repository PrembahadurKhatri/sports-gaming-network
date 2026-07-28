import { Request,Response } from "express";
import { getPlayerDashboard as getPlayerDashboardService,getTeamDashboard as getTeamDashboardService} from "../services/dashboard.service";

export const getPlayerDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const playerId = req.user.id;

    const result = await getPlayerDashboardService(playerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};

export const getTeamDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.user.id;

    const result = await getTeamDashboardService(ownerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};