import { SPORT_RULES } from "./../models/sportrules";

export const COMMON_MATCH_EVENTS = [
    "Match Started",
    "Match Paused",
    "Match Resumed",
    "Match Ended",
    "Timeout",
    "Player Injury",
    "Player Return",
    "Substitution",
    "Captain Changed",
    "Walkover",
    "Forfeit",
    "Match Cancelled",
    "Match Abandoned",
    "Protest",
    "Challenge",
    "MVP Awarded",
] as const;

export const SPORT_EVENTS = {

    Cricket: [
        "Run",
        "Four",
        "Six",
        "Wicket",
        "Wide",
        "No Ball",
        "Bye",
        "Leg Bye",
        "Run Out",
        "LBW",
        "Catch",
        "Bowled",
        "Stumping",
        "Hit Wicket",
        "Dot Ball",
        "Maiden Over",
        "Toss Won",
        "Toss Decision",
        "Innings Started",
        "Innings Ended",
        "Over Completed",
        "Powerplay Started",
        "Powerplay Ended",
        "Drinks Break",
        "Rain Delay",
        "Super Over",
        "Review (DRS)",
        "Player Retired Hurt",
    ],
    Football: [
        "Goal",
        "Own Goal",
        "Penalty Goal",
        "Penalty Miss",
        "Free Kick Goal",
        "Corner",
        "Yellow Card",
        "Red Card",
        "Offside",
        "Foul",
        "Assist",
        "Save",
        "Kick Off",
        "Half Time",
        "Full Time",
        "Extra Time Started",
        "Penalty Shootout",
        "VAR Review",
        "Injury Time",
    ],

    Basketball: [
        "2 Pointer",
        "3 Pointer",
        "Free Throw",
        "Rebound",
        "Assist",
        "Steal",
        "Block",
        "Turnover",
        "Foul",
        "Jump Ball",
        "Quarter Started",
        "Quarter End",
        "Overtime",
        "Technical Foul",
        "Flagrant Foul",
        "Shot Clock Violation",
        "Ejection",
    ],

    Volleyball: [
        "Serve",
        "Ace",
        "Spike",
        "Block",
        "Dig",
        "Attack Error",
        "Service Error",
        "Set Started",
        "Set Won",
        "Match Won",
        "Rotation Fault",
        "Net Touch",
        "Double Contact",
    ],

    Tennis: [
        "Ace",
        "Double Fault",
        "Winner",
        "Forced Error",
        "Unforced Error",
        "Break Point",
        "Set Point",
        "Match Point",
        "Tie Break Point",
        "Game Won",
        "Set Won",
        "Match Won",
        "Tie Break Started",
        "Medical Timeout",
        "Retired",
    ],

    Badminton: [
        "Smash",
        "Drop Shot",
        "Net Kill",
        "Lift",
        "Clear",
        "Service Fault",
        "Game Won",
        "Match Won",
        "Interval",
        "Medical Timeout",
    ],

    Kabaddi: [
        "Raid",
        "Touch Point",
        "Bonus Point",
        "Super Raid",
        "Super Tackle",
        "All Out",
        "Raid Started",
        "Raid Ended",
        "Revival",
        "Do or Die Raid",
        "Empty Raid",
    ],

    Hockey: [
        "Goal",
        "Penalty Corner",
        "Penalty Stroke",
        "Green Card",
        "Yellow Card",
        "Red Card",
        "Assist",
        "Save",
        "Quarter Started",
        "Quarter End",
        "Video Referral",
        "Shootout",
    ],
    Handball: [
        "Goal",
        "7m Throw",
        "Fast Break",
        "Suspension",
        "Yellow Card",
        "Red Card",
        "2 Minute Suspension",
        "Overtime",
        "Assist",
        "Save",
    ],

    Futsal: [
        "Goal",
        "Own Goal",
        "Penalty Goal",
        "Penalty Miss",
        "Free Kick Goal",
        "Corner",
        "Yellow Card",
        "Red Card",
        "Offside",
        "Foul",
        "Assist",
        "Save",
        "Kick Off",
        "Half Time",
        "Full Time",
        "Extra Time Started",
        "Penalty Shootout",
        "VAR Review",
        "Injury Time",
    ],

} as const satisfies Record<keyof typeof SPORT_RULES, readonly string[]>;

export type SportName = keyof typeof SPORT_EVENTS;
export type SportEvent<S extends SportName> = (typeof SPORT_EVENTS)[S][number];
export type AnySportEvent = SportEvent<SportName>;


export function getAllEventsForSport<S extends SportName>(sport: S): string[] {
    const rule = SPORT_RULES[sport];

    let combined: string[] = [...COMMON_MATCH_EVENTS, ...SPORT_EVENTS[sport]];

    if (!rule.mvpSupported) {
        combined = combined.filter((e) => e !== "MVP Awarded");
    }

    return Array.from(new Set(combined));
}

export function getSportSpecificEvents<S extends SportName>(sport: S): readonly string[] {
    return SPORT_EVENTS[sport];
}