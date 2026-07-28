import { Schema, model, Types } from "mongoose";

const matchStatSchema = new Schema(
  {
    match: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    player: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

    stat: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      default: 1,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

matchStatSchema.index({
  match: 1,
  team: 1,
  player: 1,
  stat: 1,
});

export interface IMatchStat {
  match: Types.ObjectId;
  team: Types.ObjectId;
  player?: Types.ObjectId;
  sport: string;
  stat: string;
  value: number;
}

export default model<IMatchStat>(
  "MatchStat",
  matchStatSchema
);