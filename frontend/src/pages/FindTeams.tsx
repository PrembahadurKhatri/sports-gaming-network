import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Input } from "@/components/ui/Input"
import { SearchIcon, MapPinIcon, UsersIcon, Grid3X3Icon, ListIcon } from "lucide-react"
import Card3D from "@/components/Card3D"
import api from "@/api/axios"

const SPORTS = ["All", "Cricket", "Football", "Volleyball", "Handball", "Basketball", "Hockey", "Tennis", "Badminton", "Futsal", "Kabaddi"]

type Team = {
  _id: string
  teamName: string
  sport: string
  teamType?: string
  province?: string
  location?: string
  description?: string
  teamLogo?: string
  memberCount?: number
  maxPlayers?: number
  owner?: { fullname?: string }
}

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "TM"
}

export default function FindTeams() {
  const [searchParams] = useSearchParams()
  const [activeSport, setActiveSport] = useState(searchParams.get("sport") || "All")
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true)
      setError("")
      try {
        const params: Record<string, string> = {}
        if (activeSport !== "All") params.sport = activeSport
        if (search.trim()) params.teamName = search.trim()
        const { data } = await api.get("/teams/search", { params })
        setTeams(data.teams || [])
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load teams. Please login and try again.")
        setTeams([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [activeSport, search])

  return (
    <div className="flex flex-col">
     <section className="relative overflow-hidden py-16 md:py-24">

  {/* Background Image */}
  <img
    src="/player.png" // Replace with your team background image
    alt="Teams Background"
    className="absolute inset-0 h-full w-full object-cover"
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
        Find Teams
      </Badge>

      <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        Join a Team,{" "}
        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          Play Together
        </span>
      </h1>

      <p className="mt-3 max-w-xl text-white/80">
      <span className="text-white">
        Browse teams looking for players. Filter by sport and location to find
        your perfect squad.
      </span>
      </p>

    </div>

    <div className="mx-auto mt-8 flex max-w-2xl gap-3">

      <div className="relative flex-1">

        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-300" />

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search teams..."
          className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-gray-300 backdrop-blur-md"
        />

      </div>

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
          {loading ? (
            <p className="py-20 text-center text-muted-foreground">Loading teams...</p>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-lg font-medium">{error}</p>
              <Button asChild><Link to="/login">Login</Link></Button>
            </div>
          ) : teams.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <UsersIcon className="size-12 text-muted-foreground/40" />
              <p className="text-lg font-medium">No teams found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <Card3D key={team._id}>
                  <Card className="h-full transition-all hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Avatar size="lg">
                          {team.teamLogo ? (
                            <img src={team.teamLogo} alt={team.teamName} className="size-full object-cover rounded-full" />
                          ) : (
                            <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white">{initials(team.teamName)}</AvatarFallback>
                          )}
                        </Avatar>
                        <Badge>{team.sport}</Badge>
                      </div>
                      <CardTitle className="mt-3 text-lg">{team.teamName}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPinIcon className="size-3.5" />
                        {team.location || team.province || "Nepal"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <UsersIcon className="size-3.5" />
                          {team.memberCount ?? "—"} members
                        </span>
                        <Badge variant="secondary">{team.teamType || "Public"}</Badge>
                      </div>
                      {team.description && <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{team.description}</p>}
                      <Button className="mt-4 w-full" size="sm" asChild>
                        <Link to={`/find-teams/${team._id}`}>View Team</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </Card3D>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {teams.map((team) => (
                <Card key={team._id} className="transition-all hover:shadow-md">
                  <div className="flex items-center gap-4 p-4">
                    <Avatar size="lg">
                      <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white">{initials(team.teamName)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{team.teamName}</h3>
                        <Badge variant="secondary" className="text-[10px]">{team.sport}</Badge>
                      </div>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPinIcon className="size-3.5" />
                        {team.location || team.province || "Nepal"} · {team.memberCount ?? "—"} members
                      </p>
                    </div>
                    <Button size="sm" asChild><Link to={`/find-teams/${team._id}`}>View</Link></Button>
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
