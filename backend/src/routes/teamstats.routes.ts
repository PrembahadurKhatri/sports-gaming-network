import { Router } from "express";
import {
  getTeamStatsController,
  getTeamStatsBySportController,
  deleteTeamStatController,
} from "../controllers/teamstats.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();


router.get(
  "/:teamId",
  verifyToken,
  getTeamStatsController
);


router.get(
  "/:teamId/:sport",
  verifyToken,
  getTeamStatsBySportController
);


router.delete(
  "/:id",
  verifyToken,
  deleteTeamStatController
);

export default router;