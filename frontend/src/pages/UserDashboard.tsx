import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Activity, MapPin, Trophy, Target, User as UserIcon, Shield, Loader2,
  Calendar, TrendingUp, Star, Users, Clock, ChevronRight, Award,
  BrainCircuit, Sparkles, Bell, Mail, Edit3,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Separator } from "@/components/ui/Separator"
import { useAuth } from "@/context/AuthContext"

const ACTIVITY = [
  { id: 1, action: "Joined Kathmandu Premier League", type: "tournament", time: "2 days ago", icon: Trophy },
  { id: 2, action: "Booked Dashrath Stadium", type: "booking", time: "5 days ago", icon: Calendar },
  { id: 3, action: "Team registered: Kathmandu Kings", type: "team", time: "1 week ago", icon: Users },
  { id: 4, action: "Completed match vs Pokhara Strikers", type: "match", time: "2 weeks ago", icon: Activity },
  { id: 5, action: "Earned 'Rising Star' achievement", type: "achievement", time: "3 weeks ago", icon: Award },
]

const UPCOMING = [
  { id: 1, title: "Kathmandu Premier League", date: "Aug 15, 2026", time: "7:00 AM", sport: "Cricket", venue: "Dashrath Stadium", role: "Batsman" },
  { id: 2, title: "Practice Session", date: "Jul 20, 2026", time: "6:00 AM", sport: "Cricket", venue: "Bhrikuti Ground", role: "All-rounder" },
]

const STATS = [
  { label: "Matches", value: "45", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Wins", value: "32", icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Win Rate", value: "71%", icon: TrendingUp, color: "text-violet-500", bg: "bg-violet-500/10" },
  { label: "Rank", value: "#3", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Streak", value: "5", icon: BrainCircuit, color: "text-rose-500", bg: "bg-rose-500/10" },
  { label: "Karma", value: "1,250", icon: Sparkles, color: "text-cyan-500", bg: "bg-cyan-500/10" },
]

const NOTIFICATIONS_QUICK = [
  { icon: Users, text: "3 join requests pending", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Mail, text: "2 new invitations", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Bell, text: "Match reminder: Tomorrow 7 AM", color: "text-amber-500", bg: "bg-amber-500/10" },
]

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [isAuthenticated, navigate])

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
              {NOTIFICATIONS_QUICK.map((n, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-muted/30 p-2.5">
                  <div className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${n.bg} ${n.color}`}>
                    <n.icon className="size-3.5" />
                  </div>
                  <p className="text-xs">{n.text}</p>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-xs mt-1">View All</Button>
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
                <Badge variant="secondary" className="text-[10px]">{UPCOMING.length} upcoming</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {UPCOMING.map((item) => (
                <div key={item.id} className="group rounded-xl border bg-card p-4 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold leading-none">{item.date.split(" ")[1]?.replace(",", "")}</span>
                        <span className="text-[10px] text-muted-foreground">{item.date.split(" ")[0]}</span>
                      </div>
                      <Separator orientation="vertical" className="h-10" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm group-hover:text-violet-500 transition-colors">{item.title}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="size-3" />{item.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="size-3" />{item.venue}</span>
                          <Badge variant="secondary" className="text-[9px]">{item.sport}</Badge>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px]">{item.role}</Badge>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-xs">View Calendar →</Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="size-4 text-rose-500" /> Recent Activity
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">{ACTIVITY.length} activities</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              {ACTIVITY.map((item) => (
                <div key={item.id} className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-muted/30 transition-colors">
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                    item.type === "tournament" ? "bg-amber-500/10 text-amber-500" :
                    item.type === "booking" ? "bg-blue-500/10 text-blue-500" :
                    item.type === "team" ? "bg-emerald-500/10 text-emerald-500" :
                    item.type === "match" ? "bg-rose-500/10 text-rose-500" :
                    "bg-violet-500/10 text-violet-500"
                  }`}>
                    <item.icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.action}</p>
                    <p className="text-[10px] text-muted-foreground">{item.time}</p>
                  </div>
                  <ChevronRight className="size-3.5 text-muted-foreground shrink-0 mt-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="size-4 text-emerald-500" /> Performance Overview
          </CardTitle>
          <CardDescription>Your recent match statistics and rankings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Runs", value: "1,250", sub: "+120 this month", color: "text-blue-500" },
              { label: "Wickets", value: "45", sub: "+8 this month", color: "text-emerald-500" },
              { label: "Catches", value: "22", sub: "+3 this month", color: "text-amber-500" },
              { label: "MOTM Awards", value: "8", sub: "+2 this month", color: "text-violet-500" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-muted/20 p-4 text-center">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
