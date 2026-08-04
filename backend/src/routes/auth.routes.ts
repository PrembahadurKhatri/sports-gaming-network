import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import {
  getProfile,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  searchPlayers,
} from "../controllers/user.controller";
import upload from "../middleware/multer";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/register", upload.single("profilePhoto"), register);

router.post("/login", login);

router.get("/profile", verifyToken, getProfile);

router.get("/players", verifyToken, searchPlayers);

router.get("/:id", verifyToken, getPlayerById);

router.put("/profile", verifyToken, upload.single("profilePhoto"), updatePlayer);

router.delete("/profile", verifyToken, deletePlayer);

export default router;
