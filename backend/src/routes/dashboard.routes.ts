import { Router } from "express";
import {   getPlayerDashboard, getTeamDashboard,homeStats} from "./../controllers/dashboard.controller"
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
router.get("/home-stats", 
    verifyToken,
    homeStats);

export default router;