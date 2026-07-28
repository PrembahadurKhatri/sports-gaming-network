import { Router } from "express";
import {
  getTournamentStandingsController,
  getStandingByTeamController,
  deleteStandingController,
} from "./../controllers/tournamentstanding.controllert"
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

// Get tournament standings
router.get(
  "/:tournamentId",
  getTournamentStandingsController
);

// Get a team's standing in a tournament
router.get(
  "/:tournamentId/team/:teamId",
  getStandingByTeamController
);

// Delete standing
router.delete(
  "/:id",
  verifyToken,
  deleteStandingController
);

export default router;