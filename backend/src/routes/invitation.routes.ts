import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";

import {
  getMyInvitationsController,
  getTeamInvitationsController,
  acceptInvitationController,
  rejectInvitationController,
  cancelInvitationController,
} from "../controllers/invitation.controller";

const router = Router();

// Player
router.get(
  "/invitations",
  verifyToken,
  getMyInvitationsController
);

router.patch(
  "/invitations/:id/accept",
  verifyToken,
  acceptInvitationController
);

router.patch(
  "/invitations/:id/reject",
  verifyToken,
  rejectInvitationController
);

// Team Owner
router.get(
  "/team/invitations",
  verifyToken,
  getTeamInvitationsController
);

router.delete(
  "/invitations/:id",
  verifyToken,
  cancelInvitationController
);

export default router;