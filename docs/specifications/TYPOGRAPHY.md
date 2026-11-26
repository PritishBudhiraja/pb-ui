# Typography

- Functional UI: `font-sans`, tracking-tight headings
- Editorial display: `EditorialHeading` uses `font-serif` italic
- Annotations: `font-hand` (Caveat), 15px, rotated
- Mono: reserved for code and kbd

The host maps sans/display (Geist or Inter) and editorial serif (**Instrument Serif** Regular and Italic, with `--font-source-serif` as a fallback). Load those files in the host app; the library does not bundle font files.
