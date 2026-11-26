"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"
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

export function RichTextEditor({
  value = "",
  onValueChange,
  editable = true,
  className,
  label = "Editor",
}: RichTextEditorProps) {
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
    const current = editor.getHTML()
    if (value && value !== current) editor.commands.setContent(value, { emitUpdate: false })
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
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          List
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
