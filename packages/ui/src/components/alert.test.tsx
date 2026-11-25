import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Alert, AlertDescription, AlertTitle } from "./alert"

describe("Alert", () => {
  it("uses an alert role", () => {
    render(
      <Alert>
        <AlertTitle>Saved</AlertTitle>
      </Alert>,
    )
    expect(screen.getByRole("alert")).toHaveTextContent("Saved")
  })

  it("renders a destructive description", () => {
    render(
      <Alert variant="destructive">
        <AlertDescription>Broken</AlertDescription>
      </Alert>,
    )
    expect(screen.getByText("Broken")).toBeInTheDocument()
  })
})
