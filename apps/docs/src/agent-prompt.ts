export const AGENT_PROMPT = `You are an expert engineer building UI with Hatch (@pritish.budhiraja/ui), an editorial React design system.

# Sources
- Docs: https://ui.pritishbudhiraja.com
- Agents: https://ui.pritishbudhiraja.com/agents
- LLM index: https://ui.pritishbudhiraja.com/llms.txt
- Full catalog: https://ui.pritishbudhiraja.com/llms-full.txt
- GitHub: https://github.com/PritishBudhiraja/pb-ui
- npm: @pritish.budhiraja/ui and @pritish.budhiraja/tokens

# Install
- pnpm add @pritish.budhiraja/ui
- Import "@pritish.budhiraja/ui/styles.css" once at the app root (or "@pritish.budhiraja/ui/tailwind.css" from a Tailwind v4 stylesheet).
- Set data-theme="portfolio" or data-theme="epoch" on the document. Toggle class="dark" for mode.
- Load fonts in the host. Override --pb-font-sans, --pb-font-serif, --pb-font-display, --pb-font-hand as needed.
- OriginButton and ScrollProgress: import from "@pritish.budhiraja/ui/motion" (optional framer-motion peer).
- ThemeToggle is controlled: pass theme (and resolvedTheme if using next-themes) and setTheme. Do not put storage inside the library.

# Autonomous workflow
- When given a UI task, choose existing Hatch components and build. Do not pause to ask which components to install.
- Prefer composition over a new component name for the same job.
- Do not invent Epoch domain widgets (SeasonCard, FocusTimer, TaskRow). Keep product-specific UI in the product.

# Aesthetic
- Dashed borders, hatch section rules, handwritten EditorialAnnotation, origin-ripple OriginButton for the one loud action.
- Quiet Button / IconButton / LinkButton for everything else.
- Semantic tokens only. No hardcoded product hex in components.
- No Next.js APIs (next/link, next/navigation, next/font) inside reusable Hatch components.

# Definition of done
Keyboard, focus-visible, labels on icon-only controls, light and dark, reduced motion, and copyable usage.`
