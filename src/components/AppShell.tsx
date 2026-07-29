import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileText,
  CalendarClock,
  Search,
  ShieldAlert,
  Settings,
  Menu,
  X,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import logoUrl from "@/assets/nexora-logo.png";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/notes", label: "Meeting Summaries", icon: FileText },
  { to: "/planner", label: "Task Planner", icon: CalendarClock },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/responsible-ai", label: "Responsible AI", icon: ShieldAlert },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function NexoraLogo({ size = 36 }: { size?: number }) {
  return (
    <div
      className="relative grid place-items-center rounded-2xl animate-pulse-glow"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(124,58,237,0.35))",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <img
        src={logoUrl}
        alt="Nexora AI logo"
        width={size}
        height={size}
        className="h-[80%] w-[80%] object-contain drop-shadow-[0_0_10px_rgba(124,58,237,0.7)]"
      />
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-background/70 px-4 py-3 backdrop-blur-md lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <NexoraLogo size={34} />
          <span className="font-display text-sm font-bold tracking-widest">NEXORA AI</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={[
            "fixed inset-y-0 left-0 z-50 w-72 shrink-0 border-r border-white/10 bg-[color:var(--background)]/85 backdrop-blur-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-full flex-col p-5">
            <Link to="/" className="mb-8 flex items-center gap-3" onClick={() => setOpen(false)}>
              <NexoraLogo size={44} />
              <div className="min-w-0">
                <div className="font-display truncate text-base font-bold tracking-widest text-gradient">
                  NEXORA AI
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Intelligence. Productivity.
                </div>
              </div>
            </Link>

            <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Workspace
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
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                      active
                        ? "text-white shadow-[var(--shadow-soft)]"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                    ].join(" ")}
                    style={active ? { background: "var(--gradient-primary)" } : undefined}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {active && (
                      <span className="absolute inset-y-1 right-1 w-1 rounded-full bg-white/80" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto">
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 p-4 text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/25 blur-2xl"
                />
                <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-90">
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
        <div className="min-w-0 flex-1">
          {/* Desktop top bar */}
          <header className="sticky top-0 z-30 hidden items-center justify-between border-b border-white/10 bg-background/60 px-6 py-3 backdrop-blur-xl lg:flex">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-bold tracking-[0.25em] text-gradient">
                NEXORA AI
              </span>
              <span className="hidden text-xs text-muted-foreground xl:inline">
                · Intelligence. Productivity. Elevated.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDark((v) => !v)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition hover:text-foreground"
                aria-label="Toggle theme"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition hover:text-foreground"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[color:var(--brand-cyan)] shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
              </button>
              <div
                className="grid h-9 w-9 place-items-center rounded-full text-xs font-semibold text-white shadow-[var(--shadow-soft)]"
                style={{ background: "var(--gradient-primary)" }}
                aria-label="Profile"
              >
                SJ
              </div>
            </div>
          </header>
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
