# Module 7 — Foundation Models

> *"You wouldn't assign the same journal to every paper. Picking a foundation model is the same editorial judgment — match the model to the task, the constraints, and the values of your institution."*

---

## 2. Estimated Duration
**40 minutes** — 15 min concepts + landscape, 12 min comparison table + use-case selector, 8 min faculty scenarios, 5 min checkpoint.

## 3. Learning Objectives
- Define a **foundation model**: a large model pre-trained on broad data, **adaptable** to many downstream tasks.
- Compare major families — **GPT, Claude, Gemini, Llama, DeepSeek** — by strengths, weaknesses, and ideal use cases.
- Apply a **selection framework** (capability, context, cost, openness, privacy, governance) to faculty scenarios.

## 4. Teaching Content

Modern Generative AI is powered by **foundation models** — models trained on massive amounts of data and then **adapted** for many different tasks (summarising, coding, tutoring, extraction). "Foundation" means a shared base others build on, rather than one bespoke model per task. They are general-purpose, adaptable, and *emergent* — new capabilities appear with scale.

### The major families

- **GPT (OpenAI)** — strong general-purpose reasoning and coding.
- **Claude (Anthropic)** — excellent for long-form analysis, research, and document understanding.
- **Gemini (Google)** — strong integration with Google's ecosystem and multimodal capabilities.
- **Llama (Meta)** — open-weight and customisable.
- **DeepSeek** — efficient and cost-effective for many tasks.

Each model has strengths and limitations. Selecting the right one depends on the **use case**.

### How to choose — the axes that matter

- **Capability** — reasoning depth, coding, math, multilingual, multimodal.
- **Context window** — how much you can feed at once (whole papers? whole codebases?).
- **Cost** — per-token price, which matters at scale.
- **Openness** — closed/API (GPT, Claude, Gemini) vs. open-weight (Llama, DeepSeek) you can self-host.
- **Privacy & governance** — can data leave your institution? Critical for student data and unpublished research.
- **Ecosystem** — SDKs, tool use, and availability in your existing tools.

> **A note on a fast-moving field:** rankings shift monthly. Treat the *axes* as durable and the *specific standings* as perishable — always check current benchmarks and your institution's approved-tools list.

### Open vs. closed — the decision that matters most for academia

- **Closed / API:** easiest, usually highest frontier quality, but data leaves your premises and you accept the vendor's terms.
- **Open-weight (self-hosted):** data stays in-house (great for sensitive student data and unpublished research), customisable, no per-call fee — but you own the infrastructure, operations, and any quality gap.

## 5. Storytelling Flow
1. **The editorial metaphor:** choosing a journal for a paper = choosing a model for a task. There's no "best journal," only "best fit."
2. **Define foundation model** via the pre-train→adapt idea.
3. **Tour the families** quickly through the comparison table — strengths as headlines, not specs.
4. **The pivotal axis:** open vs. closed, framed around *your* sensitive data.
5. **Make it personal:** run 2–3 faculty scenarios through the selector. Bridge to Module 8: "now that you can pick a tool, what do you *do* with it?"

## 6. Analogies
- **Choosing a journal / a co-author:** fit-for-purpose, not "the famous one."
- **Vehicles:** sedan (general GPT-style), long-haul truck (long-context Claude/Gemini for big documents), a kit car you assemble and own (open-weight Llama/DeepSeek self-hosted).
- **Cloud kitchen vs. your own kitchen:** API = someone else cooks (fast, but they see your ingredients); self-hosted = your kitchen, your data, your effort.

## 7. Faculty Examples 🏫 / Faculty-Centric Scenarios (use-case selector inputs)
- **Grading sensitive student work:** prefer **self-hosted open-weight** (data never leaves campus) *or* a vendor with a signed data-protection agreement and "no-training" guarantee.
- **Summarizing a 60-page thesis:** prefer a **long-context** model (Claude/Gemini class).
- **Department chatbot over public policies:** any capable model + **RAG**; cost-sensitive → open-weight self-host.
- **Quick lesson-plan brainstorming:** a general all-rounder via app is fine (no sensitive data).

## 8. Research Examples 🔬
- **Unpublished manuscript analysis:** confidentiality → open-weight/self-hosted or strict no-retention API; never paste embargoed data into a consumer app.
- **Coding/data analysis for experiments:** strong-coding models; reproducibility needs pinned model versions.
- **Multilingual corpus work:** check each family's language coverage explicitly.

## 9. Industry Examples 💼
- **Regulated industries (health/finance):** governance and data residency dominate → often open-weight on private infra, or enterprise tiers with compliance guarantees.
- **High-volume support:** cost-per-token and latency dominate → cheaper/faster models, RAG-grounded.
- **Multimodal product (image+text):** pick a strong multimodal family.

## 10. Visual Ideas
- **Interactive comparison table** (sortable/filterable) across the six axes.
- **Radar/spider charts** per model over axes (capability, context, cost-efficiency, openness, multimodal, ecosystem).
- **A decision tree** that routes from constraints (sensitive data? long docs? budget?) to a recommended class of model.

