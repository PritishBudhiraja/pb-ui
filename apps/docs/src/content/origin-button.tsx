import { OriginButton } from "@pritish.budhiraja/ui/motion"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "origin-button",
  name: "OriginButton",
  when: "Primary call to action that should carry the signature ripple.",
  sibling: "Button for quiet actions; LinkButton for text-style links.",
  title: "OriginButton",
  kicker: "Signature",
  why: "This is the Hatch CTA. The ripple starts at the pointer so the action feels physical, not a generic fill.",
  whenNot:
    "Do not sprinkle OriginButton on every toolbar control. Quiet Button/IconButton belong there. Always import from the motion entry.",
  related: [
    { slug: "button", name: "Button" },
    { slug: "scroll-progress", name: "ScrollProgress" },
  ],
  description:
    "Cursor-origin ripple CTA. Import from @pritish.budhiraja/ui/motion. Filled and outline share one implementation.",
  preview: (
    <Preview
      code={`import { OriginButton } from "@pritish.budhiraja/ui/motion"

<OriginButton>Primary</OriginButton>
<OriginButton variant="outline">Secondary</OriginButton>`}
    >
      <OriginButton>Primary action</OriginButton>
      <OriginButton variant="outline">Secondary</OriginButton>
    </Preview>
  ),
  code: "",
  a11y: "Focus-visible ring. Keyboard focus also expands the ripple from the center. Reduced motion skips the overlay.",
  props: [
    {
      name: "variant",
      type: "filled | outline",
      defaultValue: "filled",
      description: "Fill vs invert-on-hover",
    },
    { name: "href", type: "string", description: "Renders an anchor when set" },
  ],
}
