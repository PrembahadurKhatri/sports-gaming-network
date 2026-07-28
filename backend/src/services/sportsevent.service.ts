import {
    SportName,
    getAllEventsForSport,
    getSportSpecificEvents,
} from "./../models/sportsevent";

export const getEvents = (sport: SportName) => {
    return getAllEventsForSport(sport);
};

export const getSpecificEvents = (sport: SportName) => {
    return getSportSpecificEvents(sport);
};