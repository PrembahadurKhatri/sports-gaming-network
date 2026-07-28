import { Schema, model, Types } from "mongoose";

export interface ITeamStats {
  team: Types.ObjectId;
  sport: string;

  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
winRate: number;
netRunRate: number;
  goalsScored: number;
  goalsConceded: number;
  goalDifference: number;

  shots: number;
  shotsOnTarget: number;
  corners: number;
  offsides: number;
  fouls: number;

  yellowCards: number;
  redCards: number;

  cleanSheets: number;

  runsScored: number;
  runsConceded: number;
  oversFaced: number;
  oversBowled: number;
  wicketsTaken: number;
  wicketsLost: number;
  boundaries: number;
  sixes: number;

  pointsScored: number;
  pointsConceded: number;
  pointsdifference:number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;

  raidPoints: number;
  tacklePoints: number;

  setsWon: number;
  setsLost: number;
  setsdifference:number;
  gamesWon: number;
  gamesLost: number;
  
}

const teamStatSchema = new Schema<ITeamStats>(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
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
    
    winRate: {
  type: Number,
  default: 0,
},

netRunRate: {
  type: Number,
  default: 0,
},
pointsdifference: {
  type: Number,
  default: 0,
},

setsdifference: {
  type: Number,
  default: 0,
},
    matchesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },

    goalsScored: { type: Number, default: 0 },
    goalsConceded: { type: Number, default: 0 },
    goalDifference: { type: Number, default: 0 },

    shots: { type: Number, default: 0 },
    shotsOnTarget: { type: Number, default: 0 },
    corners: { type: Number, default: 0 },
    offsides: { type: Number, default: 0 },
    fouls: { type: Number, default: 0 },

    yellowCards: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },

    cleanSheets: { type: Number, default: 0 },

    runsScored: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
    oversFaced: { type: Number, default: 0 },
    oversBowled: { type: Number, default: 0 },
    wicketsTaken: { type: Number, default: 0 },
    wicketsLost: { type: Number, default: 0 },
    boundaries: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },

    pointsScored: { type: Number, default: 0 },
    pointsConceded: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },

    raidPoints: { type: Number, default: 0 },
    tacklePoints: { type: Number, default: 0 },

    setsWon: { type: Number, default: 0 },
    setsLost: { type: Number, default: 0 },

    gamesWon: { type: Number, default: 0 },
    gamesLost: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

teamStatSchema.index(
  {
    team: 1,
    sport: 1,
  },
  {
    unique: true,
  }
);

export default model<ITeamStats>("TeamStat", teamStatSchema);