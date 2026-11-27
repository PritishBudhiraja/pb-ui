import { FileDropzone } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "file-dropzone",
  name: "FileDropzone",
  when: "Drop or browse files.",
  title: "FileDropzone",
  kicker: "Utility",
  description: "Native drop + file input.",
  preview: (
    <Preview code={`<FileDropzone onFiles={console.log} />`}>
      <FileDropzone onFiles={() => {}} className="w-full" />
    </Preview>
  ),
  a11y: "Hidden file input inside a label.",
  props: [{ name: "onFiles", type: "(files: File[]) => void", description: "Chosen files" }],
}
