import { Router } from "express";
import { getMyTeams,register ,getTeamById,
   updateTeam,deleteTeam,sendJoinRequest,getPendingRequest,transferOwnership,invitePlayer,acceptJoinRequest, rejectJoinRequest,leaveTeam,removePlayer,searchTeams , cancelJoinRequest} from "../controllers/team.controller";
import upload from "../middleware/multer";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post(//post:नयाँ data create गर्ने
  "/register",
  verifyToken,
  upload.single("teamLogo"),
  register
);

router.post("/my-teams",
  verifyToken,
  getMyTeams
);

router.get("/:id",//get:Data ल्याउने
  verifyToken,
  getTeamById,
)
router.put("/:id",//put:पूरा resource update गर्ने
verifyToken,
upload.single("teamLogo"),
updateTeam,
);

router.delete("/:id",//delete:Delete गर्ने
verifyToken,
deleteTeam,
);

router.post("/:id/join",
  verifyToken,
  sendJoinRequest,
)

router.get("/:id/request",
  verifyToken,
  getPendingRequest,
);


router.patch("/requests/requestId/accept",//patch:Accept/Reject join request
verifyToken,
acceptJoinRequest,
)


router.patch(
  "/requests/:requestId/reject",
  verifyToken,
  rejectJoinRequest
);


router.patch("/:id/leave",
  verifyToken,
  leaveTeam,
)

router.patch("/:team/remove-member/:playerId",
verifyToken,
removePlayer,
)

router.delete(
  "/:teamId/cancel-request",
  verifyToken,
  cancelJoinRequest,
);

router.patch("/:teamId/transfer/:memberId",
verifyToken,
transferOwnership,
)
router.get(
  "/search",
  verifyToken,
  searchTeams
);

router.post("/:teamId/invite/:playerId",
  verifyToken,
  invitePlayer,
);

export default router;