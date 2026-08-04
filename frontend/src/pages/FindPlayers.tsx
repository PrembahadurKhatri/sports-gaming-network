import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Input } from "@/components/ui/Input"
import { SearchIcon, MapPinIcon } from "lucide-react"
import Card3D from "@/components/Card3D"
import api from "@/api/axios"

const SPORTS = ["All", "Cricket", "Football", "Volleyball", "Handball", "Basketball", "Hockey", "Tennis", "Badminton", "Futsal", "Kabaddi"]

type Player = {
  _id: string
  fullname: string
  sport: string
  location?: string
  province?: string
  position?: string
  skillLevel?: string
  profilePhoto?: string
}

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "PL"
}

export default function FindPlayers() {
  const [activeSport, setActiveSport] = useState("All")
  const [search, setSearch] = useState("")
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true)
      setError("")
      try {
        const params: Record<string, string> = {}
        if (activeSport !== "All") params.sport = activeSport
        if (search.trim()) params.fullname = search.trim()
        const { data } = await api.get("/auth/players", { params })
        setPlayers(data.players || [])
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load players. Please login and try again.")
        setPlayers([])
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
    src="/player.png"
    alt="Players Background"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-6xl px-4">

    <div className="flex flex-col items-center text-center">

      <Badge
        variant="secondary"
        className="mb-3 bg-white/10 text-white border border-white/20 backdrop-blur-md"
      >
        Find Players
      </Badge>

      <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        Find Your{" "}
        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Dream Teammates
        </span>
      </h1>

      <p className="mt-3 max-w-xl text-white/80">
      <span className="text-white">
        Browse skilled players looking for teams.
        </span>
      </p>

    </div>

    <div className="mx-auto mt-8 flex max-w-2xl gap-3">

      <div className="relative flex-1">

        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-300" />

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search players..."
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
                className={activeSport === sport ? "bg-gradient-to-r from-emerald-600 to-teal-600" : ""}>
                {sport}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <p className="py-20 text-center text-muted-foreground">Loading players...</p>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-lg font-medium">{error}</p>
              <Button asChild><Link to="/login">Login</Link></Button>
            </div>
          ) : players.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">No players found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {players.map((player) => (
                <Card3D key={player._id}>
                  <Card className="h-full transition-all hover:shadow-lg">
                    <CardHeader className="text-center">
                      <Avatar className="mx-auto size-14">
                        {player.profilePhoto ? (
                          <img src={player.profilePhoto} alt={player.fullname} className="size-full object-cover rounded-full" />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-lg">
                            {initials(player.fullname)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <CardTitle className="mt-3 text-lg">{player.fullname}</CardTitle>
                      <CardDescription className="flex items-center justify-center gap-1">
                        <MapPinIcon className="size-3.5" />
                        {player.location || player.province || "Nepal"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="flex items-center justify-center gap-3 text-sm flex-wrap">
                        <Badge>{player.sport}</Badge>
                        {player.skillLevel && <Badge variant="secondary">{player.skillLevel}</Badge>}
                      </div>
                      {player.position && (
                        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                          <Badge variant="secondary" className="text-[10px]">{player.position}</Badge>
                        </div>
                      )}
                      <div className="mt-4">
                        <Button className="w-full" size="sm" asChild>
                          <Link to={`/find-players/${player._id}`}>View Profile</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Card3D>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
