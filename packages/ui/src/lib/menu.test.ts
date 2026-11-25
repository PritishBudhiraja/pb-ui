import { describe, expect, it } from "vitest"
import { menuContentClass, menuItemClass, menuLabelClass, menuSeparatorClass } from "./menu"

describe("menu classes", () => {
  it("exports popover menu tokens", () => {
    expect(menuContentClass).toContain("bg-popover")
    expect(menuItemClass).toContain("focus:bg-accent")
    expect(menuLabelClass).toContain("text-muted-foreground")
    expect(menuSeparatorClass).toContain("bg-border")
  })
})
