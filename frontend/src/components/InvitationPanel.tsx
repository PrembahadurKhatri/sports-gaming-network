import { useState } from "react"
import { X, Mail, CheckCircle, XCircle, UserPlus, Shield } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { cn } from "@/lib/utils"

const SAMPLE_INVITATIONS = [
  {
    id: 1, type: "team", from: "Kathmandu Kings", sport: "Cricket",
    fromAvatar: "KK", message: "We'd love to have you on our squad!",
    time: "5 min ago", status: "pending",
  },
  {
    id: 2, type: "tournament", from: "Pokhara Football Cup", sport: "Football",
    fromAvatar: "PC", message: "Your team is invited to compete!",
    time: "1 hour ago", status: "pending",
  },
  {
    id: 3, type: "team", from: "Lalitpur Legends", sport: "Basketball",
    fromAvatar: "LL", message: "Looking for a point guard like you.",
    time: "1 day ago", status: "pending",
  },
  {
    id: 4, type: "team", from: "Chitwan Chargers", sport: "Hockey",
    fromAvatar: "CC", message: "Join our championship run!",
    time: "3 days ago", status: "accepted",
  },
]

export default function InvitationPanel({ onClose }: { onClose: () => void }) {
  const [invitations, setInvitations] = useState(SAMPLE_INVITATIONS)

  function handleAction(id: number, action: "accepted" | "declined") {
    setInvitations((prev) => prev.map((inv) => (inv.id === id ? { ...inv, status: action } : inv)))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-14">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mr-4 mt-2 w-[400px] rounded-2xl border bg-background shadow-2xl dark:border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-primary" />
            <span className="font-semibold text-sm">Invitations</span>
            {invitations.filter((i) => i.status === "pending").length > 0 && (
              <Badge className="bg-emerald-500 text-white text-[10px] px-1.5 py-0">
                {invitations.filter((i) => i.status === "pending").length} new
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" className="size-7" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>
        <div className="max-h-[480px] overflow-y-auto">
          {invitations.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <Mail className="size-10 text-muted-foreground/40" />
              <p className="text-sm font-medium">No invitations</p>
              <p className="text-xs text-muted-foreground">You'll see team and tournament invites here.</p>
            </div>
          ) : (
            invitations.map((inv) => (
              <div key={inv.id} className="flex items-start gap-3 border-b px-4 py-3.5 last:border-0 hover:bg-muted/30 transition-colors">
                <Avatar size="lg">
                  <AvatarFallback className={cn(
                    "text-white text-xs",
                    inv.type === "team" ? "bg-gradient-to-br from-emerald-600 to-teal-600" : "bg-gradient-to-br from-amber-600 to-orange-600"
                  )}>
                    {inv.fromAvatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{inv.from}</p>
                    <Badge variant="secondary" className="text-[9px]">{inv.sport}</Badge>
                    {inv.type === "team" ? (
                      <Shield className="size-3 text-emerald-500" />
                    ) : (
                      <UserPlus className="size-3 text-amber-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{inv.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{inv.time}</p>
                  {inv.status === "pending" ? (
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="sm" className="h-7 text-xs bg-gradient-to-r from-emerald-600 to-teal-600" onClick={() => handleAction(inv.id, "accepted")}>
                        <CheckCircle className="size-3 mr-1" /> Accept
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleAction(inv.id, "declined")}>
                        <XCircle className="size-3 mr-1" /> Decline
                      </Button>
                    </div>
                  ) : (
                    <Badge className={cn(
                      "text-[10px] mt-1.5",
                      inv.status === "accepted" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"
                    )}>
                      {inv.status === "accepted" ? "✓ Accepted" : "✗ Declined"}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
