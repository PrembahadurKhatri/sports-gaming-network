import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/Separator"

const footerLinks = {
  platform: {
    title: "Platform",
    links: [
      { href: "/find-teams", label: "Find Teams" },
      { href: "/find-players", label: "Find Players" },
      { href: "/tournaments", label: "Tournaments" },
      { href: "/grounds", label: "Grounds" },
      { href: "/rankings", label: "Rankings" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
  connect: {
    title: "Connect",
    links: [
      { href: "/aboutus", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
      { href: "/partners", label: "Partners" },
    ],
  },
}

const sportsList = [
  "Cricket", "Football", "Volleyball", "Handball",
  "Basketball", "Hockey", "Tennis", "Badminton",
  "Futsal", "Kabaddi",
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-xl font-bold">
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Sports & Gaming Network
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Nepal's ultimate sports & gaming network. Find teams, book grounds, join tournaments, and track your stats.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {sportsList.map((sport) => (
                <span
                  key={sport}
                  className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
          {Object.values(footerLinks).map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-semibold">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <p>&copy; 2026 sports-gaming-network. All rights reserved. Built for Nepal's sports community.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Separator orientation="vertical" className="h-4" />
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Separator orientation="vertical" className="h-4" />
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
