/*
✅ Team Service
Does it do all of these?
Check duplicate team name
Upload logo to Cloudinary
Calculate maxPlayers
Create Team document
Set owner
Add owner to members
Save to MongoDB
Return success response
*/
import Team from "../models/teamregister";
import joinrequest from "../models/joinrequest";
import Invitation from "../models/invitation";
import { cloudinaryUpload } from "../utils/cloudinaryupload";
import Notification from "../models/notification";

const SPORT_MAX_PLAYERS: Record<string, number> = {
  Cricket: 15,
  Football: 23,
  Futsal: 12,
  Basketball: 15,
  Volleyball: 12,
  Handball: 16,
  Hockey: 18,
  Kabaddi: 12,
  Badminton: 6,
  Tennis: 4,
};

export const registerTeam = async (
  teamData: any,
  file: any,
  ownerId: string
) => {
  // Check if team name already exists
  const existingTeam = await Team.findOne({
  teamName: {
    $regex: `^${teamData.teamName}$`,
    $options: "i",
  },
});
  if (existingTeam) {
    throw new Error("Team name already exists.");
  }

  // Team logo is required
  if (!file) {
    throw new Error("Team logo is required.");
  }

  // Upload logo to Cloudinary
  const uploadResult = await cloudinaryUpload(file.buffer);
  teamData.teamLogo = uploadResult.secure_url;

  // Calculate max players
  const maxPlayers = SPORT_MAX_PLAYERS[teamData.sport];

  if (!maxPlayers) {
    throw new Error("Invalid sport selected.");
  }

  // Convert JSON strings coming from FormData
  if (teamData.requiredPositions) {
    teamData.requiredPositions = JSON.parse(teamData.requiredPositions);
  }

  if (teamData.customQuestions) {
    teamData.customQuestions = JSON.parse(teamData.customQuestions);
  }

  if (teamData.autoAccept !== undefined) {
    teamData.autoAccept = teamData.autoAccept === "true";
  }

  if (teamData.tournamentExperience !== undefined) {
    teamData.tournamentExperience =
      teamData.tournamentExperience === "true";
  }

  // Create team
  const newTeam = new Team({
    ...teamData,
    maxPlayers,
    owner: ownerId,
    members: [ownerId],
  });

  const savedTeam = await newTeam.save();

  return {
    success: true,
    message: "Team registered successfully.",
    team: savedTeam,
  };
};

export const getMyTeams = async (ownerId: string) => {

  const teams = await Team.find({ owner: ownerId })//"Find all teams where owner = logged in user's id"
    .populate("owner", "fullname email profilePhoto")
    .populate("members", "fullname  profilePhoto skillLevel position");

  return {
    success: true,
    message: "Team fetched successfully.",
    teams,
  }
}

export const getTeamById = async (teamId: string) => {
  const team = await Team.findById(teamId)
    .populate("owner", "fullname email profilephoto")
    .populate("members", "fullname profilePhoto skillLevel position");
  if (!team) {
    throw new Error("Team not found.");
  }
  return {
    success: true,
    message: "Team fetched successfully.",
    team,
  };
}

export const updateTeam = async (
  teamId: string,
  ownerId: string,
  teamData: any,
  file: any
) => {
  const team = await Team.findById(teamId);

  if (!team) {
    throw new Error("Team not found.");
  }

  // Owner check
  if (team.owner.toString() !== ownerId) {
    throw new Error("You are not authorized to update this team.");
  }

  // Upload new logo
  if (file) {
    const uploadResult = await cloudinaryUpload(file.buffer);
    team.teamLogo = uploadResult.secure_url;
  }

  // Check duplicate team name
  if (teamData.teamName) {
    const existingTeam = await Team.findOne({
      teamName: {
        $regex: `^${teamData.teamName}$`,
        $options: "i",
      },
      _id: { $ne: teamId },
    });

    if (existingTeam) {
      throw new Error("Team name already exists.");
    }

    team.teamName = teamData.teamName;
  }

  // Update sport & max players
  if (teamData.sport) {
    if (!SPORT_MAX_PLAYERS[teamData.sport]) {
      throw new Error("Invalid sport.");
    }

    team.sport = teamData.sport;
    team.maxPlayers = SPORT_MAX_PLAYERS[teamData.sport];
  }

  // Basic fields
  team.teamType = teamData.teamType || team.teamType;
  team.province = teamData.province || team.province;
  team.location = teamData.location || team.location;
  team.homeGround = teamData.homeGround || team.homeGround;
  team.contactNumber = teamData.contactNumber || team.contactNumber;
  team.teamEmail = teamData.teamEmail || team.teamEmail;
  team.description = teamData.description || team.description;
  team.skillLevel = teamData.skillLevel || team.skillLevel;
  team.provincePreference =
    teamData.provincePreference || team.provincePreference;

  // Numbers
  if (teamData.minAge !== undefined) {
    team.minAge = Number(teamData.minAge);
  }

  if (teamData.maxAge !== undefined) {
    team.maxAge = Number(teamData.maxAge);
  }

  if (teamData.foundedYear !== undefined) {
    team.foundedYear = Number(teamData.foundedYear);
  }

  // Boolean
  if (teamData.autoAccept !== undefined) {
    team.autoAccept =
      teamData.autoAccept === true ||
      teamData.autoAccept === "true";
  }

  if (teamData.tournamentExperience !== undefined) {
    team.tournamentExperience =
      teamData.tournamentExperience === true ||
      teamData.tournamentExperience === "true";
  }

  // Arrays
  if (teamData.requiredPositions !== undefined) {
    team.requiredPositions =
      typeof teamData.requiredPositions === "string"
        ? JSON.parse(teamData.requiredPositions)
        : teamData.requiredPositions;
  }

  if (teamData.customQuestions !== undefined) {
    team.customQuestions =
      typeof teamData.customQuestions === "string"
        ? JSON.parse(teamData.customQuestions)
        : teamData.customQuestions;
  }

  await team.save();

  return {
    success: true,
    message: "Team updated successfully.",
    team,
  };
};
export const deleteTeam = async (ownerId: string, teamId: string) => {

  const team = await Team.findById(teamId);
  if (!team) {
    throw new Error("Team not found!");
  }
  //Check if logged-in user owns the team
  if (team.owner.toString() !== ownerId) {
    throw new Error("You are not authorized to delete this team.");
  }
  await team.deleteOne();
  return {
    success: true,
    message: "Team deleted successfully.",
  }
}


