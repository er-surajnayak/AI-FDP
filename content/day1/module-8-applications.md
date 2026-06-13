# Module 8 — Applications of Generative AI

> *"Everything so far was the 'how.' This is the 'so what.' By the end you'll have concrete, responsible workflows for Teaching, Research, Consultancy, and Industry — things you can use on Monday."*

---

## 2. Estimated Duration
**60 minutes** — 8 min framing + responsible-use frame, 4×10 min domain blocks (Teaching, Research, Consultancy, Industry), ~12 min cross-cutting discussion + checkpoint.

## 3. Learning Objectives
- Identify high-value, **responsible** generative-AI use cases across Teaching, Research, Consultancy, and Industry.
- Practice **prompt patterns** (role, context, constraints, examples, verification) on authentic tasks.
- Recognize **risks** (hallucination, bias, privacy, academic integrity) and apply mitigations.

## 4. Teaching Content (framing + a reusable prompt pattern)

**A responsible-use frame (state up front).** Generative AI is an **assistant, not an authority**: it drafts, summarizes, and brainstorms; *you* verify, judge, and own the output. Three rules carry through every domain:
1. **Never paste confidential/personal data** into tools without governance clearance (student records, unpublished work, client data).
2. **Verify every fact, citation, and number** — plausibility ≠ truth (Module 6).
3. **Disclose AI use** per your institution's/publisher's policy; preserve academic integrity.

**The C.R.A.F.T. prompt pattern (teach once, reuse everywhere):**
- **C**ontext — who you are, the situation, the audience.
- **R**ole — "Act as a peer reviewer in computational biology…"
- **A**ction — the precise task and output format.
- **F**ew-shot — an example of a good output, if you have one.
- **T**est/verify — ask it to flag uncertainty, cite assumptions, or self-check.

The four domains below each get: **use cases · demonstration · activity · discussion questions.**

---

### 🏫 Teaching

**Use cases.**
- **Lesson & session planning** — outlines, learning objectives aligned to Bloom's taxonomy, timing.
- **Question-bank generation** — MCQs/short-answer at specified difficulty + distractor rationales.
- **Rubric creation** — criteria, level descriptors, point allocations from a task description.
- **Personalized learning** — differentiated explanations (novice→advanced), worked examples, analogies tailored to a major.
- **Feedback drafting** — first-pass feedback on submissions (faculty edits and owns it).

**Demonstration.** Prompt: *"Act as an instructional designer. Create a 50-minute session plan on [topic] for first-year engineering students: objectives (Bloom-aligned), a timed agenda, one active-learning activity, and 3 formative-assessment questions with answers."* Expected: a structured, editable plan.

**Activity (10 min).** Each participant generates a **5-question MCQ quiz** on a topic they teach, then critiques: Are distractors plausible? Any factual errors? Bias? Difficulty right? Edit one question to fix a flaw.

**Discussion questions.** Where does AI-assisted question generation threaten or strengthen assessment validity? How should students be allowed to use these tools — and how do we redesign assessments accordingly?

---

### 🔬 Research

**Use cases.**
- **Literature review support** — summarize papers, extract methods/findings, build comparison tables (ground with the actual PDFs; verify).
- **Gap analysis** — "given these abstracts, what's understudied?" (as a *hypothesis generator*, not an oracle).
- **Proposal writing** — structure, clarity, lay summaries, reviewer-anticipation; never fabricate preliminary data.
- **Research summarization** — plain-language abstracts, conference-talk outlines, graphical-abstract text.
- **Coding/data analysis** — write/debug analysis scripts, explain statistical methods.

**Demonstration.** Prompt: *"Summarize this paper [pasted/grounded] in 150 words for a non-specialist, then list its main contribution, method, key limitation, and 3 questions a reviewer would ask. Mark anything you're unsure about."* Expected: concise summary + a verification-friendly uncertainty list.

**Activity (10 min).** Take one abstract from your field; have the model summarize and propose 2 research gaps. **Fact-check** every claim against the abstract; flag any hallucination. (This previews the end-of-day assignment.)

