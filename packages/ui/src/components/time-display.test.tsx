import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { CountdownDisplay } from "./countdown-display"
import { TimeAllocationBar } from "./time-allocation-bar"
import { WeeklyActivityGrid } from "./weekly-activity-grid"

describe("CountdownDisplay", () => {
  it("shows zero for values that are not finite", async () => {
    render(
      <>
        <CountdownDisplay remainingSeconds={Number.NaN} label="Not a number" />
        <CountdownDisplay remainingSeconds={Number.POSITIVE_INFINITY} label="Forever" />
        <CountdownDisplay remainingSeconds={61} label="Soon" />
      </>,
    )
    expect(screen.getByRole("timer", { name: "Not a number 00:00:00" })).toHaveTextContent(
      "00:00:00",
    )
    expect(screen.getByRole("timer", { name: "Forever 00:00:00" })).toHaveTextContent("00:00:00")
    expect(screen.getByRole("timer", { name: "Soon 00:01:01" })).toBeInTheDocument()
    await expectNoAxeViolations()
  })
})

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
