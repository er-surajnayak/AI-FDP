# Module 6 — How Large Language Models Work

> *"You've met every part — tokens, embeddings, attention, the context window. Now watch them run as one machine: prompt in, response out, one token at a time. This is the assembly of the whole engine."*

---

## 2. Estimated Duration
**55 minutes** — 18 min pipeline walkthrough, 20 min pipeline + temperature + next-token simulators, 10 min FAQ/misconceptions, 7 min checkpoint.

## 3. Learning Objectives
- Trace the full pipeline: **Prompt → Tokenization → Embedding → Transformer Layers → Probability Distribution → Token Selection → Response.**
- Explain **autoregressive generation**: the model predicts **one token at a time**, feeding each back in.
- Explain **temperature** (and top-k/top-p) and their effect on the output distribution.

## 4. Teaching Content

### Learning by predicting the next token

A surprising fact about LLMs is that they are trained on a deceptively simple objective: **predict the next token**.

For example, given *"Artificial Intelligence is transforming"*, the possible next words include *education*, *healthcare*, *industry*, *research*. The model learns the **probabilities**. After seeing billions of examples, it becomes remarkably good at predicting what comes next — and that process eventually creates capabilities that appear intelligent.

### Why LLMs feel intelligent

When people first meet ChatGPT, they often assume *"it understands everything."* In reality, the model predicts likely continuations based on patterns learned during training. Yet because language itself contains reasoning, knowledge, and structure, the resulting behaviour often appears intelligent. This is one of the most fascinating aspects of modern AI.

### From prompt to response

When you enter a prompt, several things happen:

1. The prompt is converted into **tokens**.
2. Tokens are transformed into **embeddings**.
3. The embeddings pass through multiple **transformer layers**.
4. **Attention** identifies the relevant relationships.
5. The model predicts the **most likely next token**.
6. The process repeats until a complete response is generated.

What looks like a conversation is actually a highly sophisticated sequence of **next-token predictions**. The model never "plans" a whole sentence — coherence emerges from doing this one step extremely well, over and over.

### Temperature — the creativity dial

Before each token is chosen, a **temperature** reshapes the probability distribution:

- **Low (→ 0):** the distribution sharpens and the top token dominates → focused, deterministic, repetitive. Good for facts, code, and extraction.
- **High (→ 1+):** the distribution flattens and lower-probability tokens get a real chance → diverse, creative, riskier. Good for brainstorming.

With temperature above 0, selection is **random**, so the same prompt can give different answers. At temperature 0 it is (near-)deterministic.

### Where hallucination comes from

The model optimises for **plausibility**, not **truth**. A confidently-worded but fabricated citation is simply a high-probability-*sounding* sequence — fluent and wrong. This is structural, not a bug to be fully patched, which is why **verification and grounding (RAG)** matter.

## 5. Storytelling Flow
1. **Assemble the team:** "Token (Mod 4), Embedding (Mod 5), Attention (Mod 3) — line them up." Show the pipeline diagram lighting stage by stage.
2. **The big reveal:** "All of this, just to predict *one* token." Pause on the probability bars after "The capital of France is".
3. **The loop:** pick "Paris," feed it back, predict the next. Run the loop visibly to assemble a sentence.
4. **The dial:** introduce temperature; drag it; watch the bars sharpen and flatten; sample a few times to see variation.
5. **Honest note:** plausibility ≠ truth → hallucination → why we verify. Bridge to choosing models (Mod 7) and using them well (Mod 8).

## 6. Analogies
- **Autoregression = predictive text on steroids:** your phone suggesting the next word, but vastly more context-aware and looping to write paragraphs.
- **Temperature = a DJ's randomness knob:** low = play the #1 hit every time; high = dig into deep cuts, more surprising but riskier.
- **The pipeline = an assembly line:** each station transforms the work and passes it on; the final station places a bet on the next token.
- **Hallucination = a confident student bluffing an exam answer:** fluent, well-structured, and sometimes entirely made up.

