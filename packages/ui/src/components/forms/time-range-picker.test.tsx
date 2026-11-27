import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { uniqueIds } from "../../test/helpers"
import { FormField } from "./form-field"
import { isValidTimeRange, TimeRangePicker } from "./time-range-picker"

describe("TimeRangePicker", () => {
  it("flags an inverted time range", async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker defaultValue={{ start: "14:00", end: "09:00" }} />)
    expect(screen.getByText(/end must be after start/i)).toBeInTheDocument()
    cleanup()
    render(<TimeRangePicker defaultValue={{ start: "09:00", end: "11:00" }} />)
    expect(screen.queryByText(/end must be after start/i)).not.toBeInTheDocument()
    expect(isValidTimeRange({ start: "", end: "" })).toBe(true)
    expect(isValidTimeRange({ start: "nope", end: "09:00" })).toBe(false)
    await user.click(screen.getByRole("button", { name: "Start" }))
    await user.click(screen.getByRole("button", { name: "Clear" }))
    cleanup()
    render(<TimeRangePicker defaultValue={{ start: "09:00", end: "11:00" }} />)
    await user.click(screen.getByRole("button", { name: "End" }))
    await user.click(screen.getByRole("option", { name: "30" }))
  })

  it("gives each picker its own id inside a FormField and names the group", async () => {
    const { container } = render(
      <FormField label="Working hours" htmlFor="hours" hint="Local time">
        <TimeRangePicker defaultValue={{ start: "09:00", end: "17:00" }} />
      </FormField>,
    )
    uniqueIds(container)
    expect(screen.getByRole("group", { name: "Working hours" })).toBeInTheDocument()
    const start = screen.getByRole("button", { name: "Start" })
    const end = screen.getByRole("button", { name: "End" })
    expect(start).toHaveAttribute("id", "hours-start")
    expect(end).toHaveAttribute("id", "hours-end")
    expect(start).toHaveAttribute("aria-describedby", "hours-hint")
    expect(end).toHaveAttribute("aria-describedby", "hours-hint")
    expect(end).not.toHaveAttribute("aria-invalid")
    await expectNoAxeViolations()
  })

  it("links and announces the range error on the end picker", async () => {
    const { container } = render(
      <FormField label="Working hours" htmlFor="hours" error="Pick working hours.">
        <TimeRangePicker defaultValue={{ start: "14:00", end: "09:00" }} />
      </FormField>,
    )
    uniqueIds(container)
    const start = screen.getByRole("button", { name: "Start" })
    const end = screen.getByRole("button", { name: "End" })
    const rangeError = screen.getByText("End must be after start.")
    expect(rangeError).toHaveAttribute("role", "alert")
    expect(rangeError).toHaveAttribute("id", "hours-range-error")
    expect(end).toHaveAttribute("aria-describedby", "hours-error hours-range-error")
    expect(end).toHaveAttribute("aria-invalid", "true")
    expect(start).toHaveAttribute("aria-describedby", "hours-error")
    expect(start).toHaveAttribute("aria-invalid", "true")
    await expectNoAxeViolations()
  })

  it("uses its own id and aria-label outside a FormField", async () => {
    render(
      <TimeRangePicker
        id="shift"
        aria-label="Shift"
        defaultValue={{ start: "14:00", end: "09:00" }}
      />,
    )
    expect(screen.getByRole("group", { name: "Shift" })).toBeInTheDocument()
    const end = screen.getByRole("button", { name: "End" })
    expect(end).toHaveAttribute("id", "shift-end")
    expect(end).toHaveAttribute("aria-describedby", "shift-range-error")
    expect(end).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByRole("button", { name: "Start" })).not.toHaveAttribute("aria-invalid")
    await expectNoAxeViolations()
  })

  it("leaves a valid range undescribed without a FormField", () => {
    render(<TimeRangePicker defaultValue={{ start: "09:00", end: "10:00" }} />)
    const end = screen.getByRole("button", { name: "End" })
    expect(end).not.toHaveAttribute("aria-describedby")
    expect(end.id).toMatch(/-end$/)
  })
})
