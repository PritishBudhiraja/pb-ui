import { describe, expect, it } from "vitest"
import * as ui from "./index"
import * as motion from "./motion"

describe("package exports", () => {
  it("exposes the public UI surface", () => {
    expect(ui.Button).toBeTruthy()
    expect(ui.toast).toBeTypeOf("function")
    expect(ui.cn("a", "b")).toContain("a")
    expect(motion.OriginButton).toBeTruthy()
    expect(motion.ScrollProgress).toBeTruthy()
  })
})