export const sendJoinRequest = async (
  teamId: string,
  playerId: string,
  requestData: any
) => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw new Error("Team not found!");
  }
  //Existing Request
  if (team.owner.toString() === playerId) {
    throw new Error("You are already the owner of this team.");
  }
  //Already Member 
  if (team.members.some((member) => member.toString() === playerId)) {
    throw new Error("You are already a member of this team.")
  }
  // Pending request already exists
  const existingRequest = await joinrequest.findOne({
    team: teamId,
    player: playerId,
    status: "pending",
  });
  if (existingRequest) {
    throw new Error("Join request already sent.");
  }
  const request = await joinrequest.create({
    team: teamId,
    player: playerId,
    message: requestData.message,
    answers: requestData.answers || [],
  })
  await Notification.create({
  receiver: team.owner,
  sender: playerId,
  type: "JOIN_REQUEST",
  title: "New Join Request",
  message: "A player wants to join your team.",
  team: team._id,
});
  return {
    success: true,
    message: "Join Request sent successfully.",
    request,
  }
}



export const getPendingRequest = async (
  teamId: string,
  ownerId: string,
) => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw new Error("Team not found!");
  }

  // Owner check
  if (team.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  // Pending request already exists
  const Requests = await joinrequest.find({
    team: teamId,
    status: "pending",
  })
    .populate(
      "player", "fullname profilePhoto age gender skillLevel position sport "
    );

  return {
    success: true,
    message: "Pending Requests fetched successfully.",
    Requests,
  }
}


