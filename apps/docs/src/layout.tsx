import { CommandPalette, cn, HatchDivider, ThemeToggle, Toaster } from "@pritish.budhiraja/ui"
import { Menu, X } from "lucide-react"
import { type Ref, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Outlet, ScrollRestoration, useLocation, useNavigate } from "react-router-dom"
import { loadAllDocs } from "./content/docs"
import { type NavGroup, sidebarFor, TABS } from "./nav"
import { searchItems } from "./search"
import { useDocsTheme } from "./theme"
import { Link, NavLink } from "./ui/link"

const GITHUB = "https://github.com/PritishBudhiraja/pb-ui"

export function DocsLayout() {
  const { mode, setMode } = useDocsTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const sidebar = sidebarFor(location.pathname)

  useEffect(() => {
    setOpen(false)
    if (!location.pathname) return
    const id = window.requestAnimationFrame(() => {
      const nav = navRef.current
      const active = nav?.querySelector<HTMLElement>("[aria-current=page]")
      if (!nav || !active) return
      const navBox = nav.getBoundingClientRect()
      const itemBox = active.getBoundingClientRect()
      if (itemBox.top < navBox.top + 12 || itemBox.bottom > navBox.bottom) {
        nav.scrollTop += itemBox.top - navBox.top - 12
      }
    })
    return () => window.cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <div className="site-frame site-frame--wide min-h-svh overflow-x-clip">
      <div className="site-frame-column mx-auto flex min-h-svh max-w-[1120px] flex-col border-x border-dashed border-border">
        <header className="docs-header sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-dashed border-border bg-background px-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-border font-mono text-[11px] font-semibold">
                PB
              </span>
              <span className="font-serif text-[17px] italic leading-none tracking-tight">
                Hatch
              </span>
            </Link>
            <PrimaryTabs />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {sidebar ? (
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-border lg:hidden"
                aria-label={open ? "Close navigation" : "Open navigation"}
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            ) : null}
            <CommandPalette
              items={searchItems()}
              onSelect={(item) => {
                if (item.href) navigate(item.href, { viewTransition: true })
              }}
              placeholder="Search docs…"
              label="Documentation search"
            />
            <a
              href={GITHUB}
              className="inline-flex h-8 items-center rounded-md border border-dashed border-border px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>
            <ThemeToggle
              theme={mode}
              setTheme={(next) => setMode(next === "dark" ? "dark" : "light")}
            />
          </div>
        </header>

        <div className="relative z-0 flex flex-1">
          {open && sidebar ? (
            <button
              type="button"
              className="absolute inset-0 z-20 bg-background/70 lg:hidden"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            />
          ) : null}
          {sidebar ? (
            <aside
              className={cn(
                "docs-nav docs-sidebar z-30 w-[15.5rem] shrink-0 flex-col border-r border-dashed border-border bg-background",
                open
                  ? "absolute inset-y-0 left-0 flex overflow-y-auto shadow-xl lg:static lg:shadow-none"
                  : "hidden lg:flex",
                "lg:sticky lg:top-14 lg:h-[calc(100svh-3.5rem)] lg:overflow-y-auto",
              )}
            >
              <DocsNav groups={sidebar} ref={navRef} onNavigate={() => setOpen(false)} />
            </aside>
          ) : null}
          <div className="min-w-0 flex-1">
            <main className="px-4 py-8 sm:px-8">
              <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
                <Outlet />
              </Suspense>
            </main>
            <HatchDivider />
            <footer className="flex flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:px-8">
              <span>Hatch — a personal design system.</span>
              <a className="hover:text-foreground" href={GITHUB}>
                github.com/PritishBudhiraja/pb-ui
              </a>
            </footer>
          </div>
        </div>
        <Toaster />
        <ScrollRestoration />
      </div>
    </div>
  )
}

function PrimaryTabs() {
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number; animate: boolean } | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: the active tab changes with the route
  useLayoutEffect(() => {
    const measure = () => {
      const active = navRef.current?.querySelector<HTMLElement>("[aria-current=page]")
      setPill((previous) =>
        active
          ? { left: active.offsetLeft, width: active.offsetWidth, animate: previous !== null }
          : null,
      )
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [location.pathname])

  return (
    <nav
      ref={navRef}
      className="relative flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Primary"
    >
      {pill ? (
        <span
          aria-hidden
          className={cn(
            "docs-tab-pill absolute inset-y-0 rounded-md bg-muted",
            pill.animate &&
              "transition-[left,width] duration-200 ease-out motion-reduce:transition-none",
          )}
          style={{ left: pill.left, width: pill.width }}
        />
      ) : null}
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={"end" in tab ? tab.end : false}
          // The overview renders every preview; start loading them before the click lands.
          onPointerEnter={tab.to === "/components" ? () => void loadAllDocs() : undefined}
          onFocus={tab.to === "/components" ? () => void loadAllDocs() : undefined}
          className={({ isActive }) =>
            cn(
              "relative shrink-0 rounded-md px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
              isActive && "font-medium text-foreground",
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

const SPY_OFFSET = 96

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const picked = useRef<string | null>(null)
  const key = ids.join(" ")

  // biome-ignore lint/correctness/useExhaustiveDependencies: key stands in for ids
  useEffect(() => {
    if (ids.length === 0) {
      setActive(null)
      return
    }
    let frame = 0
    const measure = () => {
      frame = 0
      const tops = new Map<string, number>()
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element) tops.set(id, element.getBoundingClientRect().top)
      }
      // Blocks share rows, so take the first block of the lowest row that has reached the header.
      let current: string | null = null
      let currentTop = Number.NEGATIVE_INFINITY
      for (const [id, top] of tops) {
        if (top <= SPY_OFFSET && top > currentTop + 1) {
          current = id
          currentTop = top
        }
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = [...tops.keys()].at(-1) ?? current
      const clicked = picked.current
      const clickedTop = clicked ? tops.get(clicked) : undefined
      if (clicked && clickedTop !== undefined && Math.abs(clickedTop - currentTop) <= 1) {
        current = clicked
      } else {
        picked.current = null
      }
      setActive(current ?? ids[0] ?? null)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [key])

  const select = (id: string | null) => {
    picked.current = id
    setActive(id)
  }

  return [active, select] as const
}

function DocsNav({
  groups,
  ref,
  onNavigate,
}: {
  groups: NavGroup[]
  ref?: Ref<HTMLElement>
  onNavigate: () => void
}) {
  const location = useLocation()
  const listRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<HTMLElement | null>(null)
  const [bar, setBar] = useState<{ top: number; height: number } | null>(null)
  const sectionIds = groups.flatMap((group) =>
    group.items.flatMap((item) => {
      const [path, hash] = item.to.split("#")
      return hash && path === location.pathname ? [hash] : []
    }),
  )
  const [section, setSection] = useScrollSpy(sectionIds)

  // biome-ignore lint/correctness/useExhaustiveDependencies: the active link changes with the route and the scroll
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const target = hovered ?? list.querySelector<HTMLElement>("[aria-current]")
    if (!target) {
      setBar(null)
      return
    }
    const listTop = list.getBoundingClientRect().top
    const box = target.getBoundingClientRect()
    setBar({ top: box.top - listTop, height: box.height })
  }, [hovered, location.pathname, groups, section])

  // biome-ignore lint/correctness/useExhaustiveDependencies: keep the spied link in view as it changes
  useEffect(() => {
    const nav = listRef.current?.parentElement
    const active = listRef.current?.querySelector<HTMLElement>("[aria-current=location]")
    if (!nav || !active) return
    const navBox = nav.getBoundingClientRect()
    const itemBox = active.getBoundingClientRect()
    if (itemBox.top < navBox.top + 12) nav.scrollTop += itemBox.top - navBox.top - 12
    else if (itemBox.bottom > navBox.bottom - 12)
      nav.scrollTop += itemBox.bottom - navBox.bottom + 12
  }, [section])

  return (
    <nav
      ref={ref}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 lg:px-4 [overflow-clip-margin:0px]"
      aria-label="Documentation"
    >
      <div
        ref={listRef}
        className="relative"
        onPointerOver={(event) => {
          const link = (event.target as HTMLElement).closest<HTMLElement>("a")
          if (link && link !== hovered) setHovered(link)
        }}
        onPointerLeave={() => setHovered(null)}
      >
        {groups.map((group) => (
          <div key={group.title} className="pb-3">
            <p className="px-1 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {group.title}
            </p>
            <ul className="border-l border-dashed border-border">
              {group.items.map((item) => {
                const hash = item.to.includes("#")
                const current = hash && section === item.to.split("#")[1]
                const className = ({ isActive }: { isActive: boolean }) =>
                  cn(
                    "block py-1 pl-3 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    isActive && "font-medium text-foreground",
                  )
                return (
                  <li key={item.to}>
                    {hash ? (
                      <a
                        href={item.to}
                        aria-current={current ? "location" : undefined}
                        onClick={() => {
                          setSection(item.to.split("#")[1] ?? null)
                          onNavigate()
                        }}
                        className={className({ isActive: current })}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        onClick={onNavigate}
                        className={className}
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        {bar ? (
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 w-px bg-foreground transition-[top,height] duration-200 ease-out motion-reduce:transition-none"
            style={{ top: bar.top, height: bar.height }}
          />
        ) : null}
      </div>
    </nav>
  )
}
