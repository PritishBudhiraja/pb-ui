"use client"

import { type ChangeEvent, type DragEvent, useId, useRef, useState } from "react"
import { useFormFieldControl } from "../../hooks/use-form-field-control"
import { cn } from "../../lib/cn"
import { Button } from "../actions/button"
import { Text } from "../data/text"
import { Input } from "../forms/input"
import { Surface } from "../signature/surface"

export interface FileDropzoneProps {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  label?: string
  className?: string
}

// Mirrors the file input's accept rules: MIME types, type/* wildcards and .ext suffixes.
export function acceptsFile(file: File, accept = "") {
  const rules = accept
    .split(",")
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)
  if (rules.length === 0) return true
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return rules.some((rule) => {
    if (rule.startsWith(".")) return name.endsWith(rule)
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1))
    return type === rule
  })
}

export function FileDropzone({
  onFiles,
  accept,
  multiple = true,
  disabled,
  label = "Drop files or browse",
  className,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [active, setActive] = useState(false)
  const labelId = useId()
  const inputId = useId()
  const control = useFormFieldControl({ "aria-describedby": labelId })

  function take(files: File[]) {
    if (files.length === 0) return
    onFiles(files)
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setActive(false)
    if (disabled) return
    const accepted = [...event.dataTransfer.files].filter((file) => acceptsFile(file, accept))
    take(multiple ? accepted : accepted.slice(0, 1))
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    take(event.target.files ? [...event.target.files] : [])
    event.target.value = ""
  }

  return (
    <Surface
      onDragOver={(event) => {
        event.preventDefault()
        if (disabled) return
        setActive(true)
      }}
      onDragLeave={() => setActive(false)}
      onDrop={onDrop}
      className={cn(
        "flex min-h-32 flex-col items-center justify-center gap-3 px-4 py-6",
        active && "bg-accent",
        disabled && "opacity-50",
        className,
      )}
    >
      <Input
        ref={inputRef}
        type="file"
        id={inputId}
        tabIndex={-1}
        aria-hidden
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={onChange}
      />
      <Text id={labelId} tone="muted">
        {label}
      </Text>
      <Button
        {...control}
        type="button"
        size="sm"
        variant="outline"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        Browse
      </Button>
    </Surface>
  )
}
