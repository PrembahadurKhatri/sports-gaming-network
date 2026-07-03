import {
    Users,
    Trophy,
    MapPin,
    CalendarDays,
    Building2,
    MessageCircle,
    Star,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

const services = [
    {
        icon: Users,
        title: "Find Teammates",
        description:
            "Connect with nearby players based on sport, skill level, and availability.",
        link:"find-players"
    },
    {
        icon: Trophy,
        title: "Join or Create Teams",
        description:
            "Create your own team or join existing teams looking for new players.",
        link:"find-teams"
    
        },
    {
        icon: CalendarDays,
        title: "Tournament Management",
        description:
            "Discover, register, and participate in local sports tournaments.",
        link:"tournaments"
    },
    {
        icon: Building2,
        title: "Ground Booking",
        description:
            "Book football fields, cricket grounds, basketball courts and more.",
        link:"grounds"
    },
    {
        icon: MapPin,
        title: "Nearby Sports",
        description:
            "Find players, teams, tournaments and grounds around your location.",
            link:"nearby-sports"
    },
    {
        icon: MessageCircle,
        title: "Real-time Chat",
        description:
            "Message teammates, captains and organizers directly from the platform.",
            link:"chat"
    },
];

const features = [
    "Verified Player Profiles",
    "Nearby Match Recommendations",
    "Smart Team Suggestions",
    "Tournament Notifications",
    "Ground Availability",
    "Secure Authentication",
];

export default function Services() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 py-24 text-center">

                <div className="inline-flex rounded-full bg-cyan-100 px-5 py-2 text-cyan-700 font-semibold">
                    🚀 Everything You Need For Sports
                </div>

                <h1 className="mt-8 text-5xl md:text-7xl font-black">
                    Our{" "}
                    <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                        Services
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
                    Sports & Gaming Network helps players, teams, organizers and
                    ground owners connect together in one modern platform.
                </p>

            </section>

            {/* Services */}

            <section className="mx-auto max-w-7xl px-6 pb-24">

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {services.map((service, index) => {

                        const Icon = service.icon;

                        return (

                            <div
                                key={index}
                                className="group rounded-3xl border bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900"
                            >

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">

                                    <Icon size={32} />

                                </div>

                                <h2 className="mt-6 text-2xl font-bold">
                                    {service.title}
                                </h2>

                                <p className="mt-4 text-gray-600 dark:text-gray-300">
                                    {service.description}
                                </p>

                                <button className="mt-6 flex items-center gap-2 font-semibold text-cyan-600">
                                   <p ><a href={service.link}>Learn More</a> </p> 
                                    <ArrowRight
                                        size={18}
                                        className="transition group-hover:translate-x-2"
                                    />
                                </button>

                            </div>

                        );

                    })}

                </div>

            </section>

            {/* Why Choose */}

            <section className="mx-auto max-w-7xl px-6 pb-24">

                <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-10 text-white">

                    <h2 className="text-4xl font-bold ">
                        <span className="text-white">Why Choose Sports & Gaming Network?</span>
                    </h2>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {features.map((feature) => (

                            <div
                                key={feature}
                                className="flex items-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur"
                            >

                                <ShieldCheck className="text-green-300" />

                                <span>{feature}</span>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* Stats */}

            <section className="mx-auto max-w-7xl px-6 pb-24">

                <div className="grid gap-8 md:grid-cols-4">

                    {[
                        ["500+", "Players"],
                        ["25+", "Teams"],
                        ["10+", "Grounds"],
                        ["50+", "Tournaments"],
                    ].map(([number, label]) => (

                        <div
                            key={label}
                            className="rounded-3xl bg-white p-8 text-center shadow-xl dark:bg-slate-900"
                        >

                            <h2 className="text-5xl font-black text-cyan-600">
                                {number}
                            </h2>

                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                {label}
                            </p>

                        </div>

                    ))}

                </div>

            </section>

            {/* CTA */}

            <section className="mx-auto max-w-5xl px-6 pb-24">

                <div className="rounded-3xl bg-gradient-to-r from-violet-500 via-blue-400 to-cyan-500 p-12 text-center text-white shadow-2xl">

                    <Star size={48} className="mx-auto" />

                    <h2 className="mt-6 text-4xl font-bold text-white">
                        Ready to Play?
                    </h2>

                    <p className="mt-4 text-lg text-cyan-100">
                        Join thousands of players and teams across Nepal.
                    </p>

                    <button className="mt-8 rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:scale-105">
                       <a href="/"> Get Started</a>
                    </button>

                </div>

            </section>

        </div>
    );
}