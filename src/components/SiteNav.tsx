import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-[var(--shadow-soft)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-base font-semibold tracking-tight text-foreground">
            AI Productivity Assistant
          </span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a href="/#tools" className="hover:text-foreground">Tools</a>
          <a href="/#responsible-ai" className="hover:text-foreground">Responsible AI</a>
          <Link
            to="/email"
            className="rounded-lg px-4 py-2 text-white shadow-[var(--shadow-soft)] transition hover:opacity-90"
            style={{ background: "var(--gradient-primary)" }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
