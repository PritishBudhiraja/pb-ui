import { Button, ThemeToggle } from "@pritish.budhiraja/ui"
import { OriginButton } from "@pritish.budhiraja/ui/motion"
import { useState } from "react"

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  return (
    <div
      className={
        theme === "dark" ? "dark min-h-svh bg-background p-8" : "min-h-svh bg-background p-8"
      }
    >
      <div className="flex items-center gap-3">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <Button>Quiet</Button>
        <OriginButton>Origin</OriginButton>
      </div>
    </div>
  )
}
