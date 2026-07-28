import {Router } from "express";
import { getAllSportEvents,getSportOnlyEvents } from "../controllers/sportevents.controller";

const router = Router();
 router.get("/:sport/events",getAllSportEvents);

 router.get("/:sport/events/specific",getSportOnlyEvents);

 export default router;