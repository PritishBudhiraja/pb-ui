import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Combobox } from "./combobox"
import { DatePicker } from "./date-picker"
import { FormField } from "./form-field"
import { Input } from "./input"
import { Select, SelectTrigger, SelectValue } from "./select"
import { Textarea } from "./textarea"
import { TimePicker } from "./time-picker"

describe("FormField", () => {
  it("labels the control with a generated id when htmlFor is omitted", () => {
    render(
      <FormField label="Loose">
        <Input />
      </FormField>,
    )
    const input = screen.getByLabelText("Loose")
    expect(input).toHaveAttribute("id")
    expect(input).not.toHaveAttribute("aria-describedby")
    expect(input).not.toHaveAttribute("aria-invalid")
  })

  it("describes the control with the hint", () => {
    render(
      <FormField label="Name" htmlFor="name" hint="Shown">
        <Input id="name" aria-describedby="extra" />
      </FormField>,
    )
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-describedby", "name-hint extra")
    expect(screen.getByText("Shown")).toHaveAttribute("id", "name-hint")
  })

  it("marks the control invalid and describes it with the error", () => {
    render(
      <FormField label="Email" htmlFor="email" hint="Hidden" error="Required">
        <Textarea />
      </FormField>,
    )
    const control = screen.getByLabelText("Email")
    expect(control).toHaveAttribute("id", "email")
    expect(control).toHaveAttribute("aria-invalid", "true")
    expect(control).toHaveAccessibleDescription("Required")
    expect(screen.getByRole("alert")).toHaveTextContent("Required")
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument()
  })

  it("keeps an explicit aria-invalid on the control", () => {
    render(
      <FormField label="Code" error="Wrong">
        <Input aria-invalid={false} />
      </FormField>,
    )
    expect(screen.getByLabelText("Code")).toHaveAttribute("aria-invalid", "false")
  })

  it("wires select, combobox, date and time triggers", () => {
    render(
      <>
        <FormField label="Plan" error="Pick one">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
          </Select>
        </FormField>
        <FormField label="Owner" hint="Who runs it">
          <Combobox items={[]} />
        </FormField>
        <FormField label="Due" error="Too late">
          <DatePicker />
        </FormField>
        <FormField label="At" hint="Local time">
          <TimePicker />
        </FormField>
      </>,
    )
    expect(screen.getByLabelText("Plan")).toHaveAccessibleDescription("Pick one")
    expect(screen.getByLabelText("Owner")).toHaveAccessibleDescription("Who runs it")
    expect(screen.getByLabelText("Due")).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByLabelText("At")).toHaveAccessibleDescription("Local time")
  })
})
