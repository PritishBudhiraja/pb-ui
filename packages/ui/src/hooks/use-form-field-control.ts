"use client"

import { type AriaAttributes, createContext, useContext } from "react"

export interface FormFieldContextValue {
  id: string
  labelId: string
  describedBy?: string
  invalid: boolean
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null)

export interface FormFieldControlProps {
  id?: string
  "aria-describedby"?: string
  "aria-invalid"?: AriaAttributes["aria-invalid"]
}

export function useFormFieldControl(props: FormFieldControlProps): FormFieldControlProps {
  const field = useContext(FormFieldContext)
  if (!field) return props
  return mergeFieldProps(field, props)
}

function mergeFieldProps(
  field: FormFieldContextValue,
  props: FormFieldControlProps,
): FormFieldControlProps {
  const describedBy = [field.describedBy, props["aria-describedby"]].filter(Boolean).join(" ")
  return {
    id: props.id ?? field.id,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": props["aria-invalid"] ?? (field.invalid || undefined),
  }
}

export interface FormFieldGroupProps {
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
  "aria-invalid"?: AriaAttributes["aria-invalid"]
}

// For controls a <label for> cannot name (radio groups, slider thumbs):
// point aria-labelledby at the FormField label instead of sharing its id.
export function useFormFieldGroup(props: FormFieldGroupProps): FormFieldGroupProps {
  const field = useContext(FormFieldContext)
  if (!field) return props
  const { id: _id, ...control } = mergeFieldProps(field, props)
  return {
    ...control,
    "aria-label": props["aria-label"],
    "aria-labelledby":
      props["aria-labelledby"] ?? (props["aria-label"] ? undefined : field.labelId),
  }
}
