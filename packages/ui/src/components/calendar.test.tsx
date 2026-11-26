import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Calendar } from "./calendar"

describe("Calendar", () => {
  it("selects an in-month day as ISO", async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(
      <Calendar
        month={new Date(2026, 10, 1)}
        value="2026-11-01"
        onMonthChange={vi.fn()}
        onSelect={onSelect}
      />,
    )
    await user.click(screen.getByRole("button", { name: "26" }))
    expect(onSelect).toHaveBeenCalledWith("2026-11-26")
  })

  it("moves the month", async () => {
    const onMonthChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Calendar month={new Date(2026, 10, 1)} onMonthChange={onMonthChange} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByRole("button", { name: "Next month" }))
    expect(onMonthChange).toHaveBeenCalled()
    await user.click(screen.getByRole("button", { name: "Previous month" }))
    expect(onMonthChange).toHaveBeenCalledTimes(2)
  })

  it("disables days outside min and max", () => {
    render(
      <Calendar
        month={new Date(2026, 10, 1)}
        min="2026-11-10"
        max="2026-11-20"
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    )
    expect(screen.getAllByRole("button", { name: "1" })[0]).toBeDisabled()
  })
})