## 7. Faculty Examples 🏫
- **Why the same essay prompt gives different drafts:** temperature > 0. For consistent rubric application, use temperature 0.
- **Why a model invented a citation:** it generated a *plausible-looking* reference, not a retrieved real one — teach students to verify.

## 8. Research Examples 🔬
- **Reproducibility:** for an experiment you must report temperature/seed/model version; otherwise outputs aren't reproducible — a methodological point researchers appreciate.
- **Constrained extraction** (pull structured data from papers): use low temperature + schema constraints for reliability.

## 9. Industry Examples 💼
- **Customer support bots:** low temperature for consistent, on-policy answers; grounding via RAG to avoid fabrication.
- **Marketing/ideation tools:** higher temperature to maximize variety of generated options.

## 10. Visual Ideas
- **The full pipeline as a flow diagram** where each stage is a clickable node showing its input/output.
- **A vocabulary probability bar chart** for the next token, updating as context grows.
- **A temperature → distribution morph:** the same bars sharpening/flattening as a dial moves.

## 11. Animation Ideas 🎬
**A. Interactive LLM Pipeline (signature).**
- **Purpose:** one canvas that runs the entire prompt→response journey, every stage **clickable and inspectable**.
- **Learning outcome:** participants can name each stage, its input, and its output.
- **Sequence:** type a prompt → tokens animate out (Mod 4 viz) → tokens morph to vectors (Mod 5 viz) → vectors flow through a stack of "Transformer layer" blocks (attention lines flicker inside) → out comes a **probability bar chart** for the next token → a token is selected and **flies back to the input** → the loop runs, assembling the response token by token.
- **UI behaviour:** **click any stage** to open an inspector panel ("Embedding: 'France' → [0.21, −0.04, …]"). Step/Play/Speed controls. A "show attention" toggle peeks inside a layer.
- **React idea:** **React Flow** for the stage graph (nodes = stages, edges = data flow); clicking a node opens a Carbon side panel; Framer Motion for the token-fly-back loop; reuse `<ProbabilityBars/>`, `<TokenChips/>`.
- **Libraries:** React Flow + Framer Motion + D3 (bars).

**B. Next-Token Prediction Simulator (signature).**
- **Purpose:** make autoregression and probability concrete.
- **Sequence:** show a prompt; display the **top-N next tokens with probability bars**; the user clicks one to append it (or presses "auto") and the bars recompute for the next position — building a sentence by hand.
- **UI behaviour:** "you drive" mode (click a token) vs. "auto" mode; a `Slider` for how many candidates to show.
- **React idea:** for an offline FDP, drive with a small precomputed prefix→distribution table or a tiny local n-gram/model; label as illustrative. Reuse `<ProbabilityBars/>`.
- **Libraries:** Framer Motion + D3.

**C. Temperature Playground (signature).**
- **Purpose:** feel temperature's effect.
- **Sequence:** a fixed next-token distribution; dragging the **temperature slider** smoothly **sharpens or flattens the bars** in real time; a "sample 10 times" button shows how often each token is picked (low T → almost always the top; high T → spread out).
- **UI behaviour:** `Slider` (0–1.5), `Button` (sample×10), a tally of samples; optional top-k/top-p toggles that grey out pruned tokens.
- **React idea:** apply `p_i ∝ exp(log p_i / T)` then renormalize; animate bar heights with Framer; `aria-valuetext` describes "distribution sharply peaked / flattened."
- **Libraries:** Framer Motion + D3.

## 12/13. Interactive Response-Generation Visualization 🕹️
Combine B + C: type a short prompt, set temperature, and watch the response assemble token by token with live probability bars and visible sampling — the capstone interactive of Day 1.

## 13. Hands-on Activity ✋
At its core an LLM does one thing: given everything so far, it predicts a probability distribution over the next token, picks one, appends it, and repeats. For "The mitochondria is the powerhouse of the ___," the token "cell" carries almost all the probability; for an open-ended prompt, dozens of tokens share it.

**Temperature** controls how the pick is made. Low temperature almost always takes the top token, giving focused, repeatable text. High temperature flattens the distribution so less likely tokens get a chance, giving variety and surprise — and more risk of going off the rails. Everything an LLM writes is this loop running hundreds of times.

