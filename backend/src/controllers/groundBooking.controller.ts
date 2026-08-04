import { Request, Response } from "express";
import {
  createBooking,
  getMyBookings,
  getGroundBookings,
  approveBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
  updatePaymentStatus,
} from "../services/groundBooking.service";

export const createBookingController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const result = await createBooking(
      userId,
      req.body
    );

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBookingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const result = await getMyBookings(userId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGroundBookingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getGroundBookings(
      req.params.groundId as string
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveBookingController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = (req as any).user.id;

    const result = await approveBooking(
      req.params.bookingId as string,
      ownerId
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectBookingController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.user.id;

    const result = await rejectBooking(
      req.params.bookingId as string,
      ownerId
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelBookingController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;

    const result = await cancelBooking(
      req.params.bookingId as string,
      userId
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const completeBookingController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await completeBooking(
      req.params.bookingId as string
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePaymentStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.body;

if (status !== "PAID" && status !== "FAILED") {
  return res.status(400).json({
    success: false,
    message: "Invalid payment status.",
  });
}
    const result = await updatePaymentStatus(
      req.params.bookingId as string,
      status
    );

    return res.status(200).json(result);
  } catch (error) {
  return res.status(400).json({
    success: false,
    message:
      error instanceof Error
        ? error.message
        : "Something went wrong.",
  });
  }
};