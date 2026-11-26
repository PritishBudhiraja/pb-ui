import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { IconButton } from "./icon-button"

describe("IconButton", () => {
  it("requires an accessible name", async () => {
    render(
      <IconButton label="Search">
        <span>+</span>
      </IconButton>,
    )
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument()
    await expectNoAxeViolations()
  })
})
