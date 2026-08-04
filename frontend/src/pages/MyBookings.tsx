import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import api from "@/api/axios"

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get("/ground-bookings/my")
      setBookings(data.bookings || data || [])
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to load bookings.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function cancelBooking(bookingId: string) {
    try {
      await api.patch(`/ground-bookings/${bookingId}/cancel`)
      setMessage("Booking cancelled.")
      await load()
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Cancel failed.")
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <Button variant="outline" asChild><Link to="/grounds">Browse Grounds</Link></Button>
      </div>

      {message && <p className="mb-4 text-sm text-muted-foreground">{message}</p>}

      {loading ? (
        <p className="py-16 text-center text-muted-foreground">Loading...</p>
      ) : bookings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No bookings yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <Card key={b._id}>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base">
                    {b.ground?.groundName || "Ground"}
                  </CardTitle>
                  <Badge variant="secondary">{b.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <div className="space-y-1 text-muted-foreground">
                  <p>{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "—"} · {b.startTime} – {b.endTime}</p>
                  <p>Rs. {b.totalAmount ?? 0} · {b.paymentMethod} · {b.paymentStatus}</p>
                </div>
                {b.status === "PENDING" || b.status === "APPROVED" ? (
                  <Button size="sm" variant="outline" onClick={() => cancelBooking(b._id)}>Cancel</Button>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
