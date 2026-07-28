import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Chatbot from "@/components/Chatbot"
import Home from "@/pages/Home"
import FindTeams from "@/pages/FindTeams"
import FindPlayers from "@/pages/FindPlayers"
import Tournaments from "@/pages/Tournaments"
import Grounds from "@/pages/Grounds"
import Rankings from "@/pages/Rankings"
import PlayerRegistration from "@/pages/PlayerRegistration"
import TeamRegistration from "@/pages/TeamRegistration"
import Login from "@/pages/Login"
import UserDashboard from "@/pages/UserDashboard"
import TeamDashboard from "@/pages/TeamDashboard"
import Privacy from "@/components/ui/privacy"
import Terms from "@/components/ui/terms"
import Contact from "@/pages/contact"
import FAQ from "@/pages/faq"
import Services from "@/pages/services"
import AboutUs from "@/pages/aboutus"
import Blog from "@/pages/blog"
import Partners from "@/pages/partners"
import Subscribe from "@/pages/Subscribe"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-full flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find-teams" element={<FindTeams />} />
              <Route path="/find-players" element={<FindPlayers />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/grounds" element={<Grounds />} />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/player-registration" element={<PlayerRegistration />} />
              <Route path="/team-registration" element={<TeamRegistration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/team-dashboard" element={<TeamDashboard />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/services" element={<Services />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/subscribe" element={<Subscribe />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
