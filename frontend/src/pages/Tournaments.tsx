import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { CalendarIcon, MapPinIcon, UsersIcon, TrophyIcon, PlusIcon, ArrowRightIcon } from "lucide-react"
import Card3D from "@/components/Card3D"
import api from "@/api/axios"

const FILTERS = ["All", "Upcoming", "Ongoing", "Completed"]

type Tournament = {
  _id: string
  tournamentName: string
  sport: string
  location?: { province?: string; district?: string; venue?: string }
  startDate?: string
  registrationFee?: number
  prizePool?: number
  status?: string
  registeredTeams?: unknown[]
  description?: string
}

export default function Tournaments() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError("")
      try {
        const { data } = await api.get("/tournaments")
        setTournaments(data.tournaments || [])
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load tournaments. Please login.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = tournaments.filter((t) => {
    if (activeFilter === "All") return true
    const status = (t.status || "").toLowerCase()
    if (activeFilter === "Upcoming") return status.includes("upcoming") || status.includes("registration")
    if (activeFilter === "Ongoing") return status === "ongoing"
    if (activeFilter === "Completed") return status === "completed"
    return true
  })

  return (
    <div className="flex flex-col">
  <section className="relative overflow-hidden py-16 md:py-24">

  {/* Background Image */}
  <img
    src="/tournaments.jpg" // Replace with your tournament image
    alt="Tournament Background"
    className="absolute inset-0 h-full w-full object-cover block md:hidden"
  />
   <img
    src="/tour.jpg" // Replace with your tournament image
    alt="Tournament Background"
    className="absolute inset-0 h-full w-full object-cover hidden md:block"
  />


  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-6xl px-4">

    <div className="flex flex-col items-center text-center">

      <Badge
        variant="secondary"
        className="mb-3 border border-white/20 bg-white/10 text-white backdrop-blur-md"
      >
        Tournaments
      </Badge>

      <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        Compete &{" "}
        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
          Conquer
        </span>
      </h1>

      <p className="mt-3 max-w-xl text-white/80">
      <span className="text-white">
        Join tournaments near you or create your own.
        </span>
      </p>

      <Button
        size="lg"
        className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
        asChild
      >
        <Link to="/tournaments/create">
          <PlusIcon className="mr-1.5 size-4" />
          Create Tournament
        </Link>
      </Button>

    </div>

  </div>

</section>
      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <Button key={f} variant={activeFilter === f ? "default" : "outline"} size="sm"
                onClick={() => setActiveFilter(f)}
                className={activeFilter === f ? "bg-gradient-to-r from-amber-600 to-orange-600" : ""}>
                {f}
              </Button>
            ))}
            <div className="ml-auto text-sm text-muted-foreground">{filtered.length} tournament{filtered.length !== 1 ? "s" : ""} found</div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <p className="py-20 text-center text-muted-foreground">Loading tournaments...</p>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-lg font-medium">{error}</p>
              <Button asChild><Link to="/login">Login</Link></Button>
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">No tournaments found.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => {
                const locationLabel = [t.location?.venue, t.location?.district, t.location?.province].filter(Boolean).join(", ") || "Nepal"
                const teamCount = t.registeredTeams?.length || 0
                return (
                  <Card3D key={t._id}>
                    <Card className="h-full transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <Badge variant="secondary">{t.status || "upcoming"}</Badge>
                          <Badge variant="outline">{t.sport}</Badge>
                        </div>
                        <CardTitle className="mt-3 text-lg">{t.tournamentName}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPinIcon className="size-3.5 shrink-0" />{locationLabel}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          {t.startDate && (
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="size-3.5" />
                              {new Date(t.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                          )}
                          <span className="flex items-center gap-1"><UsersIcon className="size-3.5" />{teamCount} teams</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-sm">
                          <TrophyIcon className="size-4 text-amber-500" />
                          <span className="font-semibold">Rs. {t.prizePool ?? 0}</span>
                          <span className="text-muted-foreground">· Entry Rs. {t.registrationFee ?? 0}</span>
                        </div>
                        <Button className="mt-4 w-full" variant="outline" size="sm" asChild>
                          <Link to={`/tournaments/${t._id}`}>View Details <ArrowRightIcon className="ml-1 size-3.5" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </Card3D>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
