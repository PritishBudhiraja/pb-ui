import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import * as ui from "../../index"

describe("ContextMenu sub-menus and radio items", () => {
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
