import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  _id?: string
  fullname: string
  email: string
  phoneNumber?: string
  role: "player" | "admin" | "trainer" | "owner"
  sport?: string
  position?: string
  skillLevel?: string
  location?: string
  province?: string
  age?: string
  gender?: string
  bio?: string
  profilePhoto?: string
  status?: string
  points_balance?: number
  streak_count?: number
  profile_complete?: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
  }, [])

  function login(userData: User, jwt: string) {
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("token", jwt)
    setUser(userData)
    setToken(jwt)
  }

  function logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
