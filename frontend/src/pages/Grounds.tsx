import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { SearchIcon, MapPinIcon, StarIcon } from "lucide-react"
import Card3D from "@/components/Card3D"
import api from "@/api/axios"

const SPORTS = ["All", "Cricket", "Football", "Futsal", "Badminton", "Basketball", "Tennis", "Volleyball", "Hockey", "Handball", "Kabaddi"]

type Ground = {
  _id: string
  groundName: string
  sport: string
  location?: string
  address?: string
  rating?: number
  pricePerHour?: number
  amenities?: string[]
  images?: string[]
  status?: string
}

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "GR"
}

export default function Grounds() {
  const [activeSport, setActiveSport] = useState("All")
  const [search, setSearch] = useState("")
  const [grounds, setGrounds] = useState<Ground[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError("")
      try {
        const { data } = await api.get("/grounds")
        setGrounds(data.grounds || data || [])
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load grounds.")
        setGrounds([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = grounds.filter((g) => {
    const matchSport = activeSport === "All" || g.sport === activeSport
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      g.groundName?.toLowerCase().includes(q) ||
      g.location?.toLowerCase().includes(q) ||
      g.address?.toLowerCase().includes(q)
    return matchSport && matchSearch
  })

  return (
    <div className="flex flex-col">
     <section className="relative py-16 md:py-24 overflow-hidden">

  {/* Background Image */}
  <img
    src="/cricket.avif"
    alt="Ground Background"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-6xl px-4">

    <div className="flex flex-col items-center text-center">

      <Badge variant="secondary" className="mb-3 bg-white/10 text-white border-white/20 backdrop-blur-md">
        Book Grounds
      </Badge>

      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
        Find & Book{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Your Arena
        </span>
      </h1>

      <p className="mt-4 max-w-xl text-white">
        <span className="text-white">
        Browse sports grounds, check availability, and book instantly.
        </span>
      </p>

    </div>

    <div className="mt-8 mx-auto flex max-w-2xl gap-3">

      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search grounds or locations..."
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
                className={activeSport === sport ? "bg-gradient-to-r from-blue-600 to-cyan-600" : ""}>
                {sport}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <p className="py-20 text-center text-muted-foreground">Loading grounds...</p>
          ) : error ? (
            <p className="py-20 text-center text-muted-foreground">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">No grounds found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((ground) => (
                <Card3D key={ground._id}>
                  <Card className="h-full transition-all hover:shadow-lg">
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden rounded-t-xl">
                      {ground.images?.[0] ? (
                        <img src={ground.images[0]} alt={ground.groundName} className="size-full object-cover" />
                      ) : (
                        <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-2xl font-bold text-white">
                          {initials(ground.groundName)}
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-base">{ground.groundName}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-0.5">
                            <MapPinIcon className="size-3.5 shrink-0" />
                            {ground.location || ground.address || "Nepal"}
                          </CardDescription>
                        </div>
                        <Badge>{ground.sport}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-amber-500">
                          <StarIcon className="size-3.5 fill-amber-500" />
                          {ground.rating ?? "—"}
                        </span>
                        <span className="font-semibold">Rs. {ground.pricePerHour ?? 0}/hr</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(ground.amenities || []).slice(0, 4).map((a) => (
                          <Badge key={a} variant="secondary" className="text-[10px]">{a}</Badge>
                        ))}
                      </div>
                      <Button className="mt-4 w-full" size="sm" asChild>
                        <Link to={`/grounds/${ground._id}`}>Book Now</Link>
                      </Button>
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
