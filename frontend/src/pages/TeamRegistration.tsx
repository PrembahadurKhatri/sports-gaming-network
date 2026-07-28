import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Separator } from "@/components/ui/Separator"
import { CameraIcon, CheckCircle2, XCircle, Plus, Trash2, Globe, Lock, Loader2 } from "lucide-react"
import Card3D from "@/components/Card3D"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

// ─── Constants ──────────────────────────────────────────────────────────────

const SPORT_MAX_PLAYERS: Record<string, number> = {
  Cricket: 15,
  Football: 23,
  Futsal: 12,
  Basketball: 15,
  Volleyball: 12,
  Handball: 16,
  Hockey: 18,
  Kabaddi: 12,
  Badminton: 6,
  Tennis: 4,
}

const POSITIONS: Record<string, string[]> = {
  Cricket: ["Batsman", "Bowler", "All-rounder", "Wicket Keeper", "Captain"],
  Football: ["Goalkeeper", "Defender", "Midfielder", "Forward", "Captain"],
  Basketball: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
  Volleyball: ["Setter", "Spiker", "Blocker", "Libero", "Server"],
  Handball: ["Goalkeeper", "Wing", "Back", "Center", "Pivot"],
  Hockey: ["Forward", "Midfielder", "Defender", "Goalkeeper"],
  Badminton: ["Singles", "Doubles", "Mixed Doubles"],
  Tennis: ["Singles", "Doubles"],
  Futsal: ["Goalkeeper", "Defender", "Winger", "Pivot"],
  Kabaddi: ["Raider", "Defender", "All-rounder"],
}

const PROVINCES = ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"]
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Professional"]
const SPORTS = Object.keys(SPORT_MAX_PLAYERS)
const CURRENT_YEAR = new Date().getFullYear()

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormState {
  teamName: string
  sport: string
  province: string
  location: string
  homeGround: string
  foundedYear: string
  contactNumber: string
  teamEmail: string
  description: string
  autoAccept: boolean
  requiredPositions: string[]
  minAge: string
  maxAge: string
  skillLevel: string
  provincePreference: string
  tournamentExperience: boolean
  customQuestions: string[]
}

interface ErrorState {
  teamName: string
  sport: string
  province: string
  location: string
  contactNumber: string
  teamEmail: string
  foundedYear: string
  description: string
  minAge: string
  maxAge: string
}

type NameStatus = "idle" | "checking" | "available" | "taken"
type TeamType = "Public" | "Private"

const BLANK_ERRORS: ErrorState = {
  teamName: "", sport: "", province: "", location: "",
  contactNumber: "", teamEmail: "", foundedYear: "",
  description: "", minAge: "", maxAge: "",
}

