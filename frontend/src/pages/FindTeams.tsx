import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Input } from "@/components/ui/Input"
import { SearchIcon, MapPinIcon, UsersIcon, FilterIcon, Grid3X3Icon, ListIcon } from "lucide-react"
import Card3D from "@/components/Card3D"

const SPORTS = ["All", "Cricket", "Football", "Volleyball", "Handball", "Basketball", "Hockey", "Tennis", "Badminton", "Futsal", "Kabaddi"]

const SAMPLE_TEAMS = [
  { id: 1, name: "Kathmandu Kings", sport: "Cricket", location: "Kathmandu", members: 15, rating: 4.8, looking: "Batsman, Bowler", image: "KK" },
  { id: 2, name: "Pokhara Strikers", sport: "Football", location: "Pokhara", members: 12, rating: 4.6, looking: "Goalkeeper", image: "PS" },
  { id: 3, name: "Lalitpur Legends", sport: "Basketball", location: "Lalitpur", members: 10, rating: 4.9, looking: "Point Guard", image: "LL" },
  { id: 4, name: "Biratnagar Blasters", sport: "Volleyball", location: "Biratnagar", members: 8, rating: 4.5, looking: "Setter, Spiker", image: "BB" },
  { id: 5, name: "Chitwan Chargers", sport: "Hockey", location: "Chitwan", members: 14, rating: 4.7, looking: "Forward", image: "CC" },
  { id: 6, name: "Bharatpur Bulls", sport: "Handball", location: "Bharatpur", members: 9, rating: 4.4, looking: "Goalkeeper, Defender", image: "BB" },
  { id: 7, name: "Dharan Dynamos", sport: "Cricket", location: "Dharan", members: 16, rating: 4.3, looking: "All-rounder", image: "DD" },
  { id: 8, name: "Nepalgunj Knights", sport: "Football", location: "Nepalgunj", members: 11, rating: 4.8, looking: "Midfielder", image: "NK" },
  { id: 9, name: "Hetauda Hawks", sport: "Badminton", location: "Hetauda", members: 6, rating: 4.2, looking: "Doubles Player", image: "HH" },
]

export default function FindTeams() {
  const [activeSport, setActiveSport] = useState("All")
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")

  const filtered = SAMPLE_TEAMS.filter((t) => {
    const matchSport = activeSport === "All" || t.sport === activeSport
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.location.toLowerCase().includes(search.toLowerCase())
    return matchSport && matchSearch
  })

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-950 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-3">Find Teams</Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-white">
              Join a Team,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Play Together</span>
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Browse teams looking for players. Filter by sport and location to find your perfect squad.
            </p>
          </div>
          <div className="mt-8 mx-auto flex max-w-2xl gap-3">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search teams or locations..." className="pl-9" />
            </div>
            <Button variant="outline" size="icon"><FilterIcon className="size-4" /></Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2">
            {SPORTS.map((sport) => (
              <Button key={sport} variant={activeSport === sport ? "default" : "outline"} size="sm"
                onClick={() => setActiveSport(sport)}
                className={activeSport === sport ? "bg-gradient-to-r from-violet-600 to-indigo-600" : ""}>
                {sport}
              </Button>
            ))}
            <div className="ml-auto hidden sm:flex items-center gap-1">
              <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setView("grid")}><Grid3X3Icon className="size-4" /></Button>
              <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setView("list")}><ListIcon className="size-4" /></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <UsersIcon className="size-12 text-muted-foreground/40" />
              <p className="text-lg font-medium">No teams found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((team) => (
                <Card3D key={team.id}>
                  <Card className="h-full transition-all hover:shadow-lg cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Avatar size="lg">
                          <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white">{team.image}</AvatarFallback>
                        </Avatar>
                        <Badge>{team.sport}</Badge>
                      </div>
                      <CardTitle className="mt-3 text-lg">{team.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1"><MapPinIcon className="size-3.5" />{team.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground"><UsersIcon className="size-3.5" />{team.members} members</span>
                        <span className="text-amber-500">★ {team.rating}</span>
                      </div>
                      <div className="mt-3">
                        <span className="text-xs text-muted-foreground">Looking for:</span>
                        <p className="text-sm font-medium">{team.looking}</p>
                      </div>
                      <Button className="mt-4 w-full" size="sm" asChild><Link to={`/find-teams/${team.id}`}>Join Team</Link></Button>
                    </CardContent>
                  </Card>
                </Card3D>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((team) => (
                <Card key={team.id} className="transition-all hover:shadow-md cursor-pointer">
                  <div className="flex items-center gap-4 p-4">
                    <Avatar size="lg">
                      <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white">{team.image}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{team.name}</h3>
                        <Badge variant="secondary" className="text-[10px]">{team.sport}</Badge>
                      </div>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPinIcon className="size-3.5" />{team.location} · {team.members} members</p>
                      <p className="text-sm mt-1"><span className="text-muted-foreground">Looking for:</span> {team.looking}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-amber-500">★ {team.rating}</span>
                      <Button size="sm" asChild><Link to={`/find-teams/${team.id}`}>Join</Link></Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
