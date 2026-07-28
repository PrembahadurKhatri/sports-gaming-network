// src/controllers/ground.controller.ts

import { Request, Response } from "express";
import {
  createGround,
  getAllGrounds,
  getGroundById,
  getMyGrounds,
  searchGrounds,
  updateGround,
  deleteGround,
  updateGroundStatus,
  getNearbyGrounds,
} from "../services/ground.service";

export const createGroundController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = (req as any).user.id;

    const result = await createGround(
      ownerId,
      req.body,
      req.files as Express.Multer.File[]
    );

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllGroundsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await getAllGrounds();

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGroundByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getGroundById(
      req.params.id as string
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyGroundsController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = (req as any).user.id;

    const result = await getMyGrounds(ownerId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const searchGroundsController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await searchGrounds(req.query);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateGroundController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = (req as any).user.id;

    const result = await updateGround(
      req.params.id as string,
      ownerId,
      req.body,
      req.files as Express.Multer.File[]
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteGroundController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = (req as any).user.id;

    const result = await deleteGround(
      req.params.id as string,
      ownerId
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateGroundStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = (req as any).user.id;

    const { status } = req.body;

    const result = await updateGroundStatus(
      req.params.id as string,
      ownerId,
      status
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNearbyGroundsController = async (
  req: Request,
  res: Response
) => {
  try {
    const longitude = Number(req.query.longitude);
    const latitude = Number(req.query.latitude);
    const distance = Number(req.query.distance) || 5000;

    const grounds = await getNearbyGrounds(
      longitude,
      latitude,
      distance
    );

    return res.status(200).json({
      success: true,
      grounds,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};