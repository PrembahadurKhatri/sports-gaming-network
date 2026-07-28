import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import api from "@/api/axios"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await api.post("/auth/login", formData)
      const { token, user } = res.data

      if (token && user) {
        login(user, token)
      } else if (token) {
        login({ email: formData.email, fullname: formData.email.split("@")[0], role: "player" }, token)
      }

      navigate(user?.role === "admin" ? "/team-dashboard" : "/user-dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-slate-600 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.08)_0%,transparent_50%)]" />

      <form onSubmit={handleLogin} className="relative w-full max-w-md rounded-2xl border bg-card/80 backdrop-blur-xl p-8 shadow-2xl dark:border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20">
            <span className="text-2xl font-bold text-white">P</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your Sports & Gaming Network account</p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-500 font-medium">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-white/10"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-white/10"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="rounded border-border" />
            Remember Me
          </label>
          <a href="#" className="text-violet-500 hover:text-violet-400 transition-colors">Forgot Password?</a>
        </div>

        <button
          type="submit" disabled={loading}
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-violet-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 className="size-4 animate-spin" /> Signing in...</> : "Sign In"}
        </button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/player-registration" className="text-violet-500 hover:text-violet-400 font-medium transition-colors">Register</Link>
        </p>
      </form>
    </div>
  )
}
