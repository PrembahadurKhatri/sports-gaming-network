import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Bell, Mail, LayoutDashboard, LogOut, Trophy } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"
import NotificationPanel from "@/components/NotificationPanel"
import InvitationPanel from "@/components/InvitationPanel"
import { useAuth } from "@/context/AuthContext"
const navLinks = [
  { href: "/grounds", label: "Grounds" },
  { href: "/find-players", label: "Find Players" },
  { href: "/find-teams", label: "Find Teams" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/matches", label: "Matches" },
  { href: "/rankings", label: "Rankings" },
]

export default function Navbar() {
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showInvitations, setShowInvitations] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const dashboardLink = user?.role === "admin" ? "/team-dashboard" : "/user-dashboard"

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-shadow duration-300 supports-backdrop-filter:bg-background/60",
          scrolled ? "shadow-sm shadow-black/5" : "shadow-none"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <span className="relative flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Trophy className="size-4" strokeWidth={2.25} />
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-emerald-400 ring-2 ring-background" />
            </span>
            <span className="hidden md:block bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text leading-none text-transparent sm:inline">
              Sports & Gaming Network
            </span>
            <span className="block md:hidden bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text leading-none text-transparent sm:inline">
              SPN
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = location.pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "group relative inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-violet-700 dark:text-gray-300 dark:hover:text-violet-300",
                    active && "text-violet-700 dark:text-violet-300"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-x-2.5 -bottom-0.5 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 transition-transform duration-200 group-hover:scale-x-100",
                      active && "scale-x-100"
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Desktop right side */}
          <div className="ml-auto hidden items-center gap-1.5 border-l pl-3 lg:flex">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-violet-50 dark:hover:bg-violet-950/50"
                  onClick={() => { setShowNotifications(!showNotifications); setShowInvitations(false) }}
                  title="Notifications"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-1.5 top-1.5 flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-violet-50 dark:hover:bg-violet-950/50"
                  onClick={() => { setShowInvitations(!showInvitations); setShowNotifications(false) }}
                  title="Invitations"
                >
                  <Mail className="size-4" />
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="ml-1 gap-2 rounded-full border-primary/20 hover:border-primary/50 hover:bg-violet-50 dark:hover:bg-violet-950/50"
                  asChild
                >
                  <Link to={dashboardLink}>
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </Button>

                <Link
                  to={dashboardLink}
                  className="ml-1 flex max-w-40 items-center gap-2 rounded-full py-1 pl-1 pr-2.5 transition-colors hover:bg-accent"
                >
                  <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-[10px] font-bold text-white ring-2 ring-background">
                    {user?.fullname?.charAt(0) || "U"}
                  </div>
                  <span className="max-w-[100px] truncate text-sm">{user?.fullname}</span>
                </Link>

                <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40" onClick={logout} title="Logout">
                  <LogOut className="size-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="rounded-full px-4" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" className="rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-4 shadow-md shadow-violet-600/25 hover:opacity-90" asChild>
                  <Link to="/player-registration">
                  <soan className="text-white">
                  Register
                  </soan></Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile trigger */}
          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setOpen(!open)}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className={cn("overflow-hidden border-t transition-all duration-300 ease-in-out lg:hidden", open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0")}>
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-4 pt-3 sm:px-6">
            {navLinks.map((link) => {
              const active = location.pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "inline-flex h-10 items-center justify-start gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/50 dark:hover:text-violet-300",
                    active && "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                  )}
                >
                  <span className={cn("size-1.5 rounded-full bg-violet-500 transition-opacity", active ? "opacity-100" : "opacity-0")} />
                  {link.label}
                </Link>
              )
            })}
            <hr className="my-2 border-border" />
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2.5 rounded-lg px-3 py-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white ring-2 ring-background">
                    {user?.fullname?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm font-medium">{user?.fullname}</span>
                </div>
                <Link to={dashboardLink} className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent">
                  <LayoutDashboard className="size-4 text-primary" /> Dashboard
                </Link>
                <button onClick={() => setShowNotifications(true)} className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent">
                  <Bell className="size-4 text-muted-foreground" /> Notifications
                  <span className="size-2 rounded-full bg-red-500" />
                </button>
                <button onClick={() => setShowInvitations(true)} className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent">
                  <Mail className="size-4 text-muted-foreground" /> Invitations
                  <span className="size-2 rounded-full bg-emerald-500" />
                </button>
                <hr className="my-2 border-border" />
                <Button variant="ghost" size="sm" className="justify-start gap-3 text-destructive hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40" onClick={logout}>
                  <LogOut className="size-4" /> Logout
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" asChild><Link to="/login">Login</Link></Button>
                <Button size="sm" className="bg-gradient-to-r from-violet-600 to-blue-600" asChild><Link to="/player-registration">Register</Link></Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
      {showInvitations && <InvitationPanel onClose={() => setShowInvitations(false)} />}
    </>
  )
}