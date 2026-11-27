import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { TimePicker } from "./time-picker"

describe("TimePicker", () => {
  it("selects a time from the popover", async () => {
    const user = userEvent.setup()
    render(<TimePicker defaultValue="09:00" />)
    await user.click(screen.getByRole("button", { name: /9:00|09:00|9:00 AM/i }))
    await expectNoAxeViolations()
    await user.click(screen.getByRole("option", { name: "2" }))
    await user.click(screen.getByRole("option", { name: "PM" }))
    await user.click(screen.getByRole("option", { name: "30" }))
    expect(screen.getByRole("button", { name: /2:30|14:30|2:30 PM/i })).toBeInTheDocument()
  })

  it("clears the value", async () => {
    const user = userEvent.setup()
    render(<TimePicker defaultValue="09:30" />)
    await user.click(screen.getByRole("button", { name: /9:30/i }))
    await user.click(screen.getByRole("button", { name: "Clear" }))
    expect(screen.getByRole("button", { name: /pick a time/i })).toBeInTheDocument()
  })

  it("commits the current time", async () => {
    const user = userEvent.setup()
    render(<TimePicker name="when" />)
    await user.click(screen.getByRole("button", { name: /pick a time/i }))
    await user.click(screen.getByRole("button", { name: "Now" }))
    expect(screen.getByRole("button")).not.toHaveTextContent(/pick a time/i)
  })

  it("disables the hidden input with the picker", () => {
    const { container } = render(<TimePicker name="at" defaultValue="09:00" disabled />)
    expect(container.querySelector('input[name="at"]')).toBeDisabled()
  })

  it("shows and selects a minute that is off the step", async () => {
    const user = userEvent.setup()
    render(<TimePicker defaultValue="10:07" minuteStep={5} locale="en-US" />)
    await user.click(screen.getByRole("button", { name: /10:07/ }))
    expect(screen.getByRole("option", { name: "07" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("option", { name: "05" })).toHaveAttribute("aria-selected", "false")
  })
})
