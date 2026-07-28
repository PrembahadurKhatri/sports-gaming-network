// src/models/mvp.ts

import { Schema, model, Types } from "mongoose";

export interface IMVP {
  player: Types.ObjectId;
  team: Types.ObjectId;
  match: Types.ObjectId;
  sport: string;
  reason: string;
  score: number;
  result?: "WIN" | "LOSS" | "DRAW";
  category?: "MATCH" | "TOURNAMENT" | "SEASON";
  rating?: number;
  tournament?: Types.ObjectId;
  mvpScore: number;
  stats?: {
    // Football / Futsal / Hockey / Handball
    goals?: number;
    assists?: number;
    cleanSheets?: number;
    shots?: number;
    shotsOnTarget?: number;
    chancesCreated ?:number;
    catches?:number;
    // Cricket
    runs?: number;
    wickets?: number;
    strikeRate?: number;
    battingaverage: number;
    bowlingaverage: number;
    economy?: number;
    boundaries?: number;
    sixes?: number;

    // Basketball
    points?: number;
    rebounds?: number;
    assistsBasketball?: number;
    steals?: number;
    blocks?: number;

    // Volleyball
    attackPoints?: number;
    aces?: number;

    // Badminton / Tennis
    setsWon?: number;
    gamesWon?: number;

    // Kabaddi
    raidPoints?: number;
    tacklePoints?: number;
  };
}

const mvpSchema = new Schema<IMVP>(
  {

    player: {
      type: Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    match: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },

    tournament: {
      type: Schema.Types.ObjectId,
      ref: "Tournament",
    },
   reason: {
  type: String,
  required: true,
  trim: true,
},
mvpScore: {
  type: Number,
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
  rating: {
  type: Number,
  min: 0,
  max: 10,
  default: 0,
},
    category: {
      type: String,
      enum: ["MATCH", "TOURNAMENT", "SEASON"],
      default: "MATCH",
    },
    result: {
      type: String,
      enum: ["WIN", "DRAW", "LOSS"],
      default: "WIN"
    },
    score: {
      type: Number,
      required: true,
    },

    stats: {
      goals: { type: Number, default: 0 },
      assists: { type: Number, default: 0 },
      cleanSheets: { type: Number, default: 0 },
      shots: { type: Number, default: 0 },
       shotsOnTarget: { type: Number, default: 0 },
      chancesCreated:{ type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      strikeRate: { type: Number, default: 0 },
      battingaverage: { type: Number, default: 0 },
      bowlingaverage: { type: Number, default: 0 },
      economy: { type: Number, default: 0 },
      boundaries: { type: Number, default: 0 },
      sixes: { type: Number, default: 0 },
      catches:{ type: Number, default: 0 },
      points: { type: Number, default: 0 },
      rebounds: { type: Number, default: 0 },
      assistsBasketball: { type: Number, default: 0 },
      steals: { type: Number, default: 0 },
      blocks: { type: Number, default: 0 },

      attackPoints: { type: Number, default: 0 },
      blocksVolleyball: { type: Number, default: 0 },
      aces: { type: Number, default: 0 },

      setsWon: { type: Number, default: 0 },
      gamesWon: { type: Number, default: 0 },

      raidPoints: { type: Number, default: 0 },
      tacklePoints: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

mvpSchema.index({ player: 1,sport:1, });
mvpSchema.index({
    player:1,
    category:1
});
mvpSchema.index({ match:1,sport: 1, });
mvpSchema.index({ tournament: 1 });

export default model<IMVP>("MVP", mvpSchema);