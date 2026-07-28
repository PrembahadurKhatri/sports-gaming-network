import Team from "../models/teamregister";
import Tournament from "../models/tournament";
import Match from "../models/match";
import { cloudinaryUpload } from "../utils/cloudinaryupload";
import MVP from "../models/mvp";
export const createTournament = async (
  organizerId: string,
  tournamentData: any,
  file: any
) => {
  const {
    tournamentName,
    description,
    sport,
    location,
    rules,
    registrationDeadline,
    startDate,
    endDate,
    registrationFee,
    prizePool,
    visibility
  } = tournamentData;

  if (new Date(registrationDeadline) >= new Date(startDate)) {
    throw new Error(
      "Registration deadline must be before the tournament start date."
    );
  }
  if (new Date(startDate) >= new Date(endDate)) {
    throw new Error("End date must be after the start date.");
  }

  const tournament = await Tournament.create({
    organizer: organizerId,
    tournamentName,
    description,
    sport,
    location,
    banner: file ? file.path : "",
    rules,
    registrationDeadline,
    startDate,
    endDate,
    registrationFee,
    prizePool,
    visibility,
  });

  return {
    success: true,
    message: "Tournament created successfully.",
    tournament,
  };
};

export const getAllTournaments = async () => {
  const tournaments = await Tournament.find()
    .populate("organizer", "fullname profilePhoto")
    .sort({ createdAt: -1 });

  return {
    success: true,
    tournaments,
  };
};

export const getTournamentById = async (
  tournamentId: string
) => {
  const tournament = await Tournament.findById(tournamentId)
    .populate("organizer", "fullname profilePhoto")
    .populate("registeredTeams.team", "teamName teamLogo")
    .populate("winner", "teamName teamLogo")
    .populate("fixtures");

  if (!tournament) {
    throw new Error("Tournament not found.");
  }

  return {
    success: true,
    tournament,
  };
};

export const updateTournament = async (
  tournamentId: string,
  organizerId: string,
  tournamentData: any,
  file: any
) => {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found.");
  }
  if (tournament.organizer.toString() !== organizerId) {
    throw new Error("Unauthorized.");
  }
  if (tournament.status !== "registration_open") {
    throw new Error("Tournament cannot be updated.");
  }

  if (file) {
    tournamentData.banner = await cloudinaryUpload(file.buffer);
  }

  const effectiveRegistrationDeadline = new Date(
    tournamentData.registrationDeadline ?? tournament.registrationDeadline
  );
  const effectiveStartDate = new Date(
    tournamentData.startDate ?? tournament.startDate
  );
  const effectiveEndDate = new Date(
    tournamentData.endDate ?? tournament.endDate
  );

  if (effectiveRegistrationDeadline >= effectiveStartDate) {
    throw new Error("Registration deadline must be before start date.");
  }
  if (effectiveStartDate >= effectiveEndDate) {
    throw new Error("End date must be after start date.");
  }

  const updatedTournament = await Tournament.findByIdAndUpdate(
    tournamentId,
    tournamentData,
    {
      new: true,
      runValidators: true,
    }
  );
  return {
    success: true,
    message: "Tournament updated successfully.",
    tournament: updatedTournament,
  };
};

export const deleteTournament = async (
  tournamentId: string,
  organizerId: string
) => {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found.");
  }
  if (tournament.organizer.toString() !== organizerId) {
    throw new Error("Unauthorized.");
  }
  if (tournament.status !== "registration_open") {
    throw new Error(
      "Only tournaments open for registration can be deleted."
    );
  }
  await tournament.deleteOne();
  return {
    success: true,
    message: "Tournament deleted successfully.",
  };
};

export const registerTeam = async (
  tournamentId: string,
  ownerId: string,
  teamId: string
) => {
  const tournament = await Tournament.findById(tournamentId);

  if (!tournament) {
    throw new Error("Tournament not found.");
  }
  if (tournament.status !== "registration_open") {
    throw new Error("Tournament registration is closed.");
  }

  const team = await Team.findById(teamId);
  if (!team) {
    throw new Error("Team not found.");
  }
  if (team.owner.toString() !== ownerId) {
    throw new Error("Only the team owner can register the team.");
  }
  if (team.sport !== tournament.sport) {
    throw new Error("Team sport doesnot match tournament sport.");
  }

  const alreadyRegistered = tournament.registeredTeams.some(
    (entry: any) => entry.team.toString() === team._id.toString()
  );
  if (alreadyRegistered) {
    throw new Error("Team already registered.");
  }

  if (new Date() > tournament.registrationDeadline) {
    throw new Error("Registration deadline has passed.");
  }

  tournament.registeredTeams.push({
    team: team._id,
    registeredAt: new Date(),
    approved: true,
  } as any);

  await tournament.save();
  return {
    success: true,
    message: "Team registered successfully.",
    tournament,
  };
};

export const withdrawTeam = async (
  tournamentId: string,
  ownerId: string,
  teamId: string
) => {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found.");
  }
  if (tournament.status !== "registration_open") {
    throw new Error("Cannot withdraw now.");
  }

  const team = await Team.findById(teamId);
  if (!team) {
    throw new Error("Team not found.");
  }
  if (team.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  const isRegistered = tournament.registeredTeams.some(
    (entry: any) => entry.team.toString() === team._id.toString()
  );
  if (!isRegistered) {
    throw new Error("Team is not registered.");
  }

  tournament.registeredTeams = tournament.registeredTeams.filter(
    (entry: any) => entry.team.toString() !== teamId
  ) as any;

  await tournament.save();
  return {
    success: true,
    message: "Team withdrawn successfully.",
  };
};

