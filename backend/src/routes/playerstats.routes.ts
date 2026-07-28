import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  getPlayerStatsController,
  getPlayerStatsBySportController,
  deletePlayerStatController,
} from "../controllers/playerstats.controller";

const router = Router();

// Get all stats of a player
router.get(
  "/:playerId",
  verifyToken,
  getPlayerStatsController
);

// Get player stats by sport
router.get(
  "/:playerId/:sport",
  verifyToken,
  getPlayerStatsBySportController
);

// Delete player stat
router.delete(
  "/:id",
  verifyToken,
  deletePlayerStatController
);

export default router;