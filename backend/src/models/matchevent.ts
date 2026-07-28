import { Schema, model, Types } from "mongoose";
import { SportName, AnySportEvent } from "./sportsevent";

const matchEventSchema = new Schema(
  {
    match: {
      type: Schema.Types.ObjectId,
      ref: "Match",
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

    event: {
      type: String,
      required: true,
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },

    player: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

  
    minute: Number,


    innings: Number,
    over: Number,
    ball: Number,


    quarter: Number,

   
    set: Number,

 
    raid: Number,


    value: Number,
  },
  {
    timestamps: true,
  }
);

export default model("MatchEvent", matchEventSchema);