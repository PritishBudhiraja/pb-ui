import { Avatar, AvatarFallback } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "avatar",
  name: "Avatar",
  when: "Photo or initials.",
  title: "Avatar",
  kicker: "Data",
  description: "Image with fallback initials.",
  preview: (
    <Preview code={`<Avatar><AvatarFallback>PB</AvatarFallback></Avatar>`}>
      <Avatar>
        <AvatarFallback>PB</AvatarFallback>
      </Avatar>
    </Preview>
  ),
  a11y: "Fallback text should be initials or a name, not decorative.",
  props: [{ name: "src", type: "string", description: "On AvatarImage" }],
}
