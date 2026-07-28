import { Router } from "express";
import {
  getLeaderboardController,
  getTeamRankingController,
  getTopTeamsController,
} from "./../controllers/teamranking.controllet";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

// Leaderboard
router.get(
  "/leaderboard/:sport",
  getLeaderboardController
);

// Single Team Ranking
router.get(
  "/team/:teamId",
  getTeamRankingController
);

// Top Teams
router.get(
  "/top/:sport",
  getTopTeamsController
);

export default router;