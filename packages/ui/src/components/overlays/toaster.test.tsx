import { act, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { toast } from "../../hooks/use-toast"
import { expectNoAxeViolations } from "../../test/axe"
import { Toaster } from "./toaster"

describe("Toaster", () => {
  it("renders an active toast", async () => {
    render(<Toaster />)
    act(() => {
      toast({ title: "Saved", description: "Done", action: <button type="button">Undo</button> })
      toast({})
    })
    expect(screen.getByText("Saved")).toBeInTheDocument()
    expect(screen.getByText("Done")).toBeInTheDocument()
    await expectNoAxeViolations()
  })
})
