import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { LoadingButton } from "./loading-button"

describe("LoadingButton", () => {
  it("is busy and disabled while loading", async () => {
    render(<LoadingButton loading>Save</LoadingButton>)
    const button = screen.getByRole("button", { name: /save/i })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-busy", "true")
    expect(screen.getByRole("status")).toHaveTextContent("Loading")
    await expectNoAxeViolations()
  })
})
