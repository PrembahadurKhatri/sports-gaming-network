import { cn } from "@/lib/utils"
import React, { type ButtonHTMLAttributes, type ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
  children: ReactNode
}

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
    variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
    variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    size === "default" && "h-9 px-4 py-2",
    size === "sm" && "h-8 px-3 text-xs",
    size === "lg" && "h-10 px-6",
    size === "icon" && "size-9",
    className
  )

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(buttonClassName, (children.props as any).className),
      ...props
    } as any)
  }

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  )
}
