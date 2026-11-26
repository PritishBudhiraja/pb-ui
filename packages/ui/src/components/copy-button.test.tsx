import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { useToast } from "../hooks/use-toast"
import { expectNoAxeViolations } from "../test/axe"
import { CopyButton } from "./copy-button"

function mockClipboard(writeText: ReturnType<typeof vi.fn>) {
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } })
}

function ToastCount() {
  return <span data-testid="toasts">{useToast().toasts.length}</span>
}

describe("CopyButton", () => {
  it("copies, announces and reports success without a toast", async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    mockClipboard(writeText)
    const onCopied = vi.fn()
    render(
      <>
        <CopyButton value="pnpm add @pritish.budhiraja/ui" label="install" onCopied={onCopied} />
        <ToastCount />
      </>,
    )
    await expectNoAxeViolations()
    await user.click(screen.getByRole("button", { name: "Copy install" }))
    expect(writeText).toHaveBeenCalledWith("pnpm add @pritish.budhiraja/ui")
    expect(onCopied).toHaveBeenCalledWith("pnpm add @pritish.budhiraja/ui")
    expect(screen.getByRole("status")).toHaveTextContent("Copied")
    expect(screen.getByTestId("toasts")).toHaveTextContent("0")
  })

  it("announces and reports a failed copy", async () => {
    const user = userEvent.setup()
    const error = new Error("denied")
    mockClipboard(vi.fn().mockRejectedValue(error))
    const onCopyError = vi.fn()
    render(<CopyButton value="x" label="fail" onCopyError={onCopyError} />)
    await user.click(screen.getByRole("button", { name: "Copy fail" }))
    expect(onCopyError).toHaveBeenCalledWith(error)
    expect(screen.getByRole("status")).toHaveTextContent("Could not copy")
  })

  it("uses custom text without callbacks", async () => {
    const user = userEvent.setup()
    mockClipboard(vi.fn().mockResolvedValue(undefined))
    const { unmount } = render(
      <CopyButton value="x" label="id" aria-label="Kopieren" copiedText="Kopiert" />,
    )
    expect(screen.getByRole("status")).toHaveTextContent("")
    await user.click(screen.getByRole("button", { name: "Kopieren" }))
    expect(screen.getByRole("status")).toHaveTextContent("Kopiert")
    unmount()
    mockClipboard(vi.fn().mockRejectedValue(new Error("denied")))
    render(<CopyButton value="x" label="id" errorText="Fehler" />)
    await user.click(screen.getByRole("button", { name: "Copy id" }))
    expect(screen.getByRole("status")).toHaveTextContent("Fehler")
  })

  it("shows the failure when a copy fails right after a success", async () => {
    const user = userEvent.setup()
    mockClipboard(
      vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("denied")),
    )
    render(<CopyButton value="x" label="twice" />)
    const button = screen.getByRole("button", { name: "Copy twice" })
    await user.click(button)
    expect(screen.getByRole("status")).toHaveTextContent("Copied")
    await user.click(button)
    expect(screen.getByRole("status")).toHaveTextContent("Could not copy")
  })
})
