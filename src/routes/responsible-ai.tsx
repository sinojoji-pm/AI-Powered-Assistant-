import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert, AlertTriangle, Lock, Eye, UserCheck, ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI · Nexora AI" },
      {
        name: "description",
        content:
          "Nexora AI responsible-use guidelines: verify AI output, protect confidential data, and keep humans in the loop.",
      },
      { property: "og:title", content: "Responsible AI · Nexora AI" },
      { property: "og:description", content: "Use Nexora AI safely and responsibly." },
    ],
  }),
  component: ResponsibleAI,
});

const principles = [
  {
    icon: AlertTriangle,
    title: "AI may generate incorrect information",
    body: "Large language models can hallucinate facts, citations, and numbers. Treat every Nexora output as a first draft, not a source of truth.",
  },
  {
    icon: Eye,
    title: "Always verify AI-generated content",
    body: "Cross-check names, figures, dates, and legal or financial statements against trusted sources before sharing externally.",
  },
  {
    icon: Lock,
    title: "Never upload confidential business information",
    body: "Avoid pasting client PII, secrets, credentials, or unreleased strategy into prompts. Redact sensitive details first.",
  },
  {
    icon: UserCheck,
    title: "Human review is recommended",
    body: "A human should review AI-generated emails, summaries, and reports before they are sent, published, or acted upon.",
  },
];

function ResponsibleAI() {
  return (
    <AppShell>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-gradient"
          style={{ background: "var(--gradient-mesh)" }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>
          <div className="flex items-start gap-4">
            <div className="glass-dark grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white animate-pulse-glow">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Responsible AI
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
                Nexora AI is designed to amplify human decision-making, not replace it. These
                principles guide safe, ethical, and effective use across your workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((p) => (
            <div
              key={p.title}
              className="glass group relative overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition group-hover:opacity-50"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div
                className="relative mb-4 grid h-11 w-11 place-items-center rounded-xl text-white shadow-[var(--shadow-soft)]"
                style={{ background: "var(--gradient-primary)" }}
              >
                <p.icon className="h-5 w-5" />
              </div>
              <h2 className="relative font-display text-lg font-semibold tracking-wide">
                {p.title}
              </h2>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-8 rounded-3xl p-6 text-white shadow-[var(--shadow-elevated)]"
          style={{ background: "var(--gradient-primary)" }}
        >
          <h3 className="font-display text-lg font-semibold tracking-wide">
            Human-in-the-loop by default
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-white/90">
            Every Nexora output is a suggestion. You remain the author, the decision-maker, and
            the accountable professional. When in doubt, review, edit, and verify.
          </p>
        </div>
      </main>
    </AppShell>
  );
}
