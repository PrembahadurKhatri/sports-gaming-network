/*
//Your app.ts should only have 4 things:
1)Import Express
2)Create app
3)app.use(express.json())
4)Export app

// Nothing else.
*/

//npm install cors
//npm install -D @types/cors



import express from "express";//Imports the Express library.
import cors from "cors";//CORS = Cross-Origin Resource Sharing यसले CORS middleware लाई project मा import गर्छ।
import authRoutes from "./routes/auth.routes";
import teamRoutes from "./routes/team.routes";
import sportEventRoutes from "./routes/sportevent.routes";
import matchRoutes from "./routes/match.route";
import matchEventRoutes from "./routes/matchevent.routes";
import matchStatRoutes from "./routes/matchstat.routes";
import playerRankingRoutes from "./routes/playerranking.routes";
import teamStatsRoutes from "./routes/teamstats.routes";
import playerStatsRoutes from "./routes/playerstats.routes";
import mvpRoutes from "./routes/mvp.routes";
import tournamentRoutes from "./routes/tournament.route"
import tournamentStandingRoutes from "./routes/tournamentstanding.routes";
import groundRoutes from "./routes/ground.routes";
import groundBookingRoutes from "./routes/groundBooking.routes";
const app = express();//Creates an Express application.

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
app.use(express.json());//"If the frontend sends JSON, automatically convert it into req.body."


app.use("/api/auth",authRoutes);
app.use("/api/mvp", mvpRoutes);
app.use("/api/playerstats", playerStatsRoutes);
app.use("/api/teams", teamRoutes);
app.use(
  "/api/tournament-standings",
  tournamentStandingRoutes
);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/sports", sportEventRoutes);
export default app; 
app.use("/api/matches", matchRoutes);
app.use("/api/matches", matchEventRoutes);
app.use("/api/match-stats", matchStatRoutes);
app.use("/api/player-ranking", playerRankingRoutes);
app.use("/api/teamstats", teamStatsRoutes);
app.use("/api/grounds", groundRoutes);
app.use("/api/ground-bookings", groundBookingRoutes);
/*
CORS भनेको के हो?
CORS = Cross-Origin Resource Sharing
Browser ले सुरक्षा कारणले एउटा website लाई अर्को website सँग freely communicate गर्न दिँदैन।
उदाहरण:
Frontend
http://localhost:5173

Backend
http://localhost:5000
यी दुई different origin हुन्।
किन?
URL	Origin
http://localhost:5173	localhost:5173
http://localhost:5000	localhost:5000
Port फरक भएकाले origin फरक हुन्छ।
त्यसैले Browser भन्छ:
"Backend ले अनुमति नदिएसम्म request पठाउन मिल्दैन।"
*/