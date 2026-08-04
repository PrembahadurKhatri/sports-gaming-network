import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { MapPinIcon, ArrowLeftIcon } from "lucide-react"
import api from "@/api/axios"
import { useAuth } from "@/context/AuthContext"

export default function PlayerDetail() {
  const { id } = useParams()
  const { isAuthenticated, user } = useAuth()
  const [player, setPlayer] = useState<any>(null)
  const [myTeams, setMyTeams] = useState<any[]>([])
  const [selectedTeam, setSelectedTeam] = useState("")
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [inviting, setInviting] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const { data } = await api.get(`/auth/${id}`)
        setPlayer(data.player)
        if (isAuthenticated) {
          const teamsRes = await api.post("/teams/my-teams")
          const owned = (teamsRes.data.teams || []).filter(
            (t: any) => t.owner?._id === user?._id || t.owner === user?._id
          )
          setMyTeams(owned)
          if (owned[0]) setSelectedTeam(owned[0]._id)
        }
      } catch (err: any) {
        setMessage(err?.response?.data?.message || "Failed to load player.")
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id, isAuthenticated, user?._id])

  async function handleInvite() {
    if (!selectedTeam) {
      setMessage("Select one of your teams first.")
      return
    }
    setInviting(true)
    setMessage("")
    try {
      const { data } = await api.post(`/teams/${selectedTeam}/invite/${id}`)
      setMessage(data.message || "Invitation sent.")
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to invite player.")
    } finally {
      setInviting(false)
    }
  }

  if (loading) return <p className="py-20 text-center text-muted-foreground">Loading player...</p>
  if (!player) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-medium">{message || "Player not found"}</p>
        <Button className="mt-4" asChild><Link to="/find-players">Back</Link></Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link to="/find-players"><ArrowLeftIcon className="size-4 mr-1" /> Back</Link>
      </Button>

      <Card>
        <CardHeader className="text-center">
          <Avatar className="mx-auto size-20">
            {player.profilePhoto ? (
              <img src={player.profilePhoto} alt={player.fullname} className="size-full object-cover rounded-full" />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-xl">
                {(player.fullname || "PL").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <CardTitle className="mt-4 text-2xl">{player.fullname}</CardTitle>
          <CardDescription className="flex items-center justify-center gap-1">
            <MapPinIcon className="size-3.5" />
            {player.location || player.province || "Nepal"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            <Badge>{player.sport}</Badge>
            {player.position && <Badge variant="secondary">{player.position}</Badge>}
            {player.skillLevel && <Badge variant="outline">{player.skillLevel}</Badge>}
            {player.gender && <Badge variant="outline">{player.gender}</Badge>}
          </div>
          {player.bio && <p className="text-center text-muted-foreground">{player.bio}</p>}

          {isAuthenticated && myTeams.length > 0 && user?._id !== player._id && (
            <div className="rounded-lg border p-4 space-y-3">
              <p className="text-sm font-medium">Invite to your team</p>
              <select
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                {myTeams.map((t) => (
                  <option key={t._id} value={t._id}>{t.teamName}</option>
                ))}
              </select>
              <Button onClick={handleInvite} disabled={inviting} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600">
                {inviting ? "Sending..." : "Send Invitation"}
              </Button>
            </div>
          )}

          {message && <p className="text-sm text-center text-muted-foreground">{message}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
