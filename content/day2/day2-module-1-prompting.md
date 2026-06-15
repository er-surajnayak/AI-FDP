# Module 1 — Prompting Techniques

> *"The model already knows the answer — the only question is whether your prompt gives it any reason to actually say it."*

---

## 2. Estimated Duration
**50 minutes** — roughly 25 minutes on the core techniques, 15 on academic examples and demonstrations, and 10 on quiz and misconceptions.

## 3. Learning Objectives
- Understand that the prompt — not a different model — is what steers the quality, shape, and reliability of an answer.
- Recognise and apply the core prompting techniques: zero-shot, few-shot, chain-of-thought, role/persona, grounding, structured output, prompt chaining, and self-checking.
- Use the C.R.A.F.T. checklist (Context, Role, Action, Few-shot, Test) to turn a vague request into a precise, repeatable prompt.

## 4. Teaching Content

Here is the single most useful idea in this whole module: **the model is the same; the prompt is the steering wheel.**

When you type a question into a chatbot and the answer is bland, generic, or just plain wrong, the instinct is to blame the model — "the AI isn't smart enough." Almost always, that is the wrong diagnosis. The same model, given a sharper prompt, will hand you something three times better. You did not upgrade the engine. You just stopped yanking the wheel and started actually driving.

Think of the model as an absurdly well-read intern who has skimmed most of the internet but has zero idea what *you* specifically want, what your standards are, or what the answer is for. Your prompt is the briefing. A vague briefing gets a vague essay. A precise briefing gets a precise deliverable. The techniques below are just structured ways of writing a better briefing.

### Zero-shot prompting

Zero-shot is the default: you ask for a thing, with no examples, and trust the model to figure it out. It works surprisingly often, especially for common tasks.

The trap is being too thin. Watch how much a little specificity buys you.

```text
Before (vague zero-shot):
Summarise this paper.

After (specific zero-shot):
Summarise the abstract below for a final-year undergraduate who has
taken one statistics course. Three sentences. Plain English, no jargon.
End with the one limitation the authors admit to.
```

Same model, same "zero-shot" category — but the second prompt tells it the *audience*, the *length*, the *reading level*, and the *one thing you actually care about*. The output goes from a shapeless blob to something you could paste into a lecture slide.

### Few-shot prompting

When the task is fuzzy or stylistic, *show* the model what good looks like instead of describing it. You paste in two or three worked examples, then give it a fresh input. This is "few-shot."

```text
Classify each student comment as Concern, Praise, or Suggestion.

"The pacing in week 3 was too fast." -> Concern
"Loved the worked examples in lecture 5." -> Praise
"Could we get the slides before class?" -> Suggestion

"The midterm felt unrelated to the homework." ->
```

The model now copies your *pattern*, not just your words. Few-shot is the difference between explaining a grading scheme in paragraphs and just showing three already-graded answers — the second is faster and far more consistent. It is the workhorse technique for anything where tone, format, or judgement matters.

### Chain-of-thought ("think step by step")

Models are prone to blurting out an answer the way a student blurts the first thing that pops into their head. For anything involving reasoning — maths, logic, multi-step analysis — you get dramatically better results by asking it to **show its working**.

```text
Before:
A study has 240 participants split 5:3 between treatment and control.
How many are in the control group?

After:
A study has 240 participants split 5:3 between treatment and control.
Think step by step: find the total number of parts, the value of one
part, then the control group. Show each step, then give the final number.
```

The magic phrase "think step by step" forces the model to lay out intermediate steps, and reasoning through the parts makes it far less likely to fumble the arithmetic. The reasoning is not decoration — generating the steps is *what makes the final answer correct*. For any quantitative or logical task, this one habit pays off constantly.

### Role / persona prompting

Telling the model *who to be* shifts its vocabulary, its standards, and what it bothers to mention. A request answered "as a helpful assistant" is generic; the same request answered "as a peer reviewer" is sharp and critical.

