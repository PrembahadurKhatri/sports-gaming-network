import mongoose from "mongoose";
import Payment from "../models/payment";
import GroundBooking from "../models/groundBooking";
import { randomUUID } from "crypto"; // generate random unique ID (UUID v4)
import { initiateKhaltiPayment, verifyKhaltiPayment } from "../utils/khalti";
import { createEsewaPayment, verifyEsewaPayment } from "../utils/esewa";
import { createFonePayment, verifyFonePayment } from "../utils/fonepay";
import User from "../models/register";

export const createPayment = async (
  bookingId: string,
  userId: string,
  provider: "KHALTI" | "ESEWA" | "FONEPAY"
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const booking = await GroundBooking.findById(bookingId).session(session);
    if (!booking) {
      throw new Error("Booking is not found.");
    }
    if (booking.paymentStatus === "PAID") {
      throw new Error("Booking is already paid.");
    }
    if (booking.bookedBy.toString() !== userId) {
      throw new Error("Unauthorized");
    }

    const existingPayment = await Payment.findOne({
      booking: bookingId,
      status: { $in: ["PENDING", "SUCCESS"] },
    }).session(session);

    if (existingPayment) {
      throw new Error("Payment already exists for this booking.");
    }

    if (booking.status === "CANCELLED" || booking.status === "REJECTED") {
      throw new Error("Cannot pay for this booking.");
    }

    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found.");
    }

    const [payment] = await Payment.create(
      [
        {
          booking: bookingId,
          user: userId,
          amount: booking.totalAmount,
          provider,
          pidx: randomUUID(),
          status: "PENDING",
        },
      ],
      { session }
    );

    let gatewayResponse;
    switch (provider) {
      case "KHALTI":
        gatewayResponse = await initiateKhaltiPayment(
          booking.totalAmount,
          payment._id.toString(),
          user.fullname,
          user.email,
          user.phoneNumber
        );

        payment.pidx = gatewayResponse.pidx;
        await payment.save({ session });
        break;

      case "ESEWA":
        payment.transactionId = payment._id.toString();
        await payment.save({ session });

        // FIX: this call was missing `await`, so gatewayResponse was
        // being set to an unresolved Promise instead of the payload.
        gatewayResponse = await createEsewaPayment(
          booking.totalAmount,
          payment.transactionId
        );
        break;

      case "FONEPAY":
        payment.transactionId = payment._id.toString();
        await payment.save({ session });

        gatewayResponse = await createFonePayment(
          booking.totalAmount,
          payment.transactionId
        );
        break;

      default:
        throw new Error("Invalid payment provider");
    }

    await session.commitTransaction();

    return {
      success: true,
      message: "Payment initiated successfully",
      payment,
      gatewayResponse,
    };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export const getMyPayments = async (userId: string) => {
  const payments = await Payment.find({
    user: userId,
  })
    .populate("booking")
    .sort({
      createdAt: -1,
    });

  return {
    success: true,
    payments,
  };
};

export const getPaymentByPidx = async (pidx: string) => {
  const payment = await Payment.findOne({
    pidx,
  })
    .populate("booking")
    .populate("user", "fullname email");

  if (!payment) {
    throw new Error("Payment not found.");
  }

  return {
    success: true,
    payment,
  };
};

export const verifyPayment = async (pidx: string, transactionId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const payment = await Payment.findOne({ pidx }).session(session);
    if (!payment) {
      throw new Error("Payment not found.");
    }

    if (payment.status !== "PENDING") {
      throw new Error("Payment cannot be verified.");
    }

    const booking = await GroundBooking.findById(payment.booking).session(
      session
    );
    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (booking.status === "CANCELLED" || booking.status === "REJECTED") {
      throw new Error("Booking is no longer valid.");
    }

    switch (payment.provider) {
      case "KHALTI": {
        const result = await verifyKhaltiPayment(payment.pidx);

        if (result.status !== "Completed") {
          throw new Error("Payment not completed.");
        }
        break;
      }

      case "ESEWA": {
        if (!payment.transactionId) {
          throw new Error("Missing transaction reference for this payment.");
        }

        const result = await verifyEsewaPayment(payment.transactionId);

        if (result.status !== "COMPLETE") {
          throw new Error("Payment not completed.");
        }
        break;
      }

      case "FONEPAY": {
        if (!payment.transactionId) {
          throw new Error("Missing transaction reference for this payment.");
        }

        const result = await verifyFonePayment(payment.transactionId);

        if (!result.success) {
          throw new Error("Payment not completed.");
        }
        break;
      }

      default:
        throw new Error("Invalid payment provider.");
    }

    payment.status = "SUCCESS";
    payment.transactionId = transactionId;
    payment.paidAt = new Date();
    await payment.save({ session });

    booking.paymentStatus = "PAID";
    booking.status = "APPROVED";
    await booking.save({ session });

    await session.commitTransaction();

    return {
      success: true,
      message: "Payment verified successfully.",
      payment,
    };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export const failPayment = async (pidx: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const payment = await Payment.findOne({ pidx }).session(session);
    if (!payment) {
      throw new Error("Payment not found.");
    }
    if (payment.status === "SUCCESS") {
      throw new Error("Cannot fail a completed payment.");
    }

    payment.status = "FAILED";
    await payment.save({ session });

    await GroundBooking.findByIdAndUpdate(
      payment.booking,
      { paymentStatus: "FAILED" },
      { session }
    );

    await session.commitTransaction();

    return {
      success: true,
      message: "Payment marked as failed.",
      payment,
    };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};