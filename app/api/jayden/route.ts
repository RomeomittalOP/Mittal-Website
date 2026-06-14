import Anthropic from "@anthropic-ai/sdk";
import { JAYDEN_SYSTEM_PROMPT } from "@/lib/ai/system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string };

function isChatMessage(m: unknown): m is ChatMessage {
  if (!m || typeof m !== "object") return false;
  const x = m as { role?: unknown; content?: unknown };
  return (
    (x.role === "user" || x.role === "assistant") &&
    typeof x.content === "string" &&
    x.content.length > 0
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          "JAYDEN's AI engine isn't configured yet. The site owner needs to set the ANTHROPIC_API_KEY environment variable on Vercel. In the meantime, WhatsApp the team at +91 77019 03505 — they reply fast.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const messages = rawMessages.filter(isChatMessage).slice(-20); // last 20 turns

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response(
      JSON.stringify({ ok: false, error: "Missing user message." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const client = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const llmStream = await client.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 700,
          system: JAYDEN_SYSTEM_PROMPT,
          messages,
        });

        for await (const event of llmStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(
            `\n\n_(Something went wrong — easiest is to WhatsApp the team at +91 77019 03505. Error: ${msg})_`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
