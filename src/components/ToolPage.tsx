import { useServerFn } from "@tanstack/react-start";
import { Copy, Check, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { generateAi } from "@/lib/ai.functions";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

type ToolKey = "email" | "notes" | "planner" | "research";

export function ToolPage({
  tool,
  title,
  description,
  icon,
  children,
  buildPayload,
}: {
  tool: ToolKey;
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  buildPayload: () => Record<string, string> | null;
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

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to tools
        </Link>

        <header className="mb-8 flex items-start gap-4">
          <div
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">{description}</p>
          </div>
        </header>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="space-y-4">{children}</div>

          <button
            onClick={onGenerate}
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
            style={{ background: "var(--gradient-primary)" }}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate
              </>
            )}
          </button>

          {error && (
            <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
          )}
        </section>

        {(loading || output) && (
          <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">Result</h2>
              {output && !loading && (
                <button
                  onClick={onCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-secondary"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10">
                <div className="relative h-12 w-12">
                  <div
                    className="absolute inset-0 animate-ping rounded-full opacity-30"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <div
                    className="relative grid h-12 w-12 place-items-center rounded-full text-white"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <Sparkles className="h-5 w-5 animate-pulse" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Thinking…</p>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{output}</div>
            )}
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
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
  "w-full rounded-xl border border-border bg-input/40 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20";
