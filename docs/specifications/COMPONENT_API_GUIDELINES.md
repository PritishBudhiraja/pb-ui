# Component API guidelines

- Prefer native HTML attributes. Extend them instead of inventing parallel props.
- Variants via CVA: `variant`, `size`.
- `asChild` only where Radix Slot is honest (Button, overlay triggers).
- Controlled/uncontrolled: CommandPalette supports `open` / `onOpenChange`.
- No Next.js types in public APIs.
- Motion-only components live in `@pritishbudhiraja/ui/motion`.
- Accessibility: visible focus rings, labels on icon-only controls, reduced-motion paths where animation is essential to the component.
