import {
  Users,
  Trophy,
  Target,
  Heart,
  MapPin,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Users,
      title: "Find Teammates",
      description:
        "Connect with players nearby based on your sport, location, and skill level.",
    },
    {
      icon: Trophy,
      title: "Join Teams",
      description:
        "Discover teams looking for players and become part of a competitive community.",
    },
    {
      icon: CalendarDays,
      title: "Tournaments",
      description:
        "Participate in local tournaments and compete with the best teams.",
    },
    {
      icon: MapPin,
      title: "Ground Booking",
      description:
        "Book football fields, cricket grounds, basketball courts, and more.",
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-black">
            About Sports & Gaming Network
          </h1>

          <p className="mt-6 text-lg md:text-xl text-cyan-100 max-w-3xl mx-auto">
           <span className="text-white font-serif"> Connecting players, teams, organizers, and sports enthusiasts on one
            platform. Discover teammates, play matches, join tournaments, and
            grow the sports community together.</span>
          </p>

        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl font-bold font-serif text-slate-900 dark:text-white">
              Who We Are
            </h2>

            <p className="mt-6 text-gray-600 dark:text-gray-300 leading-8">
             <span className="font-serif text-lg sm:text-xl text-slate-900 dark:text-white">
              Sports & Gaming Network is a platform designed to bring players,
              teams, tournament organizers, and ground owners together.
              Whether you're looking for teammates, booking a sports ground, or
              participating in tournaments, our platform provides everything in
              one place.
              </span>
            </p>

            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-8">
                <span className="font-serif text-lg sm:text-xl text-slate-900 dark:text-white">
              Our mission is to strengthen Nepal's sports community through
              technology and make sports more accessible for everyone.
              </span>
            </p>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-10">
            <Target className="h-14 w-14 text-cyan-600" />

            <h3 className="mt-6 text-2xl font-bold dark:text-white">
              Our Mission
            </h3>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
                   <span className="font-serif text-lg  text-slate-900 dark:text-white">
              To help every player find teammates, organize matches, participate
              in tournaments, and enjoy sports without barriers.
              </span>
            </p>

            <Heart className="h-14 w-14 mt-8 text-red-500" />

            <h3 className="mt-6 text-2xl font-bold dark:text-white">
              Our Vision
            </h3>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
                 <span className="font-serif text-lg  text-slate-900 dark:text-white">
              To become Nepal's largest sports networking platform connecting
              thousands of athletes across every sport.
              </span>
            </p>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="text-center">

          <h2 className="text-4xl font-bold font-serif dark:text-white">
            What We Offer
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
               <span className="font-serif text-lg  text-slate-900 dark:text-white">
            Everything you need to enjoy sports, all in one platform.
            </span>
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={index}
                className="rounded-3xl bg-white dark:bg-slate-900 shadow-lg p-8 hover:-translate-y-2 transition duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center">
                  <Icon className="text-cyan-600" size={30} />
                </div>

                <h3 className="mt-6 text-xl font-bold dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600 dark:text-gray-100">
                     <span className="font-serif text-lg  text-slate-900 dark:text-gray-300">
                  {feature.description}
                  </span>
                </p>

              </div>

            );

          })}

        </div>

      </section>

      {/* Statistics */}

      <section className="bg-white dark:bg-slate-900 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

            <div>
              <h2 className="text-5xl font-black text-cyan-600">
                500+
              </h2>

              <p className="mt-3 ">
                   <span className="font-serif text-lg sm:text-xl  text-slate-900 dark:text-gray-300">
                Registered Players
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-cyan-600">
                20+
              </h2>

              <p className="mt-3 ">
                   <span className="font-serif text-lg sm:text-xl  text-slate-900 dark:text-gray-300">
                Sports Teams
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-cyan-600">
                20+
              </h2>

              <p className="mt-3 ">
                     <span className="font-serif text-lg sm:text-xl  text-slate-900 dark:text-gray-300">
                Tournaments
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-cyan-600">
                10+
              </h2>

              <p className="mt-3 ">
                     <span className="font-serif text-lg sm:text-xl  text-slate-900 dark:text-gray-300">
                Sports Grounds
                </span>
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div className="max-w-5xl mx-auto px-6">

          <div className="rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-12 text-center shadow-2xl">

            <h2 className="text-4xl font-bold">
              Join Nepal's Growing Sports Community
            </h2>

            <p className="mt-5 text-lg text-cyan-100">
                 <span className="font-serif text-lg sm:text-xl  text-black dark:text-gray-300">
              Create your account today and discover teammates, join teams,
              participate in tournaments, and book sports grounds effortlessly.
              </span>
            </p>

            <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 hover:scale-105 transition">
              <a href="/home" className="flex items-baseline gap-2">
            Get Started
              <ArrowRight size={20} />
              </a>
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}