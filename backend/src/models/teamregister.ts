import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    sport: {
      type: String,
      required: true,
    },

    teamType: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },

    province: {
      type: String,
      enum: [
        "Koshi",
        "Madhesh",
        "Bagmati",
        "Gandaki",
        "Lumbini",
        "Karnali",
        "Sudurpashchim",
      ],
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    homeGround: {
      type: String,
      default: "",
      trim: true,
    },

    foundedYear: {
      type: Number,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    teamEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    teamLogo: {
      type: String,
      required: true,
    },

    autoAccept: {
      type: Boolean,
      default: false,
    },

    requiredPositions: {
      type: [String],
      default: [],
    },

    minAge: {
      type: Number,
    },

    maxAge: {
      type: Number,
    },

    skillLevel: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
        "Professional",
      ],
    },

    provincePreference: {
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

    tournamentExperience: {
      type: Boolean,
      default: false,
    },

    customQuestions: {
      type: [String],
      default: [],
    },

    maxPlayers: {
      type: Number,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register", // Change to "User" if your user model is mongoose.model("User", ...)
      required: true,
    },

    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Register", // Same here
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Team", teamSchema);