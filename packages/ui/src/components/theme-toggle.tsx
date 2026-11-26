"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../hooks/use-media-query"
import { useReducedMotion } from "../hooks/use-reduced-motion"
import { cn } from "../lib/cn"
import { IconButton } from "./icon-button"

export interface ThemeToggleProps {
  theme?: string
  resolvedTheme?: string
  setTheme: (theme: string) => void
  label?: string
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
        if (reducedMotion) {
          setTheme(isDark ? "light" : "dark")
          return
        }
        void runViewTransition(buttonRef.current, isDark, setTheme)
      }}
      aria-pressed={isDark}
    >
      {isDark ? <Moon /> : <Sun />}
    </IconButton>
  )
}
