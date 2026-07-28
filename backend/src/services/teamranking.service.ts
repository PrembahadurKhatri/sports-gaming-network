import TeamRanking from "../models/teamranking";

export const createOrGetTeamRanking = async (
    teamId: string,
    sport: string
) => {
    let ranking = await TeamRanking.findOne({
        team: teamId,
        sport,
    })
    if (!ranking) {
        ranking = await TeamRanking.create({
            team: teamId,
            sport,
        });
    }
    return ranking;
}

export const getTeamRanking = async (
    teamId: string,
    sport?: string
) => {
    const filter: Record<string, any> = {
        team: teamId,
    };
    if (sport) {
        filter.sport = sport;
    }
    const ranking = await TeamRanking.findOne(filter)
        .populate("team", "teamName teamLogo");
    if (!ranking) {
        throw new Error("Team ranking not found.")
    }

    return ranking;
}

export const getLeaderboard = async (
    sport: string
) => {
    return TeamRanking.find({
        sport,
    })
        .populate("team", "teamName teamLogo")
        .sort({
            rank: 1,
            rankingPoints: -1,
            winRate: -1,
            goalDifference: -1,
            netRunRate: -1,
            pointsDifference: -1,
        });
};

export const updateRankings = async (
    sport: string
) => {
    const rankings = await TeamRanking.find({
        sport,
    }).sort({
        rankingPoints: -1,
        winRate: -1,
        goalDifference: -1,
        netRunRate: -1,
        pointsDifference: -1,
    });

    for (let i = 0; i < rankings.length; i++) {
        rankings[i].rank = i + 1;
        await rankings[i].save();
    }

    return rankings;
};

