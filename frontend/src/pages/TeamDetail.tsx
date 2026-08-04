import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { MapPinIcon, UsersIcon, ArrowLeftIcon } from "lucide-react"
import api from "@/api/axios"
import { useAuth } from "@/context/AuthContext"

export default function TeamDetail() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [joining, setJoining] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const { data } = await api.get(`/teams/${id}`)
        setTeam(data.team || data)
      } catch (err: any) {
        setMessage(err?.response?.data?.message || "Failed to load team.")
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  async function handleJoin() {
    if (!isAuthenticated) {
      setMessage("Please login to join a team.")
      return
    }
    setJoining(true)
    setMessage("")
    try {
      const { data } = await api.post(`/teams/${id}/join`)
      setMessage(data.message || "Join request sent.")
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to send join request.")
    } finally {
      setJoining(false)
    }
  }

  if (loading) return <p className="py-20 text-center text-muted-foreground">Loading team...</p>
  if (!team) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-medium">{message || "Team not found"}</p>
        <Button className="mt-4" asChild><Link to="/find-teams">Back to teams</Link></Button>
      </div>
    )
  }

  const members = team.members || []

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link to="/find-teams"><ArrowLeftIcon className="size-4 mr-1" /> Back</Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar size="lg">
              {team.teamLogo ? (
                <img src={team.teamLogo} alt={team.teamName} className="size-full object-cover rounded-full" />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                  {(team.teamName || "TM").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-2xl">{team.teamName}</CardTitle>
                <Badge>{team.sport}</Badge>
                {team.teamType && <Badge variant="secondary">{team.teamType}</Badge>}
              </div>
              <CardDescription className="mt-2 flex items-center gap-1">
                <MapPinIcon className="size-3.5" />
                {team.location || team.province || "Nepal"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {team.description && <p className="text-muted-foreground">{team.description}</p>}

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1"><UsersIcon className="size-4" />{members.length} members</span>
            {team.maxPlayers && <span>Max {team.maxPlayers}</span>}
            {team.skillLevel && <Badge variant="outline">{team.skillLevel}</Badge>}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Members</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {members.map((m: any) => (
                <div key={m._id || m} className="flex items-center gap-2 rounded-lg border p-2">
                  <Avatar size="sm">
                    <AvatarFallback>{(m.fullname || "?").slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{m.fullname || "Member"}</p>
                    <p className="text-xs text-muted-foreground">{m.position || m.skillLevel || ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {message && <p className="text-sm text-muted-foreground">{message}</p>}

          <Button onClick={handleJoin} disabled={joining} className="bg-gradient-to-r from-violet-600 to-indigo-600">
            {joining ? "Sending..." : "Request to Join"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
