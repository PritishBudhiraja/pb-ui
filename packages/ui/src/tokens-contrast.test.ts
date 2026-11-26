/// <reference types="node" />
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

const themes = ["portfolio"]

// Text tokens and the surface each one is drawn on. WCAG AA body text needs 4.5:1.
const pairs: Array<[text: string, surface: string]> = [
  ["foreground", "background"],
  ["card-foreground", "card"],
  ["popover-foreground", "popover"],
  ["primary-foreground", "primary"],
  ["secondary-foreground", "secondary"],
  ["accent-foreground", "accent"],
  ["destructive-foreground", "destructive"],
  ["muted-foreground", "background"],
  ["muted-foreground", "muted"],
  ["editorial", "background"],
  ["destructive", "background"],
  ["destructive", "card"],
]

function blocks(css: string) {
  const found: Array<{ mode: "light" | "dark"; vars: Map<string, string> }> = []
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = match[1] ?? ""
    const vars = new Map<string, string>()
    for (const decl of (match[2] ?? "").matchAll(/--([\w-]+):\s*([^;]+);/g)) {
      vars.set(decl[1] ?? "", (decl[2] ?? "").trim())
    }
    if (vars.size === 0) continue
    found.push({ mode: selector.includes(".dark") ? "dark" : "light", vars })
  }
  return found
}

function toLinear(c: number) {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function rgb(value: string): [number, number, number] {
  const hex = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(value)
  if (hex)
    return [1, 2, 3].map((i) => Number.parseInt(hex[i] as string, 16) / 255) as [
      number,
      number,
      number,
    ]
  const hsl = /^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/.exec(value)
  if (!hsl) throw new Error(`Unsupported colour: ${value}`)
  const [h, s, l] = [Number(hsl[1]), Number(hsl[2]) / 100, Number(hsl[3]) / 100]
  const a = s * Math.min(l, 1 - l)
  const channel = (n: number) => {
    const k = (n + h / 30) % 12
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }
  return [channel(0), channel(8), channel(4)]
}

function luminance(value: string) {
  const [r, g, b] = rgb(value).map(toLinear) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function ratio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

describe("token contrast", () => {
  it("rejects colour formats it cannot measure", () => {
    expect(() => luminance("oklch(0.5 0.1 20)")).toThrow("Unsupported colour")
  })

  for (const theme of themes) {
    // Vitest runs from packages/ui; jsdom gives import.meta.url a non-file scheme.
    const file = resolve(process.cwd(), `../tokens/src/themes/${theme}.css`)
    for (const { mode, vars } of blocks(readFileSync(file, "utf8"))) {
      it(`${theme} ${mode}: text tokens meet WCAG AA (4.5:1)`, () => {
        const failures = pairs
          .map(([text, surface]) => {
            const value = ratio(vars.get(text) as string, vars.get(surface) as string)
            return { pair: `${text} on ${surface}`, ratio: Math.round(value * 100) / 100 }
          })
          .filter((result) => result.ratio < 4.5)
        expect(failures).toEqual([])
      })
    }
  }
})
