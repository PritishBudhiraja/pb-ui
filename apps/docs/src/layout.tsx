import { CommandPalette, cn, HatchDivider, ThemeToggle, Toaster } from "@pritishbudhiraja/ui"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { flattenNav, NAV } from "./nav"
import { useDocsTheme } from "./theme"

export function DocsLayout() {
  const { mode, setMode, preset, setPreset } = useDocsTheme()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-dashed border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border lg:hidden"
              aria-label="Open navigation"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-[11px] font-semibold">
                PB
              </span>
              <span className="text-sm font-medium tracking-tight">PB UI</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <label className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
              Theme
              <select
                className="h-8 rounded-md border border-border bg-background px-2 text-foreground"
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
              items={flattenNav().map((item) => ({
                id: item.to,
                label: item.label,
                group: "Docs",
                href: item.to,
              }))}
              onSelect={(item) => {
                if (item.href) navigate(item.href)
              }}
              placeholder="Jump to a page…"
              label="Documentation navigation"
            />
            <ThemeToggle
              theme={mode}
              setTheme={(next) => setMode(next === "dark" ? "dark" : "light")}
            />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1120px] lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside
          className={cn(
            "border-b border-dashed border-border px-4 py-4 lg:border-b-0 lg:border-r lg:px-6 lg:py-8",
            open ? "block" : "hidden lg:block",
          )}
        >
          <nav className="space-y-6" aria-label="Documentation">
            {NAV.map((group) => (
              <div key={group.title}>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {group.title}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "block rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                            isActive && "bg-muted text-foreground",
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
        </aside>
        <main className="min-w-0 px-4 py-8 sm:px-8">
          <Outlet />
        </main>
      </div>
      <HatchDivider />
      <footer className="mx-auto max-w-[1120px] px-4 py-6 text-xs text-muted-foreground sm:px-8">
        PB UI — personal design system.
      </footer>
      <Toaster />
    </div>
  )
}
