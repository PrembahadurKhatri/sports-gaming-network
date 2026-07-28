import Match from "../models/match"
import Team from "../models/teamregister";
import Notification from "../models/notification";

export const createMatch = async (
  ownerId: string,
  data: any
) => {
  const {teamA,teamB,sport,venue,matchDate,startTime,notes,
  } = data;

  const myTeam = await Team.findById(teamA);

  if (!myTeam) {
    throw new Error("Team not found.");
  }

  if (myTeam.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  const opponent = await Team.findById(teamB);

  if (!opponent) {
    throw new Error("Opponent team not found.");
  }

  if (teamA === teamB) {
    throw new Error("Cannot challenge your own team.");
  }

  const match = await Match.create({
    teamA,
    teamB,
    challengedBy: ownerId,
    sport,
    venue,
    matchDate,
    startTime,
    notes,
  });

  await Notification.create({
    receiver: opponent.owner,
    sender: ownerId,
    type: "MATCH_REQUEST",
    title: "New Match Challenge",
    message: `${myTeam.teamName} challenged your team.`,
  });

  return {
    success: true,
    message: "Match challenge sent successfully.",
    match,
  };
};

export const getMyMatches = async (userId: string) => {
  const teams = await Team.find({
    members: userId,
  });

  const ids = teams.map((t) => t._id);

  const matches = await Match.find({
    $or: [
      { teamA: { $in: ids } },
      { teamB: { $in: ids } },
    ],
  })
    .populate("teamA", "teamName teamLogo")
    .populate("teamB", "teamName teamLogo")
    .sort({ createdAt: -1 });

  return {
    success: true,
    matches,
  };
};

export const getMatchById = async (
  matchId: string
) => {
  const match = await Match.findById(matchId)
    .populate("teamA")
    .populate("teamB")
    .populate("winner");

  if (!match) {
    throw new Error("Match not found.");
  }

  return {
    success: true,
    match,
  };
};

export const acceptMatch = async (
  matchId: string,
  ownerId: string
) => {
  const match = await Match.findById(matchId);

  if (!match) {
    throw new Error("Match not found.");
  }

  const team = await Team.findById(match.teamB);

  if (!team) {
    throw new Error("Team not found.");
  }

  if (team.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  if (match.status !== "pending") {
    throw new Error("Match already processed.");
  }

  match.status = "accepted";

  await match.save();

  await Notification.create({
    receiver: match.challengedBy,
    sender: ownerId,
    type: "MATCH_ACCEPTED",
    title: "Match Accepted",
    message: `${team.teamName} accepted your challenge.`,
  });

  return {
    success: true,
    message: "Match accepted successfully.",
  };
};

export const rejectMatch = async (
  matchId: string,
  ownerId: string
) => {
  const match = await Match.findById(matchId);

  if (!match) {
    throw new Error("Match not found.");
  }

  const team = await Team.findById(match.teamB);

  if (!team) {
    throw new Error("Team not found.");
  }

  if (team.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  if (match.status !== "pending") {
    throw new Error("Match already processed.");
  }

  match.status = "rejected";

  await match.save();

  await Notification.create({
    receiver: match.challengedBy,
    sender: ownerId,
    type: "MATCH_REJECTED",
    title: "Match Rejected",
    message: `${team.teamName} rejected your challenge.`,
  });

  return {
    success: true,
    message: "Match rejected successfully.",
  };
};

export const startMatch = async (
  matchId: string,
  ownerId: string
) => {
  const match = await Match.findById(matchId);

  if (!match) {
    throw new Error("Match not found.");
  }

  const team = await Team.findOne({
    owner: ownerId,
    _id: { $in: [match.teamA, match.teamB] },
  });

  if (!team) {
    throw new Error("Unauthorized.");
  }

  if (match.status !== "accepted") {
    throw new Error("Match cannot be started.");
  }

  match.status = "ongoing";

  await match.save();

  return {
    success: true,
    message: "Match started.",
  };
};

export const finishMatch = async (
  matchId: string,
  ownerId: string,
  teamAScore: number,
  teamBScore: number
) => {
  const match = await Match.findById(matchId);

  if (!match) {
    throw new Error("Match not found.");
  }

  const team = await Team.findOne({
    owner: ownerId,
    _id: { $in: [match.teamA, match.teamB] },
  });

  if (!team) {
    throw new Error("Unauthorized.");
  }

  match.teamAScore = teamAScore;
  match.teamBScore = teamBScore;
  match.status = "completed";

  if (teamAScore > teamBScore) {
    match.winner = match.teamA;
  } else if (teamBScore > teamAScore) {
    match.winner = match.teamB;
  }

  await match.save();

  return {
    success: true,
    message: "Match finished successfully.",
  };
};

export const cancelMatch = async (
  matchId: string,
  ownerId: string
) => {
  const match = await Match.findById(matchId);

  if (!match) {
    throw new Error("Match not found.");
  }

  if (match.challengedBy.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  if (match.status !== "pending") {
    throw new Error("Cannot cancel this match.");
  }

  match.status = "cancelled";

  await match.save();

  return {
    success: true,
    message: "Match cancelled successfully.",
  };
};