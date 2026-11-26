"use client"

import { Button, RichTextEditor, ThemeToggle } from "@pritish.budhiraja/ui"
import { OriginButton } from "@pritish.budhiraja/ui/motion"
import { useState } from "react"

export function ClientChrome() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  return (
    <div className={theme === "dark" ? "dark" : undefined}>
      <div className="mt-4 flex items-center gap-3">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <Button>Quiet</Button>
        <OriginButton>Origin</OriginButton>
      </div>
      <RichTextEditor className="mt-6" placeholder="Write" value="<p>Hello</p>" />
    </div>
  )
}
