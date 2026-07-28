import PlayerRanking from "../models/playerranking";


interface PlayerMatchStats {
    isWinner:boolean;
    isDraw:boolean;
    isMvp:boolean;

    goals?:number;
    assists?:number;

    runs?:number;
    wickets?:number;

    ballsFaced?:number;
    oversBowled?:number;
    runsConceded?:number;

    points?:number;
    rebounds?:number;
    steals?:number;
    blocks?:number;

    raidPoints?:number;
    tacklePoints?:number;

    gamesWon?:number;
    gamesLost?:number;

    setsWon?:number;
    setsLost?:number;

    cleanSheets?:number;
    notOut?:boolean;
}

export const createOrGetPlayerRanking = async (
  playerId: string,
  sport: string
) => {
  let ranking = await PlayerRanking.findOne({
    player: playerId,
    sport,
  });

  if (!ranking) {
    ranking = await PlayerRanking.create({
      player: playerId,
      sport,
    });
  }

  return ranking;
};

export const getPlayerRanking = async (
  playerId: string,
  sport?: string
) => {
  const filter: Record<string, any> = {
    player: playerId,
  };

  if (sport) {
    filter.sport = sport;
  }

  const ranking = await PlayerRanking.findOne(filter).populate(
    "player",
    "fullname profilePhoto"
  );

  if (!ranking) {
    throw new Error("Player ranking not found.");
  }

  return ranking;
};

export const getLeaderboard = async (
  sport: string
) => {
  return PlayerRanking.find({
    sport,
  })
    .populate("player", "fullname profilePhoto")
   .sort({
  rankingPoints: -1,
  winRate: -1,
  mvpAwards: -1,
  goals: -1,
  assists: -1,
  runs: -1,
  wickets: -1,
  strikeRate: -1,
  economy: 1,
  points: -1,
  raidPoints: -1,
})
    .lean();
};

export const getTopPlayers = async (
  sport: string,
  limit: number = 10
) => {
  return PlayerRanking.find({
    sport,
  })
    .populate("player", "fullname profilePhoto")
   .sort({
  rankingPoints: -1,
  winRate: -1,
  mvpAwards: -1,
  goals: -1,
  assists: -1,
  runs: -1,
  wickets: -1,
  strikeRate: -1,
  economy: 1,
  points: -1,
  raidPoints: -1,
})
    .limit(limit)
    .lean();
};

export const calculateWinRate = (
  won: number,
  played: number
) => {
  if (played === 0) {
    return 0;
  }

  return Number(((won / played) * 100).toFixed(2));
};

export const updateRankings = async (
  sport: string
) => {
  const rankings = await PlayerRanking.find({ sport }).sort({
   rankingPoints: -1,
  winRate: -1,
  mvpAwards: -1,
  goals: -1,
  assists: -1,
  runs: -1,
  wickets: -1,
  strikeRate: -1,
  economy: 1,
  points: -1,
  raidPoints: -1,
  });

await PlayerRanking.bulkWrite(//bulkWrite() भनेको MongoDB मा धेरै documents लाई एउटै query मा update/insert/delete गर्ने method हो।
  rankings.map((ranking, index) => ({
    updateOne: {
      filter: { _id: ranking._id },
      update: {
        rank: index + 1,
      },
    },
  }))
);

return true;
};

export const calculateStrikeRate = (
  runs: number,
  ballsFaced: number
) => {
  if (ballsFaced === 0) return 0;

  return Number(((runs / ballsFaced) * 100).toFixed(2));
};

export const calculateEconomy = (
  runsConceded: number,
  oversBowled: number
) => {
  if (oversBowled === 0) return 0;

  return Number((runsConceded / oversBowled).toFixed(2));
};

export const calculateBattingAverage = (
  runs: number,
  innings: number,
  notOuts: number
) => {
  const outs = innings - notOuts;

  if (outs <= 0) return runs;

  return Number((runs / outs).toFixed(2));
};

