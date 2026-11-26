---
"@pritish.budhiraja/ui": patch
---

CommandPalette opens when only `onOpenChange` is passed. It used `onOpenChange` as the setter whenever it was given, so without `open` the palette never opened; it now uses `useControlledState` and calls `onOpenChange` on every change.
