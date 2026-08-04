import express from "express";
import cors from "cors";
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
import tournamentRoutes from "./routes/tournament.route";
import tournamentStandingRoutes from "./routes/tournamentstanding.routes";
import groundRoutes from "./routes/ground.routes";
import groundBookingRoutes from "./routes/groundBooking.routes";
import paymentRoutes from "./routes/payment.routes";
import chatRoutes from "./routes/chat.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import invitationRoutes from "./routes/invitation.routes";
import notificationRoutes from "./routes/notification.routes";
import teamRankingRoutes from "./routes/teamranking.routes";
import uploadRoutes from "./routes/upload";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/mvp", mvpRoutes);
app.use("/api/playerstats", playerStatsRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/tournament-standings", tournamentStandingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/sports", sportEventRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/matches", matchEventRoutes);
app.use("/api/match-stats", matchStatRoutes);
app.use("/api/player-ranking", playerRankingRoutes);
app.use("/api/teamstats", teamStatsRoutes);
app.use("/api/grounds", groundRoutes);
app.use("/api/ground-bookings", groundBookingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", invitationRoutes);
app.use("/api", notificationRoutes);
app.use("/api/team-ranking", teamRankingRoutes);
app.use("/api", uploadRoutes);

export default app;
