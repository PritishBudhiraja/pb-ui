import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { Checkbox } from "./checkbox"
import { Combobox } from "./combobox"
import { DatePicker } from "./date-picker"
import { FormField } from "./form-field"
import { Input } from "./input"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Select, SelectTrigger, SelectValue } from "./select"
import { Slider } from "./slider"
import { Switch } from "./switch"
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

  it("describes the control with the hint", async () => {
    render(
      <FormField label="Name" htmlFor="name" hint="Shown">
        <Input id="name" aria-describedby="extra" />
      </FormField>,
    )
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-describedby", "name-hint extra")
    expect(screen.getByText("Shown")).toHaveAttribute("id", "name-hint")
    await expectNoAxeViolations()
  })

  it("marks the control invalid and describes it with the error", async () => {
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
    await expectNoAxeViolations()
  })

  it("keeps an explicit aria-invalid on the control", () => {
    render(
      <FormField label="Code" error="Wrong">
        <Input aria-invalid={false} />
      </FormField>,
    )
    expect(screen.getByLabelText("Code")).toHaveAttribute("aria-invalid", "false")
  })

  it("wires select, combobox, date and time triggers", async () => {
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
    await expectNoAxeViolations()
  })

  it("wires checkbox, switch, radio group and slider", async () => {
    render(
      <>
        <FormField label="Terms" error="Accept the terms">
          <Checkbox />
        </FormField>
        <FormField label="Alerts" hint="Email only">
          <Switch />
        </FormField>
        <FormField label="Plan" error="Pick a plan">
          <RadioGroup>
            <RadioGroupItem value="free" aria-label="Free" />
          </RadioGroup>
        </FormField>
        <FormField label="Tier">
          <RadioGroup aria-labelledby="tier-heading">
            <RadioGroupItem value="pro" aria-label="Pro" />
          </RadioGroup>
        </FormField>
        <span id="tier-heading">Pricing tier</span>
        <FormField label="Mix">
          <Slider defaultValue={[5]} aria-label="Treble" />
        </FormField>
        <FormField label="Budget" hint="In dollars">
          <Slider defaultValue={[20, 80]} />
        </FormField>
      </>,
    )
    const terms = screen.getByRole("checkbox", { name: "Terms" })
    expect(terms).toHaveAttribute("aria-invalid", "true")
    expect(terms).toHaveAccessibleDescription("Accept the terms")
    expect(screen.getByRole("switch", { name: "Alerts" })).toHaveAccessibleDescription("Email only")
    const plan = screen.getByRole("radiogroup", { name: "Plan" })
    expect(plan).toHaveAttribute("aria-invalid", "true")
    expect(plan).toHaveAccessibleDescription("Pick a plan")
    expect(screen.getByRole("radiogroup", { name: "Pricing tier" })).toBeInTheDocument()
    expect(screen.getByRole("slider", { name: "Treble" })).not.toHaveAttribute("aria-labelledby")
    const thumbs = screen.getAllByRole("slider", { name: "Budget" })
    expect(thumbs).toHaveLength(2)
    expect(thumbs[1]).toHaveAccessibleDescription("In dollars")
    await expectNoAxeViolations()
  })
})