export const calculateBowlingAverage = (
  runsConceded: number,
  wickets: number
) => {
  if (wickets === 0) return 0;

  return Number((runsConceded / wickets).toFixed(2));
};

export const calculateGoalContribution = (
  goals: number,
  assists: number
) => {
  return goals + assists;
};

export const calculateNetRating = (
  pointsScored: number,
  pointsConceded: number
) => {
  return pointsScored - pointsConceded;
};

export const calculateSetDifference = (
  setsWon: number,
  setsLost: number
) => {
  return setsWon - setsLost;
};

export const calculatePointDifference = (
  pointsScored: number,
  pointsAgainst: number
) => {
  return pointsScored - pointsAgainst;
};

export const calculateNetRunRate = (
  runsScored: number,
  oversFaced: number,
  runsConceded: number,
  oversBowled: number
) => {
  if (oversFaced === 0 || oversBowled === 0) {
    return 0;
  }

  return Number(
    (
      runsScored / oversFaced -
      runsConceded / oversBowled
    ).toFixed(3)
  );
};

export const calculateMvpRate = (
  mvpAwards: number,
  played: number
) => {
  if (played === 0) {
    return 0;
  }

  return Number(((mvpAwards / played) * 100).toFixed(2));
};

export const calculateCleanSheetRate = (
  cleanSheets: number,
  played: number
) => {
  if (played === 0) {
    return 0;
  }

  return Number(((cleanSheets / played) * 100).toFixed(2));
};

export const updateFootballPlayerRanking = async (
  playerId: string,
  match: any,
stats: PlayerMatchStats
) => {
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
  const ranking = await createOrGetPlayerRanking(
    playerId,
    "Football"
  );
ranking.played++;

if (stats.isWinner) {
  ranking.won++;
  ranking.rankingPoints += 20;
} else if (stats.isDraw) {
  ranking.draw++;
  ranking.rankingPoints += 5;
} else {
  ranking.lost++;
}

if (stats.isMvp) {
  ranking.mvpAwards++;
  ranking.rankingPoints += 5;
}

  ranking.goals += stats.goals ?? 0;
  ranking.assists += stats.assists ?? 0;
  ranking.cleanSheets += stats.cleanSheets ?? 0;

  ranking.winRate = calculateWinRate(
    ranking.won,
    ranking.played
  );

  ranking.goalContribution =
    calculateGoalContribution(
      ranking.goals,
      ranking.assists
    );

  ranking.cleanSheetRate =
    calculateCleanSheetRate(
      ranking.cleanSheets,
      ranking.played
    );

  ranking.mvpRate = calculateMvpRate(
    ranking.mvpAwards,
    ranking.played
  );

  await ranking.save();
   await updateRankings("Football");
};

export const updateCricketPlayerRanking = async (
  playerId: string,
  match: any,
stats: PlayerMatchStats
) => {
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
  const ranking = await createOrGetPlayerRanking(
    playerId,
    "Cricket"
  );

 ranking.played++;

if (stats.isWinner) {
  ranking.won++;
  ranking.rankingPoints += 20;
} else if (stats.isDraw) {
  ranking.draw++;
  ranking.rankingPoints += 5;
} else {
  ranking.lost++;
}

if (stats.isMvp) {
  ranking.mvpAwards++;
  ranking.rankingPoints += 5;
}

  ranking.runs += stats.runs ?? 0;
  ranking.ballsFaced += stats.ballsFaced ?? 0;
  ranking.wickets += stats.wickets ?? 0;
  ranking.runsConceded += stats.runsConceded ?? 0;
  ranking.oversBowled += stats.oversBowled ?? 0;
  ranking.notOuts += stats.notOut ? 1 : 0;
  ranking.innings += 1;


  ranking.strikeRate = calculateStrikeRate(
    ranking.runs,
    ranking.ballsFaced
  );

  ranking.battingAverage =
    calculateBattingAverage(
      ranking.runs,
      ranking.innings,
      ranking.notOuts
    );

  ranking.economy =
    calculateEconomy(
      ranking.runsConceded,
      ranking.oversBowled
    );

  ranking.bowlingAverage =
    calculateBowlingAverage(
      ranking.runsConceded,
      ranking.wickets
    );

  ranking.winRate =
    calculateWinRate(
      ranking.won,
      ranking.played
    );

  ranking.mvpRate =
    calculateMvpRate(
      ranking.mvpAwards,
      ranking.played
    );

  await ranking.save();
     await updateRankings("Cricket");
};

