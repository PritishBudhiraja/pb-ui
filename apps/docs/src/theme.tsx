import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

export type ColorMode = "light" | "dark"
export type ThemePreset = "portfolio" | "epoch"

interface ThemeContextValue {
  mode: ColorMode
  preset: ThemePreset
  setMode: (mode: ColorMode) => void
  setPreset: (preset: ThemePreset) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStored(): { mode: ColorMode; preset: ThemePreset } {
  if (typeof window === "undefined") return { mode: "light", preset: "portfolio" }
  const mode = window.localStorage.getItem("pb-ui-mode") === "dark" ? "dark" : "light"
  const preset = window.localStorage.getItem("pb-ui-preset") === "epoch" ? "epoch" : "portfolio"
  return { mode, preset }
}

function apply(mode: ColorMode, preset: ThemePreset) {
  document.documentElement.classList.toggle("dark", mode === "dark")
  document.documentElement.dataset.theme = preset
}

export function ThemeStateProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>("light")
  const [preset, setPresetState] = useState<ThemePreset>("portfolio")

  useEffect(() => {
    const stored = readStored()
    setModeState(stored.mode)
    setPresetState(stored.preset)
    apply(stored.mode, stored.preset)
  }, [])

  const setMode = (next: ColorMode) => {
    setModeState(next)
    window.localStorage.setItem("pb-ui-mode", next)
    apply(next, preset)
  }

  const setPreset = (next: ThemePreset) => {
    setPresetState(next)
    window.localStorage.setItem("pb-ui-preset", next)
    apply(mode, next)
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        preset,
        setMode,
        setPreset,
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
