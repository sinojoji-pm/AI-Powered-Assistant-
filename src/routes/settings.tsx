import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings as SettingsIcon, User, Bell, Moon, Shield, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Nexora AI" },
      { name: "description", content: "Manage your Nexora AI workspace preferences." },
      { property: "og:title", content: "Settings · Nexora AI" },
      { property: "og:description", content: "Personalize your Nexora AI workspace." },
    ],
  }),
  component: SettingsPage,
});

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={[
        "relative h-6 w-11 rounded-full border border-white/10 transition",
        checked ? "bg-[color:var(--brand-purple)] shadow-[0_0_16px_rgba(124,58,237,0.6)]" : "bg-white/10",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  );
}

function Row({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-4 last:border-none">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{title}</div>
          <div className="truncate text-xs text-muted-foreground">{desc}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

function SettingsPage() {
  const [name, setName] = useState("Sinovuyo Joji");
  const [notif, setNotif] = useState(true);
  const [dark, setDark] = useState(true);
  const [telemetry, setTelemetry] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <AppShell>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-gradient"
          style={{ background: "var(--gradient-mesh)" }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>
          <div className="flex items-start gap-4">
            <div className="glass-dark grid h-14 w-14 place-items-center rounded-2xl text-white animate-pulse-glow">
              <SettingsIcon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Settings
              </h1>
              <p className="mt-2 text-sm text-white/80 sm:text-base">
                Personalize your Nexora AI workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <section className="glass rounded-3xl p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <h2 className="font-display mb-4 text-lg font-semibold tracking-wide">Profile</h2>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Display name</span>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:bg-white/10 focus:ring-4 focus:ring-primary/20"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </section>

        <section className="glass mt-6 rounded-3xl p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <h2 className="font-display mb-2 text-lg font-semibold tracking-wide">Preferences</h2>
          <Row icon={Bell} title="Notifications" desc="Get notified about activity and updates.">
            <Toggle checked={notif} onChange={setNotif} label="Notifications" />
          </Row>
          <Row icon={Moon} title="Dark mode" desc="Futuristic dark aesthetic (recommended).">
            <Toggle checked={dark} onChange={setDark} label="Dark mode" />
          </Row>
          <Row icon={Shield} title="Anonymous telemetry" desc="Help improve Nexora AI.">
            <Toggle checked={telemetry} onChange={setTelemetry} label="Telemetry" />
          </Row>
          <Row icon={User} title="Account" desc="Signed in as Sinovuyo Joji">
            <span className="text-xs text-muted-foreground">Student · Free tier</span>
          </Row>
        </section>
      </main>
    </AppShell>
  );
}
