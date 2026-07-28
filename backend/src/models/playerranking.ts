import { Schema, model } from "mongoose";

const playerRankingSchema = new Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

    played: {
      type: Number,
      default: 0,
    },

    won: {
      type: Number,
      default: 0,
    },

    lost: {
      type: Number,
      default: 0,
    },

    draw: {
      type: Number,
      default: 0,
    },

    rankingPoints: {
      type: Number,
      default: 0,
    },

    mvpAwards: {
      type: Number,
      default: 0,
    },

    winRate: {
      type: Number,
      default: 0,
    },
    setDifference: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },

    goals: {
      type: Number,
      default: 0,
    },

    assists: {
      type: Number,
      default: 0,
    },

    yellowCards: {
      type: Number,
      default: 0,
    },
    mvpRate: {
      type: Number,
      default: 0,
    },

    redCards: {
      type: Number,
      default: 0,
    },

    cleanSheets: {
      type: Number,
      default: 0,
    },
    cleanSheetRate: {
      type: Number,
      default: 0,
    },

    saves: {
      type: Number,
      default: 0,
    },

    goalContribution: {
      type: Number,
      default: 0,
    },
    runs: {
      type: Number,
      default: 0,
    },

    ballsFaced: {
      type: Number,
      default: 0,
    },

    fours: {
      type: Number,
      default: 0,
    },

    sixes: {
      type: Number,
      default: 0,
    },
    wides: {
      type: Number,
      default: 0,
    },
    noBalls: {
      type: Number,
      default: 0,
    },
    notOuts: {
      type: Number,
      default: 0,
    },
    innings: {
      type: Number,
      default: 0,
    },

    wickets: {
      type: Number,
      default: 0,
    },

    oversBowled: {
      type: Number,
      default: 0,
    },

    runsConceded: {
      type: Number,
      default: 0,
    },

    catches: {
      type: Number,
      default: 0,
    },

    stumpings: {
      type: Number,
      default: 0,
    },

    runOuts: {
      type: Number,
      default: 0,
    },

    strikeRate: {
      type: Number,
      default: 0,
    },

    economy: {
      type: Number,
      default: 0,
    },

    battingAverage: {
      type: Number,
      default: 0,
    },

    bowlingAverage: {
      type: Number,
      default: 0,
    },


    points: {
      type: Number,
      default: 0,
    },

    rebounds: {
      type: Number,
      default: 0,
    },

    steals: {
      type: Number,
      default: 0,
    },

    blocks: {
      type: Number,
      default: 0,
    },

    turnovers: {
      type: Number,
      default: 0,
    },


    spikes: {
      type: Number,
      default: 0,
    },

    blocksWon: {
      type: Number,
      default: 0,
    },

    aces: {
      type: Number,
      default: 0,
    },

    digs: {
      type: Number,
      default: 0,
    },


    raidPoints: {
      type: Number,
      default: 0,
    },

    tacklePoints: {
      type: Number,
      default: 0,
    },

    superRaids: {
      type: Number,
      default: 0,
    },

    superTackles: {
      type: Number,
      default: 0,
    },


    matchesWon: {
      type: Number,
      default: 0,
    },

    matchesLost: {
      type: Number,
      default: 0,
    },

    gamesWon: {
      type: Number,
      default: 0,
    },

    gamesLost: {
      type: Number,
      default: 0,
    },

    setsWon: {
      type: Number,
      default: 0,
    },

    setsLost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

playerRankingSchema.index(
  {
    player: 1,
    sport: 1,
  },
  {
    unique: true,
  }
);

playerRankingSchema.index({
  sport: 1,
  rankingPoints: -1,
});

playerRankingSchema.index({
  sport: 1,
  rank: 1,
});


export default model(
  "PlayerRanking",
  playerRankingSchema
);