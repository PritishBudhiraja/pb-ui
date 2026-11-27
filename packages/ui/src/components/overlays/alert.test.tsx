import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { Alert, AlertDescription, AlertTitle } from "./alert"

describe("Alert", () => {
  it("uses an alert role", async () => {
    render(
      <Alert>
        <AlertTitle>Saved</AlertTitle>
      </Alert>,
    )
    expect(screen.getByRole("alert")).toHaveTextContent("Saved")
    await expectNoAxeViolations()
  })

  it("renders a destructive description", async () => {
    render(
      <Alert variant="destructive">
        <AlertDescription>Broken</AlertDescription>
      </Alert>,
    )
    expect(screen.getByText("Broken")).toBeInTheDocument()
    await expectNoAxeViolations()
  })
})