export const getTopTeams = async (
    sport: string,
    limit: number = 10
) => {
    return TeamRanking.find({
        sport,
    })
        .populate("team", "teamName teamLogo")
        .sort({
            rank: 1,
            rankingPoints: -1,
            winRate: -1,
            goalDifference: -1,
            netRunRate: -1,
            pointsDifference: -1,
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

export const calculateGoalDifference = (
    goalsFor: number,
    goalsAgainst: number
) => {
    return (
        goalsFor - goalsAgainst
    )
};

export const calculatePointDifference = (
    pointsScored: number,
    pointsAgainst: number
) => {
    return (
        pointsScored - pointsAgainst
    )
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
    return (
        runsScored / oversFaced - runsConceded / oversBowled
    )

};

export const updateFootballTeamRanking = async (
    match: any
) => {
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
    const teamA = await createOrGetTeamRanking(
        match.teamA.toString(),
        "Football"
    );
    const teamB = await createOrGetTeamRanking(
        match.teamB.toString(),
        "Football"
    );
    teamA.played++;
    teamB.played++;
    if (match.teamAScore > match.teamBScore) {
        teamA.won++;
        teamB.lost++;
        teamA.rankingPoints += 3;
    }
    else if (match.teamAScore < match.teamBScore) {
        teamB.won++;
        teamA.lost++;
        teamB.rankingPoints += 3;

    } else {
        teamA.draw++;
        teamB.draw++;
        teamA.rankingPoints += 1;
        teamB.rankingPoints += 1;
    }
    teamA.goalsFor += match.teamAScore;
    teamA.goalsAgainst += match.teamBScore;

    teamB.goalsFor += match.teamBScore;
    teamB.goalsAgainst += match.teamAScore;

    teamA.goalDifference = calculateGoalDifference(
        teamA.goalsFor,
        teamA.goalsAgainst
    );

    teamB.goalDifference = calculateGoalDifference(
        teamB.goalsFor,
        teamB.goalsAgainst
    );
    teamA.winRate = calculateWinRate(
        teamA.won,
        teamA.played
    );

    teamB.winRate = calculateWinRate(
        teamB.won,
        teamB.played
    );
    await teamA.save();
    await teamB.save();
    await updateRankings("Football");
}

export const updateCricketTeamRanking = async (
    match: any
) => {
    if (match.status !== "completed") {
        throw new Error("Ranking can only be updated for completed matches.")
    };


    const teamA = await createOrGetTeamRanking(
        match.teamA.toString(),
        "cricket"
    );
    const teamB = await createOrGetTeamRanking(match.teamB.toString(),
        "cricket"
    );

    teamA.played++;
    teamB.played++;

    if (match.teamAScore > match.teamBScore) {
        teamA.won++;
        teamB.lost++;
        teamA.rankingPoints += 2;
    } else if (match.teamAScore < match.teamBScore) {
        teamB.won++;
        teamA.lost++;
        teamB.rankingPoints += 2;
    } else {
        teamA.draw++;
        teamB.draw++;
        teamA.rankingPoints += 1;
        teamB.rankingPoints += 1;
    }


    teamA.runsScored += match.teamAScore;
    teamA.runsConceded += match.teamBScore;

    teamB.runsScored += match.teamBScore;
    teamB.runsConceded += match.teamAScore;
    teamA.oversFaced += match.teamAOvers ?? 0;
    teamA.oversBowled += match.teamBOvers ?? 0;

    teamB.oversFaced += match.teamBOvers ?? 0;
    teamB.oversBowled += match.teamAOvers ?? 0;

    teamA.wicketsLost += match.teamAWickets ?? 0;
    teamA.wicketsTaken += match.teamBWickets ?? 0;

    teamB.wicketsLost += match.teamBWickets ?? 0;
    teamB.wicketsTaken += match.teamAWickets ?? 0;

    teamA.winRate = calculateWinRate(
        teamA.won,
        teamA.played
    )
    teamB.winRate = calculateWinRate(
        teamB.won,
        teamB.played
    )

    teamA.netRunRate = calculateNetRunRate(
        teamA.runsScored,
        teamA.oversFaced,
        teamA.runsConceded,
        teamA.oversBowled
    );
    teamB.netRunRate = calculateNetRunRate(
        teamB.runsScored,
        teamB.oversFaced,
        teamB.runsConceded,
        teamB.oversBowled
    );


    await teamA.save();
    await teamB.save();

    await updateRankings("Cricket");

}

export const updateBasketballTeamRanking = async (match: any) => {
    if (match.status !== "completed")
        throw new Error("Ranking can only be updated for completed matches.");

    const teamA = await createOrGetTeamRanking(match.teamA.toString(), "Basketball");
    const teamB = await createOrGetTeamRanking(match.teamB.toString(), "Basketball");

    teamA.played++;
    teamB.played++;

    if (match.teamAScore > match.teamBScore) {
        teamA.won++;
        teamB.lost++;
        teamA.rankingPoints += 2;
    } else {
        teamB.won++;
        teamA.lost++;
        teamB.rankingPoints += 2;
    }

    teamA.pointsScored += match.teamAScore;
    teamA.pointsAgainst += match.teamBScore;

    teamB.pointsScored += match.teamBScore;
    teamB.pointsAgainst += match.teamAScore;

    teamA.pointsDifference = calculatePointDifference(teamA.pointsScored, teamA.pointsAgainst);
    teamB.pointsDifference = calculatePointDifference(teamB.pointsScored, teamB.pointsAgainst);

    teamA.winRate = calculateWinRate(teamA.won, teamA.played);
    teamB.winRate = calculateWinRate(teamB.won, teamB.played);

    await teamA.save();
    await teamB.save();

    await updateRankings("Basketball");
};

export const updateVolleyballTeamRanking = async (match: any) => {
    if (match.status !== "completed") {
        throw new Error("Ranking can only be updated for completed matches.");
    }
    const teamA = await createOrGetTeamRanking(match.teamA.toString(), "Volleyball");
    const teamB = await createOrGetTeamRanking(match.teamB.toString(), "Volleyball");

    teamA.played++;
    teamB.played++;

    if (match.teamAScore > match.teamBScore) {
        teamA.won++;
        teamB.lost++;
        teamA.rankingPoints += 3;
    } else {
        teamB.won++;
        teamA.lost++;
        teamB.rankingPoints += 3;
    }

    teamA.setsWon += match.teamAScore;
    teamA.setsLost += match.teamBScore;

    teamB.setsWon += match.teamBScore;
    teamB.setsLost += match.teamAScore;

    teamA.setDifference = teamA.setsWon - teamA.setsLost;
    teamB.setDifference = teamB.setsWon - teamB.setsLost;

    teamA.winRate = calculateWinRate(teamA.won, teamA.played);
    teamB.winRate = calculateWinRate(teamB.won, teamB.played);

    await teamA.save();
    await teamB.save();

    await updateRankings("Volleyball");
}

export const updateBadmintonTeamRanking = async (match: any) => {
    if (match.status !== "completed") {
        throw new Error("Ranking can only be updated for completed matches.");
    }
    const teamA = await createOrGetTeamRanking(match.teamA.toString(), "Badminton");
    const teamB = await createOrGetTeamRanking(match.teamB.toString(), "Badminton");

    teamA.played++;
    teamB.played++;

    if (match.teamAScore > match.teamBScore) {
        teamA.won++;
        teamB.lost++;
        teamA.rankingPoints += 2;
    } else {
        teamB.won++;
        teamA.lost++;
        teamB.rankingPoints += 2;
    }

    teamA.gamesWon += match.teamAScore;
    teamA.gamesLost += match.teamBScore;

    teamB.gamesWon += match.teamBScore;
    teamB.gamesLost += match.teamAScore;

    teamA.winRate = calculateWinRate(teamA.won, teamA.played);
    teamB.winRate = calculateWinRate(teamB.won, teamB.played);

    await teamA.save();
    await teamB.save();

    await updateRankings("Badminton");
}

export const updateTennisTeamRanking = async (match: any) => {
    if (match.status !== "completed") {
        throw new Error("Ranking can only be updated for completed matches.");
    }
    const teamA = await createOrGetTeamRanking(match.teamA.toString(), "Tennis");
    const teamB = await createOrGetTeamRanking(match.teamB.toString(), "Tennis");

    teamA.played++;
    teamB.played++;

    if (match.teamAScore > match.teamBScore) {
        teamA.won++;
        teamB.lost++;
        teamA.rankingPoints += 2;
    } else {
        teamB.won++;
        teamA.lost++;
        teamB.rankingPoints += 2;
    }

    teamA.gamesWon += match.teamAScore;
    teamA.gamesLost += match.teamBScore;

    teamB.gamesWon += match.teamBScore;
    teamB.gamesLost += match.teamAScore;

    teamA.winRate = calculateWinRate(teamA.won, teamA.played);
    teamB.winRate = calculateWinRate(teamB.won, teamB.played);

    await teamA.save();
    await teamB.save();

    await updateRankings("Tennis");
}

export const updateKabaddiTeamRanking = async (match: any) => {
    if (match.status !== "completed") {
        throw new Error("Ranking can only be updated for completed matches.");
    }
    const teamA = await createOrGetTeamRanking(match.teamA.toString(), "Kabaddi");
    const teamB = await createOrGetTeamRanking(match.teamB.toString(), "Kabaddi");

    teamA.played++;
    teamB.played++;

    if (match.teamAScore > match.teamBScore) {
        teamA.won++;
        teamB.lost++;
        teamA.rankingPoints += 5;
    } else {
        teamB.won++;
        teamA.lost++;
        teamB.rankingPoints += 5;
    }

    teamA.raidPoints += match.teamARaidPoints ?? 0;
    teamA.tacklePoints += match.teamATacklePoints ?? 0;
    teamA.allOuts += match.teamAAllOuts ?? 0;

    teamB.raidPoints += match.teamBRaidPoints ?? 0;
    teamB.tacklePoints += match.teamBTacklePoints ?? 0;
    teamB.allOuts += match.teamBAllOuts ?? 0;

    teamA.pointsScored += match.teamAScore;
    teamA.pointsAgainst += match.teamBScore;

    teamB.pointsScored += match.teamBScore;
    teamB.pointsAgainst += match.teamAScore;

    teamA.pointsDifference = calculatePointDifference(teamA.pointsScored, teamA.pointsAgainst);
    teamB.pointsDifference = calculatePointDifference(teamB.pointsScored, teamB.pointsAgainst);

    teamA.winRate = calculateWinRate(teamA.won, teamA.played);
    teamB.winRate = calculateWinRate(teamB.won, teamB.played);

    await teamA.save();
    await teamB.save();

    await updateRankings("Kabaddi");
}

export const updateHockeyTeamRanking = async (match: any) => {
  if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
    const teamA = await createOrGetTeamRanking(match.teamA.toString(), "Hockey");
    const teamB = await createOrGetTeamRanking(match.teamB.toString(), "Hockey");

    teamA.played++;
    teamB.played++;

    if (match.teamAScore > match.teamBScore) {
        teamA.won++;
        teamB.lost++;
        teamA.rankingPoints += 3;
    } else if (match.teamAScore < match.teamBScore) {
        teamB.won++;
        teamA.lost++;
        teamB.rankingPoints += 3;
    } else {
        teamA.draw++;
        teamB.draw++;
        teamA.rankingPoints++;
        teamB.rankingPoints++;
    }

    teamA.goalsFor += match.teamAScore;
    teamA.goalsAgainst += match.teamBScore;

    teamB.goalsFor += match.teamBScore;
    teamB.goalsAgainst += match.teamAScore;

    teamA.goalDifference = calculateGoalDifference(teamA.goalsFor, teamA.goalsAgainst);
    teamB.goalDifference = calculateGoalDifference(teamB.goalsFor, teamB.goalsAgainst);

    teamA.winRate = calculateWinRate(teamA.won, teamA.played);
    teamB.winRate = calculateWinRate(teamB.won, teamB.played);

    await teamA.save();
    await teamB.save();

    await updateRankings("Hockey");
}



export const updateHandballTeamRanking = async (match: any) => {
  if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
    const teamA = await createOrGetTeamRanking(match.teamA.toString(), "Handball");
    const teamB = await createOrGetTeamRanking(match.teamB.toString(), "Handball");

    teamA.played++;
    teamB.played++;

    if (match.teamAScore > match.teamBScore) {
        teamA.won++;
        teamB.lost++;
        teamA.rankingPoints += 3;
    } else if (match.teamAScore < match.teamBScore) {
        teamB.won++;
        teamA.lost++;
        teamB.rankingPoints += 3;
    } else {
        teamA.draw++;
        teamB.draw++;
        teamA.rankingPoints++;
        teamB.rankingPoints++;
    }

    teamA.goalsFor += match.teamAScore;
    teamA.goalsAgainst += match.teamBScore;

    teamB.goalsFor += match.teamBScore;
    teamB.goalsAgainst += match.teamAScore;

    teamA.goalDifference = calculateGoalDifference(teamA.goalsFor, teamA.goalsAgainst);
    teamB.goalDifference = calculateGoalDifference(teamB.goalsFor, teamB.goalsAgainst);

    teamA.winRate = calculateWinRate(teamA.won, teamA.played);
    teamB.winRate = calculateWinRate(teamB.won, teamB.played);

    await teamA.save();
    await teamB.save();

    await updateRankings("Handball");
}



export const updateFutsalTeamRanking = async (
    match: any
) => {
    if (match.status !== "completed") {
        throw new Error(
            "Ranking can only be updated for completed matches."
        );
    }
    const teamA = await createOrGetTeamRanking(
        match.teamA.toString(),
        "Futsal"
    );
    const teamB = await createOrGetTeamRanking(
        match.teamB.toString(),
        "Futsal"
    );
    teamA.played++;
    teamB.played++;
    if (match.teamAScore > match.teamBScore) {
        teamA.won++;
        teamB.lost++;
        teamA.rankingPoints += 3;
    }
    else if (match.teamAScore < match.teamBScore) {
        teamB.won++;
        teamA.lost++;
        teamB.rankingPoints += 3;

    } else {
        teamA.draw++;
        teamB.draw++;
        teamA.rankingPoints += 1;
        teamB.rankingPoints += 1;
    }
    teamA.goalsFor += match.teamAScore;
    teamA.goalsAgainst += match.teamBScore;

    teamB.goalsFor += match.teamBScore;
    teamB.goalsAgainst += match.teamAScore;

    teamA.goalDifference = calculateGoalDifference(
        teamA.goalsFor,
        teamA.goalsAgainst
    );

    teamB.goalDifference = calculateGoalDifference(
        teamB.goalsFor,
        teamB.goalsAgainst
    );
    teamA.winRate = calculateWinRate(
        teamA.won,
        teamA.played
    );

    teamB.winRate = calculateWinRate(
        teamB.won,
        teamB.played
    );
    await teamA.save();
    await teamB.save();
    await updateRankings("Futsal");
}
