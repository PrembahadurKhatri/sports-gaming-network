import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import upload from "../middleware/multer";

import {
  createTournament,
  getAllTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
  registerTeam,
  withdrawTeam,
  startTournament,
  finishTournament,
  getFixtures,
  generateNextRound,
  getTournamentMVPController
} from "../controllers/tournament.controller";

const router = Router();

router.post(
  "/",
  verifyToken,
  upload.single("banner"),
  createTournament
);

router.get(
  "/",
  verifyToken,
  getAllTournaments
);

router.get(
  "/:id",
  verifyToken,
  getTournamentById
);

router.put(
  "/:id",
  verifyToken,
  upload.single("banner"),
  updateTournament
);

router.delete(
  "/:id",
  verifyToken,
  deleteTournament
);

router.post(
  "/:id/register",
  verifyToken,
  registerTeam
);

router.delete(
  "/:id/withdraw",
  verifyToken,
  withdrawTeam
);

router.patch(
  "/:id/start",
  verifyToken,
  startTournament
);

router.patch(
  "/:id/finish",
  verifyToken,
  finishTournament
);

router.get(
  "/:id/fixtures",
  verifyToken,
  getFixtures
);

router.patch(
  "/:id/next-round",
  verifyToken,
  generateNextRound
);
router.get(
  "/:id/mvp",
  verifyToken,
  getTournamentMVPController
);
export default router;