import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { MobileNavigation } from "./mobile-navigation"

describe("MobileNavigation", () => {
  it("opens the sheet menu", async () => {
    const user = userEvent.setup()
    render(
      <MobileNavigation>
        <a href="/docs">Docs</a>
      </MobileNavigation>,
    )
    await user.click(screen.getByRole("button", { name: "Open menu" }))
    expect(screen.getByRole("dialog", { name: "Menu" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument()
  })
})
