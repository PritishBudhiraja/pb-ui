import { describe, expect, it } from "vitest"
import { cn } from "./cn"

describe("cn", () => {
  it("merges conflicting tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })

  it("ignores falsy values", () => {
    expect(cn("text-sm", false && "hidden", undefined, "font-medium")).toBe("text-sm font-medium")
  })
})
