# Day 1 — Live Demonstrations

Facilitator-run demos using **ChatGPT, Claude, and Gemini**. Each lists the **prompt**, the **expected outcome**, the **concept it reinforces**, and **facilitation notes**. Demos model *responsible use*: every factual demo ends with a verification beat.

> **Setup:** have all three tools open in browser tabs. Use a shared room account or your own. Where a demo needs determinism, set temperature 0 / "more precise" if the tool exposes it. **Never paste confidential data** during a public demo. Outputs vary by date/model — rehearse beforehand.

---

## Demo 1 — Rules can't capture language (Module 1) · ChatGPT
**Prompt:** *"Write 5 if/else rules to detect sarcasm in text. Then explain why this rule-based approach will fail in practice."*
**Expected:** a few brittle rules, followed by the model articulating exactly why learning-based methods are needed (context, tone, world knowledge).
**Reinforces:** the ML paradigm flip — the demo argues its own motivation.
**Notes:** great cold open; let the room read the model's self-critique aloud.

## Demo 2 — Long-range coreference (Module 2 & 3) · Claude
**Prompt:** *"In this sentence, what does 'it' refer to, and why? 'The trophy doesn't fit in the brown suitcase because it is too small.' Now change 'small' to 'large' and answer again."*
**Expected:** "it" = suitcase (too small) vs. "it" = trophy (too large) — the resolution flips with a single word far away (the classic Winograd schema).
**Reinforces:** attention as long-range, context-driven relevance; why fading memory fails.
**Notes:** pause before revealing the flip; ask the room to predict it.

## Demo 3 — Tokenization surprises (Module 4) · any tool's tokenizer (or the D.I. Notes counter)
**Prompt/action:** tokenize `"tokenization"`, a code snippet, an emoji string, and a non-English sentence; show counts.
**Expected:** `tokenization` splits; code and non-English use more tokens than expected.
**Reinforces:** tokens ≠ words; cost/length implications.
**Notes:** tie to a cost calc: "summarize a 30-page report daily for a year."

## Demo 4 — Context-window eviction (Module 4) · ChatGPT or Claude
**Prompt sequence:** give an instruction ("Always answer in French"), then send many long unrelated messages, then ask a question.
**Expected:** in a long-enough session the early instruction may be diluted/forgotten — illustrating the finite window. (If the model still complies, explain why robust systems re-state key constraints.)
**Reinforces:** the context window as a finite shared budget.
**Notes:** newer long-context models resist this; frame as "why we re-anchor instructions," not a guaranteed failure.

## Demo 5 — Embeddings cluster meaning (Module 5) · Gemini or Claude
**Prompt:** *"List the 10 words most semantically similar to 'pedagogy' and the 10 most similar to 'thermodynamics'."*
**Expected:** two clean, well-separated topical clusters.
**Reinforces:** proximity = similarity; emergent clusters.
**Notes:** follow with a deliberately tricky analogy that fails → segue to bias/polysemy.

## Demo 6 — Temperature & variability (Module 6) · any tool exposing creativity/precision
**Action:** run the same creative prompt ("Write a one-line metaphor for machine learning") 3× at default, then (if available) at temperature 0.
**Expected:** varied outputs at default; (near-)identical at temperature 0.
**Reinforces:** stochastic sampling; reproducibility needs fixed settings.
**Notes:** if the tool hides temperature, use the D.I. Notes Temperature Playground instead.

## Demo 7 — Hallucination, caught live (Module 6 & 8) · ChatGPT
**Prompt:** *"List 5 peer-reviewed papers (with authors, year, journal) on [a narrow niche topic]."* Then: *"For each, tell me how confident you are that this exact reference exists, and which you may have fabricated."*
**Expected:** plausible-looking references, some of which are fabricated; the follow-up surfaces the model's uncertainty.
**Reinforces:** plausibility ≠ truth; the verification discipline.
**Notes:** **the most important demo of the day.** Have participants try to verify one reference in a search engine in real time.

## Demo 8 — Same prompt, three models (Module 7) · ChatGPT vs. Claude vs. Gemini
**Prompt:** *"Explain overfitting to a first-year undergraduate in 80 words, then give one analogy."*
**Expected:** three competent answers differing in style, structure, analogy, and length.
**Reinforces:** model selection is about fit, not a single "winner."
**Notes:** resist declaring a winner; ask the room which fits *their* audience and why.

## Demo 9 — Weak prompt vs. C.R.A.F.T. (Module 8) · any tool
**Prompts:** (a) *"Make a quiz on photosynthesis."* vs. (b) a full C.R.A.F.T. prompt (role = exam author; context = grade level; action = 5 MCQs with answer key + distractor rationale; test = flag any uncertain facts).
**Expected:** a dramatic quality/usability gap.
**Reinforces:** prompt structure drives quality.
**Notes:** end the day here — empowering and immediately actionable.

---

## Facilitation checklist
- Rehearse every demo the morning of; models drift.
- Keep a **fallback**: if a live tool fails, the D.I. Notes playgrounds reproduce Demos 3, 5, 6 offline.
- After every *factual* demo, run a **verification beat** out loud — you are modeling the behavior you teach.
- Time-box to ~3–4 minutes each; demos illustrate, activities cement.
