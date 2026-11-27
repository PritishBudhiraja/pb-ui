declare module "virtual:component-meta" {
  const meta: Array<{
    slug: string
    name: string
    when: string
    sibling?: string
    keywords?: string
  }>
  export default meta
}
