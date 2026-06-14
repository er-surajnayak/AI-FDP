# Module 4 — Tokenization

> *"The model never actually sees your words. It sees tokens — and understanding that gap explains pricing, length limits, and a surprising number of 'why did it do that?' moments."*

---

## 2. Estimated Duration
**40 minutes** — 15 min teaching, 12 min tokenizer + context-window playgrounds, 8 min activity + cost demo, 5 min checkpoint.

## 3. Learning Objectives
- Define a **token** and explain why LLMs operate on tokens rather than words or characters.
- Explain **token limits** and the **context window**, and reason about truncation.
- Estimate **cost** and length in tokens, and explain why "1 word ≠ 1 token."

## 4. Teaching Content

A common misconception is that LLMs understand **words**. They don't — they understand **tokens**.

Think of tokens as pieces of language. Take the sentence *"Generative AI is transforming education."* A model may break this into smaller units. Why? Because computers cannot process language directly — they need **numerical representations**. Tokens are the bridge between human language and machine computation.

- Common words → one token: `"the"`, `"research"`.
- Rare or long words → split: `"tokenization"` → `token` + `ization`.
- Numbers, code, emojis, and other languages tokenize differently (often less efficiently).
- Rule of thumb (English): **~4 characters ≈ 1 token**, **~100 tokens ≈ 75 words** — always approximate, and verify with a tokenizer.

### Why tokens, not words or characters?

- **Characters** would make sequences extremely long and force the model to relearn spelling from scratch.
- **Whole words** would need a gigantic vocabulary and still fail on unseen words and typos.
- **Sub-word tokens** are the sweet spot: a manageable vocabulary that can compose *any* word from known pieces.

### Token limits and the context window

A model can only "see" a fixed number of tokens at once — its **context window**. This window holds **everything**: the system prompt, your prompt, any documents you paste, the conversation history, *and* the response being generated.

- Exceed it and content gets **truncated** — usually the oldest turns drop out. This is why a long chat "forgets" what you said at the start.
- Longer windows allow whole-document reasoning but cost more and can dilute attention.

### Why this matters for faculty

- **Cost** is billed per token (input + output). Length is money.
- **Length limits** decide whether your 40-page paper fits or must be chunked.
- **"It forgot my instructions"** is often a context-window eviction, not a reasoning failure.

## 5. Storytelling Flow
1. **Surprise:** type a sentence; reveal it's not split into the words you expected. "`tokenization` is two tokens; `the` is one; a space matters."
2. **Why:** walk the characters-vs-words-vs-subwords trade-off quickly.
3. **The window:** "everything the model knows *right now* lives in one finite window — prompt, docs, history, and the answer."
4. **Consequences:** truncation (the "forgetful long chat"), cost, and whether your document fits.
5. **Empower:** "now you can estimate length and cost, and diagnose 'it forgot' correctly." Bridge: "tokens are just IDs — how do those IDs get *meaning*? Embeddings, next."

## 6. Analogies
- **LEGO bricks:** sub-word tokens are bricks; any word (even a made-up one) can be built from a finite brick set.
- **Syllables:** you can pronounce a never-seen word by its syllables; the model composes meaning from sub-word pieces similarly.
- **A whiteboard of fixed size (context window):** to write something new when it's full, you erase the oldest lines. That's truncation.
- **A taxi meter (cost):** every token in and out ticks the meter.

## 7. Faculty Examples 🏫
- **Pasting a full syllabus or rubric:** estimating whether it fits in one prompt, and why a very long PDF must be summarized or chunked.
- **Long advising chats "forgetting" earlier context:** explained as window eviction; fix by re-stating key constraints.

## 8. Research Examples 🔬
- **Feeding a full paper for summarization:** a 9,000-word paper ≈ ~12,000 tokens — fits some models, not others; motivates chunking + retrieval (a bridge to RAG).
- **Domain jargon and chemical/equation notation** often tokenize inefficiently (more tokens per concept), affecting cost and quality in scientific use.

## 9. Industry Examples 💼
- **API cost budgeting:** a support bot processing 10k tickets/day — multiply tokens × price to forecast spend; trimming prompts saves real money.
- **Non-English markets:** many languages use *more* tokens per sentence than English, raising cost and consuming the window faster — a real localization concern.

## 10. Visual Ideas
- **Live token split:** text where each token is a colored chip with its token-ID underneath; the boundaries are the lesson.
- **Token-count meter** that fills as you type, turning yellow→red as it nears a chosen model's limit.
- **Context-window "conveyor belt":** tokens enter on the right; when the belt is full, the oldest tokens fall off the left edge.

## 11. Animation Ideas 🎬
**A. Tokenization Animation (signature).**
- **Purpose:** show Sentence → Token splitting → Token IDs.
- **Learning outcome:** participants grasp that words are decomposed into vocabulary pieces mapped to integers.
- **Sequence:** a sentence appears; scissors-style cuts animate at token boundaries (with `tokenization`→`token`+`ization` as a deliberate "aha"); each chip then flips to reveal its integer **token ID**.
- **UI behaviour:** type your own text → re-tokenizes live; hover a chip to see the piece + ID; a running count updates.
- **React idea:** a small BPE-style tokenizer in TS (or a precomputed map for demo strings); Framer Motion for the cut + flip; reuse `<TokenChips/>`.
- **Libraries:** Framer Motion + SVG.

