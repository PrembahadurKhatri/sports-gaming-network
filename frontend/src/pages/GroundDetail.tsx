import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { ArrowLeftIcon, MapPinIcon, StarIcon } from "lucide-react"
import api from "@/api/axios"
import { useAuth } from "@/context/AuthContext"

export default function GroundDetail() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [ground, setGround] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [booking, setBooking] = useState({
    bookingDate: "",
    startTime: "09:00",
    endTime: "10:00",
    paymentMethod: "CASH",
    notes: "",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const { data } = await api.get(`/grounds/${id}`)
        setGround(data.ground || data)
      } catch (err: any) {
        setMessage(err?.response?.data?.message || "Failed to load ground.")
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  async function handleBook(e: React.FormEvent) {
    e.preventDefault()
    if (!isAuthenticated) {
      setMessage("Please login to book a ground.")
      return
    }
    setSubmitting(true)
    setMessage("")
    try {
      const { data } = await api.post("/ground-bookings", {
        ground: id,
        ...booking,
      })
      setMessage(data.message || "Booking created successfully.")
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Booking failed.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="py-20 text-center text-muted-foreground">Loading...</p>
  if (!ground) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p>{message || "Ground not found"}</p>
        <Button className="mt-4" asChild><Link to="/grounds">Back</Link></Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/grounds"><ArrowLeftIcon className="size-4 mr-1" /> Back</Link>
      </Button>

      <Card>
        {ground.images?.[0] && (
          <img src={ground.images[0]} alt={ground.groundName} className="h-56 w-full object-cover rounded-t-xl" />
        )}
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{ground.sport}</Badge>
            <Badge variant="secondary">{ground.status}</Badge>
          </div>
          <CardTitle className="text-2xl">{ground.groundName}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPinIcon className="size-3.5" />
            {ground.location || ground.address}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ground.description && <p className="text-muted-foreground">{ground.description}</p>}
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1 text-amber-500">
              <StarIcon className="size-4 fill-amber-500" /> {ground.rating ?? "—"}
            </span>
            <span className="font-semibold">Rs. {ground.pricePerHour}/hr</span>
            <span>{ground.openingTime} – {ground.closingTime}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(ground.amenities || []).map((a: string) => (
              <Badge key={a} variant="secondary" className="text-[10px]">{a}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Book this ground</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBook} className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Date</label>
              <Input type="date" required value={booking.bookingDate} onChange={(e) => setBooking({ ...booking, bookingDate: e.target.value })} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs text-muted-foreground">Start time</label>
                <Input type="time" required value={booking.startTime} onChange={(e) => setBooking({ ...booking, startTime: e.target.value })} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">End time</label>
                <Input type="time" required value={booking.endTime} onChange={(e) => setBooking({ ...booking, endTime: e.target.value })} />
              </div>
            </div>
            <select
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              value={booking.paymentMethod}
              onChange={(e) => setBooking({ ...booking, paymentMethod: e.target.value })}
            >
              <option value="CASH">Cash</option>
              <option value="KHALTI">Khalti</option>
              <option value="ESEWA">eSewa</option>
            </select>
            <Input placeholder="Notes (optional)" value={booking.notes} onChange={(e) => setBooking({ ...booking, notes: e.target.value })} />
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={submitting} className="bg-gradient-to-r from-blue-600 to-cyan-600">
                {submitting ? "Booking..." : "Confirm Booking"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to="/my-bookings">My Bookings</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
