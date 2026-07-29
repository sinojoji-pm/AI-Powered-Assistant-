import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { useState } from "react";
import { Field, ToolPage, inputCls } from "@/components/ToolPage";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Task Planner · Nexora AI" },
      { name: "description", content: "Build a prioritized schedule with Nexora AI." },
      { property: "og:title", content: "Nexora AI · Task Planner" },
      { property: "og:description", content: "Prioritize your day with AI." },
    ],
  }),
  component: PlannerTool,
});

function PlannerTool() {
  const [tasks, setTasks] = useState("");
  return (
    <ToolPage
      tool="planner"
      title="AI Task Planner"
      description="Enter today's tasks to get a prioritized schedule and productivity tips."
      icon={<CalendarClock className="h-7 w-7" />}
      buildPayload={() => (tasks.trim() ? { tasks } : null)}
      activityTitle={() => `Daily plan`}
    >
      <Field label="Today's Tasks">
        <textarea
          className={inputCls + " min-h-[200px]"}
          placeholder="List everything on your plate today, one per line…"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        />
      </Field>
    </ToolPage>
  );
}
