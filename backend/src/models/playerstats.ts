import { Schema, model, Types } from "mongoose";

export interface IPlayerStats {
  player: Types.ObjectId;
  sport: string;

  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  winRate: number;
  goals: number;
  assists: number;
  goalContribution: number;
  goalsConceded:number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  offsides: number;
  fouls: number;

  yellowCards: number;
  redCards: number;

  cleanSheets: number;

  runs: number;
  ballsFaced: number;
  strikeRate: number;
  boundaries: number;
  sixes: number;
  wickets: number;
  oversBowled: number;
  runsConceded: number;
  economy: number;

  innings: number;
  notOuts: number;
  battingAverage: number;
  bowlingAverage: number;

  points: number;
  assistsBasketball: number;
  steals: number;
  blocks: number;
  rebounds: number;
  raidPoints: number;
  tacklePoints: number;

  setsWon: number;
  setsLost: number;

  gamesWon: number;
  gamesLost: number;

  cleanSheetRate: number;

}

const playerStatSchema = new Schema<IPlayerStats>(
  {
    player: {
      type: Schema.Types.ObjectId,
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

    matchesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },


    shots: { type: Number, default: 0 },
    shotsOnTarget: { type: Number, default: 0 },
    corners: { type: Number, default: 0 },
    offsides: { type: Number, default: 0 },
    fouls: { type: Number, default: 0 },


    yellowCards: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },

    cleanSheets: { type: Number, default: 0 },

    oversBowled: { type: Number, default: 0 },
    boundaries: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    points:{type:Number,default:0},
    assistsBasketball:{type:Number,default:0},
    raidPoints: { type: Number, default: 0 },
    tacklePoints: { type: Number, default: 0 },

    setsWon: { type: Number, default: 0 },
    setsLost: { type: Number, default: 0 },

    gamesWon: { type: Number, default: 0 },
    gamesLost: { type: Number, default: 0 },

    winRate: { type: Number, default: 0 },

    goals: { type: Number, default: 0 },
    goalsConceded:{type:Number,default:0},
    goalContribution: { type: Number, default: 0 },

    runs: { type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },

    wickets: { type: Number, default: 0 },
    economy: { type: Number, default: 0 },

    innings: { type: Number, default: 0 },
    notOuts: { type: Number, default: 0 },
    battingAverage: { type: Number, default: 0 },
    bowlingAverage: { type: Number, default: 0 },




    cleanSheetRate: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

playerStatSchema.index(
  {
    player: 1,
    sport: 1,
  },
  {
    unique: true,
  }
);

export default model<IPlayerStats>(
  "PlayerStat",
  playerStatSchema
);