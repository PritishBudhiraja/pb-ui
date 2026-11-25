import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Button } from "./button"

describe("Button", () => {
  it("renders a native button with type button by default", () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("type", "button")
  })

  it("is disabled when requested", () => {
    render(<Button disabled>Save</Button>)
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled()
  })

  it("renders the remaining variants", () => {
    render(
      <>
        <Button variant="destructive" size="sm">
          D
        </Button>
        <Button variant="secondary" size="lg">
          S
        </Button>
        <Button variant="ghost" size="icon" aria-label="icon">
          G
        </Button>
        <Button variant="link">L</Button>
        <Button asChild>
          <a href="/x">Child</a>
        </Button>
      </>,
    )
    expect(screen.getByRole("link", { name: "Child" })).toHaveAttribute("href", "/x")
  })
})