export const acceptJoinRequest = async (
  requestId: string,
  ownerId: string,
) => {
  const request = await joinrequest.findById(requestId);
  if (!request) {
    throw new Error("Request not found!");
  }
  const team = await Team.findById(request.team);

  if (!team) {
    throw new Error("Team not found!");
  }
  // Owner check
  if (team.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  //Already accepted/rejected
  if (request.status !== "pending") {
    throw new Error("Request already processed.")
  }

  if (team.members.length >= team.maxPlayers) {
    throw new Error("Team is full. Remove a member first .")
  }

  if (team.members.some(member => member.toString() === request.player.toString())) {
    throw new Error("Player already joined.")
  }

  request.status = "accepted";

  team.members.push(request.player);

  await team.save();
  await request.save();
  
  await Notification.create({
  receiver: request.player,
  sender: ownerId,
  type: "REQUEST_ACCEPTED",
  title: "Join Request Accepted",
  message: `Your request to join ${team.teamName} has been accepted.`,
  team: team._id,
});
  return {
    success: true,
    message: "Player added successfully.",

  }
}


export const rejectJoinRequest = async (
  requestId: string,
  ownerId: string
) => {

  const request = await joinrequest.findById(requestId);

  if (!request) {
    throw new Error("Request not found.");
  }

  const team = await Team.findById(request.team);

  if (!team) {
    throw new Error("Team not found.");
  }

  if (team.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  if (request.status !== "pending") {
    throw new Error("Request already processed.");
  }

  request.status = "rejected";

  await request.save();
  await Notification.create({
  receiver: request.player,
  sender: ownerId,
  type: "REQUEST_REJECTED",
  title: "Join Request Rejected",
  message: `Your request to join ${team.teamName} has been rejected.`,
  team: team._id,
});
  return {
    success: true,
    message: "Request rejected successfully.",
  };

};



export const leaveTeam = async (
  playerId: string,
  teamId: string
) => {

  const team = await Team.findById(teamId);

  if (!team) {
    throw new Error("Team not found.");
  }

  if (team.owner.toString() == playerId) {
    throw new Error("Owner cannot leave the team,Transfer ownership or delete team.");
  }

  if (!team.members.some((member) => member.toString() === playerId)) {
    throw new Error("You are not member of this team.");
  }

  //leave part
  team.members = team.members.filter((member) =>
    member.toString() !== playerId);


  await team.save();

  return {
    success: true,
    message: "You left the team successfully.",
  };

};


export const removePlayer = async (
  playerId: string,
  teamId: string,
  ownerId: string
) => {

  const team = await Team.findById(teamId);

  if (!team) {
    throw new Error("Team not found.");
  }

  if (team.owner.toString() !== ownerId) {
    throw new Error("Unauthorized,You are not permitted to do any change .")
  }

  if (ownerId === playerId) {
    throw new Error("Owner cannot remove themselves.")
  }

  if (!team.members.some((member) => member.toString() === playerId)) {
    throw new Error("You are not member of this team.");
  }

  //remove part
  team.members = team.members.filter((member) =>
    member.toString() !== playerId);

  await team.save();

  return {
    success: true,
    message: "Player remove from  team successfully.",
  };
};

export const cancelJoinRequest = async (
  teamId: string,
  playerId: string
) => {

  const request = await joinrequest.findOne({
    team: teamId,
    player: playerId,
    status: "pending",
  });

  if (!request) {
    throw new Error("No pending join request found.");
  }

  // Change status instead of deleting
  request.status = "cancelled";

  await request.save();

  return {
    success: true,
    message: "Join request cancelled successfully.",
  };
};

export const transferOwnership = async (
  teamId: string,
  ownerId: string,
  newownerId: string
) => {

  const team = await Team.findById(teamId);

  if (!team) {
    throw new Error("No Team found.");
  }
  if (team.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.")
  }

  if (ownerId === newownerId) {
    throw new Error("You are already owner.")
  }

  const isMember = team.members.some
    (member => member.toString() === newownerId);

    if(!isMember){
      throw new Error("Selected player is not team member.")
    }

    team.owner = newownerId as any;

  await team.save();

  return {
    success: true,
    message: "Owner transferred successfully.",
  };
};

export const searchTeams = async (query: any) => {
  const filter: any = {};

  if (query.teamName) {
    filter.teamName = {
      $regex: query.teamName,
      $options: "i",
    };
  }

  if (query.sport) {
    filter.sport = query.sport;
  }

  if (query.province) {
    filter.province = query.province;
  }

  if (query.skillLevel) {
    filter.skillLevel = query.skillLevel;
  }

  if (query.teamType) {
    filter.teamType = query.teamType;
  }

  const teams = await Team.find(filter)
    .populate("owner", "fullname profilePhoto");

  const result = teams.map((team) => {
    if (team.teamType === "Private") {
      return {
        _id: team._id,
        teamName: team.teamName,
        sport: team.sport,
        teamType: team.teamType,
        teamLogo: team.teamLogo,
        owner: team.owner,
      };
    }

    // Public Team
    return {
      _id: team._id,
      teamName: team.teamName,
      sport: team.sport,
      teamType: team.teamType,
      province: team.province,
      location: team.location,
      description: team.description,
      teamLogo: team.teamLogo,
      memberCount: team.members.length,
      maxPlayers: team.maxPlayers,
      owner: team.owner,
    };
  });

  return {
    success: true,
    total: result.length,
    teams: result,
  };
};

export const checkTeamName = async (teamName: string) => {
  if (!teamName || !teamName.trim()) {
    throw new Error("Team name is required.");
  }

  const existing = await Team.findOne({
    teamName: { $regex: `^${teamName.trim()}$`, $options: "i" },
  });

  return {
    success: true,
    available: !existing,
    message: existing ? "Team name already taken." : "Team name is available.",
  };
};

export const invitePlayer = async (
  teamId: string,
  playerId: string,
  ownerId:string
) => {

  const team = await Team.findById(teamId);

  if (!team) {
    throw new Error("No team found.");
  }
   if(team.owner.toString() !== ownerId){
    throw new Error("Unauthorized.")
   }
   if(team.members.some(member=>member.toString() === playerId)){
    throw new Error("Player is already a team member.")
   }

   const existingInvite = await Invitation.findOne({
    team:teamId,
    player:playerId,
    status:"pending"
   });

   if(existingInvite){
    throw new Error("Invitation is already sent.");
   }

  const invite = await Invitation.create({
    team: teamId,
    player: playerId,
    invitedBy: ownerId,
  });

  await Notification.create({
    receiver: playerId,
    sender: ownerId,
    type: "TEAM_INVITE",
    title: "Team Invitation",
    message: `${team.teamName} invited you to join.`,
    team: team._id,
  });
  
  return {
    success: true,
    message: "Invitation sent successfully.",
    invite,
  };
};

