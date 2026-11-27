import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { DateRangePicker } from "./date-range-picker"

describe("DateRangePicker", () => {
  it("picks a date range and clears it", async () => {
    const user = userEvent.setup()
    render(
      <DateRangePicker defaultValue={{ from: "2026-11-12", to: "2026-11-16" }} locale="en-US" />,
    )
    expect(screen.getByRole("button", { name: /12/ })).toHaveTextContent(/16/)
    cleanup()
    render(<DateRangePicker defaultValue={{ from: "2026-11-12" }} locale="en-US" />)
    await user.click(screen.getByRole("button", { name: /12/ }))
    await user.click(screen.getByRole("button", { name: "Clear" }))
    expect(screen.getByRole("button", { name: /pick a range/i })).toBeInTheDocument()
  })

  it("opens the range picker onto the selected month", async () => {
    const user = userEvent.setup()
    render(<DateRangePicker />)
    await user.click(screen.getByRole("button", { name: /pick a range/i }))
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: /pick a range/i }))
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument()
    const inMonth = document.querySelector('[data-iso="2026-11-12"]')
    if (!(inMonth instanceof HTMLElement)) throw new Error("missing day")
    await user.click(inMonth)
  })
})
