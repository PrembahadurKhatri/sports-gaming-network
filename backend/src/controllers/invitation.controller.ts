import { Request, Response } from "express";
import {
  getMyInvitations,
  getTeamInvitations,
  acceptInvitation,
  rejectInvitation,
  cancelInvitation,
} from "../services/invitation.service";

export const getMyInvitationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const playerId = req.user.id;

    const result = await getMyInvitations(playerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};

export const getTeamInvitationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.user.id;

    const result = await getTeamInvitations(ownerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};

export const acceptInvitationController = async (
  req: Request,
  res: Response
) => {
  try {
    const playerId = req.user.id;
    const { id } = req.params;

    const result = await acceptInvitation(id as string, playerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};


export const rejectInvitationController = async (
  req: Request,
  res: Response
) => {
  try {
    const playerId = req.user.id;
    const { id } = req.params;

    const result = await rejectInvitation(id as string, playerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};

export const cancelInvitationController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;

    const result = await cancelInvitation(id as string, ownerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    });
  }
};