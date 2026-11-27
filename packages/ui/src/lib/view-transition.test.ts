import { afterEach, describe, expect, it, vi } from "vitest"
import { revealFromOrigin } from "./view-transition"

let queued: (() => void) | undefined

function mockTransition(options: { runUpdate: boolean; ready: Promise<void> }) {
  const finished = options.ready.then(() => undefined)
  finished.catch(() => {})
  Object.defineProperty(document, "startViewTransition", {
    configurable: true,
    writable: true,
    value: (callback: () => void) => {
      if (options.runUpdate) callback()
      else queued = callback
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
  queued = undefined
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

  it("does not repeat the update when a queued callback runs after the fallback", async () => {
    mockTransition({ runUpdate: false, ready: skipped() })
    const update = vi.fn()
    await revealFromOrigin(document.body, update)
    queued?.()
    expect(update).toHaveBeenCalledTimes(1)
  })

  it("runs a view transition without a name", async () => {
    const update = vi.fn()
    const origin = document.createElement("button")
    document.body.append(origin)
    document.documentElement.animate = vi.fn() as typeof document.documentElement.animate
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      writable: true,
      value: (next: () => void) => {
        next()
        return {
          ready: Promise.resolve(),
          finished: Promise.resolve(),
          skipped: false,
          types: new Set<string>(),
          skipTransition() {},
          updateCallbackDone: Promise.resolve(),
        }
      },
    })
    await revealFromOrigin(origin, update)
    expect(update).toHaveBeenCalled()
    origin.remove()
  })
})
