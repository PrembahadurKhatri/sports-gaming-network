import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Footer from "./components/Footer"
import Chatbot from "./components/Chatbot"
import Home from "./pages/Home"
import FindTeams from "./pages/FindTeams"
import FindPlayers from "./pages/FindPlayers"
import Tournaments from "./pages/Tournaments"
import Grounds from "./pages/Grounds"
import Rankings from "./pages/Rankings"
import PlayerRegistration from "./pages/PlayerRegistration"
import Privacy from "./components/ui/privacy"
import Terms from "./components/ui/terms"
import Contact from "./pages/contact"
import FAQ from "./pages/faq"
import Services from "./pages/services"
import AboutUs from "./pages/aboutus"
import Blog from "./pages/blog"
import Partners from "./pages/partners"

export default function App() {
  return (
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
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/partners" element={<Partners/>}/>
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </BrowserRouter>
  )
}
