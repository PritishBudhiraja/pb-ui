import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { CopyButton } from "./copy-button"

describe("CopyButton", () => {
  it("copies the value", async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    })
    render(<CopyButton value="pnpm add @pritishbudhiraja/ui" label="install" />)
    await user.click(screen.getByRole("button", { name: "Copy install" }))
    expect(writeText).toHaveBeenCalledWith("pnpm add @pritishbudhiraja/ui")
  })

  it("toasts when copy fails", async () => {
    const user = userEvent.setup()
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    })
    render(<CopyButton value="x" label="fail" />)
    await user.click(screen.getByRole("button", { name: "Copy fail" }))
  })
})
