import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
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
