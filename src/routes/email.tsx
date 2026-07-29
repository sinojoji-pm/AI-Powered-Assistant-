import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import { Field, ToolPage, inputCls } from "@/components/ToolPage";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Email Generator · Nexora AI" },
      { name: "description", content: "Generate professional emails in seconds with Nexora AI." },
      { property: "og:title", content: "Nexora AI · Email Generator" },
      { property: "og:description", content: "Craft polished emails with AI." },
    ],
  }),
  component: EmailTool,
});

function EmailTool() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Formal");

  return (
    <ToolPage
      tool="email"
      title="Smart Email Generator"
      description="Generate a professional email tailored to your recipient and tone."
      icon={<Mail className="h-7 w-7" />}
      buildPayload={() => {
        if (!recipient.trim() || !purpose.trim()) return null;
        return { recipient, purpose, tone };
      }}
      activityTitle={() => `Email to ${recipient || "recipient"} · ${tone}`}
    >
      <Field label="Recipient">
        <input
          className={inputCls}
          placeholder="e.g. Dr. Smith, Hiring Manager, Team Lead"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </Field>
      <Field label="Email Purpose">
        <textarea
          className={inputCls + " min-h-[100px]"}
          placeholder="Describe what the email should accomplish…"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </Field>
      <Field label="Tone">
        <select className={inputCls} value={tone} onChange={(e) => setTone(e.target.value)}>
          <option>Formal</option>
          <option>Friendly</option>
          <option>Persuasive</option>
        </select>
      </Field>
    </ToolPage>
  );
}
