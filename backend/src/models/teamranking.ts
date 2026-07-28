import { Schema, model } from "mongoose";

const teamRankingSchema = new Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "team",
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

    goalsFor: {
      type: Number,
      default: 0,
    },

    goalsAgainst: {
      type: Number,
      default: 0,
    },

    goalDifference: {
      type: Number,
      default: 0,
    },

    winRate: {
      type: Number,
      default: 0,
    },
    runsScored:{
        type:Number,
        default:0,
    },
    runsConceded:{
        type:Number,
        default:0,
            },
    oversFaced:{
        type:Number,
        default:0
    },
    oversBowled:{
        type:Number,
        default:0
    },
    netRunRate:{
        type:Number,
        default:0
    },
    wicketsLost:{
        type:Number,
        default:0
    },
    wicketsTaken:{
        type:Number,
        default:0,
    },
    pointsAgainst:{
        type:Number,
        default:0,
    },
    pointsScored:{
        type:Number,
        default:0
    },
    pointsDifference:{
        type:Number,
        default:0,
    },
    setsWon:{
        type:Number,
        default:0
    },
    setsLost:{
        type:Number,
        default:0
    },
    setDifference:{
        type:Number,
        default:0
    },
    raidPoints:{
        type:Number,
        default:0
    },
    tacklePoints:{
        type:Number,
        default:0
    },
   allOuts:{
        type:Number,
        default:0
    },
    gamesWon:{
        type:Number,
        default:0
    },
    gamesLost:{
        type:Number,
        default:0
    },
    gamesFor:{
        type:Number,
        default:0
    },
    gamesAgainst:{
        type:Number,
        default:0
    },
    ties:{
        type:Number,
        default:0
    },
    noResult:{
        type:Number,
        default:0
    },
    rank:{
    type:Number,
    default:0
}

},
  {
    timestamps: true,
  }
);
teamRankingSchema.index({
    team:1,
    sport:1
},{
    unique:true
});

teamRankingSchema.index({
    sport:1,
    rankingPoints:-1
});

teamRankingSchema.index({
    sport:1,
    winRate:-1
});


export default model(
  "TeamRanking",
  teamRankingSchema
);

