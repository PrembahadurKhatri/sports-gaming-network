import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },

        phoneNumber: {
            type: String,
            trim: true,
            required: true,
            minlength: 10,
            maxlength: 15
        },
        province: {
            type: String,
            enum: [
                "",
                "Koshi",
                "Madhesh",
                "Bagmati",
                "Gandaki",
                "Lumbini",
                "Karnali",
                "Sudurpashchim",
            ],
            default: "",
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        bio: {
            type: String,
            default: "",
        },

        age: {
            type: Number,
            required: true,
            min: 13
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },

        profilePhoto: {
            type: String,
            required: true,
        },

        sport: {
            type: String,
            enum: [
                "Cricket",
                "Football",
                "Volleyball",
                "Handball",
                "Basketball",
                "Hockey",
                "Tennis",
                "Badminton",
                "Futsal",
                "Kabaddi",
            ],
            required: true,
        },
        position: {
            type: String,
            required: true,
            enum: [
                "Batsman",
                "Bowler",
                "All-rounder",
                "Wicket Keeper",
                "Captain",
                "Goalkeeper",
                "Defender",
                "Midfielder",
                "Forward",
                "Point Guard",
                "Shooting Guard",
                "Small Forward",
                "Power Forward",
                "Center",
                "Setter",
                "Spiker",
                "Blocker",
                "Libero",
                "Server",
                "Wing",
                "Back",
                "Pivot",
                "Raider",
                "Singles",
                "Doubles",
                "Mixed Doubles",
            ],
        },
        skillLevel: {
            type: String,
            enum: [
                "Beginner",
                "Intermediate",
                "Advanced",
                "Professional",
            ],
            required: true,
        },
        role: {
            type: String,
            enum: ["player", "admin"],
            default: "player"
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected","cancelled"],
            default: "pending"
        },
        isRegisteredPlayer: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;