## 11. Animation Ideas 🎬
**A. Interactive Comparison Table (signature).**
- **Purpose:** let participants sort/filter models by what *they* care about.
- **Sequence/UI:** a Carbon `DataTable` of families × axes; clicking a column header re-sorts with an animated row reflow; toggling filters (open-only, long-context-only, multimodal-only) animates non-matching rows out. Hover a cell for a one-line rationale.
- **React idea:** Carbon `DataTable` with custom sort; Framer `layout` for row reflow.
- **Libraries:** Carbon DataTable + Framer Motion.

**B. Use-Case Selector (signature).**
- **Purpose:** turn the selection framework into a guided tool.
- **Sequence:** participant answers a few questions — *Is the data sensitive? How long are the inputs? Budget? Multimodal? Need self-hosting?* — and the tool **animates a recommendation card** plus a runner-up, with reasons tied to their answers, and the relevant radar chart highlights.
- **React idea:** a small rules engine scoring each model against weighted answers; Framer for the reveal; D3/Recharts radar.
- **Libraries:** Framer Motion + D3 (radar) + Carbon controls.

## 12/13. Interactive Playground / Use-Case Selector 🕹️
As **B** above: a `RadioButtonGroup`/`Dropdown` questionnaire → weighted scoring → ranked recommendation with transparent "why." Include a "Show my constraints" summary so the reasoning is auditable (important for an academic audience that distrusts black-box advice).

## 13. Hands-on Activity ✋
**"Pick a model for your real task."** (8 min.) Each participant writes one genuine task from their work, runs it through the selector, and notes whether they agree with the recommendation and why/why not. Pairs debate one disagreement. *Goal: transfer the framework to authentic decisions and surface that constraints, not hype, drive the choice.*

## 14. Demonstration Ideas
- Run the *same* prompt across two accessible models (e.g., ChatGPT vs. Claude vs. Gemini) side by side; discuss differences in style, structure, refusals, and length — concretely, not as a "winner."
- Show an open-weight model running locally (if infra available) to make "self-hosted / data stays here" tangible.

## 15. Quiz Questions ❓
**Q1 (MCQ).** "Foundation model" primarily means a model that is:
- A) Built only for one task
- B) **Pre-trained on broad data and adaptable to many downstream tasks** ✅
- C) Always open-source
- D) Free to use
*Explanation:* the defining trait is broad pre-training + adaptability.

**Q2 (MCQ).** For analyzing *unpublished, confidential* research data, the safest default is:
- A) Any free consumer chatbot
- B) **An open-weight self-hosted model, or an API with strict no-retention/compliance guarantees** ✅
- C) Whatever ranks #1 on a benchmark
- D) The cheapest API
*Explanation:* confidentiality/governance outrank raw capability here.

**Q3 (Conceptual).** Name two reasons an institution might choose an open-weight model over a frontier API. *Answer:* data stays in-house (privacy/governance) and no per-token cost / full customization — at the price of running the infrastructure and a possible quality gap.

**Q4 (Scenario).** You must summarize 200-page reports weekly on a tight budget with non-sensitive data. Which axes dominate, and what class of model? *Answer:* long context + cost-efficiency dominate; a long-context model with low per-token price, or a self-hosted long-context open model.

## 16. Common Misconceptions ⚠️
- **"There's one best model."** No — best is task- and constraint-dependent; standings change monthly.
- **"Open-source means lower quality."** Open-weight models are competitive and sometimes lead on specific tasks/cost.
- **"Using the app is the same as using the API."** Data handling, retention, and controls differ — read the terms.
- **"Bigger model = always better for me."** Often a smaller/cheaper/faster model + RAG beats a giant model for a specific task.

## 17. Key Takeaways
- Foundation model = **broad pre-training + broad adaptability**.
- Choose by **capability, context, cost, openness, privacy/governance, ecosystem** — not hype.
- **Open vs. closed** is the pivotal axis for sensitive academic data.
- Treat **specific standings as perishable**; the *axes* are durable.

## 18. IBM Carbon Component Suggestions
- Comparison as a sortable, filterable Carbon `DataTable` with `TableToolbarSearch` + filter `Dropdown`s.
- Per-model detail in `ExpandableTile`s; radar charts in `Tile`s.
- Selector questionnaire via `RadioButtonGroup`/`Dropdown`; recommendation as a highlighted `Tile` + `Tag`s.
- A pinned "fast-moving field — verify current standings" `InlineNotification` (info).

## 19. React Implementation Suggestions
- `models.ts`: typed `Model[]` with per-axis scores + a `rationale` map; keep an explicit `lastVerified` date and surface it in the UI.
- `ComparisonTable.tsx`: Carbon `DataTable` with custom `sortRow`; Framer `layout` on rows for animated reflow.
- `UseCaseSelector.tsx`: weights from answers → `score(model, weights)` → ranked list; render transparent "why" bullets.
- Keep model data in one config so updates are a single-file edit (the field changes fast).
