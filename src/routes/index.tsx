import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  CalendarClock,
  Search,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Zap,
  Clock,
  TrendingUp,
  Lightbulb,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { loadActivity, loadStats, TOOL_META, type ActivityItem, type Stats } from "@/lib/activity";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Nexora AI" },
      {
        name: "description",
        content:
          "Nexora AI dashboard: generate emails, summarize meetings, plan your day, and research topics in a futuristic AI workspace.",
      },
      { property: "og:title", content: "Dashboard · Nexora AI" },
      { property: "og:description", content: "Nexora AI dashboard: generate emails, summarize meetings, plan your day, and research topics in a futuristic AI workspace." },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { href: "/email" as const, icon: Mail, title: "Email Generator", desc: "Craft polished emails in seconds." },
  { href: "/notes" as const, icon: FileText, title: "Meeting Summaries", desc: "Extract actions from raw notes." },
  { href: "/planner" as const, icon: CalendarClock, title: "Task Planner", desc: "Get a prioritized daily plan." },
  { href: "/research" as const, icon: Search, title: "Research Assistant", desc: "Summaries and key insights." },
];

const tips = [
  "Batch similar tasks together to reduce context-switching costs.",
  "Draft with AI, then refine with your own voice — you stay the author.",
  "Set 3 daily 'must-wins' before checking email or notifications.",
  "Use the Planner every morning for a 5-minute intention-setting ritual.",
];

const upcoming = [
  { label: "Review quarterly OKRs", when: "Today · 2:00 PM" },
  { label: "Design sync with product", when: "Tomorrow · 10:30 AM" },
  { label: "Draft investor update", when: "Fri · 4:00 PM" },
];

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    byTool: { email: 0, notes: 0, planner: 0, research: 0 },
    streakDays: 0,
    lastDay: null,
  });
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [tip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

  useEffect(() => {
    const refresh = () => {
      setStats(loadStats());
      setActivity(loadActivity());
    };
    refresh();
    window.addEventListener("activity:updated", refresh);
    return () => window.removeEventListener("activity:updated", refresh);
  }, []);

  const statCards = [
    { label: "Emails Generated", value: stats.byTool.email, icon: Mail },
    { label: "Meetings Summarized", value: stats.byTool.notes, icon: FileText },
    { label: "Tasks Planned", value: stats.byTool.planner, icon: CalendarClock },
    { label: "Research Queries", value: stats.byTool.research, icon: Search },
  ];

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-gradient"
          style={{ background: "var(--gradient-mesh)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-[color:var(--brand-purple)]/30 blur-3xl animate-float"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-10 h-64 w-64 rounded-full bg-[color:var(--brand-cyan)]/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--brand-cyan)]" />
            Welcome back to Nexora
          </div>
          <h1 className="font-display max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome back, <span className="text-gradient">Sinovuyo</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-lg">
            Your intelligent workspace is ready. Automate repetitive tasks, summarize meetings,
            and make smarter decisions — powered by Nexora AI.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/email"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Zap className="h-4 w-4" /> Launch Assistant
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="#overview"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:bg-white/10"
            >
              Productivity Overview
            </a>
          </div>

          {/* Stat cards */}
          <div id="overview" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((s) => (
              <div
                key={s.label}
                className="glass-dark group relative overflow-hidden rounded-2xl p-5 text-white shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition group-hover:opacity-50"
                  style={{ background: "var(--gradient-primary)" }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
                    {s.label}
                  </span>
                  <div
                    className="grid h-8 w-8 place-items-center rounded-lg text-white"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <s.icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="relative mt-3 font-display text-3xl font-bold tracking-tight">
                  {s.value}
                </div>
                <div className="relative mt-1 flex items-center gap-1 text-[11px] text-white/60">
                  <TrendingUp className="h-3 w-3" /> {stats.streakDays}-day streak
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Jump into any Nexora AI tool with one click.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((f) => (
            <Link
              key={f.href}
              to={f.href}
              className="glass group relative overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-glow)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-60"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div
                className="relative mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)] transition group-hover:scale-110"
                style={{ background: "var(--gradient-primary)" }}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="relative font-display text-base font-semibold tracking-wide">
                {f.title}
              </h3>
              <p className="relative mt-1 text-sm text-muted-foreground">{f.desc}</p>
              <div className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand-cyan)]">
                Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Activity + Sidebar cards */}
      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 shadow-[var(--shadow-soft)] lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="grid h-9 w-9 place-items-center rounded-xl text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Activity className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-semibold tracking-wide">Recent Activity</h3>
            </div>
            <span className="text-xs text-muted-foreground">Live · {stats.total} total</span>
          </div>
          {activity.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
              <div
                className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl text-white animate-pulse-glow"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-sm text-muted-foreground">
                No activity yet — generate your first output to light up your workspace.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {activity.slice(0, 6).map((a) => (
                <li key={a.id} className="flex items-center gap-4 py-3">
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-[var(--shadow-soft)]"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {a.tool === "email" && <Mail className="h-4 w-4" />}
                    {a.tool === "notes" && <FileText className="h-4 w-4" />}
                    {a.tool === "planner" && <CalendarClock className="h-4 w-4" />}
                    {a.tool === "research" && <Search className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{a.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.preview}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{timeAgo(a.at)}</div>
                  <Link
                    to={TOOL_META[a.tool].path as "/email"}
                    className="text-xs font-semibold text-[color:var(--brand-cyan)] hover:underline"
                  >
                    Open
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div
            className="relative overflow-hidden rounded-3xl p-6 text-white shadow-[var(--shadow-elevated)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl"
            />
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md">
              <Lightbulb className="h-3.5 w-3.5" /> AI Productivity Tip
            </div>
            <p className="text-base font-medium leading-relaxed">{tip}</p>
            <div className="mt-4 flex items-center gap-1 text-xs text-white/80">
              <Clock className="h-3.5 w-3.5" /> Est. time saved today · {stats.total * 6}m
            </div>
          </div>

          <div className="glass rounded-3xl p-6 shadow-[var(--shadow-soft)]">
            <div className="mb-4 flex items-center gap-2">
              <div
                className="grid h-9 w-9 place-items-center rounded-xl text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                <CalendarClock className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-semibold tracking-wide">Upcoming Tasks</h3>
            </div>
            <ul className="space-y-3">
              {upcoming.map((u) => (
                <li key={u.label} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-cyan)]" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{u.label}</div>
                    <div className="text-xs text-muted-foreground">{u.when}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/responsible-ai"
            className="glass rounded-3xl p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-[color:var(--brand-cyan)]">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-semibold tracking-wide">Responsible AI</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn how Nexora keeps your workspace safe, private, and human-in-the-loop.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--brand-cyan)]">
              Read guidelines <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-bold tracking-[0.25em] text-gradient">
              NEXORA AI
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by <span className="font-semibold text-foreground">Sinovuyo Joji</span> ·
            Student Name · Powered by OpenAI
          </p>
        </div>
      </footer>
    </AppShell>
  );
}
