import { useState } from "react"
import { X, Bell, Trophy, Users, Calendar, CheckCircle, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

const SAMPLE_NOTIFICATIONS = [
  { id: 1, icon: Users, text: "Rahul Sharma wants to join your team.", time: "2 min ago", color: "text-blue-500", bg: "bg-blue-500/10", unread: true },
  { id: 2, icon: Trophy, text: "Your team qualified for Kathmandu Premier League!", time: "1 hour ago", color: "text-amber-500", bg: "bg-amber-500/10", unread: true },
  { id: 3, icon: Calendar, text: "Match vs Pokhara Strikers scheduled for Aug 15.", time: "3 hours ago", color: "text-emerald-500", bg: "bg-emerald-500/10", unread: true },
  { id: 4, icon: CheckCircle, text: "Booking confirmed at Dashrath Stadium.", time: "1 day ago", color: "text-violet-500", bg: "bg-violet-500/10", unread: false },
  { id: 5, icon: MessageCircle, text: "New message from Coach Sharma.", time: "2 days ago", color: "text-rose-500", bg: "bg-rose-500/10", unread: false },
]

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS)

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-14">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mr-4 mt-2 w-[400px] rounded-2xl border bg-background shadow-2xl dark:border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            <span className="font-semibold text-sm">Notifications</span>
            {notifications.some((n) => n.unread) && (
              <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0">
                {notifications.filter((n) => n.unread).length}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {notifications.some((n) => n.unread) && (
              <Button variant="ghost" size="sm" className="text-xs h-7" onClick={markAllRead}>
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="icon" className="size-7" onClick={onClose}>
              <X className="size-4" />
            </Button>
          </div>
        </div>
        <div className="max-h-[480px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <Bell className="size-10 text-muted-foreground/40" />
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs text-muted-foreground">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={cn(
                  "flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 cursor-pointer border-b last:border-0",
                  n.unread && "bg-primary/5"
                )}
              >
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${n.bg} ${n.color}`}>
                  <n.icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
                {n.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-500" />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
