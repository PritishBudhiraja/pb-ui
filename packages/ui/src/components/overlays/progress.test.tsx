import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { ProgressBar } from "./progress"

describe("ProgressBar", () => {
  it("fills relative to max", () => {
    const { container } = render(<ProgressBar value={50} max={200} label="Quarter" />)
    const indicator = container.querySelector("[data-state] > div") as HTMLElement
    expect(indicator.style.transform).toBe("translateX(-75%)")
    expect(screen.getByRole("progressbar", { name: "Quarter" })).toHaveAttribute(
      "aria-valuemax",
      "200",
    )
  })
})
