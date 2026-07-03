import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AvatarProps {
  className?: string
  size?: "sm" | "default" | "lg"
  children: ReactNode
}

export function Avatar({ className, size = "default", children }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        size === "sm" && "size-6",
        size === "default" && "size-8",
        size === "lg" && "size-10",
        className
      )}
    >
      {children}
    </div>
  )
}

export function AvatarImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null
  return <img src={src} alt={alt || ""} className="aspect-square size-full object-cover" />
}

export function AvatarFallback({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex size-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground", className)}>
      {children}
    </div>
  )
}
