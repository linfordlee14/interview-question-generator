import Anthropic from "@anthropic-ai/sdk";
import { buildPrompt } from "./prompt";
import { Question } from "@/types";

const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1000;

// Creates a new Anthropic client per call to avoid
// issues with server-side rendering and hot reloading.
function getClient(): Anthropic {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

// Calls Claude and returns parsed Question objects.
// Throws on API errors or invalid JSON responses.
export async function fetchQuestions(jobTitle: string): Promise<Question[]> {
  const client = getClient();
  const prompt = buildPrompt(jobTitle);

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: "user", content: prompt }],
  });

  // Extract text from the first content block
  const raw =
    message.content[0].type === "text" ? message.content[0].text : "";

  // Strip markdown code fences if Claude wraps the response
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  // Validate basic structure
  if (!Array.isArray(parsed) || parsed.length !== 3) {
    throw new Error("Expected exactly 3 questions in response");
  }

  return parsed as Question[];
}
