import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { StreamingText } from "./streaming-text"

describe("StreamingText", () => {
  it("holds announcements while streaming", async () => {
    const { rerender } = render(<StreamingText text="Hel" streaming />)
    const region = screen.getByText("Hel")
    expect(region).toHaveAttribute("aria-busy", "true")
    rerender(<StreamingText text="Hello" />)
    expect(region).toHaveAttribute("aria-busy", "false")
    expect(region).toHaveAttribute("aria-live", "polite")
    await expectNoAxeViolations()
  })
})
