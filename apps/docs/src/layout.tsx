import { CommandPalette, cn, HatchDivider, ThemeToggle, Toaster } from "@pritishbudhiraja/ui"
import { Menu, X } from "lucide-react"
import { type Ref, Suspense, useEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { NAV } from "./nav"
import { searchItems } from "./search"
import { useDocsTheme } from "./theme"

export function DocsLayout() {
  const { mode, setMode, preset, setPreset } = useDocsTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setOpen(false)
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
  }, [location])

  return (
    <div className="site-frame site-frame--wide h-svh overflow-hidden">
      <div className="site-frame-column mx-auto flex h-svh max-w-[1120px] flex-col overflow-hidden border-x border-dashed border-border">
        <header className="relative z-40 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-dashed border-border bg-background px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-border lg:hidden"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-border font-mono text-[11px] font-semibold">
                PB
              </span>
              <span className="font-serif text-[17px] italic leading-none tracking-tight">
                Hatch
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <label className="hidden items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex">
              Theme
              <select
                className="h-8 rounded-md border border-dashed border-border bg-background px-2 font-sans text-xs normal-case tracking-normal text-foreground"
                value={preset}
                onChange={(event) =>
                  setPreset(event.target.value === "epoch" ? "epoch" : "portfolio")
                }
              >
                <option value="portfolio">Portfolio</option>
                <option value="epoch">Epoch (candidate)</option>
              </select>
            </label>
            <CommandPalette
              items={searchItems()}
              onSelect={(item) => {
                if (item.href) navigate(item.href)
              }}
              placeholder="Search docs…"
              label="Documentation search"
            />
            <ThemeToggle
              theme={mode}
              setTheme={(next) => setMode(next === "dark" ? "dark" : "light")}
            />
          </div>
        </header>

        <div className="relative z-0 flex min-h-0 flex-1 overflow-hidden">
          {open ? (
            <button
              type="button"
              className="absolute inset-0 z-20 bg-background/70 lg:hidden"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            />
          ) : null}
          <aside
            className={cn(
              "docs-nav z-30 flex min-h-0 w-[15.5rem] shrink-0 flex-col border-r border-dashed border-border bg-background",
              open
                ? "absolute inset-y-0 left-0 shadow-xl lg:static lg:shadow-none"
                : "hidden lg:flex",
            )}
          >
            <DocsNav ref={navRef} onNavigate={() => setOpen(false)} />
          </aside>
          <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
            <main className="px-4 py-8 sm:px-8">
              <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
                <Outlet />
              </Suspense>
            </main>
            <HatchDivider />
            <footer className="px-4 py-6 text-xs text-muted-foreground sm:px-8">
              Hatch — a personal design system.
            </footer>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  )
}

function DocsNav({ ref, onNavigate }: { ref?: Ref<HTMLElement>; onNavigate: () => void }) {
  return (
    <nav
      ref={ref}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 lg:px-4 [overflow-clip-margin:0px]"
      aria-label="Documentation"
    >
      {NAV.map((group) => (
        <div key={group.title} className="pb-3">
          <p className="px-1 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {group.title}
          </p>
          <ul className="border-l border-dashed border-border">
            {group.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      "-ml-px block border-l border-transparent py-1 pl-3 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
                      isActive && "border-foreground font-medium text-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
