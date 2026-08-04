import { Schema, Types, model } from "mongoose";
export interface IPayment{
    booking:Types.ObjectId;
    user:Types.ObjectId;
    amount:number;
    provider:"KHALTI" | "ESEWA" | "FONEPAY";
    transactionId?: string;
    pidx:string;
    method:string;
        paidAt?: Date;
    status:"PENDING" | "SUCCESS" |"FAILED";
}
const paymentSchema = new Schema<IPayment>(
{
    booking:{
        type:Schema.Types.ObjectId,
        ref:"GroundBooking",
        required:true
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:"Register",
        required:true
    },
    method: {
    type: String,
    enum: [
        "QR",
        "MOBILE_BANKING",
        "CARD",
        "WALLET"
    ],
    default: "WALLET"
},
    amount:{
        type:Number,
        required:true
    },

    provider:{
        type:String,
        enum:["KHALTI","ESEWA","FONEPAY"],
        default:"KHALTI"
    },
    transactionId:{
        type:String,
        default:null,
    },
    paidAt: {
    type: Date,
    default: null
},
  pidx: { //pidx stands for Payment ID Index.
  type: String,
  required: true,
  unique: true,
},

    status:{
        type:String,
        enum:[
            "PENDING",
            "SUCCESS",
            "FAILED"
        ],
        default:"PENDING"
    }
},
{
timestamps:true
}
);
paymentSchema.index({booking:1});
paymentSchema.index({user:1});
paymentSchema.index({pidx:1});


export default model<IPayment>("Payment", paymentSchema);

