import playerstats from "../models/playerstats";

interface PlayerMatchStats {
  isWinner: boolean;
  isDraw: boolean;

  goals?: number;
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
  points?:number;
  assistsBasketball:number;
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

const calculateStrikeRate = (
  runs: number,
  ballsFaced: number
): number => {
  if (ballsFaced === 0) return 0;

  return Number(
    ((runs / ballsFaced) * 100).toFixed(2)
  );
};

const calculateEconomy = (
  runsConceded: number,
  oversBowled: number
): number => {
  if (oversBowled === 0) return 0;

  return Number(
    (runsConceded / oversBowled).toFixed(2)
  );
};

const calculateBattingAverage = (
  runs: number,
  innings: number,
  notOuts: number
): number => {
  const outs = innings - notOuts;

  if (outs <= 0) return runs;

  return Number(
    (runs / outs).toFixed(2)
  );
};

const calculateBowlingAverage = (
  runsConceded: number,
  wickets: number
): number => {
  if (wickets === 0) return 0;

  return Number(
    (runsConceded / wickets).toFixed(2)
  );
};

const calculateCleanSheetRate = (
  cleanSheets: number,
  matchesPlayed: number
): number => {
  if (matchesPlayed === 0) return 0;

  return Number(
    ((cleanSheets / matchesPlayed) * 100).toFixed(2)
  );
};

export const createOrGetPlayerStat = async (
  playerId: string,
  sport: string
) => {
  let stat = await playerstats.findOne({
    player: playerId,
    sport,
  });

  if (!stat) {
    stat = await playerstats.create({
      player: playerId,
      sport,
    });
  }

  return stat;
};
export const getPlayerStats = async (
  playerId: string
) => {
  return playerstats.find({
    player: playerId,
  });
};

export const getPlayerStatsBySport = async (
  playerId: string,
  sport: string
) => {
  return playerstats.findOne({
    player: playerId,
    sport,
  });
};

export const deletePlayerStat = async (
  id: string
) => {
  const stat = await playerstats.findByIdAndDelete(id);

  if (!stat) {
    throw new Error("Team stat not found.");
  }

  return true;
};

export const updateFootballPlayerStats = async (
  playerId: string,
  match: any,
  stats: PlayerMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const player = await createOrGetPlayerStat(
    playerId,
    "Football"
  );

  player.matchesPlayed++;

  if (stats.isWinner) {
    player.wins++;
  } else if (stats.isDraw) {
    player.draws++;
  } else {
    player.losses++;
  }

  player.goals += stats.goals ?? 0;

  player.shots += stats.shots ?? 0;
  player.shotsOnTarget += stats.shotsOnTarget ?? 0;
  player.corners += stats.corners ?? 0;
  player.offsides += stats.offsides ?? 0;
  player.fouls += stats.fouls ?? 0;

  player.yellowCards += stats.yellowCards ?? 0;
  player.redCards += stats.redCards ?? 0;
player.winRate = calculateWinRate(
  player.wins,
  player.matchesPlayed
);
  if (stats.cleanSheet) {
    player.cleanSheets++;
  }

  await player.save();
};

export const updateCricketPlayerStats = async (
  playerId: string,
  match: any,
  stats: PlayerMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const player = await createOrGetPlayerStat(
    playerId,
    "Cricket"
  );

  player.matchesPlayed++;

  if (stats.isWinner) {
    player.wins++;
  } else if (stats.isDraw) {
    player.draws++;
  } else {
    player.losses++;
  }

  player.runs += stats.runsScored ?? 0;
  player.ballsFaced += stats.oversFaced ?? 0;
  player.wickets += stats.wicketsLost ?? 0;
  player.boundaries += stats.boundaries ?? 0;
  player.sixes += stats.sixes ?? 0;

  player.innings++;
  player.runsConceded += stats.runsConceded ?? 0;
   player.oversBowled += stats.oversBowled ?? 0;


  player.strikeRate = calculateStrikeRate(
    player.runs,
    player.ballsFaced
  );

  player.economy = calculateEconomy(
    player.runsConceded,
    player.oversBowled
  );

  player.battingAverage = calculateBattingAverage(
    player.runs,
    player.innings,
    player.notOuts
  );

  player.bowlingAverage = calculateBowlingAverage(
    player.runsConceded,
    player.wickets
  );

  player.winRate = calculateWinRate(
  player.wins,
   player.matchesPlayed
);
  await   player.save();
};


export const updateBasketballPlayerStats = async (
  playerId: string,
  match: any,
  stats: PlayerMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const player = await createOrGetPlayerStat(
    playerId,
    "Basketball"
  );

  player.matchesPlayed++;

  if (stats.isWinner) {
    player.wins++;
  } else if (stats.isDraw) {
    player.draws++;
  } else {
    player.losses++;
  }

  player.points += stats.points ?? 0;
  player.rebounds += stats.rebounds ?? 0;
  player.  assistsBasketball += stats.assistsBasketball ?? 0;//error
  player.steals += stats.steals ?? 0;
  player.blocks += stats.blocks ?? 0;

  player.winRate = calculateWinRate(
    player.wins,
    player.matchesPlayed
  );

  await player.save();
};
export const updateVolleyballPlayerStats = async (
  playerId: string,
  match: any,
  stats: PlayerMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const player = await createOrGetPlayerStat(
    playerId,
    "Volleyball"
  );

  player.matchesPlayed++;

  if (stats.isWinner) {
    player.wins++;
  } else if (stats.isDraw) {
    player.draws++;
  } else {
    player.losses++;
  }
  player.setsWon += stats.setsWon ?? 0;
  player.setsLost += stats.setsLost ?? 0;


  player.blocks += stats.blocks ?? 0;

player.winRate = calculateWinRate(
  player.wins,
  player.matchesPlayed
);
  await player.save();
};


export const updateBadmintonPlayerStats = async (
  playerId: string,
  match: any,
  stats: PlayerMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const player = await createOrGetPlayerStat(
    playerId,
    "Badminton"
  );

  player.matchesPlayed++;

  if (stats.isWinner) {
    player.wins++;
  } else if (stats.isDraw) {
    player.draws++;
  } else {
    player.losses++;
  }
 player.gamesWon += stats.gamesWon ?? 0;
player.gamesLost += stats.gamesLost ?? 0;

player.setsWon += stats.setsWon ?? 0;
player.setsLost += stats.setsLost ?? 0;


  player.winRate = calculateWinRate(
  player.wins,
  player.matchesPlayed
);
  await player.save();
};


export const updateTennisPlayerStats = async (
  playerId: string,
  match: any,
  stats: PlayerMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const player = await createOrGetPlayerStat(
    playerId,
    "Tennis"
  );

  player.matchesPlayed++;

  if (stats.isWinner) {
    player.wins++;
  } else if (stats.isDraw) {
    player.draws++;
  } else {
    player.losses++;
  }
player.gamesWon += stats.gamesWon ?? 0;
player.gamesLost += stats.gamesLost ?? 0;

player.setsWon += stats.setsWon ?? 0;
player.setsLost += stats.setsLost ?? 0;


  player.winRate = calculateWinRate(
  player.wins,
  player.matchesPlayed
);
  await player.save();
};



export const updateKabaddiPlayerStats = async (
  playerId: string,
  match: any,
  stats: PlayerMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const player = await createOrGetPlayerStat(
    playerId,
    "Kabaddi"
  );

  player.matchesPlayed++;

  if (stats.isWinner) {
    player.wins++;
  } else if (stats.isDraw) {
    player.draws++;
  } else {
    player.losses++;
  }
player.raidPoints += stats.raidPoints ?? 0;
player.tacklePoints += stats.tacklePoints ?? 0;
  await player.save();
};


export const updateHockeyPlayerStats = async (
  playerId: string,
  match: any,
  stats: PlayerMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const player = await createOrGetPlayerStat(
    playerId,
    "Hockey"
  );

  player.matchesPlayed++;

  if (stats.isWinner) {
    player.wins++;
  } else if (stats.isDraw) {
    player.draws++;
  } else {
    player.losses++;
  }
player.goals += stats.goals ?? 0;
player.goalsConceded += stats.goalsConceded ?? 0;


  player.winRate = calculateWinRate(
  player.wins,
  player.matchesPlayed
);
  await player.save();
};


export const updateHandballPlayerStats = async (
  teamId: string,
  match: any,
  stats: PlayerMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetPlayerStat(
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
team.goals += stats.goals ?? 0;
team.goalsConceded += stats.goalsConceded ?? 0;


  team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);
  await team.save();
};

export const updateFutsalPlayerStats = async (
  teamId: string,
  match: any,
  stats: PlayerMatchStats
) => {
  if (match.status !== "completed") {
    throw new Error("Match is not completed.");
  }

  const team = await createOrGetPlayerStat(
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
team.goals += stats.goals ?? 0;
team.goalsConceded += stats.goalsConceded ?? 0;

team.shots += stats.shots ?? 0;
team.shotsOnTarget += stats.shotsOnTarget ?? 0;
team.fouls += stats.fouls ?? 0;

team.winRate = calculateWinRate(
  team.wins,
  team.matchesPlayed
);

  await team.save();
};