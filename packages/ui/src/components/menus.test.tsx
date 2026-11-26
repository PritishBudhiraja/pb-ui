import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import * as ui from "../index"
import { expectNoAxeViolations } from "../test/axe"

describe("menu sub-menus and radio items", () => {
  it("exports and renders them for the dropdown menu", async () => {
    render(
      <ui.DropdownMenu open>
        <ui.DropdownMenuTrigger>Sort</ui.DropdownMenuTrigger>
        <ui.DropdownMenuContent>
          <ui.DropdownMenuRadioGroup value="name">
            <ui.DropdownMenuRadioItem value="name">Name</ui.DropdownMenuRadioItem>
            <ui.DropdownMenuRadioItem value="date">Date</ui.DropdownMenuRadioItem>
          </ui.DropdownMenuRadioGroup>
          <ui.DropdownMenuSub open>
            <ui.DropdownMenuSubTrigger>More</ui.DropdownMenuSubTrigger>
            <ui.DropdownMenuSubContent>
              <ui.DropdownMenuItem>Archive</ui.DropdownMenuItem>
            </ui.DropdownMenuSubContent>
          </ui.DropdownMenuSub>
        </ui.DropdownMenuContent>
      </ui.DropdownMenu>,
    )
    expect(screen.getByRole("menuitemradio", { name: "Name" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
    expect(screen.getByRole("menuitem", { name: "More" })).toHaveAttribute("aria-haspopup", "menu")
    expect(screen.getByRole("menuitem", { name: "Archive" })).toBeInTheDocument()
    expect(ui.DropdownMenuPortal).toBeTruthy()
    await expectNoAxeViolations()
  })

  it("exports and renders them for the context menu", async () => {
    const user = userEvent.setup()
    render(
      <ui.ContextMenu>
        <ui.ContextMenuTrigger>Canvas</ui.ContextMenuTrigger>
        <ui.ContextMenuContent>
          <ui.ContextMenuRadioGroup value="fit">
            <ui.ContextMenuRadioItem value="fit">Fit</ui.ContextMenuRadioItem>
          </ui.ContextMenuRadioGroup>
          <ui.ContextMenuSub open>
            <ui.ContextMenuSubTrigger>Arrange</ui.ContextMenuSubTrigger>
            <ui.ContextMenuSubContent>
              <ui.ContextMenuItem>Bring forward</ui.ContextMenuItem>
            </ui.ContextMenuSubContent>
          </ui.ContextMenuSub>
        </ui.ContextMenuContent>
      </ui.ContextMenu>,
    )
    await user.pointer({ keys: "[MouseRight>]", target: screen.getByText("Canvas") })
    expect(screen.getByRole("menuitemradio", { name: "Fit" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
    expect(screen.getByRole("menuitem", { name: "Bring forward" })).toBeInTheDocument()
    expect(ui.ContextMenuPortal).toBeTruthy()
  })

  it("slots a consumer element with asChild on items that add an indicator", () => {
    render(
      <ui.DropdownMenu open>
        <ui.DropdownMenuTrigger>Sort</ui.DropdownMenuTrigger>
        <ui.DropdownMenuContent>
          <ui.DropdownMenuCheckboxItem asChild checked>
            <a href="#pin">Pin</a>
          </ui.DropdownMenuCheckboxItem>
          <ui.DropdownMenuRadioGroup value="a">
            <ui.DropdownMenuRadioItem asChild value="a">
              <a href="#a">Option A</a>
            </ui.DropdownMenuRadioItem>
          </ui.DropdownMenuRadioGroup>
          <ui.DropdownMenuSub>
            <ui.DropdownMenuSubTrigger asChild>
              <a href="#more">More</a>
            </ui.DropdownMenuSubTrigger>
          </ui.DropdownMenuSub>
        </ui.DropdownMenuContent>
      </ui.DropdownMenu>,
    )
    expect(screen.getByRole("menuitemcheckbox", { name: "Pin" }).tagName).toBe("A")
    expect(screen.getByRole("menuitemradio", { name: "Option A" }).tagName).toBe("A")
    expect(screen.getByRole("menuitem", { name: "More" }).tagName).toBe("A")
  })

  it("slots a consumer element with asChild in the context menu", async () => {
    const user = userEvent.setup()
    render(
      <ui.ContextMenu>
        <ui.ContextMenuTrigger>Board</ui.ContextMenuTrigger>
        <ui.ContextMenuContent>
          <ui.ContextMenuCheckboxItem asChild checked>
            <a href="#grid">Grid</a>
          </ui.ContextMenuCheckboxItem>
          <ui.ContextMenuRadioGroup value="a">
            <ui.ContextMenuRadioItem asChild value="a">
              <a href="#zoom">Zoom</a>
            </ui.ContextMenuRadioItem>
          </ui.ContextMenuRadioGroup>
          <ui.ContextMenuSub>
            <ui.ContextMenuSubTrigger asChild>
              <a href="#layers">Layers</a>
            </ui.ContextMenuSubTrigger>
          </ui.ContextMenuSub>
        </ui.ContextMenuContent>
      </ui.ContextMenu>,
    )
    await user.pointer({ keys: "[MouseRight>]", target: screen.getByText("Board") })
    expect(screen.getByRole("menuitemcheckbox", { name: "Grid" }).tagName).toBe("A")
    expect(screen.getByRole("menuitemradio", { name: "Zoom" }).tagName).toBe("A")
    expect(screen.getByRole("menuitem", { name: "Layers" }).tagName).toBe("A")
  })
})
