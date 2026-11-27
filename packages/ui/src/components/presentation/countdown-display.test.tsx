import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { CountdownDisplay } from "./countdown-display"

describe("CountdownDisplay", () => {
  it("shows zero for values that are not finite", async () => {
    render(
      <>
        <CountdownDisplay remainingSeconds={Number.NaN} label="Not a number" />
        <CountdownDisplay remainingSeconds={Number.POSITIVE_INFINITY} label="Forever" />
        <CountdownDisplay remainingSeconds={61} label="Soon" />
      </>,
    )
    expect(screen.getByRole("timer", { name: "Not a number 00:00:00" })).toHaveTextContent(
      "00:00:00",
    )
    expect(screen.getByRole("timer", { name: "Forever 00:00:00" })).toHaveTextContent("00:00:00")
    expect(screen.getByRole("timer", { name: "Soon 00:01:01" })).toBeInTheDocument()
    await expectNoAxeViolations()
  })
})
