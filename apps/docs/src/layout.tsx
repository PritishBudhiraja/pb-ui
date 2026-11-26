import { CommandPalette, cn, HatchDivider, ThemeToggle, Toaster } from "@pritish.budhiraja/ui"
import { Menu, X } from "lucide-react"
import { type Ref, Suspense, useEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { type NavGroup, sidebarFor, TABS } from "./nav"
import { searchItems } from "./search"
import { useDocsTheme } from "./theme"

const GITHUB = "https://github.com/PritishBudhiraja/pb-ui"

export function DocsLayout() {
  const { mode, setMode, preset, setPreset } = useDocsTheme()
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
    <div className="site-frame site-frame--wide h-svh overflow-hidden">
      <div className="site-frame-column mx-auto flex h-svh max-w-[1120px] flex-col overflow-hidden border-x border-dashed border-border">
        <header className="relative z-40 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-dashed border-border bg-background px-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-border font-mono text-[11px] font-semibold">
                PB
              </span>
              <span className="font-serif text-[17px] italic leading-none tracking-tight">
                Hatch
              </span>
            </Link>
            <nav
              className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Primary"
            >
              {TABS.map((tab) => (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  end={"end" in tab ? tab.end : false}
                  className={({ isActive }) =>
                    cn(
                      "shrink-0 rounded-md px-2.5 py-1 text-sm text-muted-foreground hover:text-foreground",
                      isActive && "bg-muted font-medium text-foreground",
                    )
                  }
                >
                  {tab.label}
                </NavLink>
              ))}
            </nav>
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
            <select
              aria-label="Color theme"
              className="h-8 max-w-[7.25rem] rounded-md border border-dashed border-border bg-background px-2 font-sans text-xs text-foreground"
              value={preset}
              onChange={(event) =>
                setPreset(event.target.value === "epoch" ? "epoch" : "portfolio")
              }
            >
              <option value="portfolio">Portfolio</option>
              <option value="epoch">Epoch</option>
            </select>
            <CommandPalette
              items={searchItems()}
              onSelect={(item) => {
                if (item.href) navigate(item.href)
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

        <div className="relative z-0 flex min-h-0 flex-1 overflow-hidden">
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
                "docs-nav z-30 flex min-h-0 w-[15.5rem] shrink-0 flex-col border-r border-dashed border-border bg-background",
                open
                  ? "absolute inset-y-0 left-0 shadow-xl lg:static lg:shadow-none"
                  : "hidden lg:flex",
              )}
            >
              <DocsNav groups={sidebar} ref={navRef} onNavigate={() => setOpen(false)} />
            </aside>
          ) : null}
          <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
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
      </div>
    </div>
  )
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
  return (
    <nav
      ref={ref}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 lg:px-4 [overflow-clip-margin:0px]"
      aria-label="Documentation"
    >
      {groups.map((group) => (
        <div key={group.title} className="pb-3">
          <p className="px-1 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {group.title}
          </p>
          <ul className="border-l border-dashed border-border">
            {group.items.map((item) => {
              const hash = item.to.includes("#")
              const className = ({ isActive }: { isActive: boolean }) =>
                cn(
                  "-ml-px block border-l border-transparent py-1 pl-3 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
                  isActive && "border-foreground font-medium text-foreground",
                )
              return (
                <li key={item.to}>
                  {hash ? (
                    <a
                      href={item.to}
                      onClick={onNavigate}
                      className={className({ isActive: false })}
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
    </nav>
  )
}
