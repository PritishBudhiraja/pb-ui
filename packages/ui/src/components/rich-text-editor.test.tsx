import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useEditor } from "@tiptap/react"
import type { ComponentProps } from "react"
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { FormField } from "./form-field"
import { RichTextEditor } from "./rich-text-editor"

// `fake` lets a test drive useEditor with a stub editor; otherwise the real editor runs.
const tiptap = vi.hoisted(() => ({ fake: false }))

function selectStubState(options: {
  editor: unknown
  selector: (context: { editor: unknown; transactionNumber: number }) => unknown
}) {
  return options.selector({ editor: options.editor, transactionNumber: 0 })
}

vi.mock("@tiptap/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tiptap/react")>()
  return {
    ...actual,
    useEditor: vi.fn(actual.useEditor),
    useEditorState: ((options: Parameters<typeof actual.useEditorState>[0]) =>
      (tiptap.fake
        ? (selectStubState as unknown as typeof actual.useEditorState)
        : actual.useEditorState)(options)) as typeof actual.useEditorState,
    EditorContent: (props: ComponentProps<typeof actual.EditorContent>) =>
      tiptap.fake ? <div /> : <actual.EditorContent {...props} />,
  }
})

const editor = {
  isActive: (name: string) => name === "bold" || name === "italic" || name === "bulletList",
  getHTML: () => "<p>Hi</p>",
  isEmpty: false,
  setEditable: vi.fn(),
  destroy: vi.fn(),
  commands: { setContent: vi.fn(), clearContent: vi.fn() },
  chain: () => ({
    focus: () => ({
      toggleBold: () => ({ run: vi.fn() }),
      toggleItalic: () => ({ run: vi.fn() }),
      toggleBulletList: () => ({ run: vi.fn() }),
    }),
  }),
}

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

  describe("with a stub editor", () => {
    beforeEach(() => {
      tiptap.fake = true
      vi.mocked(useEditor).mockImplementation((options) => {
        options?.onUpdate?.({ editor } as never)
        return editor as never
      })
    })

    it("mounts a rich text editor toolbar", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      vi.mocked(useEditor).mockReturnValueOnce(null as never)
      render(<RichTextEditor className="empty" />)
      expect(document.querySelector(".empty")).toBeInTheDocument()
      cleanup()
      render(<RichTextEditor value="<p>Hi</p>" onValueChange={onValueChange} />)
      expect(onValueChange).toHaveBeenCalledWith("<p>Hi</p>")
      cleanup()
      render(<RichTextEditor value="<p>Later</p>" />)
      await user.click(screen.getByRole("button", { name: "Bold" }))
      await user.click(screen.getByRole("button", { name: "Italic" }))
      await user.click(screen.getByRole("button", { name: "List" }))
      cleanup()
      vi.mocked(useEditor).mockImplementation((options) => {
        options?.onUpdate?.({ editor: { ...editor, isActive: () => false } } as never)
        return { ...editor, isActive: () => false } as never
      })
      render(<RichTextEditor />)
      await user.click(screen.getByRole("button", { name: "Italic" }))
    })

    afterEach(() => {
      tiptap.fake = false
      vi.mocked(useEditor).mockReset()
    })
  })
})
