import MatchEvent from "../models/matchevent";
import Match from "../models/match";
import Team from "../models/teamregister"
import { SportName, getAllEventsForSport } from "../models/sportsevent";

interface AddEventInput {
    event: string;
    team?: string;
    player?: string;
    minute?: number;
    innings?: number;
    over?: number;
    ball?: number;
    quarter?: number;
    set?: number;
    raid?: number;
    value?: number;
    description?: string;
}

const assertAuthorized = async (userId: string, match: any) => {
    const authorized = await Team.findOne({
        owner: userId,
        _id: {
            $in: [match.teamA, match.teamB],
        },
    });
    if (!authorized) {
        throw new Error("Unauthorized.");
    }
};

export const addEvent = async (
    matchId: string,
    userId: string,
    data: AddEventInput
) => {
    const match = await Match.findById(matchId);
    if (!match)
        throw new Error("Match not found.");
    if (match.status !== "ongoing") {
        throw new Error("Match is not currently ongoing.");
    }
    if (
        data.team &&
        data.team.toString() !== match.teamA.toString() &&
        data.team.toString() !== match.teamB.toString()
    ) {
        throw new Error("Invalid team.");
    }
    if (data.player && data.team) {
        const team = await Team.findOne({
            _id: data.team,
            members: data.player,
        });
        if (!team) {
            throw new Error("Player is not in this team.");
        }
    }

    await assertAuthorized(userId, match);

    const allowedEvents = getAllEventsForSport(
        match.sport as SportName
    );
    if (!allowedEvents.includes(data.event)) {
        throw new Error("Invalid event.");
    }
    const event = await MatchEvent.create({
        match: matchId,
        sport: match.sport,
        createdBy: userId,
        ...data,
    });
    await updateMatchScore(match, data);
    return event;
};

export const getTimeline = async (
    matchId: string
) => {
    return MatchEvent.find({
        match: matchId,
    })
        .populate("player", "fullname profilePhoto")
        .populate("team", "teamName teamLogo")
        .sort({
            createdAt: 1,
        });
};

export const updateEvent = async (
    eventId: string,
    userId: string,
    data: Partial<AddEventInput>
) => {

    const event = await MatchEvent.findById(eventId);
    if (!event) {
        throw new Error("Event not found.");
    }

    const match = await Match.findById(event.match);
    if (!match) {
        throw new Error("Match not found.");
    }
    if (match.status !== "ongoing") {
    throw new Error("Match is not ongoing.");
}
    await assertAuthorized(userId, match);

    await rollbackMatchScore(match, event);

    Object.assign(event, data);
    await event.save();

    await updateMatchScore(match, event.toObject() as ScoreEventData);

    return event;
};

interface ScoreEventData {
    event: string;
    team?: string;
    value?: number;
}

export const updateMatchScore = async (
    match: any,
    data: ScoreEventData
) => {
    if (!data.team) {
        return;
    }

    const isTeamA = String(data.team) === String(match.teamA);

    const addScore = (points: number) => {
        if (isTeamA) {
            match.teamAScore += points;
        } else {
            match.teamBScore += points;
        }
    };

    switch (match.sport) {

        case "Football":
        case "Futsal":
        case "Hockey":
        case "Handball":

            if (
                data.event === "Goal" ||
                data.event === "Penalty Goal"
            ) {
                addScore(1);
            } else if (data.event === "Own Goal") {
                if (isTeamA) {
                    match.teamBScore++;
                } else {
                    match.teamAScore++;
                }
            }

            break;

        case "Basketball":

            switch (data.event) {

                case "Free Throw":
                    addScore(1);
                    break;

                case "2 Pointer":
                    addScore(2);
                    break;

                case "3 Pointer":
                    addScore(3);
                    break;
            }

            break;


        case "Cricket":

            switch (data.event) {

                case "Run":
                    addScore(data.value ?? 1);
                    break;

                case "Four":
                    addScore(4);
                    break;

                case "Six":
                    addScore(6);
                    break;

                case "Wide":
                    addScore(1);
                    break;

                case "No Ball":
                    addScore(1);
                    break;

                case "Bye":
                    addScore(data.value ?? 1);
                    break;

                case "Leg Bye":
                    addScore(data.value ?? 1);
                    break;
            }

            break;

        case "Volleyball":

            if (data.event === "Set Won") {
                addScore(1);
            }

            break;

        case "Tennis":

            if (data.event === "Set Won") {
                addScore(1);
            }

            break;

        case "Badminton":

            if (data.event === "Game Won") {
                addScore(1);
            }

            break;

        case "Kabaddi":

            switch (data.event) {

                case "Touch Point":
                    addScore(1);
                    break;

                case "Bonus Point":
                    addScore(1);
                    break;

                case "Super Raid":
                    addScore(3);
                    break;

                case "Super Tackle":
                    addScore(2);
                    break;

                case "All Out":
                    addScore(2);
                    break;
            }

            break;
    }

    await match.save();
};

