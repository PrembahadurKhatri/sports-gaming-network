import { Router } from "express";
import {
  createMvpController,
  getAllMvpsController,
  getMvpByIdController,
  getPlayerMVPsController,
  getMatchMVPController,
  getTournamentMVPsController,
  getSeasonMVPsController,
  deleteMVPController,
} from "../controllers/mvp.controller";

import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/", verifyToken, createMvpController);

router.get("/", getAllMvpsController);

router.get("/season", getSeasonMVPsController);

router.get("/player/:playerId", getPlayerMVPsController);

router.get("/match/:matchId", getMatchMVPController);

router.get(
  "/tournament/:tournamentId",
  getTournamentMVPsController
);

router.get("/:id", getMvpByIdController);

router.delete("/:id", verifyToken, deleteMVPController);

export default router;