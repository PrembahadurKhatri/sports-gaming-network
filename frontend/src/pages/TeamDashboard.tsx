import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import {
  Users, MapPin, Trophy, Shield, Loader2, Star, Calendar,
  TrendingUp, Target, Activity, Award, ChevronRight, Mail,
  Phone, Settings, Plus, UserPlus, Clock, Medal,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Separator } from "@/components/ui/Separator"
import { useAuth } from "@/context/AuthContext"
import api from "@/api/axios"

interface TeamData {
  _id: string
  teamName: string
  sport: string
  teamType: string
  location: string
  province: string
  homeGround: string
  foundedYear: number
  contactNumber: string
  teamEmail: string
  description: string
  skillLevel: string
  maxPlayers: number
  teamLogo?: string
  owner: { _id: string; fullname: string; email: string } | string
  members: { _id: string; fullname: string; email?: string; sport?: string; position?: string; profilePhoto?: string }[]
  createdAt: string
}

interface JoinRequest {
  _id: string
  player: { _id: string; fullname: string; position?: string; skillLevel?: string; profilePhoto?: string }
  status: string
  message?: string
  createdAt: string
}

const TEAM_STATS = [
  { label: "Matches", value: "24", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Won", value: "18", icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Lost", value: "6", icon: TrendingUp, color: "text-rose-500", bg: "bg-rose-500/10" },
  { label: "Win Rate", value: "75%", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Rank", value: "#1", icon: Medal, color: "text-violet-500", bg: "bg-violet-500/10" },
  { label: "Points", value: "92", icon: Star, color: "text-cyan-500", bg: "bg-cyan-500/10" },
]

const UPCOMING_MATCHES = [
  { id: 1, opponent: "Pokhara Strikers", date: "Aug 15", time: "7:00 AM", venue: "Dashrath Stadium", type: "League" },
  { id: 2, opponent: "Lalitpur Legends", date: "Aug 22", time: "8:00 AM", venue: "Bhrikuti Ground", type: "League" },
]

export default function TeamDashboard() {
  const { user, isAuthenticated, token } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [team, setTeam] = useState<TeamData | null>(null)
  const [userTeams, setUserTeams] = useState<TeamData[]>([])
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  async function fetchTeams() {
    try {
      const res = await api.post("/teams/my-teams")
      const teams: TeamData[] = res.data?.teams ?? []
      setUserTeams(teams)
      return teams
    } catch {
      return []
    }
  }

  async function fetchTeamById(id: string) {
    try {
      const res = await api.get(`/teams/${id}`)
      const t = res.data?.team
      if (t) setTeam(t)
      return t
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load team")
      return null
    }
  }

  async function fetchRequests(teamId: string) {
    try {
      const res = await api.get(`/teams/${teamId}/request`)
      const requests: JoinRequest[] = res.data?.requests ?? []
      setJoinRequests(requests)
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    async function init() {
      setIsLoading(true)
      const teamIdFromUrl = searchParams.get("teamId")

      if (teamIdFromUrl) {
        const t = await fetchTeamById(teamIdFromUrl)
        if (t) fetchRequests(teamIdFromUrl)
      } else {
        const teams = await fetchTeams()
        if (teams.length > 0) {
          const t = await fetchTeamById(teams[0]._id)
          if (t) fetchRequests(teams[0]._id)
        }
      }
      setIsLoading(false)
    }
    init()
  }, [isAuthenticated, navigate])

  async function handleAccept(requestId: string) {
    setActionLoading(requestId)
    try {
      await api.patch(`/teams/requests/${requestId}/accept`)
      setJoinRequests((prev) => prev.filter((r) => r._id !== requestId))
    } catch {
      // ignore
    } finally {
      setActionLoading(null)
    }
  }

  async function handleReject(requestId: string) {
    setActionLoading(requestId)
    try {
      await api.patch(`/teams/requests/${requestId}/reject`)
      setJoinRequests((prev) => prev.filter((r) => r._id !== requestId))
    } catch {
      // ignore
    } finally {
      setActionLoading(null)
    }
  }

  function getInitials(name: string) {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?"
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-emerald-500" />
          <p className="text-sm text-muted-foreground">Loading team dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  if (error && !team) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <Shield className="size-12 text-muted-foreground/30" />
          <p className="text-lg font-semibold">No Team Found</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button asChild size="sm">
            <Link to="/team-registration">Create a Team</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <Shield className="size-12 text-muted-foreground/30" />
          <p className="text-lg font-semibold">No Team Yet</p>
          <p className="text-sm text-muted-foreground">You haven't created or joined any teams yet.</p>
          <Button asChild size="sm">
            <Link to="/team-registration">Create a Team</Link>
          </Button>
        </div>
      </div>
    )
  }

  const memberCount = Array.isArray(team.members) ? team.members.length : 0
  const teamOwnerId = typeof team.owner === "string" ? team.owner : team.owner?._id
  const isOwner = teamOwnerId === user?._id

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your team, players, and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link to="/find-players"><UserPlus className="size-4" /> Find Players</Link>
          </Button>
          <Button size="sm" variant="outline" className="gap-2">
            <Settings className="size-4" /> Settings
          </Button>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600" asChild>
            <Link to="/tournaments"><Plus className="size-4" /> Browse Tournaments</Link>
          </Button>
        </div>
      </div>

      {/* Team Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-teal-600/5 to-cyan-600/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-600/10 to-transparent rounded-full blur-3xl" />
        <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
            {team.teamLogo ? (
              <img src={team.teamLogo} alt={team.teamName} className="relative size-24 rounded-2xl border-4 border-background shadow-xl object-cover" />
            ) : (
              <div className="relative size-24 rounded-2xl border-4 border-background shadow-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                <Shield className="size-12 text-white/80" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 p-1.5 bg-background rounded-full border shadow-sm">
              <Star className="size-4 text-amber-500 fill-amber-500" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
              <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] uppercase tracking-wider">
                {team.teamType} Team
              </Badge>
              <Badge variant="secondary" className="text-[10px]">{team.sport}</Badge>
              <Badge variant="outline" className="text-[10px]">
                <Users className="size-3 mr-1" /> {memberCount}/{team.maxPlayers}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold">{team.teamName}</h2>
            <p className="text-sm text-muted-foreground max-w-xl mt-1">{team.description}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="size-3.5" />{team.location}, {team.province}</span>
              <span className="flex items-center gap-1"><Trophy className="size-3.5" />{team.skillLevel || "N/A"}</span>
              <span className="flex items-center gap-1"><Calendar className="size-3.5" />Founded {team.foundedYear || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {TEAM_STATS.map((stat) => (
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
        {/* Left Sidebar */}
        <div className="space-y-3">
          {/* Contact */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Mail className="size-4 text-blue-500" /> Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="size-4 text-muted-foreground shrink-0" />
                <span className="truncate">{team.teamEmail || "—"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="size-4 text-muted-foreground shrink-0" />
                <span>{team.contactNumber || "—"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="size-4 text-muted-foreground shrink-0" />
                <span>{team.homeGround || "—"}</span>
              </div>
            </CardContent>
          </Card>

          {/* Join Requests */}
          {isOwner && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <UserPlus className="size-4 text-amber-500" /> Join Requests
                  </CardTitle>
                  <Badge className="bg-amber-500/10 text-amber-600 text-[10px]">{joinRequests.length} new</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {joinRequests.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-2">No pending requests</p>
                ) : (
                  joinRequests.map((req) => {
                    const player = req.player || {}
                    const pname = player.fullname || "Unknown"
                    return (
                      <div key={req._id} className="flex items-center gap-3 rounded-lg bg-muted/30 p-2.5">
                        <Avatar size="sm">
                          <AvatarFallback className="bg-gradient-to-br from-amber-600 to-orange-600 text-white text-[10px]">
                            {getInitials(pname)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{pname}</p>
                          <p className="text-[10px] text-muted-foreground">{player.position || "N/A"} · {player.skillLevel || "N/A"}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            className="h-7 w-7 p-0 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                            disabled={actionLoading === req._id}
                            onClick={() => handleAccept(req._id)}
                          >✓</Button>
                          <Button
                            size="sm"
                            className="h-7 w-7 p-0 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            disabled={actionLoading === req._id}
                            onClick={() => handleReject(req._id)}
                          >✗</Button>
                        </div>
                      </div>
                    )
                  })
                )}
                <Button variant="ghost" size="sm" className="w-full text-xs">Manage Requests →</Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="size-4 text-violet-500" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link to="/find-players">Find Players <ChevronRight className="size-3.5" /></Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link to="/tournaments">Browse Tournaments <ChevronRight className="size-3.5" /></Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link to="/grounds">Book Ground <ChevronRight className="size-3.5" /></Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between">
                Invite Players <ChevronRight className="size-3.5" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 space-y-3">
          {/* Upcoming Matches */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="size-4 text-emerald-500" /> Upcoming Matches
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">{UPCOMING_MATCHES.length} scheduled</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {UPCOMING_MATCHES.map((match) => (
                <div key={match.id} className="group rounded-xl border bg-card p-4 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center bg-muted rounded-lg px-3 py-2">
                        <span className="text-sm font-bold">{match.date.split(" ")[0]}</span>
                        <span className="text-[10px] text-muted-foreground">2026</span>
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-emerald-500 transition-colors">vs {match.opponent}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="size-3" />{match.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="size-3" />{match.venue}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">{match.type}</Badge>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-xs">View Full Schedule →</Button>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="size-4 text-blue-500" /> Team Members
                </CardTitle>
                <span className="text-xs text-muted-foreground">{memberCount} / {team.maxPlayers}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.isArray(team.members) && team.members.length > 0 ? (
                  team.members.map((member, i) => {
                    const mname = typeof member === "string" ? "Unknown" : member.fullname || "Unknown"
                    const mid = typeof member === "string" ? member : member._id
                    const isTeamOwner = mid === teamOwnerId
                    const initials = getInitials(mname)
                    return (
                      <div key={mid || i} className="flex items-center justify-between rounded-lg bg-muted/30 p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarFallback className={isTeamOwner ? "bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-[10px]" : "bg-muted text-muted-foreground text-[10px]"}>
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{mname}{isTeamOwner ? " (Owner)" : ""}</p>
                            <p className="text-[10px] text-muted-foreground">{member.position || "N/A"}</p>
                          </div>
                        </div>
                        <Badge className={isTeamOwner ? "bg-emerald-500/10 text-emerald-600 text-[9px]" : "bg-blue-500/10 text-blue-600 text-[9px]"}>
                          {isTeamOwner ? "Captain" : "Player"}
                        </Badge>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">No members yet</p>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3 gap-2">
                <UserPlus className="size-3.5" /> Invite Players
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="size-4 text-rose-500" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {[
                  { text: `Team "${team.teamName}" created`, time: new Date(team.createdAt).toLocaleDateString(), type: "join" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-muted/30 transition-colors">
                    <div className={`flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500`}>
                      <UserPlus className="size-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{item.text}</p>
                      <p className="text-[10px] text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
