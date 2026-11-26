import axe from "axe-core"

// jsdom has no layout or rendering, so contrast cannot be measured. Components
// are tested outside a page, so the landmark rule does not apply.
const disabled = { "color-contrast": { enabled: false }, region: { enabled: false } }

export async function expectNoAxeViolations(root: Element = document.body) {
  const { violations } = await axe.run(root, { rules: disabled })
  if (violations.length === 0) return
  const report = violations
    .map(
      (violation) =>
        `${violation.id} (${violation.impact}): ${violation.help}\n${violation.nodes
          .map((node) => `  ${node.html.slice(0, 160)}`)
          .join("\n")}`,
    )
    .join("\n\n")
  throw new Error(`axe found ${violations.length} accessibility violation(s):\n\n${report}`)
}
