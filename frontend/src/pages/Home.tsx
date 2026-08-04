import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import {
  SearchIcon, MapPinIcon, UsersIcon, TrophyIcon,
  ArrowRightIcon, ShieldIcon, SparklesIcon, TrendingUpIcon,
} from "lucide-react"

const SPORTS = [
  { name: "Cricket", image: "cric.jpg", color: "from-yellow-400 to-yellow-600" },
  { name: "Football", image: "football.jpg", color: "from-green-400 to-green-600" },
  { name: "Volleyball", image: "volleyball.jpg", color: "from-orange-400 to-orange-600" },
  { name: "Basketball", image: "basketball.jpg", color: "from-orange-400 to-orange-600" },
  { name: "Badminton", image: "badminton.jpg", color: "from-blue-400 to-blue-600" },
  { name: "Tennis", image: "tennis.jpg", color: "from-blue-400 to-blue-600" },
  { name: "Kabaddi", image: "kabaddi.webp", color: "from-purple-400 to-purple-600" },
  { name: "Hockey", image: "hock.jpg", color: "from-blue-400 to-blue-600" },
  { name: "Futsal", image: "futsal.avif", color: "from-blue-400 to-blue-600" },
  { name: "Handball", image: "handball.jpg", color: "from-red-400 to-red-600" },

]

