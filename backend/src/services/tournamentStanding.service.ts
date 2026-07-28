import TournamentStanding from "../models/torunamentstanding";

export const createOrGetStanding = async (
  tournamentId: string,
  teamId: string,
  sport: string
) => {
  let standing = await TournamentStanding.findOne({
    tournament: tournamentId,
    team: teamId,
  });

  if (!standing) {
    standing = await TournamentStanding.create({
      tournament: tournamentId,
      team: teamId,
      sport,
    });
  }

  return standing;
};

export const getTournamentStandings = async (
  tournamentId: string
) => {
  return TournamentStanding.find({
    tournament: tournamentId,
  })
    .populate("team", "teamName teamLogo")
    .sort({
      points: -1,
      goalDifference: -1,
      goalsFor: -1,
    });
};

export const deleteStanding = async (
  id: string
) => {
  const standing =
    await TournamentStanding.findByIdAndDelete(id);

  if (!standing) {
    throw new Error("Standing not found.");
  }

  return true;
};

export const recalculateRanks = async (
  tournamentId: string
) => {
  const standings =
    await TournamentStanding.find({
      tournament: tournamentId,
    }).sort({
      points: -1,
      goalDifference: -1,
      goalsFor: -1,
    });

  for (let i = 0; i < standings.length; i++) {
    standings[i].rank = i + 1;
    await standings[i].save();
  }
};
export const getStandingByTeam = async (
  tournamentId: string,
  teamId: string
) => {
  const standing = await TournamentStanding.findOne({
    tournament: tournamentId,
    team: teamId,
  }).populate("team", "teamName teamLogo");

  if (!standing) {
    throw new Error("Standing not found.");
  }

  return standing;
};