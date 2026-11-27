import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { uniqueIds } from "../test/helpers"
import { acceptsFile, FileDropzone } from "./file-dropzone"
import { FormField } from "./form-field"

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

  it("drops and selects files", async () => {
    const onFiles = vi.fn()
    const user = userEvent.setup()
    const file = new File(["hi"], "note.txt", { type: "text/plain" })
    render(<FileDropzone onFiles={onFiles} />)
    const input = document.querySelector('input[type="file"]')
    expect(input).toBeTruthy()
    if (!(input instanceof HTMLInputElement)) throw new Error("missing file input")
    await user.upload(input, file)
    expect(onFiles).toHaveBeenCalled()
    await user.click(screen.getByRole("button", { name: "Browse" }))
    const zone = screen.getByText(/drop files/i)
    fireEvent.dragOver(zone)
    fireEvent.dragLeave(zone)
    fireEvent.drop(zone, { dataTransfer: { files: [file] } })
    expect(onFiles).toHaveBeenCalled()
    render(<FileDropzone onFiles={onFiles} disabled />)
    const disabledZone = screen.getAllByText(/drop files/i)[1] as HTMLElement
    fireEvent.dragOver(disabledZone)
    fireEvent.drop(disabledZone, { dataTransfer: { files: [file] } })
    fireEvent.change(input, { target: { files: null } })
  })

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
