import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { FormField } from "./form-field"
import { Input } from "./input"

describe("FormField", () => {
  it("renders without ids", () => {
    render(
      <FormField label="Loose" hint="Hint">
        <Input />
      </FormField>,
    )
    expect(screen.getByText("Hint")).toBeInTheDocument()
  })

  it("shows a hint without an error", () => {
    render(
      <FormField label="Name" htmlFor="name" hint="Shown">
        <Input id="name" />
      </FormField>,
    )
    expect(screen.getByText("Shown")).toBeInTheDocument()
  })

  it("exposes errors as an alert", () => {
    render(
      <FormField label="Email" htmlFor="email" error="Required">
        <Input id="email" />
      </FormField>,
    )
    expect(screen.getByRole("alert")).toHaveTextContent("Required")
  })
})
