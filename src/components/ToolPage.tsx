import { useServerFn } from "@tanstack/react-start";
import { Copy, Check, Loader2, Sparkles, ArrowLeft, Trash2, Download } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { generateAi } from "@/lib/ai.functions";
import { AppShell } from "./AppShell";
import { recordActivity, type ToolKey } from "@/lib/activity";

export function ToolPage({
  tool,
  title,
  description,
  icon,
  children,
  buildPayload,
  activityTitle,
}: {
  tool: ToolKey;
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  buildPayload: () => Record<string, string> | null;
  activityTitle: () => string;
}) {
  const generate = useServerFn(generateAi);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onGenerate = async () => {
    const payload = buildPayload();
    if (!payload) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    setLoading(true);
    setOutput("");
    try {
      const res = await generate({ data: { tool, payload } });
      setOutput(res.content);
      recordActivity({
        tool,
        title: activityTitle(),
        preview: res.content.slice(0, 120).replace(/\s+/g, " "),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const onClear = () => {
    setOutput("");
    setError(null);
  };

  const onExport = () => {
    const blob = new Blob([output], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      {/* Hero band */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-gradient"
          style={{ background: "var(--gradient-mesh)" }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>
          <div className="flex items-start gap-4">
            <div className="glass-dark grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-[var(--shadow-glow)]">
              {icon}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
              <p className="mt-1.5 max-w-2xl text-sm text-white/85 sm:text-base">{description}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <section className="glass rounded-3xl p-6 shadow-[var(--shadow-elevated)] sm:p-8">
          <div className="space-y-4">{children}</div>

          <button
            onClick={onGenerate}
            disabled={loading}
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] disabled:opacity-60 sm:w-auto"
            style={{ background: "var(--gradient-primary)" }}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 transition group-hover:rotate-12" /> Generate
              </>
            )}
          </button>

          {error && (
            <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
        </section>

        {(loading || output) && (
          <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Result</h2>
              {output && !loading && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={onCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-secondary"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={onExport}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-secondary"
                  >
                    <Download className="h-3.5 w-3.5" /> Export
                  </button>
                  <button
                    onClick={onClear}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Clear
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12">
                <div className="relative h-14 w-14">
                  <div
                    className="absolute inset-0 animate-ping rounded-full opacity-30"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <div
                    className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-[var(--shadow-glow)]"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <Sparkles className="h-6 w-6 animate-pulse" />
                  </div>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Thinking…</p>
                <div className="mt-2 w-64 max-w-full space-y-2">
                  <div className="h-2.5 animate-pulse rounded bg-secondary" />
                  <div className="h-2.5 w-5/6 animate-pulse rounded bg-secondary" />
                  <div className="h-2.5 w-4/6 animate-pulse rounded bg-secondary" />
                </div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {output}
              </div>
            )}
          </section>
        )}
      </main>
    </AppShell>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:bg-white/10 focus:ring-4 focus:ring-primary/20";