```text
Act as a peer reviewer in computational biology for a top-tier journal.
Read the methods paragraph below. Identify the two weakest claims, ask
the questions a sceptical reviewer would ask, and suggest one experiment
that would strengthen the paper. Be rigorous but constructive.
```

The persona is not theatre — it loads a whole set of expectations in one phrase. "Act as a stern grammar editor," "act as a curious first-year student," and "act as a journal reviewer" produce three genuinely different responses to the same text, because each persona carries its own standards for what counts as a good answer.

### Giving context and grounding

By default the model answers from its general training — which means it can confidently invent details. The fix is **grounding**: paste in the actual source material and tell it to answer *only* from that.

```text
Using ONLY the syllabus text between the triple quotes, answer the
question. If the answer is not in the text, reply "Not specified in
the syllabus." Do not use outside knowledge.

"""
[paste the full syllabus here]
"""

Question: What is the late-submission penalty for assignments?
```

Grounding is the antidote to hallucination. When you hand the model the real document and forbid it from guessing, it stops making things up and starts quoting your actual policy. This is the foundation of every "chat with your PDF" tool you have seen.

### Structured output

If you want the answer in a particular shape — a table, JSON, a marking grid — just ask for it explicitly. The model is happy to comply, and structured output is far easier to scan, paste, or feed into other software.

```text
Extract the key details from each study below into a table with these
exact columns: Author (year) | Sample size | Method | Main finding.
One row per study. If a field is missing, write "n/r".
```

Or, when the output feeds a spreadsheet or script:

```text
Return the result as JSON with this schema:
{ "topic": string, "difficulty": "easy"|"medium"|"hard", "question": string }
Return only the JSON, no commentary.
```

Naming the columns or the schema removes ambiguity. You are no longer hoping the model formats things nicely — you are telling it exactly how.

### Prompt chaining

Big, messy tasks go wrong when crammed into one giant prompt. The fix is to **break the task into a sequence of smaller prompts**, each one feeding the next.

Suppose you want a literature review section. Chaining it might look like:

```text
Step 1: From these 8 abstracts, extract each study's method and finding
        into a table.
Step 2: Group the studies into 3 themes based on that table.
Step 3: Write one paragraph per theme, citing the relevant studies.
Step 4: Draft a closing paragraph naming the gap none of them address.
```

Each step is small enough that the model does it well, and you can inspect and correct the output before it flows into the next step. It mirrors how a careful researcher actually works — outline, then sort, then draft — rather than demanding a finished chapter in one breath.

### Self-check and self-consistency

The model can be its own first reviewer. After it produces an answer, ask it to **critique or verify its own work**.

```text
Here is your draft rubric. Now act as a critic: check that every
criterion is observable and measurable, flag any that overlap, and
list anything a student could game. Then give me a corrected version.
```

A close cousin is self-consistency: ask the model to solve a tricky problem two or three independent ways and see whether the answers agree. When they all land on the same number, your confidence rises; when they diverge, you have just caught a problem you would otherwise have trusted. A second pass costs you one extra prompt and routinely catches sloppy reasoning.

### Being specific and using delimiters

Two small habits punch far above their weight. First, **be specific** — every constraint you add (length, audience, tone, format, what to exclude) narrows the model toward what you actually want. Second, **use delimiters** to separate your instructions from your content, so the model never confuses the two.

```text
You are editing the text inside the <draft> tags for clarity only.
Do not change meaning or add new claims.

<draft>
[paste the messy paragraph here]
</draft>

Return the edited paragraph, then a one-line note on what you changed.
```

Triple quotes, XML-style tags, or clear headers all work. The point is that the model can see exactly where your instruction ends and the raw material begins — which matters enormously when you are pasting in a student essay that itself contains instructions.

### Prompting is a conversation, not a one-shot

The single biggest mindset shift: a good result rarely comes from the first prompt. **Prompting is iterative.** You ask, you read the answer, you say "shorter," "more critical," "now in a table," "you missed the limitation." Each turn steers closer. Treating it as a dialogue — rather than expecting a perfect answer from a cold start — is what separates people who find these tools magical from people who find them useless.

