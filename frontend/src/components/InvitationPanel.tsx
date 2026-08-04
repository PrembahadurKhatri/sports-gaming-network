import { useEffect, useState } from "react"
import { X, Mail, CheckCircle, XCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { cn } from "@/lib/utils"
import api from "@/api/axios"

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

export default function InvitationPanel({ onClose }: { onClose: () => void }) {
  const [invitations, setInvitations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get("/invitations")
      setInvitations(data.invitations || [])
    } catch {
      setInvitations([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleAction(id: string, action: "accept" | "reject") {
    try {
      await api.patch(`/invitations/${id}/${action}`)
      setInvitations((prev) =>
        prev.map((inv) =>
          inv._id === id ? { ...inv, status: action === "accept" ? "accepted" : "rejected" } : inv
        )
      )
    } catch {
      /* ignore */
    }
  }

  const pending = invitations.filter((i) => i.status === "pending")

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-14">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mr-4 mt-2 w-[400px] rounded-2xl border bg-background shadow-2xl dark:border-white/10">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-primary" />
            <span className="font-semibold text-sm">Invitations</span>
            {pending.length > 0 && (
              <Badge className="bg-emerald-500 text-white text-[10px] px-1.5 py-0">{pending.length} new</Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" className="size-7" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>
        <div className="max-h-[480px] overflow-y-auto">
          {loading ? (
            <p className="py-12 text-center text-sm text-muted-foreground">Loading...</p>
          ) : invitations.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <Mail className="size-10 text-muted-foreground/40" />
              <p className="text-sm font-medium">No invitations</p>
            </div>
          ) : (
            invitations.map((inv) => {
              const teamName = inv.team?.teamName || "Team"
              const sport = inv.team?.sport || ""
              return (
                <div key={inv._id} className="flex items-start gap-3 border-b px-4 py-3.5 last:border-0 hover:bg-muted/30 transition-colors">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-xs">
                      {teamName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{teamName}</p>
                      {sport && <Badge variant="secondary" className="text-[9px]">{sport}</Badge>}
                      <Shield className="size-3 text-emerald-500" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">You've been invited to join this team.</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{timeAgo(inv.createdAt)}</p>
                    {inv.status === "pending" ? (
                      <div className="flex items-center gap-2 mt-2">
                        <Button size="sm" className="h-7 text-xs bg-gradient-to-r from-emerald-600 to-teal-600" onClick={() => handleAction(inv._id, "accept")}>
                          <CheckCircle className="size-3 mr-1" /> Accept
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleAction(inv._id, "reject")}>
                          <XCircle className="size-3 mr-1" /> Decline
                        </Button>
                      </div>
                    ) : (
                      <Badge className={cn(
                        "text-[10px] mt-1.5",
                        inv.status === "accepted" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"
                      )}>
                        {inv.status}
                      </Badge>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