export const updateBasketballPlayerRanking = async (
  playerId: string,
  match: any,
stats: PlayerMatchStats
) => {
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
  const ranking = await createOrGetPlayerRanking(playerId,"Basketball");

  ranking.played++;

if (stats.isWinner) {
  ranking.won++;
  ranking.rankingPoints += 20;
} else if (stats.isDraw) {
  ranking.draw++;
  ranking.rankingPoints += 5;
} else {
  ranking.lost++;
}

if (stats.isMvp) {
  ranking.mvpAwards++;
  ranking.rankingPoints += 5;
}
  ranking.points += stats.points ?? 0;
  ranking.assists += stats.assists ?? 0;
  ranking.rebounds += stats.rebounds ?? 0;
  ranking.steals += stats.steals ?? 0;
  ranking.blocks += stats.blocks ?? 0;

  ranking.winRate=calculateWinRate(ranking.won,ranking.played);

  ranking.mvpRate = calculateMvpRate(
    ranking.mvpAwards,
    ranking.played
  );

  await ranking.save();
     await updateRankings("Basketball");
};

export const updateVolleyballPlayerRanking = async (
  playerId:string,
  match:any,
stats: PlayerMatchStats
)=>{
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
 const ranking=await createOrGetPlayerRanking(playerId,"Volleyball");

 ranking.played++;

 if(stats.isWinner){
   ranking.won++;
   ranking.rankingPoints+=20;
 }else{
   ranking.lost++;
 }

 ranking.points+=stats.points??0;
 ranking.blocks+=stats.blocks??0;
 ranking.assists+=stats.assists??0;
 ranking.setsWon+=stats.setsWon??0;
 ranking.setsLost+=stats.setsLost??0;

 ranking.setDifference=calculateSetDifference(
    ranking.setsWon,
    ranking.setsLost
 );

 ranking.winRate=calculateWinRate(ranking.won,ranking.played);

 await ranking.save();
    await updateRankings("Volleyball");
}

export const updateBadmintonPlayerRanking = async (
 playerId:string,
 match:any,
stats: PlayerMatchStats
)=>{
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
 const ranking=await createOrGetPlayerRanking(playerId,"Badminton");

ranking.played++;

if (stats.isWinner) {
  ranking.won++;
  ranking.rankingPoints += 20;
} else if (stats.isDraw) {
  ranking.draw++;
  ranking.rankingPoints += 5;
} else {
  ranking.lost++;
}

if (stats.isMvp) {
  ranking.mvpAwards++;
  ranking.rankingPoints += 5;
}

 ranking.gamesWon+=stats.gamesWon??0;
 ranking.gamesLost+=stats.gamesLost??0;
 ranking.points+=stats.points??0;

 ranking.winRate=calculateWinRate(ranking.won,ranking.played);

 await ranking.save();
    await updateRankings("Badminton");

}

export const updateTennisPlayerRanking = async (
 playerId:string,
 match:any,
stats: PlayerMatchStats
)=>{
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
 const ranking=await createOrGetPlayerRanking(playerId,"Tennis");

ranking.played++;

if (stats.isWinner) {
  ranking.won++;
  ranking.rankingPoints += 20;
} else if (stats.isDraw) {
  ranking.draw++;
  ranking.rankingPoints += 5;
} else {
  ranking.lost++;
}

if (stats.isMvp) {
  ranking.mvpAwards++;
  ranking.rankingPoints += 5;
}
 ranking.gamesWon+=stats.gamesWon??0;
 ranking.gamesLost+=stats.gamesLost??0;
 ranking.setsWon+=stats.setsWon??0;
 ranking.setsLost+=stats.setsLost??0;

 ranking.setDifference=calculateSetDifference(
    ranking.setsWon,
    ranking.setsLost
 );

 ranking.winRate=calculateWinRate(ranking.won,ranking.played);

 await ranking.save();
    await updateRankings("Tennis");

}

