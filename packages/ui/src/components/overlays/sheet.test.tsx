import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./sheet"

describe("Sheet", () => {
  it("opens remaining sheet sides", async () => {
    const user = userEvent.setup()
    render(
      <>
        <Sheet>
          <SheetTrigger>Top</SheetTrigger>
          <SheetContent side="top">
            <SheetTitle>Top sheet</SheetTitle>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>Bottom</SheetTrigger>
          <SheetContent side="bottom">
            <SheetTitle>Bottom sheet</SheetTitle>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>Right</SheetTrigger>
          <SheetContent>
            <SheetTitle>Right sheet</SheetTitle>
          </SheetContent>
        </Sheet>
      </>,
    )
    await user.click(screen.getByRole("button", { name: "Top" }))
    expect(screen.getByText("Top sheet")).toBeInTheDocument()
  })
})
