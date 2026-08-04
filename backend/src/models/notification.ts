import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "JOIN_REQUEST",
        "JOIN_ACCEPTED",
        "JOIN_REJECTED",
        "REQUEST_ACCEPTED",
        "REQUEST_REJECTED",
        "INVITATION",
        "TEAM_INVITE",
        "INVITATION_ACCEPTED",
        "INVITATION_REJECTED",
        "INVITATION_CANCELLED",
        "TEAM_REMOVED",
        "OWNERSHIP_TRANSFER",
        "MATCH_REQUEST",
        "MATCH_ACCEPTED",
        "MATCH_REJECTED",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);
