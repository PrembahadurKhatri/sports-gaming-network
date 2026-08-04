/*
Team Controller
Calls registerTeamService()
Handles errors
Returns JSON response
*/

import { Request, Response } from "express";
import {
  registerTeam, getMyTeams as getMyTeamsService,
  getTeamById as getTeamByIdService, updateTeam as updateTeamService, deleteTeam as deleteTeamService,
  sendJoinRequest as sendJoinRequestService ,
  getPendingRequest as getPendingRequestService,
  acceptJoinRequest as acceptJoinRequestService,rejectJoinRequest as rejectJoinRequestService
,leaveTeam as leaveTeamService , removePlayer as removePlayerService ,searchTeams as searchTeamsService,invitePlayer as invitePlayerService,
transferOwnership as transferOwnershipService , cancelJoinRequest as cancelJoinRequestService,
checkTeamName as checkTeamNameService} from "../services/team.service";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerTeam(req.body, req.file, (req.user.id));
    res.status(201).json({
      success: result.success,
      message: result.message,
      team: result.team,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};
export const getMyTeams = async (req: Request, res: Response) => {
  try {
    const result = await getMyTeamsService(req.user.id);
    res.status(200).json({
      success: result.success,
      message: result.message,
      teams: result.teams,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}
export const getTeamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;//object destructuring
    //Take the id property from req.params and store it in a variable named id.
    const result = await getTeamByIdService(id as string);
    res.status(200).json({
      success: result.success,
      message: result.message,
      team: result.team,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;                 // Team ID
    const ownerId = req.user.id;

    const result = await updateTeamService(
      id as string,
      ownerId,
      req.body,
      req.file
    );

    res.status(200).json({
      success: result.success,
      message: result.message,
      team: result.team,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;                 // Team ID
    const ownerId =req.user.id;

    const result = await deleteTeamService(ownerId, id as string);
    res.status(200).json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const sendJoinRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params //Team ID
    const playerId =req.user.id;
   
    const result = await sendJoinRequestService(id as string, playerId, req.body);
     res.status(201).json({  //201 for create
      success: result.success,
      message: result.message,
      request: result.request,
    });

  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};


export const getPendingRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params //Team ID
    const ownerId =req.user.id;
   
    const result = await getPendingRequestService(id as string, ownerId);
     res.status(201).json(result);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const acceptJoinRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params 
    const ownerId =req.user.id;
   
    const result = await acceptJoinRequestService(requestId as string, ownerId as string);
     res.status(200).json(result);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};


export const rejectJoinRequest = async (  req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const ownerId = req.user.id;
    const result =
      await rejectJoinRequestService(
        requestId as string,
        ownerId as string
      );

    res.status(200).json(result);

  } catch (error) {

    if (error instanceof Error) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

  }
};


export const leaveTeam = async (req: Request,res: Response) => {
  try {

    const { id } = req.params;

    const playerId = req.user.id;

    const result =
      await leaveTeamService(
        id as string,
        playerId
      );
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });

    }

  }

};

export const removePlayer = async (req: Request,res: Response) => {
  try {

    const { teamId , playerId } = req.params;

    const ownerId = req.user.id;

    const result =
      await removePlayerService(
        teamId as string,
        playerId as string,
        ownerId as string
      );
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });

    }

  }

};

export const cancelJoinRequest = async (
  req: Request,
  res: Response
) => {
  try {
    const { teamId } = req.params;
    const playerId = req.user.id;

    const result = await cancelJoinRequestService(
      teamId as string,
      playerId as string
    );

    res.status(200).json(result);

  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        success:false,
        message:error.message
      });
    } else {
      res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
    }

  }
};

export const transferOwnership = async (
  req: Request,
  res: Response
) => {
  try {
    const { teamId,memberId } = req.params;
    const ownerId = req.user.id;

    const result = await transferOwnershipService(
      teamId as string,
      memberId as string,
      ownerId
    );

    res.status(200).json(result);

  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        success:false,
        message:error.message
      });
    } else {
      res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
    }

  }
};

export const searchTeams = async (
  req: Request,
  res: Response
) => {
  try {

    const result = await searchTeamsService(req.query);

    res.status(200).json(result);

  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

  }
};

export const checkTeamName = async (req: Request, res: Response) => {
  try {
    const name = String(req.query.name || req.query.teamName || "");
    const result = await checkTeamNameService(name);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const invitePlayer = async (
  req: Request,
  res: Response
) => {
  try {
    const { teamId, playerId } = req.params;
    const ownerId =req.user.id;

    const result = await invitePlayerService(
      teamId as string,
      playerId as string,
      ownerId
    );

    res.status(201).json(result);

  } catch (error) {

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

  }
};