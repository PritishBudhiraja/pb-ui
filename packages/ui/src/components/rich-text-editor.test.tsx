import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { FormField } from "./form-field"
import { RichTextEditor } from "./rich-text-editor"

beforeAll(() => {
  document.elementFromPoint = () => null
  Range.prototype.getClientRects = () => [] as unknown as DOMRectList
  Range.prototype.getBoundingClientRect = () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON() {
      return this
    },
  })
})

describe("RichTextEditor", () => {
  it("syncs a cleared value, placeholder, and read-only toolbar", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <RichTextEditor value="<p>Hi</p>" onValueChange={onValueChange} placeholder="Write" />,
    )
    await waitFor(() => expect(screen.getByLabelText("Editor")).toHaveTextContent("Hi"))
    rerender(<RichTextEditor value="" onValueChange={onValueChange} placeholder="Write" />)
    await waitFor(() => expect(screen.getByText("Write")).toBeInTheDocument())
    rerender(
      <RichTextEditor
        value=""
        editable={false}
        onValueChange={onValueChange}
        placeholder="Write"
      />,
    )
    expect(screen.getByRole("button", { name: "Bold" })).toBeDisabled()
    await user.click(screen.getByRole("button", { name: "Bold" }))
    rerender(<RichTextEditor value="<p></p>" onValueChange={onValueChange} placeholder="Write" />)
    rerender(<RichTextEditor value="<p>Hi</p>" onValueChange={onValueChange} placeholder="Write" />)
    await waitFor(() => expect(screen.queryByText("Write")).toBeNull())
  })

  it("toggles marks through the real editor", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<RichTextEditor value="<p>Hello</p>" onValueChange={onValueChange} />)
    await waitFor(() => expect(screen.getByLabelText("Editor")).toHaveTextContent("Hello"))
    await user.click(screen.getByRole("button", { name: "Bold" }))
    await user.click(screen.getByRole("button", { name: "Italic" }))
    await user.click(screen.getByRole("button", { name: "List" }))
    expect(onValueChange).toHaveBeenCalled()
  })

  it("hides the placeholder and presses Bold as the editor changes", async () => {
    const user = userEvent.setup()
    render(<RichTextEditor placeholder="Write" />)
    const textbox = await screen.findByRole("textbox", { name: "Editor" })
    expect(screen.getByText("Write")).toBeInTheDocument()
    const bold = screen.getByRole("button", { name: "Bold" })
    expect(bold).toHaveAttribute("aria-pressed", "false")
    await user.click(textbox)
    await user.keyboard("Typed")
    await waitFor(() => expect(screen.queryByText("Write")).toBeNull())
    await user.click(bold)
    await waitFor(() => expect(bold).toHaveAttribute("aria-pressed", "true"))
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("aria-pressed", "false")
    await expectNoAxeViolations()
  })

  it("joins a FormField label, hint and error", async () => {
    const { rerender } = render(
      <FormField label="Notes" htmlFor="notes" hint="Markdown is not supported">
        <RichTextEditor />
      </FormField>,
    )
    const textbox = await screen.findByRole("textbox", { name: "Notes" })
    expect(textbox).toHaveAttribute("id", "notes")
    expect(textbox).not.toHaveAttribute("aria-label")
    expect(textbox).toHaveAccessibleDescription("Markdown is not supported")
    expect(textbox).not.toHaveAttribute("aria-invalid")
    await expectNoAxeViolations()
    rerender(
      <FormField label="Notes" htmlFor="notes" error="Add a note">
        <RichTextEditor />
      </FormField>,
    )
    await waitFor(() => expect(textbox).toHaveAttribute("aria-invalid", "true"))
    expect(textbox).toHaveAccessibleDescription("Add a note")
    await expectNoAxeViolations()
  })
})
