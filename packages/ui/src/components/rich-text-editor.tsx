"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useRef, useState } from "react"
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
  const [, setRevision] = useState(0)
  const synced = useRef<string | null>(null)
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: value,
    editable,
    editorProps: {
      attributes: {
        class: "min-h-32 px-3 py-2 text-sm outline-none",
        "aria-label": label,
      },
    },
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
    setRevision((revision) => revision + 1)
  }, [editor, value])

  if (!editor)
    return (
      <div className={cn("min-h-32 rounded-md border border-dashed border-border", className)} />
    )

  return (
    <div className={cn("overflow-hidden rounded-md border border-dashed border-border", className)}>
      <div className="flex flex-wrap gap-1 border-b border-dashed border-border p-1">
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bold") ? "default" : "ghost"}
          disabled={!editable}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          disabled={!editable}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          disabled={!editable}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          List
        </Button>
      </div>
      <div className="relative">
        {placeholder && editor.isEmpty ? (
          <div className="pointer-events-none absolute top-2 left-3 text-sm text-muted-foreground">
            {placeholder}
          </div>
        ) : null}
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
