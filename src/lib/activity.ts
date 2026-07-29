export type ToolKey = "email" | "notes" | "planner" | "research";

export type ActivityItem = {
  id: string;
  tool: ToolKey;
  title: string;
  preview: string;
  at: number;
};

const KEY = "ai-assistant.activity.v1";
const STATS_KEY = "ai-assistant.stats.v1";

export type Stats = {
  total: number;
  byTool: Record<ToolKey, number>;
  streakDays: number;
  lastDay: string | null;
};

const emptyStats = (): Stats => ({
  total: 0,
  byTool: { email: 0, notes: 0, planner: 0, research: 0 },
  streakDays: 0,
  lastDay: null,
});

export function loadActivity(): ActivityItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function loadStats(): Stats {
  if (typeof window === "undefined") return emptyStats();
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...emptyStats(), ...JSON.parse(raw) } : emptyStats();
  } catch {
    return emptyStats();
  }
}

export function recordActivity(item: Omit<ActivityItem, "id" | "at">) {
  if (typeof window === "undefined") return;
  const list = loadActivity();
  const entry: ActivityItem = { ...item, id: crypto.randomUUID(), at: Date.now() };
  const next = [entry, ...list].slice(0, 20);
  localStorage.setItem(KEY, JSON.stringify(next));

  const stats = loadStats();
  stats.total += 1;
  stats.byTool[item.tool] = (stats.byTool[item.tool] || 0) + 1;
  const today = new Date().toISOString().slice(0, 10);
  if (stats.lastDay !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    stats.streakDays = stats.lastDay === yesterday ? stats.streakDays + 1 : 1;
    stats.lastDay = today;
  }
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  window.dispatchEvent(new Event("activity:updated"));
}

export const TOOL_META: Record<ToolKey, { label: string; path: string }> = {
  email: { label: "Smart Email", path: "/email" },
  notes: { label: "Meeting Notes", path: "/notes" },
  planner: { label: "Task Planner", path: "/planner" },
  research: { label: "Research", path: "/research" },
};
