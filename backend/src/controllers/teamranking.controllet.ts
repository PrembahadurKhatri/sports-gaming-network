import { Request,Response } from "express";
import {
    getTeamRanking as getTeamRankingService,
    getLeaderboard as getLeaderboardService,
    getTopTeams as getTopTeamsService,
   } from "../services/teamranking.service";

export const getLeaderboardController = async (
    req:Request,
    res:Response
) => {
    try{
        const { sport} = req.params;
        if (!sport) {
  return res.status(400).json({
    success: false,
    message: "Sport is required.",
  });
}
        const leaderboard = await getLeaderboardService(sport as string);
        return res.status(200).json({
            success:true,
            total:leaderboard.length,
            leaderboard,
        })

    }catch(error){
        console.log(error);
    
        return res.status(500).json({
            success:false,
            message:"Failed to fetch leaderboard.",
        });
    }
};

export const getTeamRankingController = async (
    req:Request,
    res:Response
) => {
    try{
    const {teamId} = req.params;
    const {sport} = req.query;

    const ranking = await getTeamRankingService(teamId as string,
        sport as string | undefined)

    return res.status(200).json({
        success:true,
        ranking,
    });
 } catch (error) {
    console.error(error);

    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch ranking.",
    });
  }
};
export const getTopTeamsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { sport } = req.params;
if (!sport) {
  return res.status(400).json({
    success: false,
    message: "Sport is required.",
  });
}
    const limit = Number(req.query.limit) || 10;

    const teams = await getTopTeamsService(
      sport as string,
      limit
    );

    return res.status(200).json({
      success: true,
      total: teams.length,
      teams,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch top teams.",
    });
  }
};