import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileText,
  CalendarClock,
  Search,
  Sparkles,
  ShieldAlert,
  Menu,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email", icon: Mail },
  { to: "/notes", label: "Meeting Notes", icon: FileText },
  { to: "/planner", label: "Task Planner", icon: CalendarClock },
  { to: "/research", label: "Research", icon: Search },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-md lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-[var(--shadow-soft)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold tracking-tight">AI Assistant</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={[
            "fixed inset-y-0 left-0 z-50 w-72 shrink-0 border-r border-border/60 bg-card/95 backdrop-blur-md transition-transform duration-300 lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-full flex-col p-5">
            <Link to="/" className="mb-8 flex items-center gap-3" onClick={() => setOpen(false)}>
              <div
                className="grid h-11 w-11 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold tracking-tight">AI Productivity</div>
                <div className="text-xs text-muted-foreground">Workspace</div>
              </div>
            </Link>

            <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </div>
            <nav className="flex flex-col gap-1">
              {nav.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={[
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                      active
                        ? "text-white shadow-[var(--shadow-soft)]"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    ].join(" ")}
                    style={active ? { background: "var(--gradient-primary)" } : undefined}
                  >
                    <item.icon className="h-4.5 w-4.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto">
              <div
                className="relative overflow-hidden rounded-2xl p-4 text-white shadow-[var(--shadow-soft)]"
                style={{ background: "var(--gradient-primary)" }}
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-90">
                  <ShieldAlert className="h-3.5 w-3.5" /> Responsible AI
                </div>
                <p className="text-xs leading-relaxed opacity-95">
                  Always verify AI-generated content. Avoid entering confidential information.
                </p>
              </div>
              <p className="mt-4 px-2 text-[11px] text-muted-foreground">
                Created by <span className="font-semibold text-foreground">Sinovuyo Joji</span>
                <br />
                Powered by OpenAI
              </p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
