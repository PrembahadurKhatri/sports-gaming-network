import mvp from "../models/mvp";

export const createMvp = async (data: any) => {
    return await mvp.create(data);
}

export const getAllMvps = async () => {
    return await mvp.find()
        .populate("player", "fullname profilephoto")
        .populate("team", 'teamName')
        .populate("match")
        .sort({ createAt: -1 });
};

export const getMvpById = async (id: string) => {
    const MVP = await mvp.findById(id)
        .populate("player")
        .populate("team")
        .populate("match");

    if (!MVP) {
        throw new Error("Mvp not found");
    }
    return MVP;
}

export const getPlayerMVPs = async (
    playerId: string
) => {
    return mvp.find({
        player: playerId,
    }).sort({
        createdAt: -1,
    });
};

export const getMatchMVP = async (
    matchId: string
) => {
    return mvp.findOne({
        match: matchId,
        category: "MATCH",
    }).populate("player");
};

export const getTournamentMVPs = async (
    tournamentId: string
) => {
    return mvp.find({
        tournament: tournamentId,
        category: "TOURNAMENT",
    }).sort({
        mvpScore: -1,
    });
};

export const getSeasonMVPs = async () => {
    return mvp.find({
        category: "SEASON",
    }).sort({
        mvpScore: -1,
    });
};

export const deleteMVP = async (
    id: string
) => {
    const MVP = await mvp.findByIdAndDelete(id);

    if (!MVP) {
        throw new Error("MVP not found");
    }

    return true;
};


export const calculateFootballMVP = (
    stats: {
        goals?: number;
        assists?: number;
        shotsOnTarget?: number;
        cleanSheets?: number;
        chancesCreated?: number;
        fouls?: number;
    }
) => {
    let score = 0;
    score += (stats.goals ?? 0) * 10;
    score += (stats.assists ?? 0) * 6;
    score += (stats.shotsOnTarget ?? 0) * 2;
    score += (stats.cleanSheets ?? 0) * 8;
    score += (stats.chancesCreated ?? 0) * 4;
    score -= (stats.fouls ?? 0);

    return score;
};

export const calculateCricketMVP = (
    stats: {
        runs?: number;
        wickets?: number;
        strikeRate?: number;
        economy?: number;
        catches?: number;
    }
) => {
    let score = 0;

    score += stats.runs ?? 0;
    score += (stats.wickets ?? 0) * 25;
    score += (stats.strikeRate ?? 0) / 5;
    score += Math.max(0, 10 - (stats.economy ?? 10));
    score += (stats.catches ?? 0) * 5;
    return Number(score.toFixed(2));
};


export const calculateFutsalMVP = (stats: {
    goals?: number;
    assists?: number;
    shotsOnTarget?: number;
    cleanSheets?: number;
    fouls?: number;
}) => {
    let score = 0;

    score += (stats.goals ?? 0) * 10;
    score += (stats.assists ?? 0) * 6;
    score += (stats.shotsOnTarget ?? 0) * 2;
    score += (stats.cleanSheets ?? 0) * 8;
    score -= (stats.fouls ?? 0);

    return Number(score.toFixed(2));
};


export const calculateBasketballMVP = (stats: {
  points?: number;
  rebounds?: number;
  assistsBasketball?: number;
  steals?: number;
  blocks?: number;
}) => {
  let score = 0;

  score += (stats.points ?? 0);
  score += (stats.rebounds ?? 0) * 2;
  score += (stats.assistsBasketball ?? 0) * 2;
  score += (stats.steals ?? 0) * 3;
  score += (stats.blocks ?? 0) * 3;

  return Number(score.toFixed(2));
};

export const calculateVolleyballMVP = (stats: {
  attackPoints?: number;
  blocks?: number;
  aces?: number;
}) => {
  let score = 0;

  score += (stats.attackPoints ?? 0);
  score += (stats.blocks ?? 0) * 4;
  score += (stats.aces ?? 0) * 3;

  return Number(score.toFixed(2));
};

export const calculateBadmintonMVP = (
  stats: {
    setsWon?: number;
    gamesWon?: number;
    smashes?: number;
    aces?: number;
    errors?: number;
  },
  format: "Singles" | "Doubles"
) => {
  let score = 0;

  score += (stats.setsWon ?? 0) * 25;
  score += (stats.gamesWon ?? 0) * 3;
  score += (stats.smashes ?? 0) * 2;
  score += (stats.aces ?? 0) * 4;
  score -= (stats.errors ?? 0);

  if (format === "Doubles") {
    score *= 0.9; 
  }

  return Number(score.toFixed(2));
};

export const calculateTennisMVP = (
  stats: {
    setsWon?: number;
    gamesWon?: number;
    aces?: number;
    winners?: number;
    doubleFaults?: number;
  },
  format: "Singles" | "Doubles"
) => {
  let score = 0;

  score += (stats.setsWon ?? 0) * 25;
  score += (stats.gamesWon ?? 0) * 3;
  score += (stats.aces ?? 0) * 4;
  score += (stats.winners ?? 0) * 2;
  score -= (stats.doubleFaults ?? 0);

  if (format === "Doubles") {
    score *= 0.9;
  }

  return Number(score.toFixed(2));
};

export const calculateKabaddiMVP = (
  stats: {
    raidPoints?: number;
    tacklePoints?: number;
    bonusPoints?: number;
    superRaids?: number;
    superTackles?: number;
  }
) => {
  let score = 0;

  score += (stats.raidPoints ?? 0) * 2;
  score += (stats.tacklePoints ?? 0) * 3;
  score += (stats.bonusPoints ?? 0);
  score += (stats.superRaids ?? 0) * 6;
  score += (stats.superTackles ?? 0) * 5;

  return Number(score.toFixed(2));
};

export const calculateHockeyMVP = (stats: {
  goals?: number;
  assists?: number;
  shotsOnTarget?: number;
  cleanSheets?: number;
}) => {
  let score = 0;

  score += (stats.goals ?? 0) * 10;
  score += (stats.assists ?? 0) * 6;
  score += (stats.shotsOnTarget ?? 0) * 2;
  score += (stats.cleanSheets ?? 0) * 8;

  return Number(score.toFixed(2));
};

export const calculateHandballMVP = (stats: {
  goals?: number;
  assists?: number;
  shotsOnTarget?: number;
  blocks?: number;
}) => {
  let score = 0;

  score += (stats.goals ?? 0) * 8;
  score += (stats.assists ?? 0) * 5;
  score += (stats.shotsOnTarget ?? 0) * 2;
  score += (stats.blocks ?? 0) * 3;

  return Number(score.toFixed(2));
};