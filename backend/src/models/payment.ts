import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
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

    amount:{
        type:Number,
        required:true
    },

    provider:{
        type:String,
        enum:["KHALTI","ESEWA","Fonepay"],
        default:"KHALTI"
    },

    transactionId:String,

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

export default model("Payment",paymentSchema);

/**
 Payment Flow
User books ground
        ↓
Booking Status = PENDING
Payment Status = UNPAID
        ↓
Click Pay
        ↓
Create Khalti Payment
        ↓
User Pays
        ↓
Khalti Verification
        ↓
Payment Status = PAID
Booking Status = APPROVED
        ↓
Notification Sent
Backend Structure
src
│
├── controllers
│     payment.controller.ts
│
├── services
│     payment.service.ts
│
├── routes
│     payment.routes.ts
│
├── utils
│     khalti.ts
│
└── models
      payment.ts 
 */