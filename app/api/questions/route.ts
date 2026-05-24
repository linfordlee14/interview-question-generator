import { NextRequest, NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/claude";
import { APIResponse } from "@/types";

// POST /api/questions
// Body: { jobTitle: string }
// Returns: APIResponse or { error: string }
export async function POST(request: NextRequest) {
  try {
    const { jobTitle } = await request.json();

    if (!jobTitle || typeof jobTitle !== "string" || !jobTitle.trim()) {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: 400 }
      );
    }

    const questions = await fetchQuestions(jobTitle.trim());

    const response: APIResponse = {
      questions,
      jobTitle: jobTitle.trim(),
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    console.error("API Error:", message);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