**Discussion questions.** What are the authorship/disclosure norms for AI-assisted writing in your discipline/journals? How do we use gap-analysis output without outsourcing scholarly judgment?

---

### 💼 Consultancy

**Use cases.**
- **Proposal generation** — tailor scope, deliverables, timelines from a brief.
- **Client requirement analysis** — turn messy notes/transcripts into structured requirements, stakeholder maps, risk lists.
- **Market research synthesis** — summarize reports, draft competitor matrices, SWOT (verify sources).
- **Deliverable drafting** — executive summaries, slide outlines, FAQs.

**Demonstration.** Prompt: *"Act as a management consultant. From these client meeting notes [paste non-confidential], produce: a requirements list, assumptions, open questions for the client, and a 1-page proposal outline."* Expected: structured artifacts that cut first-draft time dramatically.

**Activity (10 min).** From a short fictional client brief, generate a proposal outline + risk register; critique completeness and whether any "facts" need verification before sending.

**Discussion questions.** What client-confidentiality and disclosure obligations apply before using these tools? Where does AI add genuine value vs. create a liability if unverified?

---

### 🏭 Industry

**Use cases.**
- **Documentation** — API docs, runbooks, onboarding guides from code/specs.
- **Customer support** — RAG-grounded answer drafting, ticket summarization, tone normalization.
- **Knowledge management** — summarize/organize internal wikis; semantic search over policies (embeddings, Mod 5).
- **Automation** — draft emails/reports, classify/route tickets, extract structured data from documents.

**Demonstration.** Prompt: *"Turn this function/spec into clear API documentation with parameters, return values, errors, and a usage example,"* or *"Summarize this 12-message support thread into a 3-line resolution note + tags."* Expected: production-style docs / crisp summaries.

**Activity (10 min).** Take a paragraph of dense internal text and generate (a) a one-line TL;DR, (b) a structured FAQ, (c) a tagged summary — then judge which is deployment-ready and what guardrails it needs.

**Discussion questions.** Where must a human stay in the loop (compliance, safety, customer-facing accuracy)? How do you measure quality/ROI of an AI workflow?

---

## 5. Storytelling Flow
1. **Pivot from theory to practice:** "You understand the engine — now let's drive."
2. **Set the guardrails first** (assistant-not-authority; verify; disclose) so every demo is responsible by default.
3. **Teach C.R.A.F.T.** once; reuse it in every domain.
4. **Round-robin the four domains**, each with a quick live demo + a hands-on.
5. **Converge on judgment:** the human's job shifts from *producing first drafts* to *directing and verifying* — close the day on this empowering, responsible note.

## 6. Analogies
- **A capable research assistant / TA:** fast and tireless, occasionally confidently wrong — you'd never publish their draft unchecked.
- **A calculator for words:** speeds the mechanical part; the judgment is still yours.
- **Power tools:** dramatically faster, and they demand safety discipline.

## 7–9. Faculty / Research / Industry Examples
Covered per-domain above; the **Consultancy** block supplies the consultancy examples the brief requested.

## 10. Visual Ideas
- **Four-quadrant dashboard** (Teaching · Research · Consultancy · Industry), each a tile opening into use cases, a demo prompt, and an activity.
- **Prompt-anatomy diagram** labeling a prompt with C.R.A.F.T. parts.
- **Before/after panels** (raw notes → structured output) for several tasks.

## 11. Animation Ideas 🎬
**A. Prompt Anatomy Animator.**
- **Purpose:** show how each C.R.A.F.T. element changes the output.
- **Sequence:** a prompt builds up element by element (Context, Role, Action, Few-shot, Test); each addition animates a corresponding improvement in a mock output panel beside it.
- **React idea:** stepper state reveals prompt segments + swaps the paired output; Framer Motion.

