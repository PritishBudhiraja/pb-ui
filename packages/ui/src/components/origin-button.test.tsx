import { fireEvent, render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { mockMatchMedia } from "../test/helpers"
import { OriginButton, OriginButtonOutline } from "./origin-button"
import { ScrollProgress } from "./scroll-progress"

describe("OriginButton", () => {
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
})
