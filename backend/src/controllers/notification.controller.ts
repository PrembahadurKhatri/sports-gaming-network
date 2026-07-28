import { Request, Response } from "express";
import {
  getNotificationsService,
  markAsReadService,
  markAllAsReadService,
  deleteNotificationService,
} from "../services/notification.service";

type AuthenticatedUser = {
  user: {
    userId: string;
  };
};

const getUserId = (req: Request): string =>
  (req as Request & AuthenticatedUser).user.userId;

export const getNotifications = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = getUserId(req);

    const result = await getNotificationsService(userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const markAsRead = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    const result = await markAsReadService(id, userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const markAllAsRead = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = getUserId(req);

    const result = await markAllAsReadService(userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const deleteNotification = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    const result = await deleteNotificationService(id, userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
