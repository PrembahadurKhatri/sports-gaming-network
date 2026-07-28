import TeamStats from "../models/teamstats";

interface TeamMatchStats {
  isWinner: boolean;
  isDraw: boolean;

  goalsScored?: number;
  goalsConceded?: number;

  shots?: number;
  shotsOnTarget?: number;
  corners?: number;
  offsides?: number;
  fouls?: number;

  yellowCards?: number;
  redCards?: number;

  cleanSheet?: boolean;

  runsScored?: number;
  runsConceded?: number;
  oversFaced?: number;
  oversBowled?: number;
  wicketsTaken?: number;
  wicketsLost?: number;
  boundaries?: number;
  sixes?: number;

  pointsScored?: number;
  pointsConceded?: number;
  rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;

  raidPoints?: number;
  tacklePoints?: number;

  setsWon?: number;
  setsLost?: number;

  gamesWon?: number;
  gamesLost?: number;
}
const calculateWinRate = (
  wins: number,
  matchesPlayed: number
): number => {
  if (matchesPlayed === 0) return 0;

  return Number(
    ((wins / matchesPlayed) * 100).toFixed(2)
  );
};

const calculateNetRunRate = (
  runsScored: number,
  oversFaced: number,
  runsConceded: number,
  oversBowled: number
): number => {
  if (oversFaced === 0 || oversBowled === 0) {
    return 0;
  }

  return Number(
    (
      runsScored / oversFaced -
      runsConceded / oversBowled
    ).toFixed(2)
  );
};
export const createOrGetTeamStat = async (
  teamId: string,
  sport: string
) => {
  let stat = await TeamStats.findOne({
    team: teamId,
    sport,
  });

  if (!stat) {
    stat = await TeamStats.create({
      team: teamId,
      sport,
    });
  }

  return stat;
};
export const getTeamStats = async (
  teamId: string
) => {
  return TeamStats.find({
    team: teamId,
  });
};

export const getTeamStatsBySport = async (
  teamId: string,
  sport: string
) => {
  return TeamStats.findOne({
    team: teamId,
    sport,
  });
};

export const deleteTeamStat = async (
  id: string
) => {
  const stat = await TeamStats.findByIdAndDelete(id);

  if (!stat) {
    throw new Error("Team stat not found.");
  }

  return true;
};

export const updateFootballTeamStats = async (
  teamId: string,
  match: any,
  stats: TeamMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetTeamStat(
    teamId,
    "Football"
  );

  team.matchesPlayed++;

  if (stats.isWinner) {
    team.wins++;
  } else if (stats.isDraw) {
    team.draws++;
  } else {
    team.losses++;
  }

  team.goalsScored += stats.goalsScored ?? 0;
  team.goalsConceded += stats.goalsConceded ?? 0;

  team.goalDifference =
    team.goalsScored - team.goalsConceded;

  team.shots += stats.shots ?? 0;
  team.shotsOnTarget += stats.shotsOnTarget ?? 0;
  team.corners += stats.corners ?? 0;
  team.offsides += stats.offsides ?? 0;
  team.fouls += stats.fouls ?? 0;

  team.yellowCards += stats.yellowCards ?? 0;
  team.redCards += stats.redCards ?? 0;
team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);
  if (stats.cleanSheet) {
    team.cleanSheets++;
  }

  await team.save();
};

export const updateCricketTeamStats = async (
  teamId: string,
  match: any,
  stats: TeamMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetTeamStat(
    teamId,
    "Cricket"
  );

  team.matchesPlayed++;

  if (stats.isWinner) {
    team.wins++;
  } else if (stats.isDraw) {
    team.draws++;
  } else {
    team.losses++;
  }

  team.runsScored += stats.runsScored ?? 0;
  team.oversFaced += stats.oversFaced ?? 0;
  team.wicketsLost += stats.wicketsLost ?? 0;
  team.boundaries += stats.boundaries ?? 0;
  team.sixes += stats.sixes ?? 0;

  team.runsConceded += stats.runsConceded ?? 0;
  team.oversBowled += stats.oversBowled ?? 0;
  team.wicketsTaken += stats.wicketsTaken ?? 0;
  team.netRunRate = calculateNetRunRate(
  team.runsScored,
  team.oversFaced,
  team.runsConceded,
  team.oversBowled
);
team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);
  await team.save();
};


