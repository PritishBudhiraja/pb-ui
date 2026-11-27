import { expect, vi } from "vitest"

export function uniqueIds(container: HTMLElement) {
  const ids = [...container.querySelectorAll("[id]")].map((node) => node.id)
  expect(new Set(ids).size).toBe(ids.length)
}

export function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
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
