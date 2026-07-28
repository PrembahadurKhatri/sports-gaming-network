import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
     
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      default: null,
    },
    teamA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
      required: true,
    },

    teamB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
      required: true,
    },

    challengedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },

     sport: {
    type: String,
    enum: [
        "Football",
        "Cricket",
        "Futsal",
        "Basketball",
        "Volleyball",
        "Badminton",
        "Tennis",
        "Kabaddi",
        "Hockey",
        "Handball",
    ],
    required: true,
},


    venue: {
      type: String,
      required: true,
    },

    matchDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "ongoing",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    teamAScore: {
      type: Number,
      default: 0,
    },

    teamBScore: {
      type: Number,
      default: 0,
    },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
      default: null,
    },

    manOfTheMatch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
matchSchema.index({ tournament: 1 });
matchSchema.index({ teamA: 1 });
matchSchema.index({ teamB: 1 });
matchSchema.index({ status: 1 });

export default mongoose.model("Match", matchSchema);