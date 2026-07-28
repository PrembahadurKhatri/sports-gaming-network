import { Router } from "express";
import {   getPlayerDashboard, getTeamDashboard} from "./../controllers/dashboard.controller"
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get(
    "/player",
    verifyToken,
    getPlayerDashboard,
);

router.get(
    "/team",
    verifyToken,
    getTeamDashboard,
);

export default router;