import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-2">
            <div
              className="grid h-8 w-8 place-items-center rounded-lg text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-foreground">AI Productivity Assistant</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              Created by <span className="font-semibold text-foreground">Sinovuyo Joji</span>
            </p>
            <p className="text-xs">Student Name · Powered by OpenAI</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