### The C.R.A.F.T. pattern

All of this collapses into one checklist you can run in your head before hitting enter:

- **C — Context:** what is this for, who is the audience, what background does the model need?
- **R — Role:** who should the model be? (peer reviewer, patient tutor, copy editor)
- **A — Action:** the precise task and the constraints — length, format, what to include and exclude.
- **F — Few-shot:** one or two examples of what "good" looks like, when the task is fuzzy.
- **T — Test:** check the output, then refine — and ask the model to self-check when it matters.

If a prompt is disappointing, walk down C.R.A.F.T. and you will almost always spot the missing piece.

## 6. Analogies

**The brilliant, very literal intern.** The model is a genius intern who has read everything and assumes nothing. Say "write me something about climate" and you get a shrug-shaped essay. Say "write a 150-word explainer on urban heat islands for first-year geography students, ending with one local example," and the intern nails it. The intelligence was always there; the *briefing* was the variable.

**Few-shot is a worked example before the quiz.** No teacher hands students a fresh problem type with no demonstration. You work two examples on the board first, then set them loose. Few-shot prompting is exactly that: two examples on the board, then the real question.

**Chain-of-thought is "show your working."** We make students show their working not to be cruel, but because reasoning out loud catches the silly mistakes that snap answers miss. Asking the model to think step by step is the same trick, and it works for the same reason.

## 7. Faculty Examples 🏫
- Turning a one-line learning outcome into a full **marking rubric** with observable criteria and band descriptors, then asking the model to self-check that each criterion is measurable.
- Generating a **quiz** at a fixed difficulty and Bloom's level, returned as structured JSON so it drops straight into a quiz platform.
- Drafting **personalised feedback** for a batch of submissions by few-shotting three examples of the tone and depth you want, then handing it fresh answers.
- Building a **lesson plan** for a 90-minute session via prompt chaining: objectives first, then activities, then timing, then assessment.

## 8. Research Examples 🔬
- Summarising a stack of abstracts into a **comparison table** (author, sample, method, finding) for a literature review's first draft.
- Structuring a **related-work section** by chaining: extract findings, then cluster into themes, then write a paragraph per theme.
- **Brainstorming** alternative explanations or experimental designs by assigning the persona of a sceptical reviewer who pokes holes in the current approach.
- **Extracting data** from messy prose results into a clean, schema-defined JSON or CSV ready for analysis.

## 9. Industry Examples 💼
- Drafting a **consultancy report** outline, then filling each section through prompt chaining, with a final self-check pass for internal consistency.
- **Structured extraction** of key terms, dates, and obligations from a long contract or policy document into a labelled table, grounded strictly in the source text.
- Using a **role-based persona** ("act as a financial analyst", "act as a compliance officer") to produce the same data summary through different professional lenses.
- Converting raw stakeholder interview notes into a **themed findings document** with quotes mapped to themes.

## 13. Hands-on Activity ✋

A subtle point worth dwelling on: **being specific beats being polite.** People often assume a wordy, courteous prompt — "Could you please kindly help me with a small summary if it's not too much trouble?" — earns a better answer. It does not. The model does not reward manners; it rewards *information*. Those polite words carry zero constraints, so the output stays vague. Every word spent on please-and-thank-you is a word not spent telling the model the audience, the length, or the format.

Swap the courtesy for constraints and the answer transforms. "Summarise this in exactly four bullet points for a department meeting, each under 15 words, focused on the budget implications" is blunt, even a little bossy — and it produces a far sharper result than its polite cousin. The lesson is not to be rude; it is that clarity is the kindness the model actually responds to.

## 14. Demonstration Ideas

Picture the same task run two ways. The vague version: "make a rubric for an essay." Back comes a generic five-row table with criteria like "Content — good content gets high marks," which is so circular it could grade anything and therefore grades nothing. It looks like a rubric and helps no one.