const FEATURES = [
  {
    image: "player.png",
    title: "Find Teams & Players",
    description: "Looking for teammates or need players? Browse by sport, location, and skill level.",
    href: "/find-teams",
  },
  {
    image: "tour.jpg",
    title: "Tournaments",
    description: "Join nearby tournaments or create your own with minimum 5 teams.",
    href: "/tournaments",
  },
  {
    image: "cricket.avif",
    title: "Book Grounds",
    description: "Find and book sports grounds, courts, and fields near you.",
    href: "/grounds",
  },
  {
    image: "ranking.avif",
    title: "Ranking & Statistics",
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
  const AUTO_SCROLL_SPORTS = [...SPORTS, ...SPORTS];
  const AUTO_SCROLL_FEATURES = [...FEATURES, ...FEATURES];
  const [userCount, setUserCount] = useState(0);
  const [groundCount, setGroundCount] = useState(0);
  const [tournamentCount, setTournamentCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard/home-stats");
        const data = await res.json();

        setUserCount(data.userCount);
        setGroundCount(data.groundCount);
        setTournamentCount(data.tournamentCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col">
      <section className="relative h-screen w-full overflow-hidden">

        {/* Background Image */}
        {/* Desktop / Laptop Background */}
        <img
          src="/home.png"
          alt="Desktop Hero"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />

        {/* Mobile Background */}
        <img
          src="/homes.png"
          alt="Mobile Hero"
          className="absolute inset-0 block h-full w-full object-cover md:hidden"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.25)_0%,transparent_60%)]" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <Badge className="mb-4 px-4 py-1.5 text-xs bg-white/10 text-white border border-white/20 backdrop-blur-md">
              Nepal's #1 Sports & Gaming Network
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Sports Community
              </span>{" "}
              Awaits
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl mx-auto text-lg md:text-xl text-white">
              <span className="text-gray-200 "> Find teammates, join tournaments, book grounds, and track your stats.
                Cricket, Football, Volleyball, Basketball & more.
              </span>
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold"
                asChild
              >
                <Link to="/player-registration">
                  Get Started Free
                  <ArrowRightIcon className="ml-2 size-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
                asChild
              >
                <Link to="/find-teams" className="text-black dark:text-white">
                  Find a Team
                </Link>
              </Button>

            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-white">

              <span className="flex items-center gap-2">
                <UsersIcon className="text-cyan-400" />
                {userCount} Players
              </span>

              <span className="flex items-center gap-2">
                <TrophyIcon className="text-yellow-400" />
                {tournamentCount} Tournaments
              </span>

              <span className="flex items-center gap-2">
                <MapPinIcon className="text-green-400" />
                {groundCount} Grounds
              </span>

            </div>

          </div>

        </div>

      </section>

      <section className="px-4 py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl">

          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold font-serif sm:text-2xl">
              <span className="text-2xl sm:text-5xl">
                Explore Sports
              </span>
            </h2>

            <p className="mt-2 sm:text-xl text:lg  text-gray-700 dark:text-gray-200">
              <span className="text-gray-700 dark:text-gray-200">
                From cricket to kabaddi — find your game
              </span>
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="flex gap-6 animate-scroll w-max">
              {AUTO_SCROLL_SPORTS.map((sport, index) => (
                <Link
                  key={`${sport.name}-${index}`}
                  to={`/find-teams?sport=${sport.name.toLowerCase()}`}
                  className="group w-[250px] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="bg-white dark:bg-black/70 py-4 text-center">
                    <h3 className="text-xl font-semibold font-serif text-gray-700 dark:text-gray-200">
                      {sport.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
      <Separator />

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-5xl font-bold font-serif sm:text-2xl">
              <span className="text-2xl sm:text-5xl">
                Everything You Need
              </span></h2>
            <p className="mt-2 text-muted-foreground">
              <span className="text-gray-700 dark:text-white  sm:text-xl text:lg">
                One platform for the entire sports ecosystem</span></p>
          </div>
          <div className="mt-12 overflow-hidden">
            <div className="flex w-max gap-6 animate-scroll">
              {AUTO_SCROLL_FEATURES.map((feature, index) => (
                <Link
                  key={`${feature.title}-${index}`}
                  to={feature.href}
                  className="w-[320px] flex-shrink-0"
                >
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                    {/* Feature Image */}
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-48 w-full object-cover transition-transform duration-500 hover:scale-110"
                    />

                    <CardHeader>
                      <CardTitle className="text-xl font-serif">
                        {feature.title}
                      </CardTitle>

                      <CardDescription >
                        <span className=" text-gray-900 dark:text-gray-300">
                          {feature.description}
                        </span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <span className="inline-flex items-center gap-1 dark:text-blue-500 text-blue-700 ">
                        Explore
                        <ArrowRightIcon className="size-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="px-4 py-20 md:py-28 bg-muted/20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-5xl font-bold font-serif sm:text-2xl">
              <span className="text-2xl sm:text-5xl">
                How It Works
              </span></h2>
            <p className="mt-2 sm:text-xl text:lg  text-gray-700 dark:text-gray-200">
              <span className="text-gray-700 dark:text-gray-200">
                Get on the field in three simple steps
              </span>
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Card key={step.title} className="text-center border-0 bg-muted/50">
                <CardHeader>
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-blue-700  text-white">
                    <step.icon className="size-7" />
                  </div>
                  <div className="mt-2"><Badge variant="outline" className="mb-2 text-lg">Step {i + 1}</Badge></div>
                  <CardTitle className="text-lg text-gray-700 dark:text-gray-200 font-serif ">{step.title}</CardTitle>
                  <CardDescription  >
                    <span className="text-gray-700 dark:text-gray-400">
                      {step.description}
                    </span>
                  </CardDescription>
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
            <h2 className="text-5xl font-bold font-serif sm:text-2xl">
              <span className="text-2xl sm:text-5xl">
                Simple Pricing
              </span></h2>
            <p className="mt-2 sm:text-xl text:lg  text-gray-700 dark:text-gray-200">
              <span className="text-gray-700 dark:text-gray-200">
                Free to join. Pay only when you play.
              </span>
            </p>
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
                    <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                    {plan.title !== "Free" && <span className="text-sm text-muted-foreground"> /event</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 ">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm ">
                        <span className="flex size-4 items-center justify-center rounded-full  bg-violet-600/10 text-violet-600 dark:text-violet-400 text-xs">✓</span>
                      <span className="text-gray-800 dark:text-gray-300"> {f}</span> 
                      </li>
                    ))}
                  </ul>
                  <Button className={`mt-6 w-full  dark:text-gray-200 ${plan.highlighted ? "bg-gradient-to-r from-violet-600 to-indigo-600" : ""}`} variant={plan.highlighted ? "default" : "outline"} asChild>
                    <Link to="/subscribe">{plan.title === "Free" ? "Join Free" : "Get Started"}</Link>
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
