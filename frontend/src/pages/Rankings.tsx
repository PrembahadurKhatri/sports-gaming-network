import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { TrophyIcon, TrendingUpIcon, MedalIcon, UsersIcon } from "lucide-react"
import api from "@/api/axios"

const SPORTS = ["Cricket", "Football", "Volleyball", "Handball", "Basketball", "Hockey", "Badminton", "Tennis", "Futsal", "Kabaddi"]

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "—"
}

export default function Rankings() {
  const [activeTab, setActiveTab] = useState<"teams" | "players">("teams")
  const [activeSport, setActiveSport] = useState("Football")
  const [teamRows, setTeamRows] = useState<any[]>([])
  const [playerRows, setPlayerRows] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError("")
      try {
        if (activeTab === "teams") {
          const { data } = await api.get(`/team-ranking/leaderboard/${activeSport}`)
          setTeamRows(data.leaderboard || data || [])
        } else {
          const { data } = await api.get(`/player-ranking/leaderboard/${activeSport}`)
          setPlayerRows(data.leaderboard || [])
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load rankings.")
        setTeamRows([])
        setPlayerRows([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [activeTab, activeSport])

  const rows = activeTab === "teams" ? teamRows : playerRows

  return (
    <div className="flex flex-col">
     <section className="relative overflow-hidden py-16 md:py-24">

  {/* Background Image */}
  <img
    src="/ranking.avif" // Replace with your rankings background image
    alt="Rankings Background"
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
        Stats & Rankings
      </Badge>

      <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        Leaderboards &{" "}
        <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
          Statistics
        </span>
      </h1>

      <p className="mt-3 max-w-xl text-white/80">
      <span className="text-white">
        Track team and player performance.
        </span>
      </p>

    </div>

  </div>

</section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-1 rounded-lg border p-1">
              <Button variant={activeTab === "teams" ? "default" : "ghost"} size="sm"
                onClick={() => setActiveTab("teams")}
                className={activeTab === "teams" ? "bg-gradient-to-r from-rose-600 to-pink-600" : ""}>
                <TrophyIcon className="mr-1.5 size-4" /> Teams
              </Button>
              <Button variant={activeTab === "players" ? "default" : "ghost"} size="sm"
                onClick={() => setActiveTab("players")}
                className={activeTab === "players" ? "bg-gradient-to-r from-rose-600 to-pink-600" : ""}>
                <UsersIcon className="mr-1.5 size-4" /> Players
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SPORTS.map((sport) => (
                <Button key={sport} variant={activeSport === sport ? "default" : "outline"} size="sm"
                  onClick={() => setActiveSport(sport)}
                  className={activeSport === sport ? "bg-gradient-to-r from-rose-600 to-pink-600" : ""}>
                  {sport}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {activeTab === "teams" ? <TrophyIcon className="size-5 text-amber-500" /> : <TrendingUpIcon className="size-5 text-rose-500" />}
                {activeTab === "teams" ? "Team Rankings" : "Player Rankings"} — {activeSport}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <p className="p-8 text-center text-muted-foreground">Loading...</p>
              ) : error ? (
                <p className="p-8 text-center text-muted-foreground">{error}</p>
              ) : rows.length === 0 ? (
                <p className="p-8 text-center text-muted-foreground">No ranking data yet for this sport.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="p-3 text-center w-12">Rank</th>
                        <th className="p-3 text-left">{activeTab === "teams" ? "Team" : "Player"}</th>
                        <th className="p-3 text-center">Played</th>
                        <th className="p-3 text-center">Won</th>
                        <th className="p-3 text-center">Lost</th>
                        <th className="p-3 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((item, idx) => {
                        const name =
                          activeTab === "teams"
                            ? item.team?.teamName || "Team"
                            : item.player?.fullname || "Player"
                        const photo =
                          activeTab === "teams"
                            ? item.team?.teamLogo
                            : item.player?.profilePhoto
                        const rank = item.rank || idx + 1
                        return (
                          <tr key={item._id || idx} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="p-3 text-center">
                              {rank === 1 ? <MedalIcon className="size-5 text-amber-500 inline" />
                                : rank === 2 ? <MedalIcon className="size-5 text-gray-400 inline" />
                                : rank === 3 ? <MedalIcon className="size-5 text-amber-700 inline" />
                                : <span className="font-medium">{rank}</span>}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Avatar size="sm">
                                  {photo ? (
                                    <img src={photo} alt={name} className="size-full object-cover rounded-full" />
                                  ) : (
                                    <AvatarFallback className="bg-gradient-to-br from-rose-600 to-pink-600 text-white text-xs">
                                      {initials(name)}
                                    </AvatarFallback>
                                  )}
                                </Avatar>
                                <span className="font-medium">{name}</span>
                              </div>
                            </td>
                            <td className="p-3 text-center">{item.played ?? 0}</td>
                            <td className="p-3 text-center text-green-600 dark:text-green-400">{item.won ?? 0}</td>
                            <td className="p-3 text-center text-red-600 dark:text-red-400">{item.lost ?? 0}</td>
                            <td className="p-3 text-right font-semibold">{item.rankingPoints ?? 0}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
