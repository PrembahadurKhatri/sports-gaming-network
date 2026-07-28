// src/routes/ground.routes.ts

import { Router } from "express";
import upload from "../middleware/multer";
import { verifyToken } from "../middleware/verifyToken";

import {
  createGroundController,
  getAllGroundsController,
  getGroundByIdController,
  getMyGroundsController,
  searchGroundsController,
  updateGroundController,
  deleteGroundController,
  updateGroundStatusController,
  getNearbyGroundsController,
} from "../controllers/ground.controller";

const router = Router();

// Create Ground
router.post(
  "/",
  verifyToken,
  upload.array("images", 10),
  createGroundController
);

// Get All Grounds
router.get(
  "/",
  getAllGroundsController
);

// Search Grounds
router.get(
  "/search",
  searchGroundsController
);

// Nearby Grounds
router.get(
  "/nearby",
  getNearbyGroundsController
);

// My Grounds
router.get(
  "/my",
  verifyToken,
  getMyGroundsController
);

// Get Ground By Id
router.get(
  "/:id",
  getGroundByIdController
);

// Update Ground
router.put(
  "/:id",
  verifyToken,
  upload.array("images", 10),
  updateGroundController
);

// Update Ground Status
router.patch(
  "/:id/status",
  verifyToken,
  updateGroundStatusController
);

// Delete Ground
router.delete(
  "/:id",
  verifyToken,
  deleteGroundController
);

export default router;