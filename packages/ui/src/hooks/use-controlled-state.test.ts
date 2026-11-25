import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { useControlledState } from "./use-controlled-state"

describe("useControlledState", () => {
  it("keeps uncontrolled state until a value is passed", () => {
    const { result } = renderHook(() => useControlledState({ defaultValue: "a" }))
    act(() => result.current[1]("b"))
    expect(result.current[0]).toBe("b")
  })

  it("forwards controlled updates", () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControlledState({ value: "a", defaultValue: "a", onChange }),
    )
    act(() => result.current[1]("b"))
    expect(onChange).toHaveBeenCalledWith("b")
    expect(result.current[0]).toBe("a")
  })
})
