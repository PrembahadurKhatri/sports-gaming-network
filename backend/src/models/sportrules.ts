
export interface MatchFormatPreset {
    name: string; // e.g. "T20", "ODI", "Test", "90 Minutes", "Best of 3"
    isDefault?: boolean;

    durationType: "TIME" | "SETS" | "OVERS" | "POINTS";

    // Time based
    matchMinutes?: number;
    halves?: number;
    quarters?: number;
    quarterMinutes?: number;
    days?: number; // multi-day formats like Test cricket

    // Over based
    overs?: number;
    powerplayOvers?: number;

    // Set based
    bestOfSets?: number;
    winningSets?: number;
    pointsPerSet?: number;

    // Overrides (optional — falls back to the sport-level rule if omitted)
    allowDraw?: boolean;
    allowExtraTime?: boolean;
    allowPenaltyShootout?: boolean;
}


export interface PlayerFormat {
    name: string;
    playersPerSide: number;
    isDefault?: boolean;
}

export interface SportRule {
    // Team
    teamBased: boolean;
    minTeams: number;
    maxTeams: number;

   
    playersPerSide: number;
    minimumSquad: number;
    maximumSquad: number;
    substitutes: number;
    playerFormats: PlayerFormat[];
    teamType:
    | "Club"
    | "School"
    | "College"
    | "National"
    | "Any";
    statistics: {
        playerStats: boolean;
        teamStats: boolean;
        leaderboard: boolean;
    };
    fieldType:
    | "Indoor"
    | "Outdoor"
    | "Both";
    // Match Format
    durationType: "TIME" | "SETS" | "OVERS" | "POINTS";
    matchFormats: MatchFormatPreset[];
    tournamentFormats: (
        | "Knockout"
        | "League"
        | "RoundRobin"
        | "GroupStage"
    )[];
    ageCategories: (
        | "U12"
        | "U16"
        | "U19"
        | "Senior"
        | "Veteran"
    )[];
    rankingPoints: {
        win: number;
        draw: number;
        loss: number;
    };
    // Time Based
    matchMinutes?: number;
    halves?: number;
    periods?: number;
    periodMinutes?: number;
    quarters?: number;
    quarterMinutes?: number;
    // Set Based
    bestOfSets?: number;
    pointsPerSet?: number;
    winningSets?: number;
    // Over Based
    defaultOvers?: number;
    powerplayOvers?: number;
    superOver?: boolean;
    // General Rules
    allowDraw: boolean;
    allowExtraTime: boolean;
    allowPenaltyShootout: boolean;
    homeAway: boolean;
    // Gender
    gender: ("Male" | "Female")[];
    // Scoring
    scoreType:
    | "Runs"
    | "Goals"
    | "Points"
    | "Sets"
    | "Games"
    | "Frames"
    | "Time";
    // Misc
    rankingSupported: boolean;
    mvpSupported: boolean;
    // Officiating / Venue requirements
    requiresUmpire: boolean;
    requiresReferee: boolean;
    requiresGroundBooking: boolean;
    // Live experience features
    supportsLiveScore: boolean;
    supportsStreaming: boolean;
    // Recognition features
    supportsPlayerAwards: boolean;
    supportsMVP: boolean;
    supportsStatistics: boolean;
    // Squad management features
    supportsSubstitution: boolean;
    supportsCaptain: boolean;
    supportsViceCaptain: boolean;
    // Match resolution
    supportsTieBreaker: boolean;
}
export type Sport =
    | "Cricket"
    | "Football"
    | "Volleyball"
    | "Handball"
    | "Basketball"
    | "Hockey"
    | "Tennis"
    | "Badminton"
    | "Futsal"
    | "Kabaddi";
