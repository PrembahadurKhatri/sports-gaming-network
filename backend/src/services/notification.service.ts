import Notification from "../models/notification";
import teamregister from "../models/teamregister";
import register from "../models/register";
import invitation from "../models/invitation";

export const getNotificationsService = async (userId: string) => {
  const notifications = await Notification.find({
    receiver: userId,
  })
    .populate("sender", "fullname profilePhoto")
    .populate("team", "teamName teamLogo")
    .sort({ createdAt: -1 });

  return {
    success: true,
    notifications,
  };
};

export const markAsReadService = async (
  notificationId: string,
  userId: string
) => {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new Error("Notification not found.");
  }

  if (notification.receiver.toString() !== userId) {
    throw new Error("Unauthorized.");
  }

  notification.isRead = true;

  await notification.save();

  return {
    success: true,
    message: "Notification marked as read.",
  };
};

export const markAllAsReadService = async (userId: string) => {
  await Notification.updateMany(
    {
      receiver: userId,
      isRead: false,
    },
    {
      isRead: true,
    }
  );

  return {
    success: true,
    message: "All notifications marked as read.",
  };
};

export const deleteNotificationService = async (
  notificationId: string,
  userId: string
) => {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new Error("Notification not found.");
  }

  if (notification.receiver.toString() !== userId) {
    throw new Error("Unauthorized.");
  }

  await notification.deleteOne();

  return {
    success: true,
    message: "Notification deleted successfully.",
  };
};
