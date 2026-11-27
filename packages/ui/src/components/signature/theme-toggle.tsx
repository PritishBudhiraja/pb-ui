"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../../hooks/use-media-query"
import { useReducedMotion } from "../../hooks/use-reduced-motion"
import { cn } from "../../lib/cn"
import { revealFromOrigin } from "../../lib/view-transition"
import { IconButton } from "../actions/icon-button"

export interface ThemeToggleProps {
  theme?: string
  resolvedTheme?: string
  setTheme: (theme: "light" | "dark") => void
  label?: string
  className?: string
}

export function ThemeToggle({
  theme,
  resolvedTheme,
  setTheme,
  label = "Toggle theme",
  className,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  useEffect(() => {
    setMounted(true)
  }, [])

  const systemTheme = prefersDark ? "dark" : "light"
  const isDark = (resolvedTheme ?? (theme === "system" ? systemTheme : theme)) === "dark"
  const buttonClass = cn("relative h-8 w-8 overflow-hidden", className)

  if (!mounted) {
    return <IconButton variant="ghost" label={label} className={buttonClass} disabled />
  }

  return (
    <IconButton
      ref={buttonRef}
      variant="ghost"
      label={label}
      className={buttonClass}
      onClick={() => {
        /* v8 ignore start */
        if (!buttonRef.current) return
        /* v8 ignore stop */
        const next = isDark ? "light" : "dark"
        if (reducedMotion) {
          setTheme(next)
          return
        }
        void revealFromOrigin(
          buttonRef.current,
          () => setTheme(next),
          isDark ? "to-light" : "to-dark",
        )
      }}
      aria-pressed={isDark}
    >
      {isDark ? <Moon /> : <Sun />}
    </IconButton>
  )
}