**B. Context-Window Visualizer (signature).**
- **Purpose:** make truncation tangible.
- **Sequence:** a fixed-width window; system prompt + user prompt + history tokens stack inside it. As the conversation grows, new tokens push in and the **oldest tokens visibly slide out / grey out** — and a callout fires: "earlier turn evicted."
- **UI behaviour:** `Slider` for window size; `Button` "add a turn"; the meter shows used/total; toggling a smaller model shrinks the window and triggers earlier eviction.
- **React idea:** model the window as an array with a max length; pushing beyond it shifts items out with a Framer exit animation.
- **Libraries:** Framer Motion.

## 12/13. Interactive Playground Specifications 🕹️
**Token Counter & Cost Estimator.**
- Paste any text → see token count, character count, word count, and an **estimated cost** for a chosen model (input price × tokens), plus a projected output cost for a chosen response length.
- **Controls:** `TextArea`, `Dropdown` (model + its price/limit), `NumberInput` (expected output tokens), live `Tile` metrics.
- **Outcome:** participants compute the cost of *their own* real prompts and feel the per-token economics.

## 13. Hands-on Activity ✋
Tokens are not words. A token is a frequent chunk of characters — sometimes a whole word, often a piece of one. Common English runs about three-quarters of a word per token, but the ratio swings wildly with content.

Code is full of rare symbols and indentation, so it fragments into many tokens. Non-English and technical text break into smaller pieces because the model saw them less often during training. A chemistry formula like "C₆H₁₂O₆" may cost several tokens for what looks like a single term. The practical upshot: you cannot eyeball cost or length by counting words — the same paragraph can be cheap or expensive depending on what is in it.

## 14. Demonstration Ideas
Two consequences make tokens concrete. The first is **cost**: every token in and out is billed, so a task like "summarise this 30-page report every day for a year" multiplies into millions of tokens. Token count is a budget line, not a technicality.

The second is **memory**: the context window is one fixed budget shared by the system prompt, your input, the conversation history, and the reply. When a conversation grows past it, the oldest turns are silently evicted — which is why a long chat can "forget" an instruction you gave at the start.

## 15. Quiz Questions ❓
**Q1 (MCQ).** Roughly how many English words is 100 tokens?
- A) ~25 · B) **~75** ✅ · C) ~100 · D) ~400
*Explanation:* ~100 tokens ≈ ~75 words; ~4 chars ≈ 1 token (English, approximate).

**Q2 (MCQ).** What does the context window contain?
- A) Only your latest message
- B) Only the model's response
- C) **System prompt + your prompt + pasted content + history + the response — all together** ✅
- D) Only documents you upload
*Explanation:* It's one shared budget for everything the model considers at once.

**Q3 (Conceptual).** Why sub-word tokens instead of whole words? *Answer:* a manageable vocabulary that can compose any word (including unseen/rare ones and typos) from known pieces, handling morphology efficiently.

**Q4 (Scenario).** A 50-page contract won't fit a model's window. Two strategies? *Answer:* (1) chunk it and summarize/retrieve relevant parts (RAG); (2) use a longer-context model — at higher cost and with possible mid-context attention dilution.

**Q5 (MCQ).** Which input is likely to use the *most* tokens for the same visible length?
- A) A simple English sentence
- B) **A snippet of source code** ✅
- C) A list of common words
- D) A short greeting
*Explanation:* code's rare symbols, whitespace, and identifiers fragment into many small tokens.

**Q6 (Conceptual).** A model has a 128k-token context window. Does that mean it "remembers" everything across a long chat? *Answer:* only within that single window — once the running total of prompt + history + reply exceeds it, the oldest tokens are dropped. Nothing persists beyond the window unless it is re-supplied.

## 16. Common Misconceptions ⚠️
- **"One word = one token."** Often false — rare/long words split; spaces and punctuation count.
- **"Bigger context window is always better."** It costs more and can suffer "lost in the middle" attention dilution.
- **"The model remembers our whole conversation forever."** Only what fits the window; older turns are evicted.
- **"Token limits are about characters."** They're about tokens, which vary by language and content type.

## 17. Key Takeaways
- A **token** is a sub-word chunk mapped to an integer ID — the model's true unit.
- **~4 chars ≈ 1 token**; words ≠ tokens; code/non-English cost more tokens.
- The **context window** is a finite shared budget; overflow → **truncation/eviction**.
- Tokens drive **cost** and **length limits** — practical levers faculty control.
- Tokens are just IDs; **embeddings** give them meaning (next module).

## 18. IBM Carbon Component Suggestions
- Counter/estimator metrics in `Tile`s with a Carbon `Slider`/`meter` for the limit gauge.
- Model selector as `Dropdown`; cost output as a small `StructuredList` or `DataTable`.
- Context window viz framed by `PlaygroundFrame`; "add turn" as `Button`.
- Misconceptions as warning `InlineNotification`s.

## 19. React Implementation Suggestions
- `Tokenizer.ts`: ship a tiny BPE-like tokenizer or a precomputed token map for demo strings; expose `tokenize(text): {piece, id}[]`.
- `TokenCounter.tsx`: debounce input; `useMemo` token list; cost = `tokens * model.inputPrice + expectedOut * model.outputPrice` from a typed `MODELS` config.
- `ContextWindow.tsx`: an array capped at `maxTokens`; Framer `AnimatePresence` for eviction exit animations; `aria-valuetext` on the usage meter.