Now the structured version: "Act as an experienced writing instructor. Create a rubric for a 2,000-word argumentative essay in a first-year politics course. Four criteria: Thesis, Evidence, Structure, Mechanics. For each, give four bands (Excellent, Good, Developing, Weak) with one observable sentence per band. Return it as a table." The result is a genuinely usable instrument — specific, observable, fair. Identical model, identical underlying ability. The only thing that changed was the briefing, and the gap between the two outputs is the entire argument of this module.

## 15. Quiz Questions ❓

**Q1 (MCQ).** Your first answer from a model is bland and generic. What is usually the most effective fix?
- A) Switch to a completely different AI model
- B) **Rewrite the prompt with audience, length, and format constraints** ✅
- C) Add "please" and "thank you" to the prompt
- D) Ask the same vague question again and hope
*Explanation:* The model is the same; the prompt is the steering wheel. Adding concrete constraints almost always improves the output more than changing models.

**Q2 (MCQ).** What is "few-shot" prompting?
- A) Asking the model the same question several times quickly
- B) Limiting the model to a short response
- C) **Including two or three worked examples in the prompt before the real input** ✅
- D) Giving the model only a few seconds to answer
*Explanation:* Few-shot means showing the model a small number of input-output examples so it copies the pattern, rather than describing what you want in words.

**Q3 (MCQ).** Why does "think step by step" improve answers on maths and logic problems?
- A) It makes the model search the internet
- B) It switches the model into a smarter mode that costs more
- C) **Generating intermediate reasoning steps makes the final answer more likely to be correct** ✅
- D) It has no real effect; it just looks nice
*Explanation:* Chain-of-thought forces the model to lay out intermediate steps, and producing that reasoning is what reduces careless errors in the final answer.

**Q4 (Conceptual).** What does "grounding" a prompt mean, and what problem does it solve? *Answer:* Grounding means pasting in the actual source material and instructing the model to answer only from it. It solves hallucination — the model stops inventing plausible-sounding details and instead draws from (or quotes) the real document you provided.

**Q5 (Conceptual).** Why are delimiters (triple quotes, tags, headers) useful in a prompt? *Answer:* They clearly separate your instructions from the content you are pasting in, so the model does not confuse the two — crucial when the pasted text (like a student essay) might itself contain things that look like instructions.

**Q6 (Conceptual).** What does the "T" in C.R.A.F.T. stand for, and why does it matter? *Answer:* Test — check the output and refine, treating prompting as an iterative conversation rather than a one-shot. It matters because the best result rarely comes from the first prompt; you steer closer with each turn, and you can ask the model to self-check when accuracy counts.

## 16. Common Misconceptions ⚠️
- **"A bad answer means the model isn't smart enough."** Far more often it means the prompt was thin. The same model with a sharper prompt produces a far better answer — the bottleneck is usually the briefing, not the brain.
- **"Being polite makes the model perform better."** Courtesy carries no information. Specific constraints — audience, length, format, what to exclude — are what actually improve the output. Be clear, not just nice.
- **"You should get the perfect answer from your first prompt."** Prompting is a conversation. The skill is in the follow-ups — "shorter," "more critical," "now as a table" — not in crafting one flawless opening line.
- **"Asking the model to show its reasoning is a waste of tokens."** On reasoning tasks, the steps are not decoration — generating them is what makes the final answer correct. Skipping the working is how you get confident wrong answers.

## 17. Key Takeaways
- **The model is the same; the prompt is the steering wheel** — most "bad AI" moments are really thin-prompt moments.
- **Show, don't just tell** — few-shot examples and worked patterns beat long verbal descriptions for any fuzzy or stylistic task.
- **Make it think and make it ground** — "step by step" reasoning and pasting in real source material are the two biggest reliability upgrades you can make.
- **Ask for the shape you want** — naming a table, JSON schema, or rubric format turns a shapeless answer into a usable deliverable.
- **Run C.R.A.F.T. and treat it as a conversation** — Context, Role, Action, Few-shot, Test, then refine; the best results come from iterating, not from one perfect shot.
