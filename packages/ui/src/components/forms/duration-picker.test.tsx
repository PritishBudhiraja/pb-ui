import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { uniqueIds } from "../../test/helpers"
import { DurationPicker } from "./duration-picker"
import { FormField } from "./form-field"

describe("DurationPicker", () => {
  it("changes duration hours and off-step minutes", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DurationPicker defaultValue={30} minuteStep={15} onValueChange={onValueChange} id="dur" />,
    )
    await user.click(screen.getByRole("combobox", { name: "Hours" }))
    await user.click(screen.getByRole("option", { name: "2" }))
    expect(onValueChange).toHaveBeenCalledWith(150)
    await user.click(screen.getByRole("combobox", { name: "Minutes" }))
    await user.click(screen.getByRole("option", { name: "45" }))
    expect(onValueChange).toHaveBeenCalledWith(165)
    cleanup()
    render(<DurationPicker defaultValue={67} minuteStep={15} id="dur2" disabled />)
    expect(screen.getByRole("combobox", { name: "Hours" })).toBeDisabled()
    cleanup()
    render(<DurationPicker defaultValue={90} />)
    expect(screen.getByRole("combobox", { name: "Hours" })).toBeInTheDocument()
  })

  it("joins a FormField as a labelled group with distinct select ids", async () => {
    const { container } = render(
      <FormField label="Run time" htmlFor="run" hint="Hours and minutes" error="Too long.">
        <DurationPicker defaultValue={90} />
      </FormField>,
    )
    uniqueIds(container)
    expect(screen.getByRole("group", { name: "Run time" })).not.toHaveAttribute("aria-label")
    const hours = screen.getByRole("combobox", { name: "Hours" })
    const minutes = screen.getByRole("combobox", { name: "Minutes" })
    expect(hours).toHaveAttribute("id", "run-hours")
    expect(minutes).toHaveAttribute("id", "run-minutes")
    for (const select of [hours, minutes]) {
      expect(select).toHaveAttribute("aria-describedby", "run-error")
      expect(select).toHaveAttribute("aria-invalid", "true")
    }
    await expectNoAxeViolations()
  })

  it("describes the selects with the FormField hint", async () => {
    render(
      <FormField label="Run time" htmlFor="run" hint="Hours and minutes">
        <DurationPicker aria-label="Planned run time" defaultValue={30} />
      </FormField>,
    )
    expect(screen.getByRole("group", { name: "Planned run time" })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Hours" })).toHaveAttribute(
      "aria-describedby",
      "run-hint",
    )
    expect(screen.getByRole("combobox", { name: "Hours" })).not.toHaveAttribute("aria-invalid")
    await expectNoAxeViolations()
  })

  it("falls back to a Duration label and generated ids without a FormField", () => {
    render(<DurationPicker defaultValue={30} />)
    expect(screen.getByRole("group", { name: "Duration" })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Hours" })).toHaveTextContent("0")
    expect(screen.getByRole("combobox", { name: "Hours" }).id).toMatch(/-hours$/)
  })

  it("shows an hour past maxHours instead of a blank select", async () => {
    const user = userEvent.setup()
    render(<DurationPicker defaultValue={900} />)
    const hours = screen.getByRole("combobox", { name: "Hours" })
    expect(hours).toHaveTextContent("15")
    await user.click(hours)
    expect(screen.getByRole("option", { name: "15" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "12" })).toBeInTheDocument()
  })

  it.each([
    [-30, "0", "PT0H0M"],
    [Number.NaN, "0", "PT0H0M"],
    [Number.POSITIVE_INFINITY, "0", "PT0H0M"],
    [61.7, "1", "PT1H1M"],
  ])("clamps %s to a whole non-negative duration", (value, hours, iso) => {
    render(<DurationPicker value={value} />)
    expect(screen.getByRole("combobox", { name: "Hours" })).toHaveTextContent(hours)
    expect(screen.getByText(iso)).toBeInTheDocument()
  })
})