export const SPORT_RULES: Record<Sport, SportRule> = {
    Cricket: {
        teamBased: true,
        minTeams: 2,
        maxTeams: 32,
        playersPerSide: 11,
        minimumSquad: 11,
        maximumSquad: 15,
        substitutes: 4,
        playerFormats: [
            { name: "Standard", playersPerSide: 11, isDefault: true },
        ],
        teamType: "Any",
        fieldType: "Outdoor",
        durationType: "OVERS",
        defaultOvers: 20,
        powerplayOvers: 6,
        superOver: true,
        matchFormats: [
            { name: "T20", isDefault: true, durationType: "OVERS", overs: 20, powerplayOvers: 6, allowDraw: false },
            { name: "ODI", durationType: "OVERS", overs: 50, powerplayOvers: 10, allowDraw: false },
            { name: "Test", durationType: "TIME", days: 5, allowDraw: true },
        ],
        tournamentFormats: ["Knockout", "League", "RoundRobin", "GroupStage"],
        ageCategories: ["U12", "U16", "U19", "Senior", "Veteran"],
        rankingPoints: { win: 2, draw: 1, loss: 0 },
        statistics: {
            playerStats: true,
            teamStats: true,
            leaderboard: true
        },
        allowDraw: true,
        allowExtraTime: false,
        allowPenaltyShootout: false,
        homeAway: true,
        gender: ["Male", "Female"],
        scoreType: "Runs",
        rankingSupported: true,
        mvpSupported: true,
        requiresUmpire: true,
        requiresReferee: false,
        requiresGroundBooking: true,
        supportsLiveScore: true,
        supportsStreaming: true,
        supportsPlayerAwards: true,
        supportsMVP: true,
        supportsStatistics: true,
        supportsSubstitution: false,
        supportsCaptain: true,
        supportsViceCaptain: true,
        supportsTieBreaker: true,
    },

    Football: {
        teamBased: true,
        minTeams: 2,
        maxTeams: 32,
        playersPerSide: 11,
        minimumSquad: 11,
        maximumSquad: 18,
        substitutes: 7,
        playerFormats: [
            { name: "Standard", playersPerSide: 11, isDefault: true },
        ],
        teamType: "Any",
        fieldType: "Outdoor",
        durationType: "TIME",
        matchMinutes: 90,
        halves: 2,
        matchFormats: [
            { name: "90 Minutes", isDefault: true, durationType: "TIME", matchMinutes: 90, halves: 2, allowDraw: true, allowExtraTime: false, allowPenaltyShootout: false },
            { name: "Knockout (with Extra Time)", durationType: "TIME", matchMinutes: 90, halves: 2, allowDraw: false, allowExtraTime: true, allowPenaltyShootout: true },
        ],
        tournamentFormats: ["Knockout", "League", "RoundRobin", "GroupStage"],
        ageCategories: ["U12", "U16", "U19", "Senior", "Veteran"],
        rankingPoints: { win: 3, draw: 1, loss: 0 },
        statistics: {
            playerStats: true,
            teamStats: true,
            leaderboard: true
        },
        allowDraw: true,
        allowExtraTime: true,
        allowPenaltyShootout: true,
        homeAway: true,
        gender: ["Male", "Female"],
        scoreType: "Goals",
        rankingSupported: true,
        mvpSupported: true,
        requiresUmpire: false,
        requiresReferee: true,
        requiresGroundBooking: true,
        supportsLiveScore: true,
        supportsStreaming: true,
        supportsPlayerAwards: true,
        supportsMVP: true,
        supportsStatistics: true,
        supportsSubstitution: true,
        supportsCaptain: true,
        supportsViceCaptain: true,
        supportsTieBreaker: true,
    },

    Futsal: {
        teamBased: true,
        minTeams: 2,
        maxTeams: 32,
        playersPerSide: 5,
        minimumSquad: 5,
        maximumSquad: 10,
        substitutes: 5,
        playerFormats: [
            { name: "Standard", playersPerSide: 5, isDefault: true },
        ],
        teamType: "Any",
        fieldType: "Indoor",
        durationType: "TIME",
        matchMinutes: 40,
        halves: 2,
        matchFormats: [
            { name: "40 Minutes", isDefault: true, durationType: "TIME", matchMinutes: 40, halves: 2, allowDraw: true, allowExtraTime: false, allowPenaltyShootout: false },
            { name: "Knockout (with Extra Time)", durationType: "TIME", matchMinutes: 40, halves: 2, allowDraw: false, allowExtraTime: true, allowPenaltyShootout: true },
        ],
        tournamentFormats: ["Knockout", "League", "RoundRobin", "GroupStage"],
        ageCategories: ["U12", "U16", "U19", "Senior", "Veteran"],
        rankingPoints: { win: 3, draw: 1, loss: 0 },
        statistics: {
            playerStats: true,
            teamStats: true,
            leaderboard: true
        },
        allowDraw: true,
        allowExtraTime: true,
        allowPenaltyShootout: true,
        homeAway: false,
        gender: ["Male", "Female"],
        scoreType: "Goals",
        rankingSupported: true,
        mvpSupported: true,
        requiresUmpire: false,
        requiresReferee: true,
        requiresGroundBooking: true,
        supportsLiveScore: true,
        supportsStreaming: true,
        supportsPlayerAwards: true,
        supportsMVP: true,
        supportsStatistics: true,
        supportsSubstitution: true,
        supportsCaptain: true,
        supportsViceCaptain: true,
        supportsTieBreaker: true,
    },

    Basketball: {
        teamBased: true,
        minTeams: 2,
        maxTeams: 32,
        playersPerSide: 5,
        minimumSquad: 5,
        maximumSquad: 12,
        substitutes: 7,
        playerFormats: [
            { name: "Standard", playersPerSide: 5, isDefault: true },
        ],
        teamType: "Any",
        fieldType: "Outdoor",
        durationType: "TIME",
        quarters: 4,
        quarterMinutes: 10,
        matchFormats: [
            { name: "FIBA (4x10)", isDefault: true, durationType: "TIME", quarters: 4, quarterMinutes: 10, allowExtraTime: true },
            { name: "NBA (4x12)", durationType: "TIME", quarters: 4, quarterMinutes: 12, allowExtraTime: true },
        ],
        tournamentFormats: ["Knockout", "League", "RoundRobin", "GroupStage"],
        ageCategories: ["U12", "U16", "U19", "Senior", "Veteran"],
        rankingPoints: { win: 2, draw: 0, loss: 0 },
        statistics: {
            playerStats: true,
            teamStats: true,
            leaderboard: true
        },
        allowDraw: false,
        allowExtraTime: true,
        allowPenaltyShootout: false,
        homeAway: true,

        gender: ["Male", "Female"],

        scoreType: "Points",

        rankingSupported: true,
        mvpSupported: true,

        requiresUmpire: false,
        requiresReferee: true,
        requiresGroundBooking: true,

        supportsLiveScore: true,
        supportsStreaming: true,

        supportsPlayerAwards: true,
        supportsMVP: true,
        supportsStatistics: true,

        supportsSubstitution: true,
        supportsCaptain: true,
        supportsViceCaptain: true,

        supportsTieBreaker: true,
    },

    Volleyball: {
        teamBased: true,
        minTeams: 2,
        maxTeams: 32,
        playersPerSide: 6,
        minimumSquad: 6,
        maximumSquad: 12,
        substitutes: 6,
        playerFormats: [
            { name: "Standard", playersPerSide: 6, isDefault: true },
        ],
        teamType: "Any",
        fieldType: "Outdoor",
        durationType: "SETS",
        bestOfSets: 5,
        winningSets: 3,
        pointsPerSet: 25,
        matchFormats: [
            { name: "Best of 3", isDefault: true, durationType: "SETS", bestOfSets: 3, winningSets: 2, pointsPerSet: 25 },
            { name: "Best of 5", durationType: "SETS", bestOfSets: 5, winningSets: 3, pointsPerSet: 25 },
        ],
        tournamentFormats: ["Knockout", "League", "RoundRobin", "GroupStage"],
        ageCategories: ["U12", "U16", "U19", "Senior", "Veteran"],
        rankingPoints: { win: 2, draw: 0, loss: 0 },
        statistics: {
            playerStats: true,
            teamStats: true,
            leaderboard: true
        },
        allowDraw: false,
        allowExtraTime: false,
        allowPenaltyShootout: false,
        homeAway: false,

        gender: ["Male", "Female"],

        scoreType: "Sets",

        rankingSupported: true,
        mvpSupported: true,

        requiresUmpire: true,
        requiresReferee: false,
        requiresGroundBooking: true,

        supportsLiveScore: true,
        supportsStreaming: true,

        supportsPlayerAwards: true,
        supportsMVP: true,
        supportsStatistics: true,

        supportsSubstitution: true,
        supportsCaptain: true,
        supportsViceCaptain: true,

        supportsTieBreaker: false,
    },

    Handball: {
        teamBased: true,
        minTeams: 2,
        maxTeams: 32,
        playersPerSide: 7,
        minimumSquad: 7,
        maximumSquad: 14,
        substitutes: 7,
        playerFormats: [
            { name: "Standard", playersPerSide: 7, isDefault: true },
        ],
        teamType: "Any",
        fieldType: "Outdoor",
        durationType: "TIME",
        matchMinutes: 60,
        halves: 2,
        matchFormats: [
            { name: "60 Minutes", isDefault: true, durationType: "TIME", matchMinutes: 60, halves: 2, allowDraw: true, allowExtraTime: false },
            { name: "Knockout (with Extra Time)", durationType: "TIME", matchMinutes: 60, halves: 2, allowDraw: false, allowExtraTime: true },
        ],
        tournamentFormats: ["Knockout", "League", "RoundRobin", "GroupStage"],
        ageCategories: ["U12", "U16", "U19", "Senior", "Veteran"],
        rankingPoints: { win: 3, draw: 1, loss: 0 },
        statistics: {
            playerStats: true,
            teamStats: true,
            leaderboard: true
        },
        allowDraw: true,
        allowExtraTime: true,
        allowPenaltyShootout: false,
        homeAway: true,

        gender: ["Male", "Female"],

        scoreType: "Goals",

        rankingSupported: true,
        mvpSupported: true,

        requiresUmpire: false,
        requiresReferee: true,
        requiresGroundBooking: true,

        supportsLiveScore: true,
        supportsStreaming: true,

        supportsPlayerAwards: true,
        supportsMVP: true,
        supportsStatistics: true,

        supportsSubstitution: true,
        supportsCaptain: true,
        supportsViceCaptain: true,

        supportsTieBreaker: true,
    },

    Hockey: {
        teamBased: true,
        minTeams: 2,
        maxTeams: 32,
        playersPerSide: 11,
        minimumSquad: 11,
        maximumSquad: 16,
        substitutes: 5,
        playerFormats: [
            { name: "Standard", playersPerSide: 11, isDefault: true },
        ],
        teamType: "Any",
        fieldType: "Outdoor",
        durationType: "TIME",
        quarters: 4,
        quarterMinutes: 15,
        matchFormats: [
            { name: "60 Minutes (4x15)", isDefault: true, durationType: "TIME", quarters: 4, quarterMinutes: 15, allowDraw: true, allowExtraTime: false },
            { name: "Knockout (with Extra Time)", durationType: "TIME", quarters: 4, quarterMinutes: 15, allowDraw: false, allowExtraTime: true, allowPenaltyShootout: true },
        ],
        tournamentFormats: ["Knockout", "League", "RoundRobin", "GroupStage"],
        ageCategories: ["U12", "U16", "U19", "Senior", "Veteran"],
        rankingPoints: { win: 3, draw: 1, loss: 0 },
        statistics: {
            playerStats: true,
            teamStats: true,
            leaderboard: true
        },
        allowDraw: true,
        allowExtraTime: true,
        allowPenaltyShootout: true,
        homeAway: true,

        gender: ["Male", "Female"],

        scoreType: "Goals",

        rankingSupported: true,
        mvpSupported: true,

        requiresUmpire: false,
        requiresReferee: true,
        requiresGroundBooking: true,

        supportsLiveScore: true,
        supportsStreaming: true,

        supportsPlayerAwards: true,
        supportsMVP: true,
        supportsStatistics: true,

        supportsSubstitution: true,
        supportsCaptain: true,
        supportsViceCaptain: true,

        supportsTieBreaker: true,
    },

    Kabaddi: {
        teamBased: true,
        minTeams: 2,
        maxTeams: 32,
        playersPerSide: 7,
        minimumSquad: 7,
        maximumSquad: 12,
        substitutes: 5,
        playerFormats: [
            { name: "Standard", playersPerSide: 7, isDefault: true },
        ],
        teamType: "Any",
        fieldType: "Outdoor",
        durationType: "TIME",
        matchMinutes: 40,
        halves: 2,
        matchFormats: [
            { name: "40 Minutes (2x20)", isDefault: true, durationType: "TIME", matchMinutes: 40, halves: 2, allowDraw: false },
        ],
        tournamentFormats: ["Knockout", "League", "RoundRobin", "GroupStage"],
        ageCategories: ["U12", "U16", "U19", "Senior", "Veteran"],
        rankingPoints: { win: 2, draw: 0, loss: 0 },
        statistics: {
            playerStats: true,
            teamStats: true,
            leaderboard: true
        },
        allowDraw: false,
        allowExtraTime: false,
        allowPenaltyShootout: false,
        homeAway: false,

        gender: ["Male", "Female"],

        scoreType: "Points",

        rankingSupported: true,
        mvpSupported: true,

        requiresUmpire: true,
        requiresReferee: false,
        requiresGroundBooking: true,

        supportsLiveScore: true,
        supportsStreaming: true,

        supportsPlayerAwards: true,
        supportsMVP: true,
        supportsStatistics: true,

        supportsSubstitution: true,
        supportsCaptain: true,
        supportsViceCaptain: true,

        supportsTieBreaker: true,
    },

    Tennis: {
        teamBased: false,
        minTeams: 2,
        maxTeams: 100,
        playersPerSide: 1,
        minimumSquad: 1,
        maximumSquad: 2,
        substitutes: 0,
        playerFormats: [
            { name: "Singles", playersPerSide: 1, isDefault: true },
            { name: "Doubles", playersPerSide: 2 },
        ],
        teamType: "Any",
        fieldType: "Indoor",
        durationType: "SETS",
        bestOfSets: 3,
        winningSets: 2,
        pointsPerSet: 6,
        matchFormats: [
            { name: "Best of 3", isDefault: true, durationType: "SETS", bestOfSets: 3, winningSets: 2, pointsPerSet: 6 },
            { name: "Best of 5", durationType: "SETS", bestOfSets: 5, winningSets: 3, pointsPerSet: 6 },
        ],
        tournamentFormats: ["Knockout", "League", "RoundRobin", "GroupStage"],
        ageCategories: ["U12", "U16", "U19", "Senior", "Veteran"],
        rankingPoints: { win: 2, draw: 0, loss: 0 },
        statistics: {
            playerStats: true,
            teamStats: true,
            leaderboard: true
        },
        allowDraw: false,
        allowExtraTime: false,
        allowPenaltyShootout: false,
        homeAway: false,

        gender: ["Male", "Female"],

        scoreType: "Sets",

        rankingSupported: true,
        mvpSupported: true,

        requiresUmpire: true,
        requiresReferee: false,
        requiresGroundBooking: true,

        supportsLiveScore: true,
        supportsStreaming: true,

        supportsPlayerAwards: true,
        supportsMVP: false,
        supportsStatistics: true,

        supportsSubstitution: false,
        supportsCaptain: false,
        supportsViceCaptain: false,

        supportsTieBreaker: true,
    },

    Badminton: {
        teamBased: false,
        minTeams: 2,
        maxTeams: 100,
        playersPerSide: 1,
        minimumSquad: 1,
        maximumSquad: 2,
        substitutes: 0,
        playerFormats: [
            { name: "Singles", playersPerSide: 1, isDefault: true },
            { name: "Doubles", playersPerSide: 2 },
        ],
        teamType: "Any",
        fieldType: "Indoor",
        durationType: "SETS",
        bestOfSets: 3,
        winningSets: 2,
        pointsPerSet: 21,
        matchFormats: [
            { name: "Best of 3", isDefault: true, durationType: "SETS", bestOfSets: 3, winningSets: 2, pointsPerSet: 21 },
        ],
        tournamentFormats: ["Knockout", "League", "RoundRobin", "GroupStage"],
        ageCategories: ["U12", "U16", "U19", "Senior", "Veteran"],
        rankingPoints: { win: 2, draw: 0, loss: 0 },
        statistics: {
            playerStats: true,
            teamStats: true,
            leaderboard: true
        },
        allowDraw: false,
        allowExtraTime: false,
        allowPenaltyShootout: false,
        homeAway: false,

        gender: ["Male", "Female"],

        scoreType: "Sets",

        rankingSupported: true,
        mvpSupported: true,

        requiresUmpire: true,
        requiresReferee: false,
        requiresGroundBooking: true,

        supportsLiveScore: true,
        supportsStreaming: true,

        supportsPlayerAwards: true,
        supportsMVP: false,
        supportsStatistics: true,

        supportsSubstitution: false,
        supportsCaptain: false,
        supportsViceCaptain: false,

        supportsTieBreaker: true,
    },
};

export function getPlayerFormats(sport: Sport): PlayerFormat[] {
    return SPORT_RULES[sport].playerFormats;
}

export function getPlayersPerSide(sport: Sport, formatName?: string): number {
    const rule = SPORT_RULES[sport];
    const format = formatName
        ? rule.playerFormats.find((f) => f.name === formatName)
        : rule.playerFormats.find((f) => f.isDefault);
    return format?.playersPerSide ?? rule.playersPerSide;
}

export function getDefaultPlayerFormat(sport: Sport): string | undefined {
    const rule = SPORT_RULES[sport];
    return (
        rule.playerFormats.find((f) => f.isDefault)?.name ??
        rule.playerFormats[0]?.name
    );
}