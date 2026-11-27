# ADR-002 Toast primitive

- **Status:** accepted
- **Context:** Spec asked to evaluate Sonner vs existing Radix toast
- **Selected:** Keep Radix toast; fix remove delay (4s) and limit (3); actually dequeue on timeout
- **Rationale:** Matches the portfolio API; no new dependency
- **Trade-offs:** Less fashionable than Sonner; store is module-global
- **Validation:** reducer tests + docs site preview
