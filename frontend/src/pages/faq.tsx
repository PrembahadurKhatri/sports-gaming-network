import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Sports & Gaming Network?",
    answer:
      "Sports & Gaming Network is a platform where players can find teammates, join teams, book sports grounds, participate in tournaments, and connect with the local sports community.",
  },
  {
    question: "How do I register as a player?",
    answer:
      "Click on the Register button, choose 'Player', complete your profile, select your sports, skill level, and preferred positions.",
  },
  {
    question: "How can I create a team?",
    answer:
      "Register as a Team account, fill in your team details, upload your logo, choose your sport, and start recruiting players.",
  },
  {
    question: "How do I join a team?",
    answer:
      "Browse the Find Teams page, choose a team that is recruiting, and send a join request. The team captain can accept or reject your request.",
  },
  {
    question: "Can I play multiple sports?",
    answer:
      "Yes. You can select multiple sports in your profile and update them anytime from your dashboard.",
  },
  {
    question: "How do I find nearby players?",
    answer:
      "Enable your location and use the Find Players page to search for players based on sport, skill level, and distance.",
  },
  {
    question: "How do I book a sports ground?",
    answer:
      "Visit the Grounds page, select a venue, choose an available date and time, and confirm your booking.",
  },
  {
    question: "How do tournaments work?",
    answer:
      "Tournament organizers create tournaments on the platform. Teams can register, view schedules, and receive updates directly through the website.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes. Your personal information is protected according to our Privacy Policy. Passwords are encrypted and sensitive information is never shared without your permission.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Visit the Contact page and send us a message. Our support team will respond as soon as possible.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          Find answers to the most common questions about Sports & Gaming
          Network.
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between p-6 text-left hover:bg-slate-50 transition"
              >
                <span className="font-semibold text-lg text-gray-800">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  activeIndex === index
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-gray-600 leading-7">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 p-10 text-center  shadow-2xl">
          <h2 className="text-3xl font-bold ">
           <span className="text-white"> Still have questions?</span>
          </h2>

          <p className="mt-4 text-gray-100">
            Our support team is always here to help you with players, teams,
            tournaments, or ground bookings.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-blue-700 transition hover:scale-105"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}