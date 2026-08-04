import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import api from "@/api/axios"
import { useAuth } from "@/context/AuthContext"

const SPORTS = ["Cricket", "Football", "Volleyball", "Handball", "Basketball", "Hockey", "Tennis", "Badminton", "Futsal", "Kabaddi"]

export default function Matches() {
  const { user } = useAuth()
  const [matches, setMatches] = useState<any[]>([])
  const [myTeams, setMyTeams] = useState<any[]>([])
  const [allTeams, setAllTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    sport: "Football",
    venue: "",
    matchDate: "",
    startTime: "10:00",
    notes: "",
  })

  async function load() {
    setLoading(true)
    try {
      const [mRes, tRes, searchRes] = await Promise.all([
        api.get("/matches"),
        api.post("/teams/my-teams"),
        api.get("/teams/search"),
      ])
      setMatches(mRes.data.matches || mRes.data || [])
      const owned = (tRes.data.teams || []).filter(
        (t: any) => t.owner?._id === user?._id || t.owner === user?._id
      )
      setMyTeams(owned)
      if (owned[0] && !form.teamA) setForm((f) => ({ ...f, teamA: owned[0]._id, sport: owned[0].sport || f.sport }))
      setAllTeams(searchRes.data.teams || [])
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to load matches.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [user?._id])

  async function createChallenge(e: React.FormEvent) {
    e.preventDefault()
    setMessage("")
    try {
      const { data } = await api.post("/matches", form)
      setMessage(data.message || "Challenge sent.")
      await load()
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to create match.")
    }
  }

  async function action(matchId: string, path: string, method: "patch" | "delete" = "patch") {
    try {
      if (method === "delete") await api.delete(`/matches/${matchId}`)
      else await api.patch(`/matches/${matchId}/${path}`)
      await load()
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Action failed.")
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Matches</h1>
        <p className="text-sm text-muted-foreground">Challenge teams and manage your fixtures.</p>
      </div>

      {message && <p className="text-sm text-muted-foreground">{message}</p>}

      <Card>
        <CardHeader><CardTitle>Create Challenge</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={createChallenge} className="grid gap-3 sm:grid-cols-2">
            <select
              className="rounded-lg border bg-background px-3 py-2 text-sm"
              value={form.teamA}
              onChange={(e) => setForm({ ...form, teamA: e.target.value })}
              required
            >
              <option value="">Your team</option>
              {myTeams.map((t) => <option key={t._id} value={t._id}>{t.teamName}</option>)}
            </select>
            <select
              className="rounded-lg border bg-background px-3 py-2 text-sm"
              value={form.teamB}
              onChange={(e) => setForm({ ...form, teamB: e.target.value })}
              required
            >
              <option value="">Opponent team</option>
              {allTeams.filter((t) => t._id !== form.teamA).map((t) => (
                <option key={t._id} value={t._id}>{t.teamName}</option>
              ))}
            </select>
            <select
              className="rounded-lg border bg-background px-3 py-2 text-sm"
              value={form.sport}
              onChange={(e) => setForm({ ...form, sport: e.target.value })}
            >
              {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <Input placeholder="Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} required />
            <Input type="date" value={form.matchDate} onChange={(e) => setForm({ ...form, matchDate: e.target.value })} required />
            <Input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} required />
            <Input className="sm:col-span-2" placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <Button type="submit" className="sm:col-span-2">Send Challenge</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">My Matches</h2>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : matches.length === 0 ? (
          <p className="text-muted-foreground">No matches yet.</p>
        ) : (
          matches.map((m) => (
            <Card key={m._id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-medium">
                    {m.teamA?.teamName || "Team A"} vs {m.teamB?.teamName || "Team B"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {m.sport} · {m.venue} · {m.matchDate ? new Date(m.matchDate).toLocaleDateString() : ""} {m.startTime}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{m.status}</Badge>
                  {m.status === "PENDING" && (
                    <>
                      <Button size="sm" onClick={() => action(m._id, "accept")}>Accept</Button>
                      <Button size="sm" variant="outline" onClick={() => action(m._id, "reject")}>Reject</Button>
                    </>
                  )}
                  {m.status === "ACCEPTED" && (
                    <Button size="sm" onClick={() => action(m._id, "start")}>Start</Button>
                  )}
                  {m.status === "ONGOING" && (
                    <Button size="sm" onClick={() => action(m._id, "finish")}>Finish</Button>
                  )}
                  {(m.status === "PENDING" || m.status === "ACCEPTED") && (
                    <Button size="sm" variant="destructive" onClick={() => action(m._id, "", "delete")}>Cancel</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
