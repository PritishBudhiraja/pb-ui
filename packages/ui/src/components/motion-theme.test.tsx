import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { revealFromOrigin } from "../lib/view-transition"
import { expectNoAxeViolations } from "../test/axe"
import { OriginButton, OriginButtonOutline } from "./origin-button"
import { ScrollProgress } from "./scroll-progress"
import { ThemeToggle } from "./theme-toggle"

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    media: "",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  })
}

describe("motion components", () => {
  it("handles origin button pointer and focus", async () => {
    mockMatchMedia(false)
    const ref = createRef<HTMLButtonElement>()
    render(
      <>
        <OriginButton ref={ref}>Go</OriginButton>
        <OriginButton ref={() => undefined}>Fn</OriginButton>
        <OriginButtonOutline href="/x">Link</OriginButtonOutline>
        <OriginButton href="/y">Anchor</OriginButton>
        <OriginButtonOutline>Outline</OriginButtonOutline>
        <ScrollProgress />
      </>,
    )
    const button = screen.getByRole("button", { name: "Go" })
    fireEvent.mouseEnter(button, { clientX: 12, clientY: 8 })
    fireEvent.focus(button)
    fireEvent.mouseLeave(button, { clientX: 0, clientY: 0 })
    fireEvent.blur(button)
    const outline = screen.getByRole("button", { name: "Outline" })
    fireEvent.mouseEnter(outline, { clientX: 4, clientY: 4 })
    const link = screen.getByRole("link", { name: "Link" })
    fireEvent.mouseEnter(link, { clientX: 6, clientY: 6 })
    fireEvent.focus(link)
    fireEvent.mouseLeave(link)
    fireEvent.blur(link)
    expect(link).toHaveAttribute("href", "/x")
  })

  it("skips origin motion when reduced", () => {
    mockMatchMedia(true)
    render(
      <>
        <OriginButton>Still</OriginButton>
        <ScrollProgress />
      </>,
    )
    fireEvent.focus(screen.getByRole("button", { name: "Still" }))
  })

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

  it("keeps the caller's pointer and focus handlers", () => {
    mockMatchMedia(false)
    const handlers = {
      onMouseEnter: vi.fn(),
      onMouseLeave: vi.fn(),
      onFocus: vi.fn(),
      onBlur: vi.fn(),
    }
    render(
      <>
        <OriginButton {...handlers}>Button</OriginButton>
        <OriginButton href="/x" {...handlers}>
          Link
        </OriginButton>
      </>,
    )
    for (const name of ["Button", "Link"]) {
      const node = screen.getByText(name).closest("a, button") as HTMLElement
      fireEvent.mouseEnter(node)
      fireEvent.mouseLeave(node)
      fireEvent.focus(node)
      fireEvent.blur(node)
    }
    for (const handler of Object.values(handlers)) expect(handler).toHaveBeenCalledTimes(2)
  })

  it("runs a view transition without a name", async () => {
    const update = vi.fn()
    const origin = document.createElement("button")
    document.body.append(origin)
    document.documentElement.animate = vi.fn() as typeof document.documentElement.animate
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      writable: true,
      value: (next: () => void) => {
        next()
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
    await revealFromOrigin(origin, update)
    expect(update).toHaveBeenCalled()
    origin.remove()
  })
})
