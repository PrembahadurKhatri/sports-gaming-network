import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { ArrowLeftIcon } from "lucide-react"
import api from "@/api/axios"

const SPORTS = ["Cricket", "Football", "Volleyball", "Handball", "Basketball", "Hockey", "Tennis", "Badminton", "Futsal", "Kabaddi"]

export default function TournamentCreate() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    tournamentName: "",
    description: "",
    sport: "Football",
    province: "Bagmati",
    district: "",
    venue: "",
    rules: "",
    registrationDeadline: "",
    startDate: "",
    endDate: "",
    registrationFee: "0",
    prizePool: "0",
    visibility: "Public",
  })
  const [banner, setBanner] = useState<File | null>(null)

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const fd = new FormData()
      fd.append("tournamentName", form.tournamentName)
      fd.append("description", form.description)
      fd.append("sport", form.sport)
      fd.append(
        "location",
        JSON.stringify({
          province: form.province,
          district: form.district,
          venue: form.venue,
        })
      )
      fd.append("rules", form.rules)
      fd.append("registrationDeadline", form.registrationDeadline)
      fd.append("startDate", form.startDate)
      fd.append("endDate", form.endDate)
      fd.append("registrationFee", form.registrationFee)
      fd.append("prizePool", form.prizePool)
      fd.append("visibility", form.visibility)
      if (banner) fd.append("banner", banner)

      const { data } = await api.post("/tournaments", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const id = data.tournament?._id
      navigate(id ? `/tournaments/${id}` : "/tournaments")
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create tournament.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link to="/tournaments">
          <ArrowLeftIcon className="size-4 mr-1" /> Back
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Create Tournament</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Tournament name"
              value={form.tournamentName}
              onChange={(e) => update("tournamentName", e.target.value)}
              required
            />
            <textarea
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-24"
              placeholder="Description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
            <select
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              value={form.sport}
              onChange={(e) => update("sport", e.target.value)}
            >
              {SPORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="grid gap-3 sm:grid-cols-3">
              <Input placeholder="Province" value={form.province} onChange={(e) => update("province", e.target.value)} required />
              <Input placeholder="District" value={form.district} onChange={(e) => update("district", e.target.value)} required />
              <Input placeholder="Venue" value={form.venue} onChange={(e) => update("venue", e.target.value)} required />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="text-xs text-muted-foreground">Registration deadline</label>
                <Input type="date" value={form.registrationDeadline} onChange={(e) => update("registrationDeadline", e.target.value)} required />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Start date</label>
                <Input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} required />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">End date</label>
                <Input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} required />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input type="number" min="0" placeholder="Entry fee" value={form.registrationFee} onChange={(e) => update("registrationFee", e.target.value)} />
              <Input type="number" min="0" placeholder="Prize pool" value={form.prizePool} onChange={(e) => update("prizePool", e.target.value)} />
            </div>
            <textarea
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-20"
              placeholder="Rules"
              value={form.rules}
              onChange={(e) => update("rules", e.target.value)}
            />
            <Input type="file" accept="image/*" onChange={(e) => setBanner(e.target.files?.[0] || null)} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-600 to-orange-600">
              {loading ? "Creating..." : "Create Tournament"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
