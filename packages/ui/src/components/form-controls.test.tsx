import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { DurationPicker } from "./duration-picker"
import { acceptsFile, FileDropzone } from "./file-dropzone"
import { FormField } from "./form-field"
import { TimeRangePicker } from "./time-range-picker"

function uniqueIds(container: HTMLElement) {
  const ids = [...container.querySelectorAll("[id]")].map((node) => node.id)
  expect(new Set(ids).size).toBe(ids.length)
}

describe("TimeRangePicker", () => {
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

describe("DurationPicker", () => {
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

describe("acceptsFile", () => {
  const png = new File(["x"], "Shot.PNG", { type: "image/png" })
  const pdf = new File(["x"], "doc.pdf", { type: "application/pdf" })

  it("matches MIME types, wildcards and extensions", () => {
    expect(acceptsFile(png)).toBe(true)
    expect(acceptsFile(png, " , ")).toBe(true)
    expect(acceptsFile(png, "image/*")).toBe(true)
    expect(acceptsFile(pdf, "image/*")).toBe(false)
    expect(acceptsFile(png, ".png")).toBe(true)
    expect(acceptsFile(pdf, ".png, .jpg")).toBe(false)
    expect(acceptsFile(pdf, "application/pdf")).toBe(true)
    expect(acceptsFile(png, "application/pdf")).toBe(false)
  })
})

describe("FileDropzone", () => {
  const png = new File(["x"], "a.png", { type: "image/png" })
  const jpg = new File(["x"], "b.jpg", { type: "image/jpeg" })
  const txt = new File(["x"], "c.txt", { type: "text/plain" })

  it("drops only accepted files", () => {
    const onFiles = vi.fn()
    render(<FileDropzone onFiles={onFiles} accept="image/*" />)
    fireEvent.drop(screen.getByText(/drop files/i), {
      dataTransfer: { files: [png, txt, jpg] },
    })
    expect(onFiles).toHaveBeenCalledWith([png, jpg])
  })

  it("keeps only the first dropped file when multiple is off", () => {
    const onFiles = vi.fn()
    render(<FileDropzone onFiles={onFiles} multiple={false} />)
    fireEvent.drop(screen.getByText(/drop files/i), { dataTransfer: { files: [png, jpg] } })
    expect(onFiles).toHaveBeenCalledWith([png])
  })

  it("does not report a drop with no accepted files", () => {
    const onFiles = vi.fn()
    render(<FileDropzone onFiles={onFiles} accept=".pdf" />)
    fireEvent.drop(screen.getByText(/drop files/i), { dataTransfer: { files: [png] } })
    fireEvent.change(document.querySelector('input[type="file"]') as HTMLInputElement, {
      target: { files: [] },
    })
    expect(onFiles).not.toHaveBeenCalled()
  })

  it("keeps the file input out of the tab order and describes Browse", async () => {
    render(<FileDropzone onFiles={vi.fn()} label="Drop a screenshot" />)
    const input = document.querySelector('input[type="file"]')
    expect(input).toHaveAttribute("tabindex", "-1")
    expect(input).toHaveAttribute("aria-hidden", "true")
    const browse = screen.getByRole("button", { name: "Browse" })
    expect(browse).toHaveAccessibleDescription("Drop a screenshot")
    await userEvent.setup().tab()
    expect(browse).toHaveFocus()
    await expectNoAxeViolations()
  })

  it("joins a FormField through the Browse button", async () => {
    const { container } = render(
      <FormField label="Attachment" htmlFor="files" error="Add a file.">
        <FileDropzone onFiles={vi.fn()} />
      </FormField>,
    )
    uniqueIds(container)
    const browse = screen.getByRole("button", { name: "Attachment" })
    expect(browse).toHaveAttribute("id", "files")
    expect(browse).toHaveAttribute("aria-invalid", "true")
    expect(browse).toHaveAccessibleDescription("Add a file. Drop files or browse")
    await expectNoAxeViolations()
  })
})
