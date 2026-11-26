# ADR-005 Expansion dependencies

- **Status:** accepted
- **Context:** The Epoch-prep list needs markdown, an editor, sortable lists, split panes, charts, and virtualization.
- **Selected:**
  - **dnd-kit** — SortableList. Keyboard reorder is required in Hatch, not pointer-only.
  - **TipTap + StarterKit** — RichTextEditor. No journal schema in Hatch.
  - **react-markdown** — MarkdownRenderer. Default markdown-to-React is the sanitizer; do not add `rehype-raw`.
  - **react-resizable-panels** — SplitWorkspace.
  - **Recharts** — optional `@pritish.budhiraja/ui/charts` entry so core `index.js` does not import it.
  - **@tanstack/react-virtual** — VirtualList.
- **Rejected for this pass:** FullCalendar (custom week grid first), React DayPicker, react-dropzone (native FileDropzone).
- **Consequences:** Each package is a runtime dependency of `@pritish.budhiraja/ui` except Recharts, which is required only when importing `/charts`. Document in DEPENDENCY_AUDIT. Core bundle tests must still exclude `framer-motion` and must not pull Recharts into `index.js`.
