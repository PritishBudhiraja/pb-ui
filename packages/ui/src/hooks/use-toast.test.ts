import { describe, expect, it } from "vitest"
import { reducer, type ToastState } from "./use-toast"

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
      { toasts: [{ id: "1", open: true }] },
      { type: "DISMISS_TOAST", toastId: "1" },
    )
    expect(state.toasts[0]?.open).toBe(false)
  })
})
