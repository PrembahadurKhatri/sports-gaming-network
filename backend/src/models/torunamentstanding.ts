import { Schema, model, Types } from "mongoose";

export interface ITournamentStanding {
  tournament: Types.ObjectId;
  team: Types.ObjectId;
  sport: string;

  played: number;
  won: number;
  draw: number;
  lost: number;

  // Football / Hockey / Handball / Futsal
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;

  // Cricket
  runsFor: number;
  runsAgainst: number;
  wicketsTaken: number;
  wicketsLost: number;
  netRunRate: number;

  // Basketball
  pointsFor: number;
  pointsAgainst: number;
  pointDifference: number;

  // Volleyball / Badminton / Tennis
  setsWon: number;
  setsLost: number;
  setDifference: number;

  // Badminton / Tennis
  gamesWon: number;
  gamesLost: number;
  gameDifference: number;

  // Kabaddi
  raidPoints: number;
  tacklePoints: number;

  points: number;
  rank: number;
}

const standingSchema = new Schema<ITournamentStanding>(
  {
    tournament: {
      type: Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    sport: {
      type: String,
      required: true,
    },

    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    draw: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },

    goalsFor: { type: Number, default: 0 },
    goalsAgainst: { type: Number, default: 0 },
    goalDifference: { type: Number, default: 0 },

    runsFor: { type: Number, default: 0 },
    runsAgainst: { type: Number, default: 0 },
    wicketsTaken: { type: Number, default: 0 },
    wicketsLost: { type: Number, default: 0 },
    netRunRate: { type: Number, default: 0 },

    pointsFor: { type: Number, default: 0 },
    pointsAgainst: { type: Number, default: 0 },
    pointDifference: { type: Number, default: 0 },

    setsWon: { type: Number, default: 0 },
    setsLost: { type: Number, default: 0 },
    setDifference: { type: Number, default: 0 },

    gamesWon: { type: Number, default: 0 },
    gamesLost: { type: Number, default: 0 },
    gameDifference: { type: Number, default: 0 },

    raidPoints: { type: Number, default: 0 },
    tacklePoints: { type: Number, default: 0 },

    points: {
      type: Number,
      default: 0,
    },

    rank: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

standingSchema.index(
  {
    tournament: 1,
    team: 1,
  },
  {
    unique: true,
  }
);

export default model<ITournamentStanding>(
  "TournamentStanding",
  standingSchema
);