**B. Use-Case Explorer (signature interactive).**
- **Purpose:** a navigable library of domain workflows.
- **Sequence/UI:** four-quadrant grid → click a domain → cards flip to reveal use case + copy-able demo prompt + "try it" link (to a live model or the Module-6 simulator) + the risk/guardrail for that use case.
- **React idea:** Carbon `Tabs`/grid of `ClickableTile`s; Framer flip; a "Copy prompt" button.

## 12/13. Interactive Playground Specifications 🕹️
**Prompt Lab.** A `TextArea` prompt with toggleable C.R.A.F.T. scaffolding chips; selecting a domain template pre-fills a strong starting prompt; a "verification checklist" appears beside any generated output (facts? citations? bias? privacy? disclosure?). Drive live via a Vercel serverless proxy, or paste outputs from the room's own tools.

## 13. Hands-on Activities ✋
The four 10-minute domain activities above are the core. A capstone (5 min): pick the single workflow you'll actually adopt next week and write the C.R.A.F.T. prompt for it.

## 14. Demonstration Ideas
- Run the four domain demo prompts live (ChatGPT/Claude/Gemini), each followed by a **verification pass** — model the discipline you're teaching.
- Show a deliberately under-specified prompt vs. a C.R.A.F.T. prompt for the same task → night-and-day difference.

## 15. Quiz Questions ❓
**Q1 (MCQ).** The safest default stance toward AI output is:
- A) Trust it; it's trained on everything
- B) **Treat it as a draft to verify and own** ✅
- C) Never use it
- D) Only use it for trivial tasks
*Explanation:* assistant-not-authority; verify and take ownership.

**Q2 (Scenario).** A professor wants to grade student essays with AI. Biggest concern and a mitigation? *Answer:* student-data privacy/governance + assessment validity/bias → use a governance-cleared or self-hosted model, keep the human as final grader, audit for bias, and disclose per policy.

**Q3 (Conceptual).** Name three elements of a strong prompt (C.R.A.F.T.). *Answer:* any three of Context, Role, Action, Few-shot example, Test/verify.

**Q4 (Scenario).** A consultant pastes confidential client notes into a free chatbot to draft a proposal. What's wrong, and what should they do? *Answer:* confidentiality/data-governance violation; use an approved tool with no-retention terms or a self-hosted model, and anonymize where possible.

## 16. Common Misconceptions ⚠️
- **"AI will replace faculty/researchers."** It shifts effort from drafting to directing/verifying; judgment and accountability remain human.
- **"If it's well-written, it's correct."** Fluency ≠ accuracy (Module 6).
- **"Using AI is cheating/unethical by definition."** Depends on disclosure and policy; used transparently it's a legitimate productivity tool.
- **"One generic prompt is enough."** Structured prompts (C.R.A.F.T.) and grounding (RAG) dramatically change quality.

## 17. Key Takeaways
- High-value, responsible workflows exist across **Teaching, Research, Consultancy, Industry**.
- **C.R.A.F.T.** structures strong prompts; **verification** is non-negotiable.
- **Privacy, bias, integrity, and disclosure** are first-class concerns, not afterthoughts.
- The human role shifts from *producer* to *director + verifier* — that's the empowering takeaway of Day 1.

## 18. IBM Carbon Component Suggestions
- Four-domain layout as `Tabs` or a `Tile` grid; use cases as `ExpandableTile`s.
- Demo prompts in `CodeSnippet` (copyable); verification checklist as `Checkbox` list in a `Tile`.
- Responsible-use frame pinned as an info `InlineNotification`/`Callout` at module top.
- Discussion questions in an `Accordion`.

## 19. React Implementation Suggestions
- `useCases.ts`: typed `{domain, title, prompt, risk, mitigation}[]` powering the explorer and Prompt Lab templates.
- `PromptLab.tsx`: C.R.A.F.T. chips toggle text into a controlled `TextArea`; a `VerificationChecklist` component renders beside outputs; optional live call via `/api/generate` serverless proxy.
- Reuse the Module-6 simulator for offline "try it" so no API key is required during the FDP.
