import { Router } from "express";
import {
  leaderboard,
  topPlayers,
  myRanking,
} from "./../controllers/playerramking.controller"
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/me", verifyToken, myRanking);

router.get("/leaderboard/:sport", leaderboard);

router.get("/top/:sport", topPlayers);

export default router;