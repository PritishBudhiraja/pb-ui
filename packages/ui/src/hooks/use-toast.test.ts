import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { reducer, type ToastState, toast, useToast } from "./use-toast"

describe("toast reducer", () => {
  it("limits the number of toasts", () => {
    let state: ToastState = { toasts: [] }
    for (let i = 0; i < 5; i++) {
      state = reducer(state, {
        type: "ADD_TOAST",
        toast: { id: String(i), open: true },
      })
    }
    expect(state.toasts).toHaveLength(3)
    expect(state.toasts[0]?.id).toBe("4")
  })

  it("dismisses a toast", () => {
    const state = reducer(
      { toasts: [{ id: "d1", open: true }] },
      { type: "DISMISS_TOAST", toastId: "d1" },
    )
    expect(state.toasts[0]?.open).toBe(false)
  })

  it("dismisses without scheduling a timer", () => {
    const schedule = vi.spyOn(globalThis, "setTimeout")
    reducer({ toasts: [{ id: "p1", open: true }] }, { type: "DISMISS_TOAST", toastId: "p1" })
    reducer({ toasts: [{ id: "p2", open: true }] }, { type: "DISMISS_TOAST" })
    expect(schedule).not.toHaveBeenCalled()
    schedule.mockRestore()
  })

  it("dismisses every toast", () => {
    const state = reducer(
      {
        toasts: [
          { id: "r1", open: true },
          { id: "r2", open: true },
        ],
      },
      { type: "DISMISS_TOAST" },
    )
    expect(state.toasts.every((item) => item.open === false)).toBe(true)
  })

  it("updates and removes toasts", () => {
    let state: ToastState = {
      toasts: [
        { id: "u1", open: true, title: "A" },
        { id: "keep", open: true, title: "Stay" },
      ],
    }
    state = reducer(state, { type: "UPDATE_TOAST", toast: { id: "u1", title: "B" } })
    expect(state.toasts[0]?.title).toBe("B")
    expect(state.toasts[1]?.title).toBe("Stay")
    state = reducer(state, { type: "DISMISS_TOAST", toastId: "u1" })
    expect(state.toasts[0]?.open).toBe(false)
    expect(state.toasts[1]?.open).toBe(true)
    state = reducer(state, { type: "REMOVE_TOAST", toastId: "u1" })
    expect(state.toasts).toHaveLength(1)
    expect(state.toasts[0]?.id).toBe("keep")
    state = reducer({ toasts: [{ id: "u2", open: true }] }, { type: "REMOVE_TOAST" })
    expect(state.toasts).toHaveLength(0)
  })
})

describe("toast helpers", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("creates, updates, and dismisses through the hook", () => {
    const originalTimeout = globalThis.setTimeout
    const queued: Array<() => void> = []
    vi.stubGlobal("setTimeout", ((fn: TimerHandler, delay?: number) => {
      if (delay === 4000 && typeof fn === "function") {
        queued.push(fn as () => void)
        return 0 as unknown as ReturnType<typeof setTimeout>
      }
      return originalTimeout(fn, delay)
    }) as typeof setTimeout)
    const { result, unmount } = renderHook(() => useToast())
    let id = ""
    act(() => {
      const created = toast({ title: "Hello", description: "World" })
      id = created.id
      created.update({ id, title: "Updated" })
      created.dismiss()
      created.dismiss()
    })
    expect(queued).toHaveLength(1)
    expect(result.current.toasts.some((item) => item.id === id)).toBe(true)
    act(() => {
      queued[0]?.()
      result.current.toasts[0]?.onOpenChange?.(true)
      result.current.dismiss()
      result.current.toasts[0]?.onOpenChange?.(false)
    })
    unmount()
    vi.unstubAllGlobals()
  })

  it("dismisses every toast and removes them after the delay", () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useToast())
    act(() => {
      toast({ title: "One" })
      toast({ title: "Two" })
    })
    act(() => {
      result.current.dismiss()
    })
    expect(result.current.toasts).toHaveLength(2)
    expect(result.current.toasts.every((item) => item.open === false)).toBe(true)
    act(() => {
      vi.advanceTimersByTime(4000)
    })
    expect(result.current.toasts).toHaveLength(0)
  })
})
