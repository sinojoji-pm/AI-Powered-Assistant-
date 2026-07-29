import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  tool: z.enum(["email", "notes", "planner", "research"]),
  payload: z.record(z.string(), z.string()),
});

const SYSTEM_PROMPTS: Record<string, (p: Record<string, string>) => string> = {
  email: (p) =>
    `You are a professional email writer. Write a complete, well-formatted email.
Recipient: ${p.recipient}
Purpose: ${p.purpose}
Tone: ${p.tone}

Produce a ready-to-send email with a clear subject line (prefixed "Subject:"), greeting, body, and sign-off. Keep it concise and effective.`,
  notes: (p) =>
    `You are a meeting notes analyst. From the meeting notes below, produce clearly labeled sections using markdown headings exactly:
## Summary
## Key Decisions
## Action Items
## Deadlines

Use bullet points where appropriate. If a section has no content, write "None identified."

Meeting Notes:
${p.notes}`,
  planner: (p) =>
    `You are an AI productivity coach. Given today's tasks, produce a plan using markdown headings exactly:
## Prioritized Schedule
## Suggested Working Times
## Productivity Tips

Be practical, realistic, and specific with time blocks.

Today's Tasks:
${p.tasks}`,
  research: (p) =>
    `You are a research assistant. On the topic below, produce a briefing using markdown headings exactly:
## Summary
## Key Insights
## Recommendations

Be objective, informative, and concise.

Topic: ${p.topic}`,
};

export const generateAi = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const prompt = SYSTEM_PROMPTS[data.tool](data.payload);

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          { role: "system", content: "You are an expert AI productivity assistant. Respond in clear, professional markdown." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
      throw new Error(`AI request failed: ${text}`);
    }

    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