export const updateBasketballTeamStats = async (
  teamId: string,
  match: any,
  stats: TeamMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetTeamStat(
    teamId,
    "Basketball"
  );

  team.matchesPlayed++;

  if (stats.isWinner) {
    team.wins++;
  } else if (stats.isDraw) {
    team.draws++;
  } else {
    team.losses++;
  }
  team.pointsScored += stats.pointsScored ?? 0;
  team.pointsConceded += stats.pointsConceded ?? 0;

  team.rebounds += stats.rebounds ?? 0;
  team.assists += stats.assists ?? 0;
  team.steals += stats.steals ?? 0;
  team.blocks += stats.blocks ?? 0;

  team.pointsdifference =
    team.pointsScored - team.pointsConceded;
team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);
  await team.save();
};

export const updateVolleyballTeamStats = async (
  teamId: string,
  match: any,
  stats: TeamMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetTeamStat(
    teamId,
    "Volleyball"
  );

  team.matchesPlayed++;

  if (stats.isWinner) {
    team.wins++;
  } else if (stats.isDraw) {
    team.draws++;
  } else {
    team.losses++;
  }
  team.setsWon += stats.setsWon ?? 0;
  team.setsLost += stats.setsLost ?? 0;


  team.blocks += stats.blocks ?? 0;

  team.setsdifference =
    team.setsWon - team.setsLost;
team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);
  await team.save();
};


export const updateBadmintonTeamStats = async (
  teamId: string,
  match: any,
  stats: TeamMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetTeamStat(
    teamId,
    "Badminton"
  );

  team.matchesPlayed++;

  if (stats.isWinner) {
    team.wins++;
  } else if (stats.isDraw) {
    team.draws++;
  } else {
    team.losses++;
  }
 team.gamesWon += stats.gamesWon ?? 0;
team.gamesLost += stats.gamesLost ?? 0;

team.setsWon += stats.setsWon ?? 0;
team.setsLost += stats.setsLost ?? 0;

team.setsdifference =
  team.setsWon - team.setsLost;
  team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);
  await team.save();
};


export const updateTennisTeamStats = async (
  teamId: string,
  match: any,
  stats: TeamMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetTeamStat(
    teamId,
    "Tennis"
  );

  team.matchesPlayed++;

  if (stats.isWinner) {
    team.wins++;
  } else if (stats.isDraw) {
    team.draws++;
  } else {
    team.losses++;
  }
team.gamesWon += stats.gamesWon ?? 0;
team.gamesLost += stats.gamesLost ?? 0;

team.setsWon += stats.setsWon ?? 0;
team.setsLost += stats.setsLost ?? 0;

team.setsdifference =
  team.setsWon - team.setsLost;
  team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);
  await team.save();
};



export const updateKabaddiTeamStats = async (
  teamId: string,
  match: any,
  stats: TeamMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetTeamStat(
    teamId,
    "Kabaddi"
  );

  team.matchesPlayed++;

  if (stats.isWinner) {
    team.wins++;
  } else if (stats.isDraw) {
    team.draws++;
  } else {
    team.losses++;
  }
team.raidPoints += stats.raidPoints ?? 0;
team.tacklePoints += stats.tacklePoints ?? 0;
  await team.save();
};


export const updateHockeyTeamStats = async (
  teamId: string,
  match: any,
  stats: TeamMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetTeamStat(
    teamId,
    "Hockey"
  );

  team.matchesPlayed++;

  if (stats.isWinner) {
    team.wins++;
  } else if (stats.isDraw) {
    team.draws++;
  } else {
    team.losses++;
  }
team.goalsScored += stats.goalsScored ?? 0;
team.goalsConceded += stats.goalsConceded ?? 0;

team.goalDifference =
  team.goalsScored - team.goalsConceded;

  team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);
  await team.save();
};


export const updateHandballTeamStats = async (
  teamId: string,
  match: any,
  stats: TeamMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetTeamStat(
    teamId,
    "Handball"
  );

  team.matchesPlayed++;

  if (stats.isWinner) {
    team.wins++;
  } else if (stats.isDraw) {
    team.draws++;
  } else {
    team.losses++;
  }
team.goalsScored += stats.goalsScored ?? 0;
team.goalsConceded += stats.goalsConceded ?? 0;

team.goalDifference =
  team.goalsScored - team.goalsConceded;

  team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);
  await team.save();
};

export const updateFutsalTeamStats = async (
  teamId: string,
  match: any,
  stats: TeamMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetTeamStat(
    teamId,
    "Futsal"
  );

  team.matchesPlayed++;

  if (stats.isWinner) {
    team.wins++;
  } else if (stats.isDraw) {
    team.draws++;
  } else {
    team.losses++;
  }
team.goalsScored += stats.goalsScored ?? 0;
team.goalsConceded += stats.goalsConceded ?? 0;

team.goalDifference =
  team.goalsScored - team.goalsConceded;

team.shots += stats.shots ?? 0;
team.shotsOnTarget += stats.shotsOnTarget ?? 0;
team.fouls += stats.fouls ?? 0;

team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);

  await team.save();
};