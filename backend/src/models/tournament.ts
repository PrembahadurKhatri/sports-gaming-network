import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },

    tournamentName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
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

  location: {
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
    trim: true,
  },
},
    banner: {
      type: String,
      default: "",
    },

    rules: {
      type: String,
      default: "",
      trim: true,
    },

    registrationDeadline: {
      type: Date,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    registrationFee: {
      type: Number,
      min: 0,
      default: 0,
    },

    prizePool: {
      type: Number,
      min: 0,
      default: 0,
    },

    registeredTeams: [{
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },
    registeredAt: {
        type: Date,
        default: Date.now
    },
    approved: {
        type: Boolean,
        default: true
    }
}],
currentRound: {
    type: String,
    enum: [
        "ROUND_OF_16",
        "QUARTER_FINAL",
        "SEMI_FINAL",
        "FINAL"
    ],
    default: "QUARTER_FINAL"
},
    fixtures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
      },
    ],

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },

    status: {
      type: String,
      enum: [
        "upcoming",
        "registration_open",
        "registration_closed",
        "ongoing",
        "completed",
        "cancelled",
      ],
      default: "registration_open",
    },

visibility: {
  type: String,
  enum: ["Public", "Private"],
  default: "Public",
},
  },
  {
    timestamps: true,
  }
);

tournamentSchema.index({ organizer: 1 });
tournamentSchema.index({ sport: 1 });
tournamentSchema.index({ status: 1 });

export default mongoose.model("Tournament", tournamentSchema);
