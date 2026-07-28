import Matchstat from "../models/matchstat";

export const incrementStat = async (
    matchId: string,
    teamId: string,
    playerId: string | undefined,
    sport: string,
    stat: string,
    value: number = 1
) => {
    return Matchstat.findOneAndUpdate(
        {
            match: matchId,
            team: teamId,
            player: playerId,
            sport,
            stat,
        },
        {
            $inc: {//increment
                value,
            },
        },
        {
            upsert: true,//Update + Insert
            new: true,
        }
    );
};

export const decrementStat = async (
    matchId: string,
    teamId: string,
    playerId: string | undefined,
    sport: string,
    stat: string,
    value: number = 1
) => {
    return Matchstat.findOneAndUpdate(
        {
            match: matchId,
            team: teamId,
            player: playerId,
            sport,
            stat,
        },
        {
            $inc: {
                value: -value,
            },
        },
        {
            new: true,
        }
    );
};

export const getMatchStats = async (
    matchId: string
) => {
    return Matchstat.find({
        match: matchId,
    })
        .populate("team", "teamName teamLogo venue  winner")
        .populate("player", "fullname profilePhoto manOfTheMatch")
        .sort({
            stat: 1,
        });
};

export const getTeamStats = async (
    teamId: string
) => {
    return Matchstat.find({
        team: teamId,
    })
        .populate("match")
        .populate("team", "teamName teamLogo")
        .sort({
            stat: 1,
            value: -1
        })
};

export const getPlayerStats = async (
    playerId: string
) => {
    return Matchstat.find({
        player: playerId,
    })
        .populate("match")
        .populate("team", "teamName teamLogo")
        .sort({
            stat: 1,
            value: -1,
        });
};

export const getTopPlayersByStat = async (
    stat: string,
    limit: number = 10
) => {
    return await Matchstat.find({
        stat,
        player: {
            $ne: null,
        },
    })
        .populate("player", "fullname profilePhoto")
        .populate("team", "teamName teamLogo")
        .sort({
            value: -1,
        })
        .limit(limit);
}

export const getTopTeamsByStat = async (
    stat: string,
    limit: number = 10
) => {
    return await Matchstat.find({
        stat,
    })
        .populate("team", " teamName teamLogo")
        .sort({
            value: -1,
        })
        .limit(limit);
}
export const deleteStat = async (
    statId: string
) => {
    const stat = await Matchstat.findByIdAndDelete(statId);
    if (!stat) {
        throw new Error("Stat not found");
    }
    return true;
}
