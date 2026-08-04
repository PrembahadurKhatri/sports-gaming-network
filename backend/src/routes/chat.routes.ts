import { Router } from "express";
import { chat } from "../controllers/chat.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/", verifyToken, chat);

export default router;