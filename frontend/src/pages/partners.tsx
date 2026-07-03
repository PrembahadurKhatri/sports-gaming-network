import {
  Building2,
  Trophy,
  MapPinned,
  Store,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const partnerTypes = [
  {
    icon: Trophy,
    title: "Sports Clubs",
    description:
      "Recruit talented players, promote your club, and grow your community.",
  },
  {
    icon: MapPinned,
    title: "Ground Owners",
    description:
      "List your sports grounds and receive online booking requests.",
  },
  {
    icon: Building2,
    title: "Tournament Organizers",
    description:
      "Host tournaments, manage participants, and reach more athletes.",
  },
  {
    icon: Store,
    title: "Sports Businesses",
    description:
      "Promote sports equipment, coaching services, and local businesses.",
  },
];

const benefits = [
  "Verified Partner Badge",
  "Business Promotion",
  "Reach Thousands of Players",
  "Online Ground Booking",
  "Tournament Promotion",
  "Dedicated Support",
];

export default function Partners() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Hero */}
      <section className="bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">

          <h1 className="text-5xl font-black">
            Partner With Us
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-cyan-100">
              <span className="text-white font-serif ">
            Join Sports & Gaming Network and help us build Nepal's largest sports
            community. Together we can connect players, teams, organizers, and
            sports businesses.
            </span>
          </p>

          <button className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 hover:scale-105 transition">
            Become a Partner
          </button>

        </div>
      </section>

      {/* Partner Types */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center">

          <h2 className="text-4xl font-bold dark:text-white">
            Who Can Partner With Us?
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
                <span className="text-black dark:text-gray-300 font-serif ">
            We welcome organizations that want to grow Nepal's sports ecosystem.
            </span>
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {partnerTypes.map((partner, index) => {
            const Icon = partner.icon;

            return (
              <div
                key={index}
                className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center">
                  <Icon className="text-cyan-600" size={30} />
                </div>

                <h3 className="mt-6 text-xl font-bold dark:text-white">
                  {partner.title}
                </h3>

                <p className="mt-3 text-gray-600 dark:text-gray-300">
                        <span className="text-black dark:text-gray-300 font-serif ">
                  {partner.description}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}

      <section className="bg-white dark:bg-slate-900 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-4xl font-bold dark:text-white">
              <span className="text-black dark:text-white  font-serif">
              Partnership Benefits
              </span>
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-300">
                        <span className="text-black dark:text-gray-300 font-serif ">
              Grow your organization with Sports & Gaming Network.
              </span>
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5 flex items-center gap-4"
              >
                <CheckCircle className="text-green-500" />

                <span className="font-medium dark:text-white">
                  {benefit}
                </span>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Current Status */}

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-400 text-white p-12 text-center shadow-2xl">

          <Building2 size={70} className="mx-auto" />

          <h2 className="mt-6 text-4xl font-bold">
            Building Our Partner Network
          </h2>

          <p className="mt-6 text-lg text-cyan-100">
            We are currently welcoming our first official partners.
            If you own a sports club, academy, ground, business,
            or organize tournaments, we'd love to collaborate with you.
          </p>

        </div>

      </section>

      {/* CTA */}

      <section className="pb-24 px-6">

        <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-12 text-center">

          <h2 className="text-4xl font-bold dark:text-white">
            Ready to Become a Partner?
          </h2>

          <p className="mt-5 text-gray-600 dark:text-gray-300">
                <span className="text-black dark:text-gray-300 font-serif ">
            Join us today and help shape the future of sports in Nepal.
            </span>
          </p>

          <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 text-white font-semibold hover:bg-cyan-700 transition">

            Become a Partner

            <ArrowRight size={20} />

          </button>

        </div>

      </section>

    </div>
  );
}