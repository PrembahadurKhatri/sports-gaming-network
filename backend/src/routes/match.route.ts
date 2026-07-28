import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";

import {
  createMatch,
  getMyMatches,
  getMatchById,
  acceptMatch,
  rejectMatch,
  startMatch,
  finishMatch,
  cancelMatch,
} from "../controllers/match.controller";

const router = Router();

// Create Match Challenge
router.post(
  "/",
  verifyToken,
  createMatch,
);

// My Matches
router.get(
  "/",
  verifyToken,
  getMyMatches,
);

// Match Details
router.get(
  "/:id",
  verifyToken,
  getMatchById,
);

// Accept Challenge
router.patch(
  "/:id/accept",
  verifyToken,
  acceptMatch,
);

// Reject Challenge
router.patch(
  "/:id/reject",
  verifyToken,
  rejectMatch,
);

// Start Match
router.patch(
  "/:id/start",
  verifyToken,
  startMatch,
);

// Finish Match
router.patch(
  "/:id/finish",
  verifyToken,
  finishMatch,
);

// Cancel Match
router.delete(
  "/:id",
  verifyToken,
  cancelMatch,
);

export default router;