const SUGGESTED_QUESTIONS = [
  "Why do you want to join?",
  "Years of experience?",
  "List your achievements",
  "Current team?",
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function TeamRegistration() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [teamType, setTeamType] = useState<TeamType>("Public")
  const [form, setForm] = useState<FormState>({
    teamName: "", sport: "", province: "", location: "", homeGround: "",
    foundedYear: "", contactNumber: "", teamEmail: "", description: "",
    autoAccept: false, requiredPositions: [], minAge: "", maxAge: "",
    skillLevel: "", provincePreference: "", tournamentExperience: false,
    customQuestions: [],
  })
  const [errors, setErrors] = useState<ErrorState>(BLANK_ERRORS)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState("")
  const [logoError, setLogoError] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [nameStatus, setNameStatus] = useState<NameStatus>("idle")
  const [newQuestion, setNewQuestion] = useState("")
  const nameTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const maxPlayers = form.sport ? SPORT_MAX_PLAYERS[form.sport] : null
  const sportPositions: string[] = form.sport ? (POSITIONS[form.sport] ?? []) : []

  // Cleanup blob URL
  useEffect(() => () => { if (logoPreview) URL.revokeObjectURL(logoPreview) }, [logoPreview])

  // Debounced name uniqueness check
  useEffect(() => {
    if (form.teamName.trim().length < 3) { setNameStatus("idle"); return }
    setNameStatus("checking")
    if (nameTimer.current) clearTimeout(nameTimer.current)
    nameTimer.current = setTimeout(async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/teams/check-name`, {
          params: { name: form.teamName.trim() },
        })
        setNameStatus(data.available ? "available" : "taken")
      } catch {
        setNameStatus("idle") // endpoint may not exist yet
      }
    }, 700)
    return () => { if (nameTimer.current) clearTimeout(nameTimer.current) }
  }, [form.teamName])

  // ── Helpers ──

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm(p => ({ ...p, [key]: val }))
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!["image/jpeg", "image/png"].includes(file.type)) { setLogoError("Only JPG / PNG allowed."); return }
    if (file.size > 5 * 1024 * 1024) { setLogoError("Max 5 MB allowed."); return }
    setLogoFile(file); setLogoError(""); setLogoPreview(URL.createObjectURL(file))
  }

  function togglePosition(pos: string) {
    const positions = form.requiredPositions
    set("requiredPositions", positions.includes(pos) ? positions.filter(p => p !== pos) : [...positions, pos])
  }

  function addQuestion() {
    const q = newQuestion.trim()
    if (q && !form.customQuestions.includes(q)) {
      set("customQuestions", [...form.customQuestions, q])
      setNewQuestion("")
    }
  }

  function removeQuestion(i: number) {
    set("customQuestions", form.customQuestions.filter((_, idx) => idx !== i))
  }

  // ── Validation ──

  function validateStep1(): boolean {
    const e: ErrorState = { ...BLANK_ERRORS }
    if (form.teamName.trim().length < 3) e.teamName = "Team name must be at least 3 characters."
    else if (nameStatus === "taken") e.teamName = "This team name is already taken."
    if (!form.sport) e.sport = "Please select a sport."
    if (!form.province) e.province = "Please select a province."
    if (form.location.trim().length < 2) e.location = "Enter your city / location."
    if (!/^98\d{8}$/.test(form.contactNumber)) e.contactNumber = "Valid Nepal number required (98XXXXXXXX)."
    if (form.teamEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.teamEmail)) e.teamEmail = "Invalid email address."
    if (form.foundedYear) {
      const y = Number(form.foundedYear)
      if (y < 1900 || y > CURRENT_YEAR) e.foundedYear = `Year must be between 1900 and ${CURRENT_YEAR}.`
    }
    setErrors(e)
    return !Object.values(e).some(Boolean)
  }

  function validateStep2(): boolean {
    const e = { ...errors, description: "", minAge: "", maxAge: "" }
    if (form.description.trim().length < 10) e.description = "Write at least 10 characters."
    if (teamType === "Private" && form.minAge && form.maxAge) {
      if (Number(form.minAge) >= Number(form.maxAge)) e.minAge = "Min age must be less than max age."
    }
    setErrors(e)
    return !e.description && !e.minAge && !e.maxAge
  }

  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  async function handleSubmit() {
    if (!logoFile) { setLogoError("Team logo is required."); return }
    setLoading(true); setSubmitError("")
    try {
      const fd = new FormData()
      fd.append("teamName", form.teamName)
      fd.append("sport", form.sport)
      fd.append("teamType", teamType)
      fd.append("province", form.province)
      fd.append("location", form.location)
      fd.append("homeGround", form.homeGround)
      fd.append("foundedYear", form.foundedYear)
      fd.append("contactNumber", form.contactNumber)
      fd.append("teamEmail", form.teamEmail)
      fd.append("description", form.description)
      fd.append("autoAccept", String(form.autoAccept))
      fd.append("requiredPositions", JSON.stringify(form.requiredPositions))
      fd.append("minAge", form.minAge)
      fd.append("maxAge", form.maxAge)
      fd.append("skillLevel", form.skillLevel)
      fd.append("provincePreference", form.provincePreference)
      fd.append("tournamentExperience", String(form.tournamentExperience))
      fd.append("customQuestions", JSON.stringify(form.customQuestions))
      fd.append("teamLogo", logoFile)
      const res = await axios.post(`${API_URL}/api/teams/register`, fd)
      const teamId = res.data?.team?._id
      if (teamId) {
        navigate(`/team-dashboard?teamId=${teamId}`)
      } else {
        setStep(4)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) setSubmitError(err.response?.data?.message || "Registration failed.")
      else setSubmitError("Something went wrong.")
    } finally { setLoading(false) }
  }

  // ── Shared styles ──
  const selectCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-white/10"
  const toggleBtn = (on: boolean, color: string) =>
    `relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none ${on ? color : "bg-muted-foreground/30"}`

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 px-4 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/40"
              style={{ width: `${(i + 1) * 120}px`, height: `${(i + 1) * 120}px`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          ))}
        </div>
        <div className="mx-auto max-w-6xl relative">
          <div className="flex flex-col items-center text-center gap-4">
            <Badge variant="secondary" className="mb-1 px-4 py-1 text-sm">✦ Always Free</Badge>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl text-white leading-tight">
              Create Your{" "}
              <span className="bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                Team
              </span>
            </h1>
            <p className="max-w-lg md:text-lg">
             <span className="text-white">
              Build your squad, define your game, and dominate the field. Public or Private — your team, your rules.
            </span></p>
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm mt-1">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald-300 inline-block" />Unique Team Name</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-teal-300 inline-block" />Auto Max Players</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-cyan-300 inline-block" />Public &amp; Private</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-green-300 inline-block" />Admin Dashboard</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 bg-gradient-to-b from-emerald-50/60 to-transparent dark:from-emerald-950/20">
        <div className="mx-auto max-w-3xl">

          {/* ── Step Indicator ── */}
          {step <= 3 && (
            <div className="mb-8">
              <div className="flex items-center">
                {[
                  { n: 1, label: "Basic Info" },
                  { n: 2, label: "Details" },
                  { n: 3, label: "Review" },
                ].map(({ n, label }, idx) => (
                  <div key={n} className={`flex items-center ${idx < 2 ? "flex-1" : ""}`}>
                    <div className="flex flex-col items-center gap-1">
                      <div className={`flex size-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                        step > n
                          ? "bg-emerald-600 text-white"
                          : step === n
                          ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white ring-4 ring-emerald-200 dark:ring-emerald-900 scale-110"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {step > n ? "✓" : n}
                      </div>
                      <span className={`text-xs font-medium max-sm:hidden ${step >= n ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"}`}>
                        {label}
                      </span>
                    </div>
                    {idx < 2 && (
                      <div className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all duration-500 ${step > n ? "bg-emerald-500" : "bg-border"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════
              STEP 1 — Basic Info
          ════════════════════════════════════════════ */}
          {step === 1 && (
            <Card3D>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 text-sm font-bold">1</span>
                    Team Identity
                  </CardTitle>
                  <CardDescription>
                    <span className="text-gray-600 dark:text-gray-100">
                    Set your team's name, sport, type, and contact details.
                    </span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">

                  {/* Logo Upload */}
                  <div className="flex flex-col items-center gap-3">
                    <label htmlFor="teamLogo"
                      className="group relative flex size-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 hover:border-emerald-500 transition-all hover:scale-105 shadow-sm">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Team logo" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center gap-1.5 text-emerald-500">
                          <CameraIcon className="size-7" />
                          <span className="text-xs font-medium">Team Logo</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">Change</span>
                      </div>
                    </label>
                    <input id="teamLogo" type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleLogoChange} />
                    <p className="text-xs text-muted-foreground">
                      <span className="text-gray-600 dark:text-gray-100">JPG or PNG · max 5 MB
                        </span>
                      </p>
                    {logoError && <p className="text-red-500 text-sm font-medium">{logoError}</p>}
                  </div>

                  <Separator />

                  {/* Team Name */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Team Name *</label>
                    <div className="relative">
                      <Input
                        placeholder="e.g. Pokhara United FC"
                        value={form.teamName}
                        onChange={e => set("teamName", e.target.value)}
                        className={`pr-10 ${nameStatus === "taken" ? "border-red-400 focus-visible:ring-red-400" : nameStatus === "available" ? "border-emerald-400 focus-visible:ring-emerald-400" : ""}`}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {nameStatus === "checking" && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
                        {nameStatus === "available" && <CheckCircle2 className="size-4 text-emerald-500" />}
                        {nameStatus === "taken" && <XCircle className="size-4 text-red-500" />}
                      </div>
                    </div>
                    {nameStatus === "available" && <p className="text-emerald-600 text-xs font-medium">✓ Name is available!</p>}
                    {nameStatus === "taken" && <p className="text-red-500 text-xs">✗ This name is already taken.</p>}
                    {errors.teamName && <p className="text-red-500 text-xs">{errors.teamName}</p>}
                  </div>

                  {/* Sport */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Sport *</label>
                    <select value={form.sport} onChange={e => set("sport", e.target.value)} className={selectCls}>
                      <option value="">Select a sport</option>
                      {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {form.sport && maxPlayers && (
                      <div className="flex items-center gap-2 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2.5">
                        <span className="text-sm text-emerald-800 dark:text-emerald-300">
                          Maximum squad size for <strong>{form.sport}</strong>:
                        </span>
                        <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-3">
                          {maxPlayers} players
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-auto">(auto-assigned)</span>
                      </div>
                    )}
                    {errors.sport && <p className="text-red-500 text-xs">{errors.sport}</p>}
                  </div>

                  {/* Team Type */}
                  <div className="space-y-2.5">
                    <label className="text-sm font-semibold">Team Type *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["Public", "Private"] as const).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setTeamType(type)}
                          className={`relative flex flex-col items-start gap-2.5 rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                            teamType === type
                              ? type === "Public"
                                ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/30 shadow-emerald-100"
                                : "border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/20 shadow-violet-100"
                              : "border-border hover:border-muted-foreground/40"
                          }`}
                        >
                          <div className={`flex size-10 items-center justify-center rounded-xl ${
                            type === "Public"
                              ? teamType === "Public" ? "bg-emerald-200 dark:bg-emerald-800" : "bg-muted"
                              : teamType === "Private" ? "bg-violet-200 dark:bg-violet-800" : "bg-muted"
                          }`}>
                            {type === "Public"
                              ? <Globe className={`size-5 ${teamType === "Public" ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"}`} />
                              : <Lock className={`size-5 ${teamType === "Private" ? "text-violet-700 dark:text-violet-300" : "text-muted-foreground"}`} />
                            }
                          </div>
                          <div>
                            <p className="font-bold text-sm">{type} Team</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {type === "Public" ? "Open for all. Anyone can request to join." : "Invite-only. Admin reviews each application."}
                            </p>
                          </div>
                          {teamType === type && (
                            <span className={`absolute top-2.5 right-2.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                              type === "Public" ? "bg-emerald-600 text-white" : "bg-violet-600 text-white"
                            }`}>
                              ✓ Selected
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    {/* Info panel */}
                    <div className={`rounded-lg p-3 text-xs space-y-1 border ${
                      teamType === "Public"
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                        : "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 text-violet-800 dark:text-violet-300"
                    }`}>
                      {teamType === "Public" ? (
                        <ul className="space-y-1 list-none">
                          <li className="font-semibold mb-1">🌐 Public Team Workflow</li>
                          <li>• Anyone can view the team, members &amp; achievements</li>
                          <li>• Players send <strong>Join Requests</strong> — admin accepts or rejects</li>
                          <li>• Optional <strong>Auto Accept</strong>: players join instantly without review</li>
                        </ul>
                      ) : (
                        <ul className="space-y-1 list-none">
                          <li className="font-semibold mb-1">🔒 Private Team Workflow</li>
                          <li>• Visible: Team Name, Logo, Sport, Province, Required Positions</li>
                          <li>• Hidden: Player List, Contacts, Strategy, Practice Schedule</li>
                          <li>• Players <strong>Apply</strong> — admin defines recruitment requirements</li>
                          <li>• Custom application questions &amp; skill filters</li>
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Province + City */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">Province *</label>
                      <select value={form.province} onChange={e => set("province", e.target.value)} className={selectCls}>
                        <option value="">Select Province</option>
                        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      {errors.province && <p className="text-red-500 text-xs">{errors.province}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">Location / City *</label>
                      <Input placeholder="e.g. Pokhara" value={form.location} onChange={e => set("location", e.target.value)} />
                      {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
                    </div>
                  </div>

                  {/* Home Ground + Founded Year */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">Home Ground</label>
                      <Input placeholder="e.g. Pokhara Stadium" value={form.homeGround} onChange={e => set("homeGround", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">Founded Year</label>
                      <Input type="number" placeholder={String(CURRENT_YEAR)} min={1900} max={CURRENT_YEAR}
                        value={form.foundedYear} onChange={e => set("foundedYear", e.target.value)} />
                      {errors.foundedYear && <p className="text-red-500 text-xs">{errors.foundedYear}</p>}
                    </div>
                  </div>

                  {/* Contact + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">Contact Number *</label>
                      <Input placeholder="98XXXXXXXX" value={form.contactNumber} onChange={e => set("contactNumber", e.target.value)} />
                      {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">
                        Team Email <span className="text-muted-foreground font-normal">(optional)</span>
                      </label>
                      <Input type="email" placeholder="team@example.com" value={form.teamEmail} onChange={e => set("teamEmail", e.target.value)} />
                      {errors.teamEmail && <p className="text-red-500 text-xs">{errors.teamEmail}</p>}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button onClick={handleNext}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90 px-6">
                      Next: Team Details →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Card3D>
          )}

          {/* ════════════════════════════════════════════
              STEP 2 — Team Details
          ════════════════════════════════════════════ */}
          {step === 2 && (
            <Card3D>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 text-sm font-bold">2</span>
                    {teamType === "Public" ? "Description & Join Settings" : "Description & Recruitment"}
                  </CardTitle>
                  <CardDescription>
                    {teamType === "Public"
                      ? "Describe your team and set how players can join."
                      : "Describe your team and define who can apply."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Team Description *</label>
                    <div className="relative">
                      <textarea
                        rows={5}
                        maxLength={500}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:border-white/10 resize-none"
                        placeholder="Tell players about your team — playing style, achievements, what you're looking for, training schedule..."
                        value={form.description}
                        onChange={e => set("description", e.target.value)}
                      />
                      <span className="absolute bottom-2.5 right-3 text-xs text-muted-foreground">
                        {form.description.length}/500
                      </span>
                    </div>
                    {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                  </div>

                  <Separator />

                  {/* ─ PUBLIC: Auto Accept ─ */}
                  {teamType === "Public" && (
                    <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-emerald-800 dark:text-emerald-300">Auto Accept Requests</p>
                          <p className="text-xs text-emerald-700/70 dark:text-emerald-400/70 mt-1 leading-relaxed">
                            When <strong>ON</strong>, players who send a join request are automatically added to your team without admin review.
                            <br />When <strong>OFF</strong>, you review and manually accept or reject each request.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => set("autoAccept", !form.autoAccept)}
                          className={toggleBtn(form.autoAccept, "bg-emerald-600")}
                          aria-label="Toggle auto accept"
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${form.autoAccept ? "translate-x-6" : "translate-x-1"}`} />
                        </button>
                      </div>
                      <div className="mt-3">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${form.autoAccept ? "bg-emerald-600 text-white" : "bg-border text-muted-foreground"}`}>
                          {form.autoAccept ? "⚡ Auto Accept: ON" : "👁 Manual Review: ON"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ─ PRIVATE: Recruitment Requirements ─ */}
                  {teamType === "Private" && (
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 px-1">
                        <Lock className="size-4 text-violet-600" />
                        <span className="font-bold text-sm text-violet-700 dark:text-violet-400">Recruitment Requirements</span>
                        <Badge className="bg-violet-600 text-white text-xs">Private</Badge>
                      </div>

                      {/* Required Positions */}
                      {sportPositions.length > 0 && (
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Required Positions</label>
                          <p className="text-xs text-muted-foreground">Select which positions you are actively recruiting for.</p>
                          <div className="flex flex-wrap gap-2">
                            {sportPositions.map(pos => (
                              <Badge
                                key={pos}
                                variant={form.requiredPositions.includes(pos) ? "default" : "outline"}
                                className={`cursor-pointer px-3 py-1.5 text-sm transition-all select-none ${
                                  form.requiredPositions.includes(pos)
                                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:opacity-90"
                                    : "hover:border-violet-400 hover:text-violet-600"
                                }`}
                                onClick={() => togglePosition(pos)}
                              >
                                {form.requiredPositions.includes(pos) ? "✓ " : ""}{pos}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Age Range */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold">Minimum Age <span className="text-muted-foreground font-normal">(optional)</span></label>
                          <Input type="number" placeholder="e.g. 16" min={10} max={60}
                            value={form.minAge} onChange={e => set("minAge", e.target.value)} />
                          {errors.minAge && <p className="text-red-500 text-xs">{errors.minAge}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold">Maximum Age <span className="text-muted-foreground font-normal">(optional)</span></label>
                          <Input type="number" placeholder="e.g. 35" min={10} max={60}
                            value={form.maxAge} onChange={e => set("maxAge", e.target.value)} />
                          {errors.maxAge && <p className="text-red-500 text-xs">{errors.maxAge}</p>}
                        </div>
                      </div>

                      {/* Skill Level */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Required Skill Level</label>
                        <div className="flex flex-wrap gap-2">
                          {SKILL_LEVELS.map(lvl => (
                            <Badge
                              key={lvl}
                              variant={form.skillLevel === lvl ? "default" : "outline"}
                              className={`cursor-pointer px-3 py-1.5 text-sm select-none transition-all ${
                                form.skillLevel === lvl
                                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                                  : "hover:border-amber-400 hover:text-amber-600"
                              }`}
                              onClick={() => set("skillLevel", form.skillLevel === lvl ? "" : lvl)}
                            >
                              {form.skillLevel === lvl ? "★ " : ""}{lvl}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Province Preference */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold">
                          Province Preference <span className="text-muted-foreground font-normal">(optional)</span>
                        </label>
                        <select value={form.provincePreference}
                          onChange={e => set("provincePreference", e.target.value)} className={selectCls}>
                          <option value="">Any Province</option>
                          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>

                      {/* Tournament Experience */}
                      <div className="flex items-center justify-between rounded-xl border-2 border-border p-4 hover:border-muted-foreground/30 transition-colors">
                        <div>
                          <p className="font-semibold text-sm">Tournament Experience Required</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Only players with tournament experience can apply to your team.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => set("tournamentExperience", !form.tournamentExperience)}
                          className={toggleBtn(form.tournamentExperience, "bg-violet-600")}
                          aria-label="Toggle tournament experience requirement"
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${form.tournamentExperience ? "translate-x-6" : "translate-x-1"}`} />
                        </button>
                      </div>

                      {/* Custom Application Questions */}
                      <div className="space-y-3 rounded-xl border-2 border-dashed border-violet-200 dark:border-violet-800 p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-violet-700 dark:text-violet-400">Custom Application Questions</span>
                          <Badge variant="secondary" className="text-xs">{form.customQuestions.length} added</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Players will answer these when applying. Add up to 5 questions.</p>

                        {form.customQuestions.map((q, i) => (
                          <div key={i} className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2.5">
                            <span className="flex size-6 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-400 text-xs font-bold shrink-0">
                              {i + 1}
                            </span>
                            <span className="flex-1 text-sm">{q}</span>
                            <button type="button" onClick={() => removeQuestion(i)}
                              className="text-muted-foreground hover:text-red-500 transition-colors p-0.5">
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        ))}

                        {form.customQuestions.length < 5 && (
                          <div className="flex gap-2">
                            <Input
                              placeholder='e.g. "Why do you want to join?"'
                              value={newQuestion}
                              onChange={e => setNewQuestion(e.target.value)}
                              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addQuestion() } }}
                            />
                            <Button type="button" onClick={addQuestion} variant="outline"
                              className="shrink-0 border-violet-300 text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/50">
                              <Plus className="size-4" />
                            </Button>
                          </div>
                        )}

                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground font-medium">Quick add:</p>
                          <div className="flex flex-wrap gap-2">
                            {SUGGESTED_QUESTIONS.map(q => (
                              <button
                                key={q}
                                type="button"
                                disabled={form.customQuestions.includes(q) || form.customQuestions.length >= 5}
                                onClick={() => { if (!form.customQuestions.includes(q) && form.customQuestions.length < 5) set("customQuestions", [...form.customQuestions, q]) }}
                                className="text-xs px-2.5 py-1 rounded-full border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                + {q}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
                    <Button onClick={handleNext}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90 px-6">
                      Review & Submit →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Card3D>
          )}

          {/* ════════════════════════════════════════════
              STEP 3 — Review & Submit
          ════════════════════════════════════════════ */}
          {step === 3 && (
            <Card3D>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 text-sm font-bold">3</span>
                    Review &amp; Submit
                  </CardTitle>
                  <CardDescription>Double-check all details before creating your team.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">

                  {/* Team Header Card */}
                  <div className="flex items-center gap-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 p-4">
                    <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-300 bg-white shadow-sm shrink-0">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Team logo" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-3xl">🏆</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-xl truncate">{form.teamName || "—"}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {form.sport && (
                          <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs">{form.sport}</Badge>
                        )}
                        <Badge variant="outline" className={`text-xs ${teamType === "Private" ? "border-violet-400 text-violet-700 dark:text-violet-400" : ""}`}>
                          {teamType === "Public" ? "🌐 Public" : "🔒 Private"}
                        </Badge>
                        {maxPlayers && (
                          <Badge variant="secondary" className="text-xs">Max {maxPlayers} players</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Province", value: form.province || "—" },
                      { label: "City", value: form.location || "—" },
                      { label: "Home Ground", value: form.homeGround || "—" },
                      { label: "Founded", value: form.foundedYear || "—" },
                      { label: "Contact", value: form.contactNumber || "—" },
                      { label: "Email", value: form.teamEmail || "—" },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-lg border bg-muted/20 px-3 py-2.5">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-sm font-semibold mt-0.5 truncate">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="rounded-lg border bg-muted/20 px-3 py-3">
                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                    <p className="text-sm leading-relaxed">{form.description || "—"}</p>
                  </div>

                  {/* Type-specific summary */}
                  {teamType === "Public" && (
                    <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3">
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-2">Public Settings</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Auto Accept:</span>
                        <Badge className={form.autoAccept ? "bg-emerald-600 text-white" : "bg-border text-muted-foreground"}>
                          {form.autoAccept ? "ON" : "OFF"}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {teamType === "Private" && (
                    <div className="rounded-lg border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/20 px-4 py-3 space-y-3">
                      <p className="text-xs font-semibold text-violet-700 dark:text-violet-400 uppercase tracking-wide">Private Recruitment Settings</p>
                      {form.requiredPositions.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1.5">Required Positions</p>
                          <div className="flex flex-wrap gap-1.5">
                            {form.requiredPositions.map(p => (
                              <Badge key={p} className="bg-violet-600 text-white text-xs">{p}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-3 text-sm">
                        {(form.minAge || form.maxAge) && (
                          <span>Age: <strong>{form.minAge || "any"} – {form.maxAge || "any"}</strong></span>
                        )}
                        {form.skillLevel && (
                          <span>Skill: <strong>{form.skillLevel}</strong></span>
                        )}
                        {form.provincePreference && (
                          <span>Province: <strong>{form.provincePreference}</strong></span>
                        )}
                        <span>Tournament Exp: <strong>{form.tournamentExperience ? "Required" : "Not required"}</strong></span>
                      </div>
                      {form.customQuestions.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1.5">{form.customQuestions.length} custom question(s)</p>
                          <div className="space-y-1">
                            {form.customQuestions.map((q, i) => (
                              <p key={i} className="text-xs text-violet-700 dark:text-violet-400">• {q}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Logo warning */}
                  {!logoFile && (
                    <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700 px-4 py-3">
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        ⚠ No team logo uploaded. Go back to Step 1 to add one (required).
                      </p>
                    </div>
                  )}

                  {submitError && (
                    <div className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white font-medium">
                      ✗ {submitError}
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90 min-w-40 font-semibold"
                    >
                      {loading
                        ? <><Loader2 className="size-4 animate-spin mr-2" />Registering...</>
                        : "🚀 Create Team"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Card3D>
          )}

          {/* ════════════════════════════════════════════
              STEP 4 — Success
          ════════════════════════════════════════════ */}
          {step === 4 && (
            <div className="text-center space-y-7 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl shadow-emerald-200 dark:shadow-emerald-900">
                    <span className="text-5xl">🏆</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white text-lg shadow-md border-2 border-background">
                    ✓
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold">Team Created!</h2>
                <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  <strong className="text-foreground">{form.teamName}</strong> has been successfully registered.
                  You are the <strong className="text-emerald-600">Team Owner</strong>. Start recruiting players!
                </p>
              </div>

              <div className="flex justify-center flex-wrap gap-2">
                {form.sport && <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-1.5 text-sm">{form.sport}</Badge>}
                {form.province && <Badge variant="outline" className="px-4 py-1.5 text-sm">{form.province}</Badge>}
                <Badge variant="outline" className={`px-4 py-1.5 text-sm ${teamType === "Private" ? "border-violet-400 text-violet-700 dark:text-violet-400" : ""}`}>
                  {teamType === "Public" ? "🌐 Public" : "🔒 Private"}
                </Badge>
                {maxPlayers && <Badge variant="secondary" className="px-4 py-1.5 text-sm">Max {maxPlayers} players</Badge>}
              </div>

              {/* What's next */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
                {[
                  { icon: "📋", title: "Admin Dashboard", desc: "Manage members, requests & settings" },
                  { icon: "🔍", title: "Find Players", desc: "Recruit the right talent for your squad" },
                  { icon: "🏅", title: "Join Tournaments", desc: "Compete and earn achievements" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="rounded-xl border bg-muted/30 p-3 text-center">
                    <span className="text-2xl">{icon}</span>
                    <p className="font-semibold text-sm mt-1">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-3 flex-wrap">
                <Button asChild variant="outline" size="lg">
                  <Link to="/team-dashboard">Go to Dashboard →</Link>
                </Button>
                <Button asChild size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90">
                  <Link to="/find-players">Find Players</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
