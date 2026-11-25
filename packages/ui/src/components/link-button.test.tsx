import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { LinkButton } from "./link-button"

describe("LinkButton", () => {
  it("renders an anchor with the href", () => {
    render(<LinkButton href="/install">Install</LinkButton>)
    expect(screen.getByRole("link", { name: "Install" })).toHaveAttribute("href", "/install")
  })
})