export const startTournament = async (
  tournamentId: string,
  organizerId: string
) => {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found.");
  }
  if (tournament.organizer.toString() !== organizerId) {
    throw new Error("Unauthorized.");
  }
  if (
    tournament.status !== "registration_open" &&
    tournament.status !== "upcoming"
  ) {
    throw new Error("Tournament cannot be started.");
  }
  if (tournament.registeredTeams.length < 2) {
    throw new Error("Minimum 2 teams required.");
  }

  const fixtures: any[] = [];
  for (let i = 0; i < tournament.registeredTeams.length - 1; i += 2) {
    const match = await Match.create({
      teamA: (tournament.registeredTeams[i] as any).team,
      teamB: (tournament.registeredTeams[i + 1] as any).team,
      tournament: tournament._id,
      organizer: organizerId,
      location:tournament.location,
      sport: tournament.sport,
      scheduledAt: tournament.startDate,
      status: "pending",
    });
    fixtures.push(match._id);
  }

  tournament.fixtures = fixtures as any;

  tournament.status = "ongoing";
  await tournament.save();

  return {
    success: true,
    message: "Tournament started successfully.",
    tournament,
  };
};

export const finishTournament = async (
  tournamentId: string,
  organizerId: string,
  winnerId: string
) => {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found.");
  }
  if (tournament.organizer.toString() !== organizerId) {
    throw new Error("Unauthorized.");
  }
  if (tournament.status !== "ongoing") {
    throw new Error("Tournament is not ongoing.");
  }

  const exists = tournament.registeredTeams.some(
    (entry: any) => entry.team.toString() === winnerId
  );
  if (!exists) {
    throw new Error("Winner must be a registered team.");
  }

  const pending = await Match.exists({
    tournament: tournament._id,
    status: { $ne: "completed" },
  });

  if (pending) {
    throw new Error("Complete all fixtures first.");
  }

  tournament.winner = winnerId as any;
  tournament.status = "completed";
  await tournament.save();

  return {
    success: true,
    message: "Tournament completed successfully.",
    tournament,
  };
};

export const getFixtures = async (
  tournamentId: string
) => {
  const tournament = await Tournament.findById(tournamentId)
    .populate({
      path: "fixtures",
      populate: [
        {
          path: "teamA",
          select: "teamName teamLogo",
        },
        {
          path: "teamB",
          select: "teamName teamLogo",
        },
      ],
    });
  if (!tournament) {
    throw new Error("Tournament not found.");
  }
  return {
    success: true,
    fixtures: tournament.fixtures,
  };
};


export const generateNextRound = async (
  tournamentId: string,
  organizerId: string
) => {
  const tournament = await Tournament.findById(tournamentId);

  if (!tournament) {
    throw new Error("Tournament not found.");
  }

  if (tournament.organizer.toString() !== organizerId) {
    throw new Error("Unauthorized.");
  }

  const currentRound = tournament.currentRound;

  const currentMatches = await Match.find({
    tournament: tournamentId,
    round: currentRound,
  });

  if (currentMatches.length === 0) {
    throw new Error("No matches found.");
  }

  const unfinished = currentMatches.some(
    (m) => m.status !== "completed"
  );

  if (unfinished) {
    throw new Error(
      "Complete all matches before generating next round."
    );
  }

  const winners: any[] = [];

  for (const match of currentMatches) {
    if (!match.winner) {
      throw new Error("Winner missing.");
    }

    winners.push(match.winner);
  }

  if (winners.length === 1) {
    tournament.winner = winners[0];
    tournament.status = "completed";

    await tournament.save();

    return {
      success: true,
      message: "Tournament completed.",
      winner: winners[0],
    };
  }

  const nextRound =
    currentRound === "ROUND_OF_16"
      ? "QUARTER_FINAL"
      : currentRound === "QUARTER_FINAL"
      ? "SEMI_FINAL"
      : currentRound === "SEMI_FINAL"
      ? "FINAL"
      : "FINAL";

  const fixtures = [];

  for (let i = 0; i < winners.length; i += 2) {
    const match = await Match.create({
      tournament: tournament._id,
      organizer: organizerId,
      sport: tournament.sport,
      location: tournament.location,
      scheduledAt: new Date(),
      teamA: winners[i],
      teamB: winners[i + 1],
      round: nextRound,
      status: "pending",
    });

    fixtures.push(match._id);
  }

  tournament.currentRound = nextRound;
  tournament.fixtures.push(...fixtures);

  await tournament.save();

  return {
    success: true,
    message: `${nextRound} fixtures generated.`,
    fixtures,
  };
};

export const getTournamentMVP = async (
  tournamentId: string
) => {
  const players = await MVP.aggregate([
    {
      $match: {
        tournament: tournamentId,
      },
    },

    {
      $group: {
        _id: "$player",

        totalScore: {
          $sum: "$mvpScore",
        },

        averageRating: {
          $avg: "$rating",
        },

        matches: {
          $sum: 1,
        },

        sport: {
          $first: "$sport",
        },

        team: {
          $first: "$team",
        },
      },
    },

    {
      $sort: {
        totalScore: -1,
      },
    },

    {
      $limit: 1,
    },

    {
      $lookup: {
        from: "registers",
        localField: "_id",
        foreignField: "_id",
        as: "player",
      },
    },

    {
      $lookup: {
        from: "teams",
        localField: "team",
        foreignField: "_id",
        as: "team",
      },
    },

    {
      $unwind: "$player",
    },

    {
      $unwind: "$team",
    },
  ]);

  if (!players.length) {
    throw new Error("Tournament MVP not found.");
  }

  return players[0];
};

