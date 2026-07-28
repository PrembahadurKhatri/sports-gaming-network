import mongoose  from "mongoose";

const joinRequestSchema = new mongoose.Schema(
    {
        team:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true,
    },
    player:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:"String",
        default:"",
    },
    answers:{
        type:[String],
        default:[],
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected","cancelled"],
        default:"pending",
    },
     },
  {
    timestamps: true,
  }
);
    joinRequestSchema.index(
        {team:1,player:1},
        {unique:true}
    );
    export default mongoose.model("JoinRequest",joinRequestSchema);