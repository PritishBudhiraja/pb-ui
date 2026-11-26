---
"@pritish.budhiraja/ui": patch
---

`useKeyboardShortcut` no longer removes and re-adds its `keydown` listener on every render when the handler is an inline function. It keeps the latest handler in a ref, so the listener only changes when the key combo or `enabled` changes.
