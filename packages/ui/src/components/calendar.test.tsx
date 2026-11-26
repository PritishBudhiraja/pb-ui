import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { Calendar } from "./calendar"

function CalendarHarness() {
  const [month, setMonth] = useState(new Date(2026, 10, 1))
  return <Calendar month={month} value="2026-11-30" onMonthChange={setMonth} onSelect={() => {}} />
}

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
    await user.click(screen.getByRole("button", { name: "Thursday, November 26, 2026" }))
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

  it("disables days outside min and max", async () => {
    render(
      <Calendar
        month={new Date(2026, 10, 1)}
        min="2026-11-10"
        max="2026-11-20"
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    )
    expect(screen.getByRole("button", { name: "Sunday, November 1, 2026" })).toBeDisabled()
    await expectNoAxeViolations()
  })

  it("marks the selected day and today, with one tab stop", () => {
    const today = new Date()
    const { rerender } = render(
      <Calendar
        month={new Date(2026, 10, 1)}
        value="2026-11-12"
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    )
    const selected = screen.getByRole("button", { name: "Thursday, November 12, 2026" })
    expect(selected).toHaveAttribute("aria-pressed", "true")
    expect(selected).toHaveAttribute("tabindex", "0")
    expect(screen.getAllByRole("button").filter((b) => b.tabIndex === 0)).toHaveLength(3)
    rerender(<Calendar month={today} onMonthChange={vi.fn()} onSelect={vi.fn()} />)
    const current = document.querySelector('[aria-current="date"]')
    expect(current).toHaveAttribute("tabindex", "0")
    rerender(<Calendar month={new Date(2001, 1, 1)} onMonthChange={vi.fn()} onSelect={vi.fn()} />)
    expect(screen.getByRole("button", { name: "Thursday, February 1, 2001" })).toHaveAttribute(
      "tabindex",
      "0",
    )
  })

  it("moves focus with arrow keys and crosses months", async () => {
    const user = userEvent.setup()
    render(<CalendarHarness />)
    screen.getByRole("button", { name: "Monday, November 30, 2026" }).focus()
    await user.keyboard("{ArrowLeft}")
    expect(screen.getByRole("button", { name: "Sunday, November 29, 2026" })).toHaveFocus()
    await user.keyboard("{ArrowUp}")
    expect(screen.getByRole("button", { name: "Sunday, November 22, 2026" })).toHaveFocus()
    await user.keyboard("{ArrowDown}{ArrowRight}{ArrowRight}")
    expect(screen.getByRole("button", { name: "Tuesday, December 1, 2026" })).toHaveFocus()
    await user.keyboard("a")
    expect(screen.getByRole("button", { name: "Tuesday, December 1, 2026" })).toHaveFocus()
  })
})
