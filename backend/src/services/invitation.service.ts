import Invitation from "../models/invitation";
import Team from "../models/teamregister";
import Notification from "../models/notification";
import joinrequest from "../models/joinrequest";

export const getMyInvitations = async (playerId: string) => {
  const invitations = await Invitation.find({
    player: playerId,
    status: "pending",
  })
    .populate("team")
    .populate("invitedBy", "fullname profilePhoto sport province location");

  return {
    success: true,
    message: "Invitations fetched successfully.",
    invitations,
  };
};

export const getTeamInvitations = async (ownerId: string) => {
  const invitations = await Invitation.find({
    invitedBy: ownerId,
    status: "pending",
  })
    .populate("player", "fullname profilePhoto")
    .populate("team", "teamName teamLogo");

  return {
    success: true,
    invitations,
  };
};

export const acceptInvitation = async (
  invitationId: string,
  playerId: string
) => {
  const invitation = await Invitation.findById(invitationId);
  if (!invitation) {
    throw new Error("Invitation not found.");
  }
  if (invitation.player.toString() !== playerId) {
    throw new Error("Unauthorized.");
  }
  if (invitation.status !== "pending") {
    throw new Error("Invitation already processed.");
  }

 
  const team = await Team.findById(invitation.team);
  if (!team) {
    throw new Error("Team not found.");
  }
   const existingRequest = await joinrequest.findOne({
    player: playerId,
    team: team._id,
    status: "pending",
  });

  if (existingRequest) {
    await existingRequest.updateOne({
      status: "cancelled",
    });
  }
  if (team.owner.toString() === playerId) {
    throw new Error("Owner cannot join their own team.");
  }
  if (team.members.length >= team.maxPlayers) {
    throw new Error("Team is full.");
  }
  if (team.members.some(member => member.toString() === playerId)) {
    throw new Error("You are already a member.");
  }
  invitation.status = "accepted";
  team.members.push(playerId as any);
  await team.save();
  await invitation.save();

  // Reject all other pending invitations
  await Invitation.updateMany(
    {
      player: playerId,
      status: "pending",
      _id: { $ne: invitation._id },
    },
    {
      status: "rejected",
    }
  );

  // Cancel all pending join requests
  await joinrequest.updateMany(
    {
      player: playerId,
      status: "pending",
    },
    {
      status: "cancelled",
    }
  );

  await Notification.create({
    receiver: invitation.invitedBy,
    sender: playerId,
    type: "INVITATION_ACCEPTED",
    title: "Invitation Accepted",
    message: `${team.teamName} invitation accepted.`,
    team: team._id,
  });

  return {
    success: true,
    message: "Invitation accepted successfully.",
  };
};

export const rejectInvitation = async (
  invitationId: string,
  playerId: string
) => {

  const invitation = await Invitation.findById(invitationId);
  if (!invitation) {
    throw new Error("Invitation not found.");
  }
  if (invitation.player.toString() !== playerId) {
    throw new Error("Unauthorized.");
  }
  if (invitation.status !== "pending") {
    throw new Error("Invitation already processed.");
  }
  invitation.status = "rejected";
  await invitation.save();

  const team = await Team.findById(invitation.team);
  if (!team) {
    throw new Error("Team not found.");
  }

  await Notification.create({
    receiver: invitation.invitedBy,
    sender: playerId,
    type: "INVITATION_REJECTED",
    title: "Invitation Rejected",
    message: `${team?.teamName} invitation rejected.`,
    team: team?._id,
  });
  return {
    success: true,
    message: "Invitation rejected successfully.",
  };
};


export const cancelInvitation = async (
  invitationId: string,
  ownerId: string
) => {
  const invitation = await Invitation.findById(invitationId);
  if (!invitation) {
    throw new Error("Invitation not found.");
  }
  const team = await Team.findById(invitation.team);
  if (!team) {
    throw new Error("Team not found.");
  }
  if (team.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }
  if (invitation.status !== "pending") {
    throw new Error("Invitation already processed.");
  }

  invitation.status = "cancelled";
  await invitation.save();

  await Notification.create({
    receiver: invitation.player,
    sender: ownerId,
    type: "INVITATION_CANCELLED",
    title: "Invitation Cancelled",
    message: `${team.teamName} cancelled your invitation.`,
    team: team._id,
  });
  return {
    success: true,
    message: "Invitation cancelled successfully.",
  };
};