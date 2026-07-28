import { Router } from "express";
import {
  createBookingController,
  getMyBookingsController,
  getGroundBookingsController,
  approveBookingController,
  rejectBookingController,
  cancelBookingController,
  completeBookingController,
  updatePaymentStatusController,
} from "../controllers/groundBooking.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

// Player
router.post("/", verifyToken, createBookingController);
router.get("/my", verifyToken, getMyBookingsController);
router.patch("/:bookingId/cancel", verifyToken, cancelBookingController);

// Ground Owner
router.get(
  "/ground/:groundId",
  verifyToken,
  getGroundBookingsController
);

router.patch(
  "/:bookingId/approve",
  verifyToken,
  approveBookingController
);

router.patch(
  "/:bookingId/reject",
  verifyToken,
  rejectBookingController
);

// Booking Completion
router.patch(
  "/:bookingId/complete",
  verifyToken,
  completeBookingController
);

// Payment
router.patch(
  "/:bookingId/payment",
  verifyToken,
  updatePaymentStatusController
);

export default router;