import { afterEach, describe, expect, it, vi } from "vitest"
import { revealFromOrigin } from "./view-transition"

function mockTransition(options: { runUpdate: boolean; ready: Promise<void> }) {
  const finished = options.ready.then(() => undefined)
  finished.catch(() => {})
  Object.defineProperty(document, "startViewTransition", {
    configurable: true,
    writable: true,
    value: (callback: () => void) => {
      if (options.runUpdate) callback()
      return {
        ready: options.ready,
        finished,
        updateCallbackDone: Promise.resolve(),
        skipped: false,
        types: new Set<string>(),
        skipTransition() {},
      }
    },
  })
}

function skipped() {
  const ready = Promise.reject(new DOMException("Skipped", "AbortError"))
  ready.catch(() => {})
  return ready
}

afterEach(() => {
  Reflect.deleteProperty(document, "startViewTransition")
})

describe("revealFromOrigin", () => {
  it("runs the update once when a transition is skipped after it ran", async () => {
    mockTransition({ runUpdate: true, ready: skipped() })
    const update = vi.fn()
    await revealFromOrigin(document.body, update, "theme")
    expect(update).toHaveBeenCalledTimes(1)
    expect(document.documentElement).not.toHaveAttribute("data-theme-transition")
  })

  it("still runs the update when the transition fails before calling it", async () => {
    mockTransition({ runUpdate: false, ready: skipped() })
    const update = vi.fn()
    await revealFromOrigin(document.body, update)
    expect(update).toHaveBeenCalledTimes(1)
  })
})
