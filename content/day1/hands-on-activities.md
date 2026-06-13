# Day 1 — Hands-On Activities

Eight executable activities, ordered to **progressively build understanding** from intuition (Activity 1) to applied judgment (Activity 8). Each is runnable within an FDP session, needs only a browser (plus, where noted, access to one LLM), and maps to a module. Time-boxed for a packed day.

> **Facilitator note:** Activities 1–5 can run fully offline using the D.I. Notes playgrounds (illustrative data). Activities 6–8 benefit from a live LLM (ChatGPT/Claude/Gemini); provide a shared room account or have participants use their own.

---

## Activity 1 — Rules vs. Examples (Module 1) · 6 min · Pairs
**Goal:** feel the brittleness of rules vs. the generalization of learning.
**Steps:** In the "Rules vs. Examples" playground, first write if/else conditions to separate two image classes — watch edge cases break it. Then switch to Examples mode, label a few images, and watch a toy classifier generalize.
**Debrief prompt:** "Name one task in your field that's better as rules, and one better as learning. Why?"
**Outcome:** articulate the ML paradigm flip in their own discipline.

## Activity 2 — Find the Long-Range Dependency (Module 2) · 6 min · Individual → Pairs
**Goal:** internalize why distance breaks recurrent memory.
**Steps:** Given 3 clause-heavy sentences, underline the word whose meaning depends on a distant word; rate (1–5) how hard a "fading-memory reader" would find each. Compare with a partner. Then run the RNN Memory-Loss animation at increasing sentence lengths.
**Debrief:** "What single factor most increases difficulty?" (Answer: distance/length.)
**Outcome:** define long-range dependency and connect it to the RNN limitation.

## Activity 3 — Be the Attention Head (Module 3) · 8 min · Pairs
**Goal:** experience attention as contextual relevance — and meet ambiguity.
**Steps:** Sentence: *"The professor told the student that she had won the award."* (1) Decide what "she" refers to; argue why. (2) Hand-draw attention arcs for 3 words. (3) Type the sentence into the Self-Attention Playground; compare. (4) Add a disambiguating clause and re-run.
**Debrief:** "What made the model (and you) shift the resolution?" (New context re-weighted attention.)
**Outcome:** explain self-attention and that attention is context-dependent.

## Activity 4 — Guess the Token Count (Module 4) · 6 min · Individual
**Goal:** calibrate that tokens ≠ words and vary by content.
**Steps:** For 5 strings (tweet, paragraph, code snippet, non-English sentence, chemistry formula) write a token-count guess. Reveal with the Token Counter. Then estimate the monthly cost of summarizing one string 365×.
**Debrief:** "Which content type surprised you, and why is it token-expensive?"
**Outcome:** estimate length/cost; explain tokenization's practical stakes.

## Activity 5 — Cluster the Concepts + Test an Analogy (Module 5) · 8 min · Pairs
**Goal:** internalize semantic clustering and the limits of vector arithmetic.
**Steps:** Given 15 mixed-domain word cards, group them by meaning; compare with the Embedding Visualizer's clusters. Then propose one analogy (A − B + C) and **predict** the answer before running the Analogy tool. Find one analogy that fails and hypothesize why (polysemy/bias).
**Debrief:** "Where did the geometry disagree with intuition?"
**Outcome:** explain proximity = similarity and the honest caveats of embeddings.

## Activity 6 — Drive the Generator (Module 6) · 8 min · Individual
**Goal:** make autoregression and temperature concrete.
**Steps:** In the Next-Token + Temperature playground: (1) For "The mitochondria is the powerhouse of the ___," predict top-3 next tokens with rough probabilities; compare with the bars. (2) Set temperature low, then high, on one prompt; predict and observe output variability; press "sample ×10."
**Debrief:** "When would you want low temperature in your work? High?"
**Outcome:** explain next-token prediction and temperature trade-offs.

## Activity 7 — Pick a Model for Your Real Task (Module 7) · 8 min · Individual → Pairs
**Goal:** apply the selection framework to an authentic decision.
**Steps:** Write one genuine task from your work. Run it through the Use-Case Selector (sensitive data? input length? budget? multimodal? self-host?). Note the recommendation and whether you agree. Debate one disagreement with a partner.
**Debrief:** "Which constraint dominated your choice — and was it capability or governance?"
**Outcome:** justify a model choice by constraints, not hype.

## Activity 8 — Prompt Lab: Build a Workflow You'll Use (Module 8) · 12 min · Individual (live LLM)
**Goal:** produce one responsible, reusable workflow.
**Steps:** (1) Pick a real task (a quiz, a summary, a proposal outline, docs). (2) Write a weak one-line prompt; run it. (3) Rewrite with **C.R.A.F.T.** (Context, Role, Action, Few-shot, Test); run again. (4) Run the **verification checklist** on the better output (facts? citations? bias? privacy? disclosure?). (5) Save the prompt for Monday.
**Debrief:** "What did C.R.A.F.T. change? What failed verification?"
**Outcome:** a vetted prompt + the habit of structured prompting and verification.

---

## Suggested clustering for a tight schedule
- **Morning (concepts):** Activities 1–5 woven into Modules 1–5.
- **Afternoon (mechanics + application):** Activities 6–8 woven into Modules 6–8, flowing directly into the end-of-day assignment.

## Carbon implementation note
Render activities as `ExpandableTile`s with a `Tag` for module + duration, a `Checkbox` "completed" that advances the `ProgressIndicator`, and a `Button` linking to the relevant playground route.