## 14. Demonstration Ideas
Running the same prompt several times at a normal temperature gives different answers each time — proof that generation is sampling from a distribution, not retrieving a fixed reply. At temperature zero, the outputs become near-identical.

The same mechanism explains **hallucination**. Asked for five references, a model will happily produce five plausibly-formatted citations whether or not they exist, because it is optimising for likely-looking text, not for truth. Plausibility is not verification — which is why every factual output needs a check.

## 15. Quiz Questions ❓
**Q1 (MCQ).** An LLM fundamentally generates text by:
- A) Retrieving stored sentences
- B) **Predicting one token at a time and feeding it back (autoregression)** ✅
- C) Translating from a hidden language
- D) Searching the web each time
*Explanation:* it repeatedly predicts the next token from the distribution and appends it.

**Q2 (MCQ).** Raising the temperature:
- A) Makes output more deterministic
- B) **Flattens the distribution → more diverse/creative (and riskier) output** ✅
- C) Increases the context window
- D) Reduces token cost
*Explanation:* higher T gives lower-probability tokens more chance.

**Q3 (Conceptual).** Why can the same prompt give different answers? *Answer:* with temperature > 0, token selection is stochastic; at temperature 0 it's (near-)deterministic.

**Q4 (Scenario).** You need reliable, repeatable extraction of dates from 1,000 documents. What settings, and why? *Answer:* low/zero temperature (deterministic, focused) + a constrained output format; pair with verification — plausibility ≠ truth.

**Q5 (MCQ).** At temperature 0, an LLM given the identical prompt twice will:
- A) Always refuse the second time
- B) **Produce (near-)identical output both times** ✅
- C) Get progressively more creative
- D) Expand its context window
*Explanation:* temperature 0 always takes the highest-probability token, making generation deterministic.

**Q6 (Conceptual).** Why does an LLM sometimes invent a confident, well-formatted fact that is simply false? *Answer:* it generates the most *likely-looking* next tokens with no built-in check against reality — fluent and plausible is the objective, not true, so a fabricated citation is as easy to produce as a real one.

## 16. Common Misconceptions ⚠️
- **"The model plans the whole answer first."** No — it predicts token by token; structure emerges from the loop.
- **"It looks things up / searches the web by default."** No — it generates from learned parameters unless explicitly given tools/retrieval.
- **"Temperature 0 = always correct."** It's *deterministic*, not *truthful*; it can repeat a confident error every time.
- **"Hallucination is a fixable bug."** It's structural (plausibility optimization); mitigated by grounding/verification, not eliminated.

## 17. Key Takeaways
- LLM = **autoregressive next-token predictor**: prompt → tokens → embeddings → Transformer layers → next-token distribution → select → loop.
- **Temperature/top-k/top-p** shape the distribution: low = focused/deterministic, high = diverse/creative.
- **Plausibility ≠ truth** → hallucinations are inherent → verify and ground.
- Every Day-1 concept lives in this one pipeline.

## 18. IBM Carbon Component Suggestions
- Pipeline stage inspector as a Carbon `Slideover`/side panel; stage list mirrored in an `Accordion`.
- Temperature/top-k/top-p as `Slider`s + `Toggle`s; sample tally as `Tag`s or a small `DataTable`.
- FAQ as an `Accordion`; misconceptions as warning `InlineNotification`s.
- A "Presenter step" `ProgressIndicator` for the pipeline walkthrough.

## 19. React Implementation Suggestions
- `LlmPipeline.tsx`: React Flow nodes for the 7 stages; selecting a node sets `inspected` → Carbon panel renders that stage's illustrative data; a `runLoop()` drives the token-fly-back with Framer.
- `softmaxWithTemperature(logits, T)` util shared by the temperature and next-token components.
- For offline determinism, store `prefixToDistribution.json` for a handful of demo prompts; clearly label "illustrative, not live inference" (or wire a Vercel serverless proxy for live mode).
- Reuse `<ProbabilityBars/>` and `<TokenChips/>`; respect `useReducedMotion()` with a static assembled-response fallback.
