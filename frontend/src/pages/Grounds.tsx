import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { SearchIcon, MapPinIcon, StarIcon, UsersIcon } from "lucide-react"
import Card3D from "@/components/Card3D"

const SPORTS = ["All", "Cricket", "Football", "Futsal", "Badminton", "Basketball", "Tennis", "Volleyball"]

const SAMPLE_GROUNDS = [
  { id: 1, name: "Dashrath Stadium", sport: "Football", location: "Kathmandu", rating: 4.7, price: "₹500/hr", capacity: "22 players", amenities: ["Parking", "Changing Room", "Floodlights"], image: "DS" },
  { id: 2, name: "Cover Hall Court 1", sport: "Badminton", location: "Lalitpur", rating: 4.5, price: "₹300/hr", capacity: "4 players", amenities: ["AC", "Parking", "Equipment"], image: "CH" },
  { id: 3, name: "Bhrikuti Ground", sport: "Cricket", location: "Kathmandu", rating: 4.8, price: "₹800/hr", capacity: "30 players", amenities: ["Parking", "Pavilion", "Floodlights", "Canteen"], image: "BG" },
  { id: 4, name: "Futsal Arena Pokhara", sport: "Futsal", location: "Pokhara", rating: 4.6, price: "₹400/hr", capacity: "10 players", amenities: ["Parking", "Changing Room", "Floodlights"], image: "FP" },
  { id: 5, name: "Basketball City Court", sport: "Basketball", location: "Biratnagar", rating: 4.4, price: "₹250/hr", capacity: "10 players", amenities: ["Indoor", "AC", "Parking"], image: "BC" },
  { id: 6, name: "Tennis Academy Nepal", sport: "Tennis", location: "Lalitpur", rating: 4.9, price: "₹600/hr", capacity: "4 players", amenities: ["Clay Court", "Coaching", "Parking", "Cafe"], image: "TA" },
  { id: 7, name: "Volleyball Beach Court", sport: "Volleyball", location: "Pokhara", rating: 4.3, price: "₹200/hr", capacity: "12 players", amenities: ["Sand Court", "Scenic View"], image: "VB" },
  { id: 8, name: "Chitwan Sports Complex", sport: "Cricket", location: "Chitwan", rating: 4.6, price: "₹600/hr", capacity: "30 players", amenities: ["Turf Ground", "Parking", "Floodlights", "Canteen", "Changing Room"], image: "CS" },
]

export default function Grounds() {
  const [activeSport, setActiveSport] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = SAMPLE_GROUNDS.filter((g) => {
    const matchSport = activeSport === "All" || g.sport === activeSport
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.location.toLowerCase().includes(search.toLowerCase())
    return matchSport && matchSearch
  })

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-blue-950 via-cyan-950 to-teal-950 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-3">Book Grounds</Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-white">
              Find & Book{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Your Arena</span>
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">Browse sports grounds, check availability, and book instantly.</p>
          </div>
          <div className="mt-8 mx-auto flex max-w-2xl gap-3">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search grounds or locations..." className="pl-9" />
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ground) => (
              <Card3D key={ground.id}>
                <Card className="h-full transition-all hover:shadow-lg cursor-pointer">
                  <div className="aspect-[16/9] w-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden rounded-t-xl">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-2xl font-bold text-white">
                      {ground.image}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-base">{ground.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-0.5"><MapPinIcon className="size-3.5 shrink-0" />{ground.location}</CardDescription>
                      </div>
                      <Badge>{ground.sport}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-amber-500"><StarIcon className="size-3.5 fill-amber-500" />{ground.rating}</span>
                      <span className="flex items-center gap-1 text-muted-foreground"><UsersIcon className="size-3.5" />{ground.capacity}</span>
                      <span className="font-semibold">{ground.price}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ground.amenities.map((a) => (<Badge key={a} variant="secondary" className="text-[10px]">{a}</Badge>))}
                    </div>
                    <Button className="mt-4 w-full" size="sm" asChild><Link to={`/grounds/${ground.id}`}>Book Now</Link></Button>
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
