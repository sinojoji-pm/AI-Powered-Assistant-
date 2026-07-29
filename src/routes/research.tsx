import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { Field, ToolPage, inputCls } from "@/components/ToolPage";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Assistant · Nexora AI" },
      { name: "description", content: "Get summaries, key insights, and recommendations on any topic with Nexora AI." },
      { property: "og:title", content: "Nexora AI · Research Assistant" },
      { property: "og:description", content: "Research any topic with AI." },
    ],
  }),
  component: ResearchTool,
});

function ResearchTool() {
  const [topic, setTopic] = useState("");
  return (
    <ToolPage
      tool="research"
      title="AI Research Assistant"
      description="Enter a topic to receive a summary, key insights, and recommendations."
      icon={<Search className="h-7 w-7" />}
      buildPayload={() => (topic.trim() ? { topic } : null)}
      activityTitle={() => `Research: ${topic.slice(0, 60) || "topic"}`}
    >
      <Field label="Research Topic">
        <textarea
          className={inputCls + " min-h-[140px]"}
          placeholder="e.g. Impact of remote work on team productivity"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </Field>
    </ToolPage>
  );
}
