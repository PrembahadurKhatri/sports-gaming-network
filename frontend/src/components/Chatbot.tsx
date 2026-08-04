import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import api from "@/api/axios"
import { useAuth } from "@/context/AuthContext"

interface Message {
  role: "user" | "bot"
  text: string
}

export default function Chatbot() {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey there! I'm PlayBot. Ask me about teams, tournaments, grounds, registration, or anything else!" },
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function handleSend() {
    const text = input.trim()
    if (!text || sending) return
    setMessages((prev) => [...prev, { role: "user", text }])
    setInput("")
    setSending(true)

    if (!isAuthenticated) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Please login to chat with PlayBot powered by AI." },
      ])
      setSending(false)
      return
    }

    try {
      const { data } = await api.post("/chat", { message: text })
      setMessages((prev) => [...prev, { role: "bot", text: data.reply || data.message || "No response." }])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: err?.response?.data?.message || "Sorry, I couldn't reply right now." },
      ])
    } finally {
      setSending(false)
    }
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
                    msg.role === "user" ? "bg-violet-600 text-white" : "bg-muted text-foreground"
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
              <Button size="icon" className="shrink-0 rounded-xl" onClick={handleSend} disabled={sending}>
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
