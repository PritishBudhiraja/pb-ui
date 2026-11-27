import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { MarkdownRenderer, markdownImageHref } from "./markdown-renderer"

describe("MarkdownRenderer", () => {
  it("renders GFM tables and hides unsafe images by default", () => {
    render(
      <MarkdownRenderer
        markdown={"| a | b |\n| - | - |\n| 1 | 2 |\n\n~~gone~~\n\n![x](https://example.com/a.png)"}
      />,
    )
    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.getByText("gone")).toBeInTheDocument()
    expect(screen.queryByRole("img")).toBeNull()
  })

  it("allows https images only when opted in", () => {
    const { rerender } = render(
      <MarkdownRenderer
        allowImages
        markdown={"![ok](https://example.com/a.png)\n\n![bad](http://example.com/a.png)"}
      />,
    )
    expect(screen.getByRole("img", { name: "ok" })).toHaveAttribute(
      "src",
      "https://example.com/a.png",
    )
    expect(screen.queryByRole("img", { name: "bad" })).toBeNull()
    rerender(<MarkdownRenderer allowImages markdown="![](https://example.com/a.png)" />)
    expect(document.querySelector('img[src="https://example.com/a.png"]')).toHaveAttribute(
      "alt",
      "",
    )
    rerender(<MarkdownRenderer allowImages markdown="![none](javascript:alert(1))" />)
    expect(screen.queryByRole("img")).toBeNull()
  })

  it("rejects non-string and disallowed image sources", () => {
    expect(markdownImageHref("https://example.com/a.png", false)).toBeNull()
    expect(markdownImageHref({ src: "https://example.com/a.png" }, true)).toBeNull()
    expect(markdownImageHref("http://example.com/a.png", true)).toBeNull()
    expect(markdownImageHref("https://example.com/a.png", true)).toBe("https://example.com/a.png")
  })
})
