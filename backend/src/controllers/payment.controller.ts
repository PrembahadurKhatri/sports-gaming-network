import { Request, Response } from "express";
import {
  createPayment,
  getMyPayments,
  getPaymentByPidx,
  verifyPayment,
  failPayment,
} from "../services/payment.service";


export const createPaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const { bookingId, provider } = req.body;

    const result = await createPayment(
      bookingId,
      userId,
      provider
    );

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyPaymentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;

    const result = await getMyPayments(userId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPaymentByPidxController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getPaymentByPidx(
      req.params.pidx as string
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { pidx, transactionId } = req.body;
    if (!pidx || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "pidx and transactionId are required.",
      });
    }
    const result = await verifyPayment(
      pidx,
      transactionId
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const failPaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { pidx } = req.body;
    if (!pidx) {
      return res.status(400).json({
        success: false,
        message: "pidx is required.",
      });
    }
    const result = await failPayment(pidx);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};