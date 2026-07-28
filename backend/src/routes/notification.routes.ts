import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller";

const router = Router();

router.get("/notifications", verifyToken, getNotifications);

router.patch(
  "/notifications/:id/read",
  verifyToken,
  markAsRead
);

router.patch(
  "/notifications/read-all",
  verifyToken,
  markAllAsRead
);

router.delete(
  "/notifications/:id",
  verifyToken,
  deleteNotification
);

export default router;
