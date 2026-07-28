// src/controllers/tournamentStanding.controller.ts

import { Request, Response } from "express";
import {
  getTournamentStandings,
  getStandingByTeam,
  deleteStanding,
} from "./../services/tournamentStanding.service"

export const getTournamentStandingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { tournamentId } = req.params;

    const standings = await getTournamentStandings(
      tournamentId as string
    );

    return res.status(200).json({
      success: true,
      standings,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStandingByTeamController = async (
  req: Request,
  res: Response
) => {
  try {
    const { tournamentId, teamId } = req.params;

    const standing = await getStandingByTeam(
      tournamentId as string,
      teamId as string
    );

    return res.status(200).json({
      success: true,
      standing,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStandingController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await deleteStanding(id as string);

    return res.status(200).json({
      success: true,
      message: "Tournament standing deleted successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};