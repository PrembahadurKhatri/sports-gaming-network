import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "bot"
  text: string
}

const BOT_REPLIES: Record<string, string> = {
  hello: "Hello! Welcome to PlayOnP. How can I help you today?",
  hi: "Hi there! Need help finding a team, tournament, or ground?",
  "find team": "You can find teams on our 'Find Teams' page. Browse by sport, location, or skill level!",
  tournament: "Check out our Tournaments page! You need a minimum of 5 teams to create one. Participation fee applies.",
  ground: "Visit our Grounds page to book courts and fields near you. Booking charges apply.",
  register: "Registration is free! Sign up to create your player profile with photo and skills.",
  pricing: "Registration, finding teams, and registering teams are free. Tournament participation, ground booking, and tournament creation are paid services.",
  sport: "We support Cricket, Football, Volleyball, Handball, Basketball, Hockey, and many more offline sports!",
  stats: "Game records are maintained after every match. Check Rankings page for team and player stats.",
  contact: "You can reach us through the Contact section in the footer, or email us at support@playonp.com",
  faq: "Check our FAQ section in the footer for common questions and answers.",
  default: "I'm still learning! Please contact support@sportsgamingnetwork.com for detailed assistance or check our FAQ page.",
}

function getBotReply(input: string): string {
  const lower = input.toLowerCase()
  for (const [key, reply] of Object.entries(BOT_REPLIES)) {
    if (lower.includes(key)) return reply
  }
  return BOT_REPLIES.default
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey there! I'm PlayBot. Ask me about teams, tournaments, grounds, registration, or anything else!" },
  ])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { role: "user", text }])
    setInput("")
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getBotReply(text) }])
    }, 500)
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 z-50 flex w-[360px] flex-col rounded-2xl border bg-background shadow-2xl dark:border-white/10">
          <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="size-5 text-white" />
              <span className="font-semibold text-white text-sm">PlayBot</span>
            </div>
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>
          <div className="h-[380px] overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                {msg.role === "bot" && (
                  <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/50">
                    <Bot className="size-4 text-violet-600 dark:text-violet-400" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-violet-600 text-white"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-600">
                    <User className="size-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="border-t p-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend() }}
                placeholder="Ask me anything..."
                className="flex-1 rounded-xl border bg-muted/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 dark:border-white/10"
              />
              <Button size="icon" className="shrink-0 rounded-xl" onClick={handleSend}>
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      <Button
        onClick={() => setOpen(!open)}
        size="icon"
        className="fixed bottom-4 right-4 z-50 size-12 rounded-full shadow-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </Button>
    </>
  )
}
