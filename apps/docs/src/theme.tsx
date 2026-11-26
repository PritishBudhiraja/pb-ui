import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

export type ColorMode = "light" | "dark"

interface ThemeContextValue {
  mode: ColorMode
  setMode: (mode: ColorMode) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStored(): ColorMode {
  if (typeof window === "undefined") return "light"
  return window.localStorage.getItem("pb-ui-mode") === "dark" ? "dark" : "light"
}

function apply(mode: ColorMode) {
  document.documentElement.classList.toggle("dark", mode === "dark")
  document.documentElement.dataset.theme = "portfolio"
}

export function ThemeStateProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>("light")

  useEffect(() => {
    const stored = readStored()
    setModeState(stored)
    apply(stored)
    window.localStorage.removeItem("pb-ui-preset")
  }, [])

  const setMode = (next: ColorMode) => {
    setModeState(next)
    window.localStorage.setItem("pb-ui-mode", next)
    apply(next)
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode: () => setMode(mode === "dark" ? "light" : "dark"),
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useDocsTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error("useDocsTheme must be used within ThemeStateProvider")
  return value
}
