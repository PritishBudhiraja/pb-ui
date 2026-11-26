# ADR-004 One visual identity

- **Status:** accepted
- **Context:** Epoch needed more primitives. A second palette and Instrument Serif as an “Epoch theme” was proposed, then rejected.
- **Problem:** Per-app token forks and a second `data-theme` split the system and force restyles.
- **Options:** (1) Hatch + Epoch theme files (2) Hatch tokens with documented product overrides (3) one Hatch identity; products use variants
- **Selected:** (3)
- **Rationale:** Portfolio, docs, and Epoch should look like one system. Color and type changes happen in Hatch and roll to every consumer.
- **Typography:** Interface sans stays host-mapped (`--pb-font-sans`). Editorial serif is **Instrument Serif Regular and Italic**. `--pb-font-serif` falls back to `--font-source-serif` so existing hosts keep working until they load Instrument Serif. Hatch does not bundle font files.
- **Trade-offs:** Epoch cannot ship a private accent without changing Hatch for everyone. That is intended.
- **Consequences:** Do not add `epoch.css`. Do not document per-app palette overrides. Token changes need impact checks on docs and the portfolio.
- **Validation:** `data-theme="portfolio"` plus `.dark` remains the only theme contract in tokens and docs.
