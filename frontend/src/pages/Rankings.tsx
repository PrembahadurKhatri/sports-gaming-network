import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { TrophyIcon, TrendingUpIcon, MedalIcon, UsersIcon } from "lucide-react"

const SPORTS = ["Cricket", "Football", "Volleyball", "Handball", "Basketball", "Hockey", "Badminton", "Tennis"]

const SAMPLE_TEAM_RANKINGS = [
  { rank: 1, name: "Kathmandu Kings", sport: "Cricket", matches: 24, won: 20, lost: 4, points: 92, rating: 4.8, image: "KK" },
  { rank: 2, name: "Pokhara Strikers", sport: "Football", matches: 22, won: 18, lost: 4, points: 85, rating: 4.7, image: "PS" },
  { rank: 3, name: "Lalitpur Legends", sport: "Basketball", matches: 20, won: 17, lost: 3, points: 83, rating: 4.9, image: "LL" },
  { rank: 4, name: "Biratnagar Blasters", sport: "Volleyball", matches: 18, won: 14, lost: 4, points: 76, rating: 4.5, image: "BB" },
  { rank: 5, name: "Chitwan Chargers", sport: "Hockey", matches: 16, won: 12, lost: 4, points: 72, rating: 4.7, image: "CC" },
  { rank: 6, name: "Bharatpur Bulls", sport: "Handball", matches: 15, won: 11, lost: 4, points: 68, rating: 4.4, image: "BB" },
  { rank: 7, name: "Dharan Dynamos", sport: "Cricket", matches: 20, won: 13, lost: 7, points: 65, rating: 4.3, image: "DD" },
  { rank: 8, name: "Nepalgunj Knights", sport: "Football", matches: 14, won: 10, lost: 4, points: 64, rating: 4.8, image: "NK" },
]

const SAMPLE_PLAYER_RANKINGS = [
  { rank: 1, name: "Rahul Sharma", sport: "Cricket", matches: 45, stat: "1,250 runs", avg: "55.6", rating: 4.9, image: "RS" },
  { rank: 2, name: "Anita Thapa", sport: "Football", matches: 32, stat: "28 goals", avg: "0.88", rating: 4.8, image: "AT" },
  { rank: 3, name: "Sujan Maharjan", sport: "Basketball", matches: 28, stat: "520 pts", avg: "18.6", rating: 4.9, image: "SM" },
  { rank: 4, name: "Priya Gurung", sport: "Volleyball", matches: 38, stat: "210 spikes", avg: "5.5", rating: 4.7, image: "PG" },
  { rank: 5, name: "Amit Shah", sport: "Hockey", matches: 22, stat: "18 goals", avg: "0.82", rating: 4.6, image: "AS" },
  { rank: 6, name: "Sita Rai", sport: "Badminton", matches: 50, stat: "38 wins", avg: "76%", rating: 4.8, image: "SR" },
  { rank: 7, name: "Bikram Tamang", sport: "Football", matches: 19, stat: "12 assists", avg: "0.63", rating: 4.5, image: "BT" },
  { rank: 8, name: "Kiran Basnet", sport: "Cricket", matches: 35, stat: "890 runs", avg: "42.4", rating: 4.7, image: "KB" },
]

export default function Rankings() {
  const [activeTab, setActiveTab] = useState<"teams" | "players">("teams")
  const [activeSport, setActiveSport] = useState("All")

  const filteredTeams = SAMPLE_TEAM_RANKINGS.filter((t) => activeSport === "All" || t.sport === activeSport)
  const filteredPlayers = SAMPLE_PLAYER_RANKINGS.filter((p) => activeSport === "All" || p.sport === activeSport)

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-3">Stats & Rankings</Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-white">
              Leaderboards &{" "}
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Statistics</span>
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              <span className='text-white'>
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
              {["All", ...SPORTS].map((sport) => (
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
                {activeTab === "teams" ? "Team Rankings" : "Player Rankings"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="p-3 text-center w-12">Rank</th>
                      <th className="p-3 text-left">{activeTab === "teams" ? "Team" : "Player"}</th>
                      <th className="p-3 text-left">Sport</th>
                      <th className="p-3 text-center">Matches</th>
                      {activeTab === "teams" ? (
                        <>
                          <th className="p-3 text-center">Won</th>
                          <th className="p-3 text-center">Lost</th>
                          <th className="p-3 text-right">Points</th>
                        </>
                      ) : (
                        <>
                          <th className="p-3 text-center">Performance</th>
                          <th className="p-3 text-center">Average</th>
                        </>
                      )}
                      <th className="p-3 text-right">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeTab === "teams" ? filteredTeams : filteredPlayers).map((item) => (
                      <tr key={item.rank} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="p-3 text-center">
                          {item.rank === 1 ? <MedalIcon className="size-5 text-amber-500 inline" />
                            : item.rank === 2 ? <MedalIcon className="size-5 text-gray-400 inline" />
                            : item.rank === 3 ? <MedalIcon className="size-5 text-amber-700 inline" />
                            : <span className="font-medium">{item.rank}</span>}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarFallback className="bg-gradient-to-br from-rose-600 to-pink-600 text-white text-xs">{item.image}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="p-3"><Badge variant="secondary" className="text-[10px]">{item.sport}</Badge></td>
                        <td className="p-3 text-center">{item.matches}</td>
                        {activeTab === "teams" ? (
                          <>
                            <td className="p-3 text-center text-green-600 dark:text-green-400">{(item as any).won}</td>
                            <td className="p-3 text-center text-red-600 dark:text-red-400">{(item as any).lost}</td>
                            <td className="p-3 text-right font-semibold">{(item as any).points}</td>
                          </>
                        ) : (
                          <>
                            <td className="p-3 text-center font-medium">{(item as any).stat}</td>
                            <td className="p-3 text-center">{(item as any).avg}</td>
                          </>
                        )}
                        <td className="p-3 text-right text-amber-500">★ {item.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
