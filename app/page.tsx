"use client";

import { useState, FormEvent } from "react";
import { Question, APIResponse } from "@/types";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!jobTitle.trim() || status === "loading") return;

    setStatus("loading");
    setError("");
    setQuestions([]);

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle: jobTitle.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate questions");
      }

      const { questions } = data as APIResponse;
      setQuestions(questions);
      setStatus("success");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#F0F0F0] flex items-center justify-center p-6">
      <div className="w-full max-w-[680px]">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="text-xs font-medium tracking-wider uppercase text-[#2ECC71] bg-[#2ECC71]/10 px-3 py-1 rounded-full">
            AI-Powered · Claude
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Interview Question Generator
        </h1>
        <p className="text-center text-[#F0F0F0]/50 mb-8">
          Enter a job title and get 3 thoughtful, role-specific interview
          questions powered by Claude.
        </p>

        {/* Input row */}
        <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Customer Success Manager"
            className="flex-1 bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-[#F0F0F0] placeholder:text-[#F0F0F0]/30 outline-none focus:border-[#2ECC71]/50 transition-colors"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={!jobTitle.trim() || status === "loading"}
            className="bg-[#2ECC71] text-[#0D0D0D] font-semibold px-6 py-3 rounded-lg hover:bg-[#27AE60] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Generate
          </button>
        </form>

        {/* Loading state */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-3 py-12">
            <div className="w-8 h-8 border-2 border-[#2ECC71]/30 border-t-[#2ECC71] rounded-full animate-spin" />
            <p className="text-sm text-[#F0F0F0]/50">
              Generating questions for {jobTitle}...
            </p>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">
              {error}. Please try again.
            </p>
          </div>
        )}

        {/* Success state — question cards */}
        {status === "success" && (
          <div className="flex flex-col gap-4">
            {questions.map((q, i) => (
              <div
                key={i}
                className="bg-[#141414] border border-white/5 rounded-lg p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-[#2ECC71] font-bold text-lg shrink-0">
                    Q{i + 1}
                  </span>
                  <p className="text-[#F0F0F0] font-medium leading-relaxed">
                    {q.question}
                  </p>
                </div>
                <div className="ml-9">
                  <p className="text-[#F0F0F0]/40 text-sm leading-relaxed">
                    {q.insight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