export const rollbackMatchScore = async (
    match: any,
    event: any
) => {
    if (!event.team) return;

    const isTeamA = String(event.team) === String(match.teamA);

    const reduceScore = (points: number) => {
        if (isTeamA) {
            match.teamAScore -= points;
        } else {
            match.teamBScore -= points;
        }
    };

    switch (match.sport) {

        case "Football":
        case "Futsal":
        case "Hockey":
        case "Handball":

            if (
                event.event === "Goal" ||
                event.event === "Penalty Goal"
            ) {
                reduceScore(1);
            } else if (event.event === "Own Goal") {
                if (isTeamA) {
                    match.teamBScore--;
                } else {
                    match.teamAScore--;
                }
            }

            break;

        case "Basketball":

            switch (event.event) {

                case "Free Throw":
                    reduceScore(1);
                    break;

                case "2 Pointer":
                    reduceScore(2);
                    break;

                case "3 Pointer":
                    reduceScore(3);
                    break;
            }

            break;

        case "Cricket":

            switch (event.event) {

                case "Run":
                    reduceScore(event.value ?? 1);
                    break;

                case "Four":
                    reduceScore(4);
                    break;

                case "Six":
                    reduceScore(6);
                    break;

                case "Wide":
                    reduceScore(1);
                    break;

                case "No Ball":
                    reduceScore(1);
                    break;

                case "Bye":
                    reduceScore(event.value ?? 1);
                    break;

                case "Leg Bye":
                    reduceScore(event.value ?? 1);
                    break;
            }

            break;

        case "Volleyball":

            if (event.event === "Set Won") {
                reduceScore(1);
            }

            break;

        case "Tennis":

            if (event.event === "Set Won") {
                reduceScore(1);
            }

            break;

        case "Badminton":

            if (event.event === "Game Won") {
                reduceScore(1);
            }

            break;

        case "Kabaddi":

            switch (event.event) {

                case "Touch Point":
                    reduceScore(1);
                    break;

                case "Bonus Point":
                    reduceScore(1);
                    break;

                case "Super Raid":
                    reduceScore(3);
                    break;

                case "Super Tackle":
                    reduceScore(2);
                    break;

                case "All Out":
                    reduceScore(2);
                    break;
            }

            break;
    }

    await match.save();
};

export const deleteEvent = async (
    eventId: string,
    userId: string
) => {
    const event = await MatchEvent.findById(eventId);

    if (!event) {
        throw new Error("Event not found.");
    }

    const match = await Match.findById(event.match);

    if (!match) {
        throw new Error("Match not found.");
    }
    if (match.status !== "ongoing") {
    throw new Error("Match is not ongoing.");
}

    await assertAuthorized(userId, match);

    await rollbackMatchScore(match, event);

    await event.deleteOne();

    return true;
};