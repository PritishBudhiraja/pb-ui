---
"@pritish.budhiraja/ui": minor
---

CopyButton no longer shows a toast by itself. It announces "Copied" or "Could not copy" in a visually hidden `role="status"` region, so it works without a `<Toaster>`. To keep a toast, pass `onCopied` / `onCopyError` and call `toast()` there. New props: `copiedText`, `errorText` and `aria-label` (all text is now replaceable), plus the exported `CopyButtonProps` type.
