import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import {
  SearchIcon, MapPinIcon, UsersIcon, TrophyIcon,
  ArrowRightIcon, ShieldIcon, SparklesIcon, TrendingUpIcon,
} from "lucide-react"

const SPORTS = [
  { name: "Cricket", icon: "🏏", color: "from-blue-600 to-blue-800" },
  { name: "Football", icon: "⚽", color: "from-emerald-600 to-emerald-800" },
  { name: "Volleyball", icon: "🏐", color: "from-orange-600 to-orange-800" },
  { name: "Handball", icon: "🤾", color: "from-red-600 to-red-800" },
  { name: "Basketball", icon: "🏀", color: "from-amber-600 to-amber-800" },
  { name: "Hockey", icon: "🏑", color: "from-green-600 to-green-800" },
  { name: "Tennis", icon: "🎾", color: "from-yellow-500 to-yellow-700" },
  { name: "Badminton", icon: "🏸", color: "from-purple-600 to-purple-800" },
  { name: "Futsal", icon: "⚽", color: "from-cyan-600 to-cyan-800" },
  { name: "Kabaddi", icon: "💪", color: "from-rose-600 to-rose-800" },
]

const FEATURES = [
  {
    icon: UsersIcon,
    title: "Find Teams & Players",
    description: "Looking for teammates or need players? Browse by sport, location, and skill level.",
    href: "/find-teams",
  },
  {
    icon: TrophyIcon,
    title: "Tournaments",
    description: "Join nearby tournaments or create your own with minimum 5 teams.",
    href: "/tournaments",
  },
  {
    icon: MapPinIcon,
    title: "Book Grounds",
    description: "Find and book sports grounds, courts, and fields near you.",
    href: "/grounds",
  },
  {
    icon: TrendingUpIcon,
    title: "Stats & Rankings",
    description: "Every match recorded. Track team and player stats and climb the rankings.",
    href: "/rankings",
  },
]

const STEPS = [
  { icon: SparklesIcon, title: "Register Free", description: "Create your profile with photo and skills. It's free!" },
  { icon: SearchIcon, title: "Find or Create", description: "Find a team, join a tournament, or book a ground." },
  { icon: ShieldIcon, title: "Play & Track", description: "Play matches, record stats, and climb the rankings." },
]

const PRICING = [
  {
    title: "Free",
    price: "₹0",
    features: [
      "Player registration",
      "Find teams & players",
      "Register your team",
      "View stats & rankings",
      "Browse tournaments",
    ],
    highlighted: false,
  },
  {
    title: "Tournament Pass",
    price: "₹199",
    features: [
      "Participate in tournaments",
      "Ground & court booking",
      "Create tournaments",
      "Premium stats tracking",
      "Priority support",
    ],
    highlighted: true,
  },
]

export default function Home() {
  return (
      <div className="flex flex-col">
      <section className="relative flex flex-col items-center justify-center sm:h-206 h-220 px-4 py-24 md:py-36 overflow-hidden 
      bg-gradient-to-br from-[#0f172a] via-[#020617] to-black">

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.25)_0%,transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          
          {/* Badge */}
          <Badge className="mb-4 px-4 py-1.5 text-xs bg-white/10 text-white border border-white/20 backdrop-blur-md">
            Nepal's #1 Sports & Gaming Network
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl text-white">
            Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Sports Community
            </span>{" "}
            Awaits
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-300 md:text-xl">
            Find teammates, join tournaments, book grounds, and track your stats.
            Cricket, Football, Volleyball, Basketball & more.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all"
              asChild
            >
              <Link to="/player-registration">
                Get Started Free
                <ArrowRightIcon className="ml-2 size-4" />
              </Link>
            </Button>

            <Button
               size="lg"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all"
              asChild
            >
              <Link to="/find-teams">Find a Team</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            
            <span className="flex items-center gap-2">
              <UsersIcon className="size-4 text-cyan-400" /> 10,000+ Players
            </span>

            <span className="flex items-center gap-2">
              <TrophyIcon className="size-4 text-yellow-400" /> 500+ Tournaments
            </span>

            <span className="flex items-center gap-2">
              <MapPinIcon className="size-4 text-green-400" /> 200+ Grounds
            </span>

          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Explore Sports</h2>
            <p className="mt-2 text-muted-foreground">From cricket to kabaddi — find your game</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {SPORTS.map((sport) => (
              <Link
                key={sport.name}
                to={`/find-teams?sport=${sport.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-xl border bg-card p-4 text-center transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <span className="text-3xl">{sport.icon}</span>
                <p className="mt-2 text-sm font-medium">{sport.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything You Need</h2>
            <p className="mt-2 text-muted-foreground">One platform for the entire sports ecosystem</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <Link key={feature.title} to={feature.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                      <feature.icon className="size-5" />
                    </div>
                    <CardTitle className="mt-2 text-base">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center text-sm font-medium text-violet-600 dark:text-violet-400 group-hover:gap-1.5 transition-all">
                      Explore <ArrowRightIcon className="ml-0.5 size-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="px-4 py-20 md:py-28 bg-muted/20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Get on the field in three simple steps</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Card key={step.title} className="text-center border-0 bg-muted/50">
                <CardHeader>
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                    <step.icon className="size-7" />
                  </div>
                  <div className="mt-2"><Badge variant="outline" className="mb-2">Step {i + 1}</Badge></div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Simple Pricing</h2>
            <p className="mt-2 text-muted-foreground">Free to join. Pay only when you play.</p>
          </div>
          <div className="mt-12 mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {PRICING.map((plan) => (
              <Card key={plan.title} className={`relative ${plan.highlighted ? "border-violet-500 shadow-lg shadow-violet-500/10" : ""}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.title !== "Free" && <span className="text-sm text-muted-foreground"> /event</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <span className="flex size-4 items-center justify-center rounded-full bg-violet-600/10 text-violet-600 dark:text-violet-400 text-xs">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`mt-6 w-full ${plan.highlighted ? "bg-gradient-to-r from-violet-600 to-indigo-600" : ""}`} variant={plan.highlighted ? "default" : "outline"} asChild>
                    <Link to="/player-registration">{plan.title === "Free" ? "Join Free" : "Get Started"}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
