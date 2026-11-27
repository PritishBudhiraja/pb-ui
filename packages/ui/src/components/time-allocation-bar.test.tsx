import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { TimeAllocationBar } from "./time-allocation-bar"

describe("TimeAllocationBar", () => {
  it("renders segments that share a label", async () => {
    render(
      <TimeAllocationBar
        segments={[
          { label: "Meetings", value: 2 },
          { label: "Meetings", value: 3 },
        ]}
      />,
    )
    render(<TimeAllocationBar label="Empty" segments={[{ label: "None", value: 0 }]} />)
    expect(screen.getByRole("img", { name: "Empty" })).toBeInTheDocument()
    expect(screen.getAllByText(/^Meetings/, { selector: "li" })).toHaveLength(2)
    expect(screen.getByText("Meetings · 3")).toBeInTheDocument()
    await expectNoAxeViolations()
  })
})
