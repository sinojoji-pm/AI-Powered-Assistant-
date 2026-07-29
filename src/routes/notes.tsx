import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { useState } from "react";
import { Field, ToolPage, inputCls } from "@/components/ToolPage";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer · AI Productivity Assistant" },
      { name: "description", content: "Turn meeting notes into summaries, decisions, and action items." },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      { property: "og:description", content: "Summarize meetings with AI." },
    ],
  }),
  component: NotesTool,
});

function NotesTool() {
  const [notes, setNotes] = useState("");
  return (
    <ToolPage
      tool="notes"
      title="Meeting Notes Summarizer"
      description="Paste meeting notes to extract summary, decisions, action items, and deadlines."
      icon={<FileText className="h-7 w-7" />}
      buildPayload={() => (notes.trim() ? { notes } : null)}
    >
      <Field label="Meeting Notes">
        <textarea
          className={inputCls + " min-h-[220px]"}
          placeholder="Paste your raw meeting notes here…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Field>
    </ToolPage>
  );
}
