"use client"

import { type ChangeEvent, type DragEvent, useRef, useState } from "react"
import { cn } from "../lib/cn"
import { Button } from "./button"
import { Input } from "./input"
import { Surface } from "./surface"
import { Text } from "./text"

export interface FileDropzoneProps {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  label?: string
  className?: string
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

  function take(list: FileList | null) {
    if (!list) return
    onFiles([...list])
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setActive(false)
    if (disabled) return
    take(event.dataTransfer.files)
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    take(event.target.files)
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
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={onChange}
      />
      <Text tone="muted">{label}</Text>
      <Button
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
