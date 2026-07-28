import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
    {
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Register",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Register",
            required: true,
        },
        type: {
            type: mongoose.Schema.Types.ObjectId,
            enum: [
                "JOIN_REQUEST",
                "JOIN_ACCEPTED",
                "JOIN_REJECTED",
                "INVITATION",
                "TEAM_REMOVED",
                "OWNERSHIP_TRANSFER",
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
            type: Boolean,
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