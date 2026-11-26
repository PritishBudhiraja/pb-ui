---
"@pritish.budhiraja/ui": patch
---

The toast `reducer` is now pure. Scheduling the removal timer moved out of the `DISMISS_TOAST` case into the dismiss functions (`toast().dismiss` and `useToast().dismiss`), so calling `reducer` directly no longer starts timers. Dismiss behaviour is unchanged.
