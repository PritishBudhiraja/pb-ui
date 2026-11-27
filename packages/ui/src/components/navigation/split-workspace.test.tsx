import { render, screen } from "@testing-library/react"
import type { ReactNode } from "react"
import { describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { SplitWorkspace } from "./split-workspace"

vi.mock("react-resizable-panels", () => ({
  Group: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  Panel: ({ children, defaultSize }: { children?: ReactNode; defaultSize?: number | string }) => (
    <div data-testid="panel" data-size={defaultSize === undefined ? "auto" : String(defaultSize)}>
      {children}
    </div>
  ),
  Separator: () => <hr />,
}))

function sizes() {
  return screen.getAllByTestId("panel").map((panel) => panel.dataset.size)
}

describe("SplitWorkspace", () => {
  it("sizes the main panel so the defaults add up to 100", async () => {
    const { rerender } = render(<SplitWorkspace nav="Nav" main="Main" inspector="Side" />)
    expect(sizes()).toEqual(["20", "56", "24"])
    await expectNoAxeViolations()
    rerender(<SplitWorkspace nav="Nav" main="Main" inspector="Side" defaultNavSize="30" />)
    expect(sizes()).toEqual(["30", "46", "24"])
    rerender(<SplitWorkspace main="Main" inspector="Side" defaultInspectorSize="35%" />)
    expect(sizes()).toEqual(["65", "35%"])
    rerender(<SplitWorkspace nav="Nav" main="Main" defaultNavSize="22.5" />)
    expect(sizes()).toEqual(["22.5", "77.5"])
    rerender(<SplitWorkspace main="Main" />)
    expect(sizes()).toEqual(["100"])
  })

  it("lets main fill the rest when a side is not a percentage", () => {
    const { rerender } = render(<SplitWorkspace nav="Nav" main="Main" defaultNavSize={240} />)
    expect(sizes()).toEqual(["240", "auto"])
    rerender(<SplitWorkspace main="Main" inspector="Side" defaultInspectorSize="20rem" />)
    expect(sizes()).toEqual(["auto", "20rem"])
  })
})
