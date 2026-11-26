import { type AriaAttributes, createContext, useContext } from "react"

export interface FormFieldContextValue {
  id: string
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
  const describedBy = [field.describedBy, props["aria-describedby"]].filter(Boolean).join(" ")
  return {
    id: props.id ?? field.id,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": props["aria-invalid"] ?? (field.invalid || undefined),
  }
}