export const updateKabaddiPlayerRanking = async (
 playerId:string,
 match:any,
stats: PlayerMatchStats
)=>{
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
 const ranking=await createOrGetPlayerRanking(playerId,"Kabaddi");

ranking.played++;

if (stats.isWinner) {
  ranking.won++;
  ranking.rankingPoints += 20;
} else if (stats.isDraw) {
  ranking.draw++;
  ranking.rankingPoints += 5;
} else {
  ranking.lost++;
}

if (stats.isMvp) {
  ranking.mvpAwards++;
  ranking.rankingPoints += 5;
}
 ranking.raidPoints+=stats.raidPoints??0;
 ranking.tacklePoints+=stats.tacklePoints??0;

 ranking.winRate=calculateWinRate(ranking.won,ranking.played);

 await ranking.save();
    await updateRankings("Kabaddi");

}

export const updateHockeyPlayerRanking = async (
 playerId:string,
 match:any,
 stats: PlayerMatchStats
)=>{
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
 const ranking=await createOrGetPlayerRanking(playerId,"Hockey");

ranking.played++;

if (stats.isWinner) {
  ranking.won++;
  ranking.rankingPoints += 20;
} else if (stats.isDraw) {
  ranking.draw++;
  ranking.rankingPoints += 5;
} else {
  ranking.lost++;
}

if (stats.isMvp) {
  ranking.mvpAwards++;
  ranking.rankingPoints += 5;
}
 ranking.goals+=stats.goals??0;
 ranking.assists+=stats.assists??0;

 ranking.goalContribution=calculateGoalContribution(
   ranking.goals,
   ranking.assists
 );

 ranking.winRate=calculateWinRate(ranking.won,ranking.played);

 await ranking.save();
    await updateRankings("Hockey");

}

export const updateHandballPlayerRanking = async (
 playerId:string,
 match:any,
stats: PlayerMatchStats
)=>{
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
 const ranking=await createOrGetPlayerRanking(playerId,"Handball");

ranking.played++;

if (stats.isWinner) {
  ranking.won++;
  ranking.rankingPoints += 20;
} else if (stats.isDraw) {
  ranking.draw++;
  ranking.rankingPoints += 5;
} else {
  ranking.lost++;
}

if (stats.isMvp) {
  ranking.mvpAwards++;
  ranking.rankingPoints += 5;
}
 ranking.goals+=stats.goals??0;
 ranking.assists+=stats.assists??0;

 ranking.goalContribution=calculateGoalContribution(
   ranking.goals,
   ranking.assists
 );

 ranking.winRate=calculateWinRate(ranking.won,ranking.played);

 await ranking.save();
    await updateRankings("Handball");

}

export const updateFutsalPlayerRanking = async (
 playerId:string,
 match:any,
 stats:PlayerMatchStats
)=>{
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
 const ranking=await createOrGetPlayerRanking(playerId,"Futsal");
ranking.played++;

if (stats.isWinner) {
  ranking.won++;
  ranking.rankingPoints += 20;
} else if (stats.isDraw) {
  ranking.draw++;
  ranking.rankingPoints += 5;
} else {
  ranking.lost++;
}

if (stats.isMvp) {
  ranking.mvpAwards++;
  ranking.rankingPoints += 5;
}
 ranking.goals+=stats.goals??0;
 ranking.assists+=stats.assists??0;

 ranking.goalContribution=calculateGoalContribution(
   ranking.goals,
   ranking.assists
 );

 ranking.winRate=calculateWinRate(ranking.won,ranking.played);
 await ranking.save();
    await updateRankings("Futsal");

}