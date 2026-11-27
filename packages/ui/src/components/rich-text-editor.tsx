"use client"

import { type Editor, EditorContent, useEditor, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useContext, useEffect, useRef } from "react"
import { FormFieldContext, useFormFieldControl } from "../hooks/use-form-field-control"
import { cn } from "../lib/cn"
import { Button } from "./button"

export interface RichTextEditorProps {
  value?: string
  onValueChange?: (html: string) => void
  placeholder?: string
  editable?: boolean
  className?: string
  label?: string
}

function incomingHtml(value: string) {
  if (!value || value === "<p></p>") return ""
  return value
}

export function RichTextEditor({
  value = "",
  onValueChange,
  placeholder,
  editable = true,
  className,
  label = "Editor",
}: RichTextEditorProps) {
  const synced = useRef<string | null>(null)
  const field = useContext(FormFieldContext)
  const control = useFormFieldControl({})
  const attributes: Record<string, string> = {
    class: "min-h-32 px-3 py-2 text-sm outline-none",
    role: "textbox",
    "aria-multiline": "true",
  }
  if (control.id) attributes.id = control.id
  if (control["aria-describedby"]) attributes["aria-describedby"] = control["aria-describedby"]
  if (control["aria-invalid"]) attributes["aria-invalid"] = "true"
  if (field) attributes["aria-labelledby"] = field.labelId
  else attributes["aria-label"] = label

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: value,
    editable,
    editorProps: { attributes },
    onUpdate: ({ editor: instance }) => {
      onValueChange?.(instance.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    editor.setEditable(editable)
  }, [editable, editor])

  useEffect(() => {
    return () => {
      editor?.destroy()
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return
    const current = editor.isEmpty ? "" : editor.getHTML()
    const next = incomingHtml(value)
    if (synced.current === next) return
    if (incomingHtml(current) === next) {
      synced.current = next
      return
    }
    synced.current = next
    if (next === "") editor.commands.clearContent(false)
    else editor.commands.setContent(value, { emitUpdate: false })
  }, [editor, value])

  if (!editor)
    return (
      <div className={cn("min-h-32 rounded-md border border-dashed border-border", className)} />
    )

  return (
    <RichTextSurface
      editor={editor}
      editable={editable}
      placeholder={placeholder}
      className={className}
    />
  )
}

function RichTextSurface({
  editor,
  editable,
  placeholder,
  className,
}: {
  editor: Editor
  editable: boolean
  placeholder?: string
  className?: string
}) {
  // useEditor does not re-render on transactions, so read live editor state through a subscription.
  const state = useEditorState({
    editor,
    selector: ({ editor: instance }) => ({
      isEmpty: instance.isEmpty,
      bold: instance.isActive("bold"),
      italic: instance.isActive("italic"),
      bulletList: instance.isActive("bulletList"),
    }),
  })

  return (
    <div className={cn("overflow-hidden rounded-md border border-dashed border-border", className)}>
      <div className="flex flex-wrap gap-1 border-b border-dashed border-border p-1">
        <Button
          type="button"
          size="sm"
          variant={state.bold ? "default" : "ghost"}
          aria-pressed={state.bold}
          disabled={!editable}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          type="button"
          size="sm"
          variant={state.italic ? "default" : "ghost"}
          aria-pressed={state.italic}
          disabled={!editable}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          type="button"
          size="sm"
          variant={state.bulletList ? "default" : "ghost"}
          aria-pressed={state.bulletList}
          disabled={!editable}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          List
        </Button>
      </div>
      <div className="relative">
        {placeholder && state.isEmpty ? (
          <div className="pointer-events-none absolute top-2 left-3 text-sm text-muted-foreground">
            {placeholder}
          </div>
        ) : null}
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
