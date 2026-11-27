import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { WeeklyActivityGrid } from "./weekly-activity-grid"

describe("WeeklyActivityGrid", () => {
  it("renders repeated day labels and gives each cell its value as text", async () => {
    const { container } = render(
      <WeeklyActivityGrid
        dayLabels={["S", "M", "T", "W", "T", "F", "S"]}
        cells={[
          { day: 2, hour: 9, value: 4 },
          { day: 4, hour: 9, value: 1 },
          { day: 5, hour: 9, value: 3 },
          { day: 6, hour: 9, value: 8 },
        ]}
        startHour={9}
        endHour={10}
      />,
    )
    expect(screen.getAllByText("T", { selector: "div" })).toHaveLength(2)
    expect(screen.getByText("T 9:00, 4")).toHaveClass("sr-only")
    expect(screen.getByText("T 9:00, 1")).toBeInTheDocument()
    expect(within(container).getAllByText(/9:00, 0$/)).toHaveLength(3)
    await expectNoAxeViolations()
  })
})
