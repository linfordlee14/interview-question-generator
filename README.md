# Interview Question Generator

A focused web app that accepts a job title and returns 3 thoughtful, role-specific interview questions powered by Claude.

Built as a technical screen for a Technical Co-Founder / Founding Engineer role at an HRTech startup.

**Live URL:** [interview-question-generator](https://interview-gen-six.vercel.app/)

---

## What It Does

1. User types a job title (e.g. "Customer Success Manager")
2. App calls the Anthropic Claude API server-side
3. Returns 3 interview questions, each with a rationale explaining what it reveals about the candidate

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI Provider | Anthropic Claude (`claude-sonnet-4-20250514`) |
| Deployment | Vercel |

---

## Project Structure

```
app/
  page.tsx                  # Client UI — handles input, state, and rendering
  api/questions/route.ts    # Server-side API route — Anthropic call lives here
lib/
  prompt.ts                 # buildPrompt(jobTitle) — prompt logic isolated here
  claude.ts                 # fetchQuestions() — API call and response parsing
types/
  index.ts                  # Question and APIResponse types
```

Each file has one responsibility. Prompt logic is separated from API logic, which is separated from UI logic. This means any part can be changed or improved without touching the others.

---

## Why Claude / Anthropic

Claude Sonnet 4 is exceptionally reliable at following structured output instructions. When instructed to return clean JSON with no markdown or preamble, it does so consistently. That reliability matters in production. I've worked with the Anthropic API across multiple projects and chose it here for that reason.

---

## Why the `insight` Field

The spec asked for 3 interview questions. I added an `insight` per question - a short explanation of what the question is designed to reveal. This makes the tool useful for a non-technical founder who wants to understand the reasoning behind each question, not just read a list.

---

## Approach: Spec Driven Development

Before writing any code, I wrote a full spec covering the product flow, architecture, types, API contract, prompt design, UI states, and deploy target. This spec served as the shared source of truth between me and my AI tools during the build.

SDD reduces ambiguity early, keeps AI-assisted code generation focused, and produces a codebase that reads like documentation.

---

## Running Locally

```bash
git clone https://github.com/linfordlee14/interview-question-generator
cd interview-question-generator
npm install
```

Create a `.env.local` file:

```
ANTHROPIC_API_KEY=your_anthropic_key_here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy

The app is deployed on Vercel. To deploy your own instance:

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add `ANTHROPIC_API_KEY` as an environment variable
4. Deploy

---

## AI Usage

AI was used throughout this build - for code generation, prompt refinement, and debugging. I used Claude Code as my development partner via Windsurf and the Anthropic API directly. Transparency about AI tool usage is part of how I work.

---

## Built by

Linford Musiyambodza
Founder, [Linfy Tech Solutions](https://linfytech.xyz)
Cape Town, South Africa
