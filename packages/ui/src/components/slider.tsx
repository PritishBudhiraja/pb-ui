"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"
import type * as React from "react"
import { useFormFieldGroup } from "../hooks/use-form-field-control"
import { cn } from "../lib/cn"

export type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  thumbLabels?: string[]
}

export function Slider({
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  thumbLabels,
  ref,
  ...props
}: SliderProps) {
  const field = useFormFieldGroup({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
  })
  const thumbs = (props.value ?? props.defaultValue ?? [0]).length

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbs }, (_, index) => {
        const thumbLabel = thumbLabels?.[index]
        return (
          <SliderPrimitive.Thumb
            key={index}
            {...field}
            aria-label={thumbLabel ?? field["aria-label"]}
            aria-labelledby={thumbLabel ? undefined : field["aria-labelledby"]}
            className="block h-4 w-4 rounded-full border border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        )
      })}
    </SliderPrimitive.Root>
  )
}
