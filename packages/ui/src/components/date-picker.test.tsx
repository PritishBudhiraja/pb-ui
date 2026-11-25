import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { DatePicker } from "./date-picker"

describe("DatePicker", () => {
  it("opens a calendar and selects a day", async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultValue="2026-11-01" />)
    await user.click(screen.getByRole("button", { name: /2026/ }))
    await user.click(screen.getByRole("button", { name: "26" }))
    expect(screen.getByRole("button", { name: /26/ })).toBeInTheDocument()
  })

  it("clears the value", async () => {
    const user = userEvent.setup()
    render(<DatePicker defaultValue="2026-11-01" />)
    await user.click(screen.getByRole("button", { name: /2026/ }))
    await user.click(screen.getByRole("button", { name: "Clear" }))
    expect(screen.getByRole("button", { name: /pick a date/i })).toBeInTheDocument()
  })

  it("sets today", async () => {
    const user = userEvent.setup()
    render(<DatePicker name="day" />)
    await user.click(screen.getByRole("button", { name: /pick a date/i }))
    await user.click(screen.getByRole("button", { name: "Today" }))
    expect(screen.getByRole("button")).not.toHaveTextContent(/pick a date/i)
  })

  it("resets the visible month when reopened", async () => {
    const user = userEvent.setup()
    render(<DatePicker />)
    await user.click(screen.getByRole("button", { name: /pick a date/i }))
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: /pick a date/i }))
    expect(screen.getByRole("button", { name: "Today" })).toBeInTheDocument()
  })
})
