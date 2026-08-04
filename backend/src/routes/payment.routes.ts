import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";

import {
  createPaymentController,
  getMyPaymentsController,
  getPaymentByPidxController,
  verifyPaymentController,
  failPaymentController,
} from "../controllers/payment.controller";

const router = Router();

router.post(
  "/create",
  verifyToken,
  createPaymentController
);

router.get(
  "/my-payments",
  verifyToken,
  getMyPaymentsController
);

router.get(
  "/:pidx",
  verifyToken,
  getPaymentByPidxController
);

router.patch(
  "/verify",
  verifyPaymentController
);

router.patch(
  "/fail",
  failPaymentController
);

export default router;