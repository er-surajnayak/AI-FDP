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

### A reusable prompt pattern — C.R.A.F.T.

- **C**ontext — who you are, the situation, the audience.
- **R**ole — "Act as a peer reviewer in computational biology…"
- **A**ction — the precise task and the output format.
- **F**ew-shot — an example of a good output, if you have one.
- **T**est — ask it to flag uncertainty or check its own work.

---

### 🏫 Teaching

Generative AI can assist with **lesson planning, question-paper generation, outcome mapping, rubric creation, and personalised learning materials**. The goal is **not to replace educators** — it is to reduce repetitive work so educators can focus on higher-value activities.

---

### 🔬 Research

Researchers can use AI for **literature review, paper summarisation, gap identification, proposal drafting, and brainstorming**. AI should be treated as a **research assistant, not a research replacement** — human expertise remains essential.

---

### 💼 Consultancy

AI can accelerate **proposal generation, market analysis, requirement gathering, and report creation** — freeing consultants to spend more time on **strategic decision-making**.

---

### 🏭 Industry

Organisations use AI for **customer support, knowledge management, process automation, software development, and decision-support systems**. Generative AI is rapidly becoming a **foundational technology** across industries.

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
The single most transferable skill across every domain is structuring a prompt rather than just asking. The C.R.A.F.T. pattern names the parts of a strong request — **C**ontext, **R**ole, **A**ction, **F**ew-shot example, **T**est — and the same five parts work whether you are drafting a rubric, summarising a paper, writing a consultancy proposal, or triaging support tickets.

The shift it encodes is the real lesson of the day: the human's job moves from *producing the first draft* to *specifying the request well and verifying the result*.

## 14. Demonstration Ideas
The difference a structure makes is stark when you see the same task twice. A bare prompt — *"write a rubric for an essay"* — returns something generic. The same task wrapped in C.R.A.F.T. — who the students are, what level, the exact criteria and format, an example of the tone you want, and a request to flag anything debatable — returns something you can almost use as-is.

Across teaching, research, consultancy, and industry the pattern is identical: a few sentences of structure turn a vague answer into a usable draft — which still gets verified before it is owned.

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

**Q5 (MCQ).** In C.R.A.F.T., the "T" (Test) element asks the model to:
- A) Run a unit test on your code
- B) **Flag its own uncertainty or check its work for disputable claims** ✅
- C) Raise the temperature setting
- D) Translate the output into another language
*Explanation:* "Test" builds verification into the prompt — the model surfaces what a human should double-check.

**Q6 (Scenario).** The same C.R.A.F.T. structure is claimed to work for a biology lecturer and an industry support team alike. Why does one pattern generalise? *Answer:* every task needs the same things specified — situation (Context), perspective (Role), the precise ask (Action), a quality example (Few-shot), and a verification step (Test). Only the content of each slot changes, not the structure.

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
