import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { MilestoneStepper, WorkflowStepper } from "./stepper"

describe("Stepper", () => {
  it("marks the current step on the list item and names every status", async () => {
    render(
      <>
        <MilestoneStepper
          current={1}
          steps={[
            { id: "m1", label: "Draft" },
            { id: "m2", label: "Review" },
            { id: "m3", label: "Ship" },
            { id: "m4", label: "Audit", status: "error" },
          ]}
        />
        <WorkflowStepper current={0} steps={[{ id: "w1", label: "Plan" }]} />
      </>,
    )
    const milestones = screen.getAllByRole("listitem").slice(0, 4)
    expect(milestones[1]).toHaveAttribute("aria-current", "step")
    expect(milestones[0]).not.toHaveAttribute("aria-current")
    expect(milestones.map((item) => item.textContent)).toEqual([
      "1CompletedDraft",
      "2Current stepReview",
      "3Not startedShip",
      "4ErrorAudit",
    ])
    const workflow = screen.getByRole("list", { name: "Workflow" })
    expect(workflow.querySelector("[aria-current]")?.tagName).toBe("LI")
    await expectNoAxeViolations()
  })
})
