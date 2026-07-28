import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";

import {
  addMatchStat,
  removeMatchStat,
  getMatchStatistics,
  getPlayerStatistics,
  getTeamStatistics,
  getTopPlayers,
  getTopTeams,
  deleteMatchStat,
} from "./../controllers/matchstat.controllet";

const router = Router();

// Add/Increment Stat
router.post(
  "/",
  verifyToken,
  addMatchStat
);

// Remove/Decrement Stat
router.patch(
  "/",
  verifyToken,
  removeMatchStat
);

// Match Statistics
router.get(
  "/match/:matchId",
  verifyToken,
  getMatchStatistics
);

// Player Statistics
router.get(
  "/player/:playerId",
  verifyToken,
  getPlayerStatistics
);

// Team Statistics
router.get(
  "/team/:teamId",
  verifyToken,
  getTeamStatistics
);

// Top Players by Stat
router.get(
  "/top/players/:stat",
  verifyToken,
  getTopPlayers
);

// Top Teams by Stat
router.get(
  "/top/teams/:stat",
  verifyToken,
  getTopTeams
);

// Delete Stat
router.delete(
  "/:statId",
  verifyToken,
  deleteMatchStat
);

export default router;