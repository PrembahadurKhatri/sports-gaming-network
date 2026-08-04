import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Activity, MapPin, Trophy, Target, Shield, Loader2,
  Calendar, TrendingUp, Star, Users, Clock, ChevronRight, Award,
  Sparkles, Bell, Mail, Edit3,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { useAuth } from "@/context/AuthContext"
import api from "@/api/axios"

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboard, setDashboard] = useState<any>(null)
  const [ranking, setRanking] = useState<any>(null)
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    async function load() {
      try {
        const [dashRes, matchRes] = await Promise.all([
          api.get("/dashboard/player"),
          api.get("/matches").catch(() => ({ data: { matches: [] } })),
        ])
        setDashboard(dashRes.data.dashboard)
        setMatches(matchRes.data.matches || [])
        if (user?.sport) {
          try {
            const rankRes = await api.get("/player-ranking/me", { params: { sport: user.sport } })
            setRanking(rankRes.data.ranking)
          } catch {
            setRanking(null)
          }
        }
      } catch {
        setDashboard(null)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [isAuthenticated, navigate, user?.sport])

  const STATS = [
    { label: "Matches", value: String(ranking?.played ?? 0), icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Wins", value: String(ranking?.won ?? 0), icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Win Rate", value: `${ranking?.winRate ?? 0}%`, icon: TrendingUp, color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "Rank", value: ranking?.rank ? `#${ranking.rank}` : "—", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "MVP", value: String(ranking?.mvpAwards ?? 0), icon: Award, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Points", value: String(ranking?.rankingPoints ?? 0), icon: Sparkles, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ]

  const notifications = dashboard?.notifications || []
  const invitations = dashboard?.invitation || []
  const requests = dashboard?.requests || []
  const team = dashboard?.team
  const upcoming = matches.filter((m) => ["PENDING", "ACCEPTED", "ONGOING"].includes(m.status)).slice(0, 5)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-violet-500" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Player Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, {user.fullname}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link to="/find-teams"><Users className="size-4" /> Find Teams</Link>
          </Button>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600" asChild>
            <Link to="/player-registration"><Edit3 className="size-4" /> Edit Profile</Link>
          </Button>
        </div>
      </div>

      {/* Profile Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm group">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-indigo-600/5 to-blue-600/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-600/10 to-transparent rounded-full blur-3xl" />
        <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-violet-500/20 blur-2xl rounded-full" />
            <Avatar size="lg" className="size-24 border-4 border-background shadow-xl">
              <AvatarImage src={user.profilePhoto} />
              <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-2xl">
                {user.fullname?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 p-1.5 bg-background rounded-full border shadow-sm">
              <Shield className="size-4 text-violet-500" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
              <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider">
                {user.role || "Player"}
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                {user.skillLevel || "Intermediate"}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                ★ {user.streak_count || 0} streak
              </Badge>
            </div>
            <h2 className="text-2xl font-bold">{user.fullname}</h2>
            <p className="text-sm text-muted-foreground max-w-xl mt-1">
              {user.bio || "No bio added yet. Update your profile to let teams know about you!"}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-sm text-muted-foreground">
              {user.location && <span className="flex items-center gap-1"><MapPin className="size-3.5" />{user.location}{user.province ? `, ${user.province}` : ""}</span>}
              {user.sport && <span className="flex items-center gap-1"><Trophy className="size-3.5" />{user.sport}</span>}
              {user.position && <span className="flex items-center gap-1"><Target className="size-3.5" />{user.position}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-3 text-center hover:shadow-md transition-shadow">
            <div className={`mx-auto flex size-8 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="size-4" />
            </div>
            <p className="text-lg font-bold mt-1.5">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Notifications */}
        <div className="space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bell className="size-4 text-amber-500" /> Quick Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Users className="size-3.5" />
                </div>
                <p className="text-xs">{requests.length} join requests pending</p>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Mail className="size-3.5" />
                </div>
                <p className="text-xs">{invitations.length} invitations</p>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Bell className="size-3.5" />
                </div>
                <p className="text-xs">{notifications.length} notifications</p>
              </div>
              {team && (
                <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                    <Shield className="size-3.5" />
                  </div>
                  <p className="text-xs">Team: {team.teamName}</p>
                </div>
              )}
              <Button variant="outline" size="sm" className="w-full text-xs mt-1" asChild>
                <Link to="/matches">Open Matches</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="size-4 text-violet-500" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link to="/find-teams">Find Teams <ChevronRight className="size-3.5" /></Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link to="/tournaments">Browse Tournaments <ChevronRight className="size-3.5" /></Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link to="/team-registration">Register a Team <ChevronRight className="size-3.5" /></Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link to="/grounds">Book a Ground <ChevronRight className="size-3.5" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming */}
        <div className="lg:col-span-2 space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="size-4 text-emerald-500" /> Upcoming Matches & Events
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">{upcoming.length} upcoming</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming matches. Challenge a team from Matches.</p>
              ) : (
                upcoming.map((item) => (
                  <div key={item._id} className="group rounded-xl border bg-card p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">
                          {item.teamA?.teamName || "Team A"} vs {item.teamB?.teamName || "Team B"}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="size-3" />{item.startTime}</span>
                          <span className="flex items-center gap-1"><MapPin className="size-3" />{item.venue}</span>
                          <Badge variant="secondary" className="text-[9px]">{item.sport}</Badge>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px]">{item.status}</Badge>
                    </div>
                  </div>
                ))
              )}
              <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                <Link to="/matches">View all matches →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="size-4 text-rose-500" /> Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground p-2">No recent notifications.</p>
              ) : (
                notifications.slice(0, 5).map((item: any) => (
                  <div key={item._id} className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-muted/30 transition-colors">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                      <Bell className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{item.title || item.message}</p>
                      <p className="text-[10px] text-muted-foreground">{item.message}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="size-4 text-emerald-500" /> Quick Links
          </CardTitle>
          <CardDescription>Jump into bookings and rankings</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild><Link to="/my-bookings">My Bookings</Link></Button>
          <Button variant="outline" size="sm" asChild><Link to="/rankings">Rankings</Link></Button>
          <Button variant="outline" size="sm" asChild><Link to="/matches">Matches</Link></Button>
        </CardContent>
      </Card>
    </div>
  )
}
