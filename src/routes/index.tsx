import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, CalendarClock, Search, Sparkles, ShieldAlert, ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Productivity Assistant · Automate Your Workday" },
      {
        name: "description",
        content:
          "Automate workplace tasks with AI: generate emails, summarize meetings, plan your day, and research topics — all in one professional assistant.",
      },
      { property: "og:title", content: "AI Productivity Assistant" },
      {
        property: "og:description",
        content: "Automate workplace tasks using Artificial Intelligence.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    href: "/email" as const,
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Craft polished emails in the perfect tone — formal, friendly, or persuasive.",
  },
  {
    href: "/notes" as const,
    icon: FileText,
    title: "Meeting Notes Summarizer",
    desc: "Turn raw notes into summaries, decisions, action items, and deadlines.",
  },
  {
    href: "/planner" as const,
    icon: CalendarClock,
    title: "AI Task Planner",
    desc: "Get a prioritized schedule, working-time blocks, and productivity tips.",
  },
  {
    href: "/research" as const,
    icon: Search,
    title: "AI Research Assistant",
    desc: "Summaries, key insights, and recommendations on any topic — fast.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-medium text-primary shadow-[var(--shadow-soft)]">
            <Sparkles className="h-3.5 w-3.5" /> Powered by advanced AI
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            AI Productivity{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Assistant
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Automate workplace tasks using Artificial Intelligence.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#tools"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition hover:opacity-90"
              style={{ background: "var(--gradient-primary)" }}
            >
              Explore Tools <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#responsible-ai"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Responsible AI
            </a>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section id="tools" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Four tools. One assistant.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Pick a task and let AI handle the heavy lifting.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <Link
              key={f.href}
              to={f.href}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition group-hover:opacity-20"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div
                className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]"
                style={{ background: "var(--gradient-primary)" }}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Responsible AI */}
      <section id="responsible-ai" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-secondary/50 p-6 sm:p-10">
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <div
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]"
              style={{ background: "var(--gradient-primary)" }}
            >
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Responsible AI
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground sm:text-base">
                <li>• AI-generated responses may contain errors.</li>
                <li>• Always verify important information before using it professionally.</li>
                <li>• Avoid entering confidential business information.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
