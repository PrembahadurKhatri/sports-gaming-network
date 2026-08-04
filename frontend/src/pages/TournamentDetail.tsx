import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, TrophyIcon, UsersIcon } from "lucide-react"
import api from "@/api/axios"
import { useAuth } from "@/context/AuthContext"

export default function TournamentDetail() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [tournament, setTournament] = useState<any>(null)
  const [standings, setStandings] = useState<any[]>([])
  const [fixtures, setFixtures] = useState<any[]>([])
  const [myTeams, setMyTeams] = useState<any[]>([])
  const [selectedTeam, setSelectedTeam] = useState("")
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [busy, setBusy] = useState(false)

  async function load() {
    if (!id) return
    setLoading(true)
    try {
      const [tRes, sRes] = await Promise.all([
        api.get(`/tournaments/${id}`),
        api.get(`/tournament-standings/${id}`).catch(() => ({ data: { standings: [] } })),
      ])
      setTournament(tRes.data.tournament)
      setStandings(sRes.data.standings || sRes.data || [])
      try {
        const fRes = await api.get(`/tournaments/${id}/fixtures`)
        setFixtures(fRes.data.fixtures || fRes.data.tournament?.fixtures || [])
      } catch {
        setFixtures([])
      }
      if (isAuthenticated) {
        const teamsRes = await api.post("/teams/my-teams")
        const owned = (teamsRes.data.teams || []).filter(
          (t: any) => t.owner?._id === user?._id || t.owner === user?._id
        )
        setMyTeams(owned)
        if (owned[0]) setSelectedTeam(owned[0]._id)
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to load tournament.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [id, isAuthenticated, user?._id])

  const isOrganizer =
    tournament &&
    (tournament.organizer?._id === user?._id || tournament.organizer === user?._id)

  async function registerTeam() {
    if (!selectedTeam) return setMessage("Select a team to register.")
    setBusy(true)
    setMessage("")
    try {
      const { data } = await api.post(`/tournaments/${id}/register`, { teamId: selectedTeam })
      setMessage(data.message || "Team registered.")
      await load()
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Registration failed.")
    } finally {
      setBusy(false)
    }
  }

  async function withdrawTeam() {
    if (!selectedTeam) return
    setBusy(true)
    try {
      const { data } = await api.delete(`/tournaments/${id}/withdraw`, { data: { teamId: selectedTeam } })
      setMessage(data.message || "Withdrawn.")
      await load()
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Withdraw failed.")
    } finally {
      setBusy(false)
    }
  }

  async function startTournament() {
    setBusy(true)
    try {
      const { data } = await api.patch(`/tournaments/${id}/start`)
      setMessage(data.message || "Tournament started.")
      await load()
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Could not start tournament.")
    } finally {
      setBusy(false)
    }
  }

  async function finishTournament() {
    setBusy(true)
    try {
      const { data } = await api.patch(`/tournaments/${id}/finish`)
      setMessage(data.message || "Tournament finished.")
      await load()
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Could not finish tournament.")
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <p className="py-20 text-center text-muted-foreground">Loading...</p>
  if (!tournament) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p>{message || "Tournament not found"}</p>
        <Button className="mt-4" asChild><Link to="/tournaments">Back</Link></Button>
      </div>
    )
  }

  const locationLabel = [tournament.location?.venue, tournament.location?.district, tournament.location?.province]
    .filter(Boolean)
    .join(", ")

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/tournaments"><ArrowLeftIcon className="size-4 mr-1" /> Back</Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{tournament.status}</Badge>
            <Badge variant="outline">{tournament.sport}</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">{tournament.tournamentName}</CardTitle>
          <CardDescription className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1"><MapPinIcon className="size-3.5" />{locationLabel || "Nepal"}</span>
            {tournament.startDate && (
              <span className="flex items-center gap-1">
                <CalendarIcon className="size-3.5" />
                {new Date(tournament.startDate).toLocaleDateString()}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tournament.description && <p className="text-muted-foreground">{tournament.description}</p>}
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1"><TrophyIcon className="size-4 text-amber-500" /> Prize Rs. {tournament.prizePool ?? 0}</span>
            <span>Entry Rs. {tournament.registrationFee ?? 0}</span>
            <span className="flex items-center gap-1"><UsersIcon className="size-4" />{tournament.registeredTeams?.length || 0} teams</span>
          </div>

          {isAuthenticated && myTeams.length > 0 && (
            <div className="rounded-lg border p-4 space-y-3">
              <p className="text-sm font-medium">Register your team</p>
              <select
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                {myTeams.map((t) => (
                  <option key={t._id} value={t._id}>{t.teamName}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <Button disabled={busy} onClick={registerTeam}>Register</Button>
                <Button variant="outline" disabled={busy} onClick={withdrawTeam}>Withdraw</Button>
              </div>
            </div>
          )}

          {isOrganizer && (
            <div className="flex gap-2">
              <Button disabled={busy} onClick={startTournament}>Start</Button>
              <Button variant="outline" disabled={busy} onClick={finishTournament}>Finish</Button>
            </div>
          )}

          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Registered Teams</CardTitle></CardHeader>
        <CardContent>
          {(tournament.registeredTeams || []).length === 0 ? (
            <p className="text-sm text-muted-foreground">No teams registered yet.</p>
          ) : (
            <ul className="space-y-2">
              {tournament.registeredTeams.map((rt: any, i: number) => (
                <li key={rt._id || i} className="rounded-lg border px-3 py-2 text-sm">
                  {rt.team?.teamName || "Team"}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {standings.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Standings</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="p-2 text-left">Team</th>
                  <th className="p-2 text-center">P</th>
                  <th className="p-2 text-center">W</th>
                  <th className="p-2 text-center">L</th>
                  <th className="p-2 text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((s: any) => (
                  <tr key={s._id} className="border-b last:border-0">
                    <td className="p-2">{s.team?.teamName || "—"}</td>
                    <td className="p-2 text-center">{s.played ?? 0}</td>
                    <td className="p-2 text-center">{s.won ?? 0}</td>
                    <td className="p-2 text-center">{s.lost ?? 0}</td>
                    <td className="p-2 text-right">{s.points ?? s.rankingPoints ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {fixtures.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Fixtures</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {fixtures.map((f: any) => (
              <div key={f._id} className="rounded-lg border px-3 py-2 text-sm flex justify-between gap-2">
                <span>{f.teamA?.teamName || "Team A"} vs {f.teamB?.teamName || "Team B"}</span>
                <Badge variant="secondary">{f.status || "scheduled"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
