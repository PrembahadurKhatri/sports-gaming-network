import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";

import {
    addMatchEvent,
    getMatchTimeline,
    updateMatchEvent,
    deleteMatchEvent,
} from "./../controllers/matchevent.controller";

const router = Router();

router.post(
    "/:matchId/events",
    verifyToken,
    addMatchEvent
);

router.get(
    "/:matchId/events",
    verifyToken,
    getMatchTimeline
);

router.patch(
    "/events/:eventId",
    verifyToken,
    updateMatchEvent
);

router.delete(
    "/events/:eventId",
    verifyToken,
    deleteMatchEvent
);

export default router;

