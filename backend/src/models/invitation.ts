import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
    {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "team",
            required: true,
        },
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Register",
            required: true,
        },
        message: {
            type: String,
            default: "",
        },
        invitedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Register",
            required: true,
        },
        status: {
            type: String,
            enum: [
                "pending", "accepted", "rejected", "cancelled",
            ],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model(
    "Invitation", invitationSchema
);