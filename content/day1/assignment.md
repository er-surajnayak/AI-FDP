# End-of-Day 1 Assignment
### Multi-Model Research Paper Analysis & Critique

A capstone that exercises **every Day-1 concept** on an authentic scholarly task, and builds the habit that matters most: **using LLMs as assistants while you verify and judge.**

**Time:** ~60–90 minutes (can be done that evening or overnight).
**Deliverable:** a 2–3 page structured report (template below) submitted via the platform or LMS.

---

## Scenario
You will use **at least two different LLMs** (e.g., ChatGPT, Claude, Gemini, or an open-weight model) to analyze a research paper **from your own domain**, then **critically compare** the tools — because the goal is not to trust AI, but to *direct and verify* it.

## Instructions

1. **Select a paper.** Choose one peer-reviewed paper from your field that you know reasonably well (so you can judge the AI's accuracy). Prefer an open-access PDF you can share with the tools.

2. **Use at least two LLMs.** Run the *same* prompts through both. Note each model name/version and the date (models drift).

3. **Generate summaries.** From each model, get:
   - a 150-word plain-language summary, and
   - a structured extract: research question, method, key findings, stated limitations.
   Use a C.R.A.F.T.-style prompt (role, context, action, verification request).

4. **Identify research gaps.** Ask each model to propose 2–3 research gaps or future directions implied by the paper.

5. **Compare outputs.** Where do the two models agree/disagree on the summary, the findings, and the gaps? Which was more accurate, better structured, more useful — and *why*?

6. **Identify hallucinations.** Fact-check every claim, number, and (especially) any **citation** the models produced against the actual paper. List each hallucination or unsupported claim you found, and which model produced it. (If you found none, state how you verified.)

7. **Generate future-work suggestions.** Synthesize *your own* 2–3 future-work directions, informed by but not copied from the models — note where you agreed with, rejected, or improved on their suggestions.

8. **Reflect.** Two short paragraphs: (a) how the Day-1 concepts (tokens/context window, attention, embeddings, temperature, model choice) showed up in this task; (b) how you'll responsibly use LLMs in your research, including disclosure and privacy.

## Required report template
```
1. Paper citation (full)
2. Models used (name, version, date)
3. Prompts used (paste them)
4. Summaries: Model A | Model B (side by side)
5. Extracted Q/method/findings/limitations: A | B
6. Proposed research gaps: A | B
7. Comparison & verdict (which, why)
8. Hallucinations / unsupported claims found (model, claim, how verified)
9. Your own future-work directions
10. Reflection (concepts + responsible use)
```

## Evaluation Rubric (100 points)

| Criterion | Excellent (full) | Adequate (≈60%) | Weak (≈25%) | Pts |
|---|---|---|---|---|
| **Paper selection & framing** | Apt, domain-relevant, well-cited | Relevant but thin | Off-topic/uncited | 10 |
| **Prompt quality (C.R.A.F.T.)** | Structured, reproducible, includes verification ask | Some structure | Vague one-liners | 15 |
| **Summary accuracy** | Faithful, captures contribution + limits | Mostly accurate | Misrepresents paper | 15 |
| **Gap analysis** | Insightful, paper-grounded | Generic but valid | Superficial/irrelevant | 15 |
| **Cross-model comparison** | Specific, evidence-based verdict | Some comparison | Vague "both fine" | 15 |
| **Hallucination detection** | Rigorous fact/citation check; clear findings | Partial checking | None/asserts trust | 20 |
| **Reflection & responsible use** | Ties concepts to practice; addresses privacy/disclosure | Brief | Missing | 10 |

**Pass:** ≥ 60. **Distinction:** ≥ 85 *and* at least one correctly identified hallucination (or rigorous proof none occurred).

## Expected Learning Outcomes
On completion, participants will have:
- Applied tokens, context windows, attention, embeddings, temperature, and model selection to a real task.
- Practiced **structured prompting** and **systematic verification**.
- Experienced **model-to-model variation** and learned to choose by evidence.
- Detected (or rigorously ruled out) **hallucination** in their own domain.
- Articulated a **responsible, disclosable** plan for LLM use in their research.

## Facilitator marking notes
- Reward *evidence* of verification over polish. A report that catches a fabricated citation and shows the search that disproved it outranks a beautifully written but uncritical one.
- Watch for the most common failure: accepting AI summaries without checking against the paper. Penalize per the hallucination-detection row.

## Carbon implementation note
Deliver as a guided multi-step flow: Carbon `ProgressIndicator` for the 8 steps, `TextArea`/`FileUploader` for inputs, a side-by-side `Grid` for Model A vs. B, and the rubric rendered as a `DataTable`. Provide a "Download report as PDF/Markdown" action for LMS submission.
