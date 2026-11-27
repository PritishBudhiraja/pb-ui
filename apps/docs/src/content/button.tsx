import { Button } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

function ButtonDoc() {
  return (
    <Preview
      code={`<Button>Save</Button>
<Button variant="outline">Outline</Button>
<Button size="sm" disabled>Disabled</Button>`}
    >
      <Button>Save</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm" disabled>
        Disabled
      </Button>
    </Preview>
  )
}

export const doc: ComponentDoc = {
  slug: "button",
  name: "Button",
  when: "Default, outline, ghost, and sizes.",
  keywords: "button variant size ghost outline disabled asChild",
  sibling: "OriginButton for signature CTAs.",
  title: "Button",
  kicker: "Primitive",
  why: "The quiet action control. Variants and sizes cover most product UI without inventing another button.",
  whenNot:
    "Use OriginButton for the one CTA that should feel authored. Use LinkButton for text-style links. Use IconButton when there is no visible label besides the icon.",
  related: [
    { slug: "origin-button", name: "OriginButton" },
    { slug: "icon-button", name: "IconButton" },
    { slug: "link-button", name: "LinkButton" },
  ],
  description:
    "Standard button with variants and sizes. Use OriginButton when the action should carry the signature ripple.",
  preview: <ButtonDoc />,
  code: "",
  a11y: "Native button. Focus-visible ring. Disabled is not focusable via pointer. asChild uses Radix Slot.",
  props: [
    {
      name: "variant",
      type: "default | destructive | outline | secondary | ghost | link",
      defaultValue: "default",
      description: "Visual style",
    },
    {
      name: "size",
      type: "default | sm | lg | icon",
      defaultValue: "default",
      description: "Height and padding",
    },
    {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Merge props onto the child",
    },
  ],
}
