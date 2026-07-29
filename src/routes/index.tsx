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
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { loadActivity, loadStats, TOOL_META, type ActivityItem, type Stats } from "@/lib/activity";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · AI Productivity Assistant" },
      {
        name: "description",
        content:
          "Modern AI workspace: generate emails, summarize meetings, plan your day, and research topics — all in one dashboard.",
      },
      { property: "og:title", content: "AI Productivity Assistant" },
      { property: "og:description", content: "Automate workplace tasks with a modern AI workspace." },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  {
    href: "/email" as const,
    icon: Mail,
    title: "Smart Email",
    desc: "Craft polished emails in seconds.",
  },
  {
    href: "/notes" as const,
    icon: FileText,
    title: "Meeting Notes",
    desc: "Extract actions from raw notes.",
  },
  {
    href: "/planner" as const,
    icon: CalendarClock,
    title: "Task Planner",
    desc: "Get a prioritized daily plan.",
  },
  {
    href: "/research" as const,
    icon: Search,
    title: "Research",
    desc: "Summaries and key insights.",
  },
];

const tips = [
  "Batch similar tasks together to reduce context-switching costs.",
  "Draft with AI, then refine with your own voice — you stay the author.",
  "Set 3 daily 'must-wins' before checking email or notifications.",
  "Use the Planner every morning for a 5-minute intention-setting ritual.",
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

  const topTool =
    (Object.entries(stats.byTool).sort((a, b) => b[1] - a[1])[0]?.[0] as keyof typeof TOOL_META) ||
    "email";

  return (
    <AppShell>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-gradient"
          style={{ background: "var(--gradient-mesh)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Your AI workspace
          </div>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Automate workplace tasks with Artificial Intelligence.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-lg">
            A modern AI Productivity Assistant — write emails, summarize meetings, plan your day, and research topics from one clean workspace.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[color:var(--brand-blue)] shadow-[var(--shadow-elevated)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
            >
              <Zap className="h-4 w-4" /> Get Started
            </Link>
            <a
              href="#quick-actions"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Explore Tools <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Stats cards - glassmorphism */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Tasks Automated", value: stats.total, icon: Zap },
              { label: "Day Streak", value: stats.streakDays, icon: TrendingUp },
              { label: "Most Used", value: TOOL_META[topTool].label, icon: Activity },
              { label: "Time Saved", value: `${stats.total * 6}m`, icon: Clock },
            ].map((s) => (
              <div
                key={s.label}
                className="glass-dark rounded-2xl p-5 text-white shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                    {s.label}
                  </span>
                  <s.icon className="h-4 w-4 text-white/80" />
                </div>
                <div className="mt-2 truncate text-2xl font-bold sm:text-3xl">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section id="quick-actions" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Quick Actions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Jump into any AI tool with one click.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((f) => (
            <Link
              key={f.href}
              to={f.href}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]"
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-40"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div
                className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)] transition group-hover:scale-110"
                style={{ background: "var(--gradient-primary)" }}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand-purple)]">
                Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Activity + Tip */}
      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="grid h-9 w-9 place-items-center rounded-xl text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Activity className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
          </div>
          {activity.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No activity yet — generate your first output to see it here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {activity.slice(0, 6).map((a) => (
                <li key={a.id} className="flex items-center gap-4 py-3">
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
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
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl"
            />
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Lightbulb className="h-3.5 w-3.5" /> Productivity Tip
            </div>
            <p className="text-base font-medium leading-relaxed">{tip}</p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-[color:var(--brand-purple)]">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <h3 className="text-base font-semibold">Responsible AI</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• AI-generated responses may contain errors.</li>
              <li>• Always verify important information.</li>
              <li>• Avoid entering confidential business information.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div
              className="grid h-8 w-8 place-items-center rounded-lg text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">AI Productivity Assistant</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by <span className="font-semibold text-foreground">Sinovuyo Joji</span> · Student Name · Powered by OpenAI
          </p>
        </div>
      </footer>
    </AppShell>
  );
}
