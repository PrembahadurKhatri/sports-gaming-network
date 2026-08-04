import Invitation from "../models/invitation";
import Team from "../models/teamregister";
import Notification from "../models/notification";
import joinrequest from "../models/joinrequest";
import User from "../models/register";
import Ground from "../models/ground";
import Tournament from "../models/tournament";

export const getHomeStats = async () => {
  const [userCount, groundCount, tournamentCount] = await Promise.all([
    User.countDocuments(),
    Ground.countDocuments(),
    Tournament.countDocuments(),
  ]);

  return {
    success: true,
    stats: {
      userCount,
      groundCount,
      tournamentCount,
    },
  };
};

export const getPlayerDashboard = async (playerId:string) => {

    const user = await User.findById(playerId);
    if(!user){
        throw new Error("User not found .");
    }

    const team = await Team.findOne({
        members:playerId,
    }) 

    const invitation = await Invitation.find({
        player:playerId,
        status:"pending",
    });

    const requests = await joinrequest.find({
        player:playerId,
        status:"pending",
    });

    const notifications = await Notification.find({
        receiver:playerId,
    })
    .sort({createAt : -1})
    .limit(10);
     return {
    success: true,
    dashboard: {
      profile: user,
      team,
      invitation,
      requests,
      notifications,
    },
  };
};


export const getTeamDashboard = async (ownerId: string) => {
  // Find owner's team
  const team = await Team.findOne({ owner: ownerId })
  .populate("teamName","teamLogo owner homeGround location foundedYear")
    .populate("members", "  fullname profilePhoto sport skillLevel province");

  if (!team) {
    throw new Error("Team not found.");
  }

  // Pending join requests
  const joinRequests = await joinrequest.find({
    team: team._id,
    status: "pending",
  }).populate(
    "player",
    "fullname profilePhoto sport skillLevel province"
  );

  // Pending invitations sent by this team
  const invitations = await Invitation.find({
    team: team._id,
    status: "pending",
  }).populate(
    "player",
    "fullname profilePhoto sport skillLevel province"
  );

  // Latest notifications
  const notifications = await Notification.find({
    receiver: ownerId,
  })
    .sort({ createdAt: -1 })
    .limit(10);

  return {
    success: true,
    dashboard: {
      team,
      members: team.members,
      pendingJoinRequests: joinRequests,
      pendingInvitations: invitations,
      notifications,
    },
  };
};