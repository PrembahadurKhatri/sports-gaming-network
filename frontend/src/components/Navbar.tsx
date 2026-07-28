import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Bell, Mail, LayoutDashboard, LogOut, User } from "lucide-react"
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
  { href: "/rankings", label: "Rankings" },
]

export default function Navbar() {
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showInvitations, setShowInvitations] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const dashboardLink = user?.role === "admin" ? "/team-dashboard" : "/user-dashboard"

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Sports & Gaming Network
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium  transition-colors hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/50 dark:hover:text-violet-300 text-gray-800 dark:text-white",
                  location.pathname.startsWith(link.href) && "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 border-l pl-3 lg:flex">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="relative" onClick={() => { setShowNotifications(!showNotifications); setShowInvitations(false) }} title="Notifications">
                  <Bell className="size-4" />
                  <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                </Button>

                <Button variant="ghost" size="icon" className="relative" onClick={() => { setShowInvitations(!showInvitations); setShowNotifications(false) }} title="Invitations">
                  <Mail className="size-4" />
                  <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </Button>

                <Button variant="outline" size="sm" className="gap-2 rounded-full border-primary/20 hover:border-primary/50" asChild>
                  <Link to={dashboardLink}>
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </Button>

                <Link to={dashboardLink} className="flex max-w-40 items-center gap-2 rounded-full px-2 py-1 hover:bg-accent transition-colors">
                  <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-[10px] font-bold text-white">
                    {user?.fullname?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm max-w-[100px] truncate">{user?.fullname}</span>
                </Link>

                <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                  <LogOut className="size-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="rounded-full px-4" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" className="rounded-full px-4" asChild>
                  <Link to="/player-registration">Register</Link>
                </Button>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        <div className={cn("overflow-hidden border-t transition-all duration-200 lg:hidden", open ? "max-h-[32rem]" : "max-h-0")}>
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-4 pt-3 sm:px-6">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}
                className={cn("inline-flex h-10 items-center justify-start rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/50 dark:hover:text-violet-300", location.pathname.startsWith(link.href) && "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300")}>
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            {isAuthenticated ? (
              <>
                <Link to={dashboardLink} className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent">
                  <LayoutDashboard className="size-4 text-primary" /> Dashboard
                </Link>
                <button onClick={() => setShowNotifications(true)} className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent">
                  <Bell className="size-4 text-muted-foreground" /> Notifications
                  <span className="size-2 rounded-full bg-red-500" />
                </button>
                <button onClick={() => setShowInvitations(true)} className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent">
                  <Mail className="size-4 text-muted-foreground" /> Invitations
                </button>
                <hr className="my-2 border-border" />
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-[10px] font-bold text-white">
                    {user?.fullname?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm">{user?.fullname}</span>
                </div>
                <Button variant="ghost" size="sm" className="justify-start text-destructive" onClick={logout}>
                  <LogOut className="size-4 mr-2" /> Logout
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" asChild><Link to="/login">Login</Link></Button>
                <Button size="sm" asChild><Link to="/player-registration">Register</Link></Button>
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
