import { Schema, model, Types } from "mongoose";

export interface IGroundBooking {
  ground: Types.ObjectId;
  bookedBy: Types.ObjectId;

  team?: Types.ObjectId;
  match?: Types.ObjectId;

  bookingDate: Date;

  startTime: string;
  endTime: string;

  totalHours: number;
  totalAmount: number;

  paymentMethod: "CASH" | "KHALTI" | "ESEWA";
  paymentStatus: "PENDING" | "PAID" | "FAILED";

  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "CANCELLED"
    | "COMPLETED";

  notes?: string;
}

const groundBookingSchema = new Schema<IGroundBooking>(
  {
    ground: {
      type: Schema.Types.ObjectId,
      ref: "Ground",
      required: true,
    },

    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },

    match: {
      type: Schema.Types.ObjectId,
      ref: "match",
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    totalHours: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "KHALTI", "ESEWA"],
      default: "CASH",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "APPROVED",
        "REJECTED",
        "CANCELLED",
        "COMPLETED",
      ],
      default: "PENDING",
    },

    notes: String,
  },
  {
    timestamps: true,
  }
);

groundBookingSchema.index({
  ground: 1,
  bookingDate: 1,
});

export default model<IGroundBooking>(
  "GroundBooking",
  groundBookingSchema
);