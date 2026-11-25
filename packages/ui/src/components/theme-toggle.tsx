"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "../hooks/use-reduced-motion"
import { cn } from "../lib/cn"

export interface ThemeToggleProps {
  theme?: string
  setTheme: (theme: string) => void
  className?: string
}

async function runViewTransition(
  button: HTMLButtonElement,
  isDark: boolean,
  setTheme: (theme: string) => void,
) {
  const newTheme = isDark ? "light" : "dark"
  if (!("startViewTransition" in document)) {
    setTheme(newTheme)
    return
  }

  const rect = button.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  document.documentElement.setAttribute("data-theme-transition", isDark ? "to-light" : "to-dark")

  try {
    const transition = document.startViewTransition(() => {
      setTheme(newTheme)
    })
    await transition.ready
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
      },
      {
        duration: 400,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    )
    await transition.finished
  } catch {
    setTheme(newTheme)
  } finally {
    document.documentElement.removeAttribute("data-theme-transition")
  }
}

export function ThemeToggle({ theme, setTheme, className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === "dark"

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-md bg-muted/50",
          className,
        )}
        aria-label="Toggle theme"
        disabled
      >
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={cn(
        "relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-muted/50 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      onClick={() => {
        if (!buttonRef.current) return
        if (reducedMotion) {
          setTheme(isDark ? "light" : "dark")
          return
        }
        void runViewTransition(buttonRef.current, isDark, setTheme)
      }}
      aria-label="Toggle theme"
      aria-pressed={isDark}
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  )
}
