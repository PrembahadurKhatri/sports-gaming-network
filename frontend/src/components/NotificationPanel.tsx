import { useEffect, useState } from "react"
import { X, Bell, Users, Trophy, Calendar, CheckCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"
import api from "@/api/axios"

const TYPE_STYLE: Record<string, { icon: any; color: string; bg: string }> = {
  JOIN_REQUEST: { icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  TEAM_INVITE: { icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
  INVITATION: { icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
  MATCH_REQUEST: { icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  default: { icon: CheckCircle, color: "text-violet-500", bg: "bg-violet-500/10" },
}

function timeAgo(date?: string) {
  if (!date) return ""
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? "s" : ""} ago`
}

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get("/notifications")
      setNotifications(data.notifications || [])
    } catch {
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function markAllRead() {
    try {
      await api.patch("/notifications/read-all")
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    } catch {
      /* ignore */
    }
  }

  async function markRead(id: string) {
    try {
      await api.patch(`/notifications/${id}/read`)
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)))
    } catch {
      /* ignore */
    }
  }

  const unread = notifications.filter((n) => !n.isRead).length

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-14">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mr-4 mt-2 w-[400px] rounded-2xl border bg-background shadow-2xl dark:border-white/10">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            <span className="font-semibold text-sm">Notifications</span>
            {unread > 0 && (
              <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0">{unread}</Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unread > 0 && (
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
          {loading ? (
            <p className="py-12 text-center text-sm text-muted-foreground">Loading...</p>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <Bell className="size-10 text-muted-foreground/40" />
              <p className="text-sm font-medium">No notifications</p>
            </div>
          ) : (
            notifications.map((n) => {
              const style = TYPE_STYLE[n.type] || TYPE_STYLE.default
              const Icon = style.icon || MessageCircle
              return (
                <div
                  key={n._id}
                  onClick={() => !n.isRead && markRead(n._id)}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 cursor-pointer border-b last:border-0",
                    !n.isRead && "bg-primary/5"
                  )}
                >
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${style.bg} ${style.color}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-sm text-muted-foreground">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{timeAgo(n.createdAt)}</p>
                  </div>
                  {!n.isRead && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-500" />}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
