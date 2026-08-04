import {Schema,model,Types,Document} from 'mongoose';

export interface IMessage{
    role:"user" | "assistant";
    content:string;
    timestamps:Date;
}

export interface IChat extends Document{
user:Types.ObjectId;
messages:IMessage[];
createAt:Date;
updateAt:Date;
}

const messageSchema = new Schema<IMessage>({
    role:{
        type:String,
        enum:["user","assistant"],
        required:true
    },
    content:{
        type:String,
        required:true,
        trim:true,
    },
    timestamps:{
        type:Date,
        default:Date.now,
    },
},
{
    _id:false,
}
);
const chatSchema= new Schema<IChat>({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
    },
    messages:{
        type:[messageSchema],
        default:[],
    },
},
{
    timestamps:true,
}
);

export const Chat = model<IChat>("Chat",chatSchema);


