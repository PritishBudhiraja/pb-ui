import { act, renderHook } from "@testing-library/react"
import { useRef } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { useClickOutside } from "./use-click-outside"
import { useClipboard } from "./use-clipboard"
import { useDebounce } from "./use-debounce"
import { useKeyboardShortcut } from "./use-keyboard-shortcut"
import { useMediaQuery } from "./use-media-query"
import { useReducedMotion } from "./use-reduced-motion"

describe("useDebounce", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("updates after the delay", () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
      initialProps: { value: "a" },
    })
    rerender({ value: "b" })
    expect(result.current).toBe("a")
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe("b")
  })
})

describe("useKeyboardShortcut", () => {
  it("does nothing when disabled", () => {
    const handler = vi.fn()
    renderHook(() => useKeyboardShortcut({ key: "k", meta: true }, handler, false))
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
    })
    expect(handler).not.toHaveBeenCalled()
  })

  it("fires on the matching chord", () => {
    const handler = vi.fn()
    renderHook(() => useKeyboardShortcut({ key: "k", meta: true }, handler))
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
    })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it("ignores a partial chord", () => {
    const handler = vi.fn()
    renderHook(() => useKeyboardShortcut({ key: "k", meta: true }, handler))
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, shiftKey: true }))
    })
    expect(handler).not.toHaveBeenCalled()
  })

  it("matches ctrl and shift chords", () => {
    const handler = vi.fn()
    renderHook(() => useKeyboardShortcut({ key: "s", ctrl: true, shift: true }, handler))
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "s", ctrlKey: true, shiftKey: true }))
    })
    expect(handler).toHaveBeenCalledTimes(1)
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "a", ctrlKey: true, shiftKey: true }))
    })
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "s", ctrlKey: true, shiftKey: true, metaKey: true }),
      )
    })
    expect(handler).toHaveBeenCalledTimes(1)
  })
})

describe("useClickOutside", () => {
  it("skips when disabled", () => {
    const handler = vi.fn()
    const node = document.createElement("div")
    document.body.append(node)
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(node)
      useClickOutside(ref, handler, false)
      return ref
    })
    act(() => {
      document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }))
    })
    expect(handler).not.toHaveBeenCalled()
    node.remove()
  })

  it("ignores pointerdown inside the node", () => {
    const handler = vi.fn()
    const node = document.createElement("div")
    document.body.append(node)
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(node)
      useClickOutside(ref, handler)
      return ref
    })
    act(() => {
      node.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }))
    })
    expect(handler).not.toHaveBeenCalled()
    node.remove()
  })

  it("calls the handler for pointerdown outside the node", () => {
    const handler = vi.fn()
    const node = document.createElement("div")
    document.body.append(node)
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(node)
      useClickOutside(ref, handler)
      return ref
    })
    act(() => {
      document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }))
    })
    expect(handler).toHaveBeenCalledTimes(1)
    unmount()
    node.remove()
  })
})

function mockMatchMedia(matches: boolean) {
  return vi.fn().mockReturnValue({
    matches,
    media: "",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  })
}

describe("useMediaQuery", () => {
  it("reads matchMedia", () => {
    const media = {
      matches: true,
      media: "(min-width: 800px)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }
    window.matchMedia = vi.fn().mockReturnValue(media)
    const { unmount } = renderHook(() => useMediaQuery("(min-width: 800px)"))
    expect(media.addEventListener).toHaveBeenCalled()
    unmount()
    expect(media.removeEventListener).toHaveBeenCalled()
  })
})

describe("useReducedMotion", () => {
  it("reads prefers-reduced-motion", () => {
    window.matchMedia = mockMatchMedia(true)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })
})

describe("useClipboard", () => {
  it("copies text and resets", async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    })
    const { result } = renderHook(() => useClipboard(200))
    await act(async () => {
      await result.current.copy("hello")
    })
    expect(writeText).toHaveBeenCalledWith("hello")
    expect(result.current.copied).toBe(true)
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current.copied).toBe(false)
    await act(async () => {
      await result.current.copy("again")
    })
    const { unmount } = renderHook(() => useClipboard(200))
    unmount()
    vi.useRealTimers()
  })
})
