import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { mockMatchMedia } from "../test/helpers"
import { ThemeToggle } from "./theme-toggle"

describe("ThemeToggle", () => {
  it("toggles theme without view transitions", async () => {
    mockMatchMedia(false)
    const setTheme = vi.fn()
    const user = userEvent.setup()
    Reflect.deleteProperty(document, "startViewTransition")
    render(<ThemeToggle theme="dark" setTheme={setTheme} />)
    await user.click(screen.getByRole("button", { name: "Toggle theme" }))
    expect(setTheme).toHaveBeenCalledWith("light")
    await expectNoAxeViolations()
  })

  it("toggles theme with reduced motion", async () => {
    mockMatchMedia(true)
    const setTheme = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(<ThemeToggle theme="dark" setTheme={setTheme} />)
    await user.click(screen.getByRole("button", { name: "Toggle theme" }))
    expect(setTheme).toHaveBeenCalledWith("light")
    rerender(<ThemeToggle theme="light" setTheme={setTheme} />)
    await user.click(screen.getByRole("button", { name: "Toggle theme" }))
    expect(setTheme).toHaveBeenCalledWith("dark")
  })

  it("runs a view transition when available", async () => {
    mockMatchMedia(false)
    const setTheme = vi.fn()
    const user = userEvent.setup()
    document.documentElement.animate = vi.fn() as typeof document.documentElement.animate
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      writable: true,
      value: (update: () => void) => {
        update()
        return {
          ready: Promise.resolve(),
          finished: Promise.resolve(),
          skipped: false,
          types: new Set<string>(),
          skipTransition() {},
          updateCallbackDone: Promise.resolve(),
        }
      },
    })
    const { rerender } = render(<ThemeToggle theme="light" setTheme={setTheme} />)
    await user.click(screen.getByRole("button", { name: "Toggle theme" }))
    expect(setTheme).toHaveBeenCalledWith("dark")
    rerender(<ThemeToggle theme="dark" setTheme={setTheme} />)
    await user.click(screen.getByRole("button", { name: "Toggle theme" }))
    expect(setTheme).toHaveBeenCalledWith("light")
  })

  it("treats system as the OS preference and prefers resolvedTheme", async () => {
    mockMatchMedia(true)
    const setTheme = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(<ThemeToggle theme="system" setTheme={setTheme} label="Theme" />)
    const button = screen.getByRole("button", { name: "Theme" })
    expect(button).toHaveAttribute("aria-pressed", "true")
    await user.click(button)
    expect(setTheme).toHaveBeenLastCalledWith("light")
    rerender(<ThemeToggle theme="system" resolvedTheme="light" setTheme={setTheme} label="Theme" />)
    expect(button).toHaveAttribute("aria-pressed", "false")
    await user.click(button)
    expect(setTheme).toHaveBeenLastCalledWith("dark")
  })

  it("treats system as light when the OS prefers light", () => {
    mockMatchMedia(false)
    render(<ThemeToggle theme="system" setTheme={vi.fn()} />)
    expect(screen.getByRole("button", { name: "Toggle theme" })).toHaveAttribute(
      "aria-pressed",
      "false",
    )
  })

  it("falls back when the view transition throws", async () => {
    mockMatchMedia(false)
    const setTheme = vi.fn()
    const user = userEvent.setup()
    document.startViewTransition = vi.fn(() => {
      throw new Error("no vt")
    }) as typeof document.startViewTransition
    render(<ThemeToggle theme="light" setTheme={setTheme} />)
    await user.click(screen.getByRole("button", { name: "Toggle theme" }))
    expect(setTheme).toHaveBeenCalledWith("dark")
  })
})
