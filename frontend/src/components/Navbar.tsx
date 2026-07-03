import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"

const navLinks = [
  { href: "/find-teams", label: "Find Teams" },
  { href: "/find-players", label: "Find Players" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/grounds", label: "Grounds" },
  { href: "/rankings", label: "Rankings" },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full  border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-12 sm:h-20 max-w-6xl items-center gap-6 px-4 ">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent sm:right-65 sm:relative">
            Sports & Gaming Network
          </span>
         
        </Link>

        <nav className="hidden items-center  gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                location.pathname.startsWith(link.href) && "bg-accent text-accent-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/player-registration">Register</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden ml-auto">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <div className={cn("overflow-hidden border-t transition-all duration-200 md:hidden", open ? "max-h-96" : "max-h-0")}>
        <nav className="flex flex-col gap-1 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "inline-flex items-center justify-start rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                location.pathname.startsWith(link.href) && "bg-accent"
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-2 border-border" />
          <Button variant="ghost" size="lg" className="justify-start" asChild>
            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          </Button>
          <Button size="lg" onClick={() => { setOpen(false) }} asChild>
            <Link to="/player-registration">Register</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
