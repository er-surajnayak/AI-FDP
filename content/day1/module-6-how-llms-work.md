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

**The pipeline, stage by stage:**
1. **Prompt** — your text (plus any system instructions and history) enters.
2. **Tokenization** — text → token IDs (Module 4).
3. **Embedding (+ positional info)** — each token ID → a vector; position information is added so order matters (Transformers have no built-in sense of order).
4. **Transformer layers** — a stack of self-attention + feed-forward blocks (Modules 2–3). Each layer lets every token refine its representation by attending to all others. Dozens of layers build up increasingly abstract "understanding."
5. **Probability distribution** — the final layer produces, over the *entire vocabulary*, a probability for **the next token**. ("After 'The capital of France is', the token 'Paris' gets high probability.")
6. **Token selection** — pick a next token from that distribution (greedy, or sampled — see temperature).
7. **Append & repeat (autoregression)** — add the chosen token to the input and run the whole thing again for the *next* token. Repeat until a stop token or length limit.

**The key mental shift:** an LLM is fundamentally a **next-token predictor**. It does not "plan a sentence" then write it; it repeatedly answers "what's the most plausible next token given everything so far?" Coherence emerges from doing this extremely well, billions of parameters deep, over the whole context.

**Temperature — the creativity dial.** Before selection, a *temperature* reshapes the probability distribution:
- **Low (→0):** distribution sharpens; the top token dominates → **deterministic, focused, repetitive.** Good for facts, code, extraction.
- **High (→1+):** distribution flattens; lower-probability tokens get a real chance → **diverse, creative, riskier** (more errors/hallucination). Good for brainstorming.
- **top-k / top-p (nucleus):** additionally restrict sampling to the k most likely tokens, or the smallest set whose probability sums to p — pruning the long tail of nonsense.

**Why outputs vary run-to-run:** with temperature > 0, selection is *stochastic*, so the same prompt can yield different responses. At temperature 0 it's (near-)deterministic.

**Where hallucination comes from (set up Module 8's responsibility theme):** the model optimizes *plausibility*, not *truth*. A confidently-worded but fabricated citation is a high-probability *sounding* sequence — fluent and wrong. This is structural, not a bug to be fully patched — hence verification and grounding (RAG) matter.

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
**"Predict the next token."** (8 min.) Show 5 prompts (e.g., "The mitochondria is the powerhouse of the ___"). Participants write their top-3 predicted next tokens with rough probabilities, then compare with the simulator. Then set temperature high and low on one prompt and predict how outputs differ. *Goal: internalize next-token prediction and temperature.*

## 14. Demonstration Ideas
- In a real chat UI, run the same prompt 3× at default temperature → different outputs; then (if the tool allows) at temperature 0 → identical. 
- Ask for "5 references on X," then ask "verify each reference exists." Surface a hallucinated citation live → teach verification.

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
