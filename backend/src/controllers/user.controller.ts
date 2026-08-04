import { Request, Response } from "express";
import User from "../models/register";
import {
  getPlayerById as getPlayerByIdService,
  updatePlayer as updatePlayerService,
  deletePlayer as deletePlayerService,
  searchPlayers as searchPlayersService,
} from "../services/auth.service";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const searchPlayers = async (req: Request, res: Response) => {
  try {
    const result = await searchPlayersService(req.query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const getPlayerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getPlayerByIdService(id as string);
    res.status(200).json({
      success: result.success,
      message: result.message,
      player: result.player,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const result = await updatePlayerService(userId, req.body, req.file);
    res.status(200).json({
      success: result.success,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const deletePlayer = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const result = await deletePlayerService(userId);

    res.status(200).json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};
