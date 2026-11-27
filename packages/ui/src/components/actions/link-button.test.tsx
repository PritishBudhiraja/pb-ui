import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { LinkButton } from "./link-button"

describe("LinkButton", () => {
  it("renders an anchor with the href", async () => {
    render(<LinkButton href="/install">Install</LinkButton>)
    expect(screen.getByRole("link", { name: "Install" })).toHaveAttribute("href", "/install")
    await expectNoAxeViolations()
  })
})
