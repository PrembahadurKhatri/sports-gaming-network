import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Input } from "@/components/ui/Input"
import { SearchIcon, MapPinIcon, StarIcon, FilterIcon } from "lucide-react"
import Card3D from "@/components/Card3D"

const SPORTS = ["All", "Cricket", "Football", "Volleyball", "Handball", "Basketball", "Hockey", "Tennis", "Badminton", "Futsal", "Kabaddi"]

const SAMPLE_PLAYERS = [
  { id: 1, name: "Rahul Sharma", sport: "Cricket", location: "Kathmandu", rating: 4.8, matches: 45, skills: ["Batsman", "Bowler"], avatar: "RS" },
  { id: 2, name: "Anita Thapa", sport: "Football", location: "Pokhara", rating: 4.6, matches: 32, skills: ["Forward", "Captain"], avatar: "AT" },
  { id: 3, name: "Sujan Maharjan", sport: "Basketball", location: "Lalitpur", rating: 4.9, matches: 28, skills: ["Point Guard", "Shooter"], avatar: "SM" },
  { id: 4, name: "Priya Gurung", sport: "Volleyball", location: "Biratnagar", rating: 4.7, matches: 38, skills: ["Spiker", "Server"], avatar: "PG" },
  { id: 5, name: "Amit Shah", sport: "Hockey", location: "Chitwan", rating: 4.5, matches: 22, skills: ["Forward", "Drag Flick"], avatar: "AS" },
  { id: 6, name: "Sita Rai", sport: "Badminton", location: "Dharan", rating: 4.8, matches: 50, skills: ["Singles", "Doubles"], avatar: "SR" },
  { id: 7, name: "Bikram Tamang", sport: "Football", location: "Kathmandu", rating: 4.4, matches: 19, skills: ["Midfielder", "Playmaker"], avatar: "BT" },
  { id: 8, name: "Deepa Karki", sport: "Handball", location: "Nepalgunj", rating: 4.6, matches: 27, skills: ["Wing", "Defender"], avatar: "DK" },
  { id: 9, name: "Kiran Basnet", sport: "Cricket", location: "Bharatpur", rating: 4.7, matches: 35, skills: ["All-rounder"], avatar: "KB" },
]

export default function FindPlayers() {
  const [activeSport, setActiveSport] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = SAMPLE_PLAYERS.filter((p) => {
    const matchSport = activeSport === "All" || p.sport === activeSport
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
    return matchSport && matchSearch
  })

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-3">Find Players</Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-white">
              Find Your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Dream Teammates</span>
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground ">
              <span className="text-white">
              Browse skilled players looking for teams.
              </span>
              </p>
          </div>
          <div className="mt-8 mx-auto flex max-w-2xl gap-3">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search players..." className="pl-9" />
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
                className={activeSport === sport ? "bg-gradient-to-r from-emerald-600 to-teal-600" : ""}>
                {sport}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((player) => (
              <Card3D key={player.id}>
                <Card className="h-full transition-all hover:shadow-lg cursor-pointer">
                  <CardHeader className="text-center">
                    <Avatar className="mx-auto size-14">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-lg">{player.avatar}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-3 text-lg">{player.name}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-1"><MapPinIcon className="size-3.5" />{player.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-3 text-sm">
                      <Badge>{player.sport}</Badge>
                      <span className="flex items-center gap-1 text-amber-500"><StarIcon className="size-3.5 fill-amber-500" />{player.rating}</span>
                      <span className="text-muted-foreground">{player.matches} matches</span>
                    </div>
                    <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                      {player.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-[10px]">{skill}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1" size="sm" asChild><Link to={`/find-players/${player.id}`}>View Profile</Link></Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild><Link to={`/find-players/${player.id}`}>Invite</Link></Button>
                    </div>
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
