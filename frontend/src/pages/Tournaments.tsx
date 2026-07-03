import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { CalendarIcon, MapPinIcon, UsersIcon, TrophyIcon, PlusIcon, ArrowRightIcon } from "lucide-react"
import Card3D from "@/components/Card3D"

const FILTERS = ["All", "Upcoming", "Ongoing", "Completed"]

const SAMPLE_TOURNAMENTS = [
  {
    id: 1, title: "Kathmandu Premier League", sport: "Cricket", location: "Kathmandu",
    date: "2026-08-15", teams: 8, maxTeams: 16, minTeams: 5, entryFee: "₹199", prize: "₹50,000",
    status: "upcoming", organizer: "PlayOnP Sports",
    description: "Annual cricket tournament featuring top teams from Kathmandu valley.",
  },
  {
    id: 2, title: "Pokhara Football Cup", sport: "Football", location: "Pokhara",
    date: "2026-07-20", teams: 6, maxTeams: 12, minTeams: 5, entryFee: "₹149", prize: "₹30,000",
    status: "upcoming", organizer: "Pokhara Sports Club",
    description: "5-a-side football tournament at Lakeside ground.",
  },
  {
    id: 3, title: "Basketball 3x3 Challenge", sport: "Basketball", location: "Lalitpur",
    date: "2026-07-10", teams: 5, maxTeams: 16, minTeams: 5, entryFee: "₹99", prize: "₹15,000",
    status: "ongoing", organizer: "Lalitpur Hoops",
    description: "Fast-paced 3x3 basketball tournament open to all.",
  },
  {
    id: 4, title: "Biratnagar Volleyball League", sport: "Volleyball", location: "Biratnagar",
    date: "2026-09-05", teams: 10, maxTeams: 12, minTeams: 5, entryFee: "₹249", prize: "₹40,000",
    status: "upcoming", organizer: "Eastern Sports Association",
    description: "Professional volleyball league with round-robin format.",
  },
  {
    id: 5, title: "National Handball Championship", sport: "Handball", location: "Bharatpur",
    date: "2026-06-28", teams: 7, maxTeams: 10, minTeams: 5, entryFee: "₹299", prize: "₹60,000",
    status: "ongoing", organizer: "Nepal Handball Association",
    description: "National level handball championship.",
  },
  {
    id: 6, title: "Hockey Nepal Cup", sport: "Hockey", location: "Chitwan",
    date: "2026-10-01", teams: 0, maxTeams: 8, minTeams: 5, entryFee: "₹199", prize: "₹35,000",
    status: "upcoming", organizer: "Chitwan Hockey Club",
    description: "Field hockey tournament. Registrations open now!",
  },
]

export default function Tournaments() {
  const [activeFilter, setActiveFilter] = useState("All")
  const filtered = SAMPLE_TOURNAMENTS.filter((t) => activeFilter === "All" || t.status === activeFilter.toLowerCase())

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-amber-950 via-orange-950 to-red-950 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-3">Tournaments</Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-white">
              Compete &{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Conquer</span>
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Join tournaments near you or create your own. Minimum 5 teams required.
            </p>
            <Button size="lg" className="mt-6 bg-gradient-to-r from-amber-600 to-orange-600" asChild>
              <Link to="/tournaments/create"><PlusIcon className="mr-1.5 size-4" /> Create Tournament</Link>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <Card3D key={t.id}>
                <Card className={`h-full transition-all hover:shadow-lg ${t.teams < t.minTeams && t.status === "upcoming" ? "ring-2 ring-amber-500/30" : ""}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant={t.status === "ongoing" ? "default" : "secondary"} className={t.status === "ongoing" ? "bg-green-600" : ""}>
                        {t.status === "upcoming" ? "Upcoming" : t.status === "ongoing" ? "Live" : "Completed"}
                      </Badge>
                      <Badge variant="outline">{t.sport}</Badge>
                    </div>
                    <CardTitle className="mt-3 text-lg">{t.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1"><MapPinIcon className="size-3.5 shrink-0" />{t.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><CalendarIcon className="size-3.5" />{new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      <span className="flex items-center gap-1"><UsersIcon className="size-3.5" />{t.teams}/{t.maxTeams} teams</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <TrophyIcon className="size-4 text-amber-500" />
                      <span className="font-semibold">{t.prize}</span>
                      <span className="text-muted-foreground">· Entry {t.entryFee}</span>
                    </div>
                    {t.teams < t.minTeams && t.status === "upcoming" && (
                      <Badge variant="outline" className="mt-2 text-[10px] border-amber-500 text-amber-600 dark:text-amber-400">
                        {t.minTeams - t.teams} more teams needed
                      </Badge>
                    )}
                    <Button className="mt-4 w-full" variant="outline" size="sm" asChild>
                      <Link to={`/tournaments/${t.id}`}>View Details <ArrowRightIcon className="ml-1 size-3.5" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </Card3D>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
