# ADR-001 Package boundaries

- **Status:** accepted
- **Context:** The spec suggested optional motion/hooks/icons packages.
- **Problem:** Extra packages increase versioning and import complexity before any consumer exists.
- **Options:** (1) tokens + ui + motion packages (2) tokens + ui with a `/motion` export (3) single mega package
- **Selected:** tokens + ui, motion as an export path
- **Rationale:** Isolates `framer-motion` for tree-shaking without a third versioned package
- **Trade-offs:** Consumers must import from two entry points
- **Consequences:** Revisit if motion grows into charts
- **Validation:** Bundle of `index.js` must not list `framer-motion`
