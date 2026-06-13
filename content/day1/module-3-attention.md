# Module 3 — The Attention Mechanism

> *"When you read a research paper, your brain naturally connects a citation on page 10 to a definition on page 2. Attention lets a machine do the same thing — decide, for every word, which other words matter right now."*

---

## 2. Estimated Duration
**55 minutes** — 20 min intuition, 15 min attention animation + hover exploration, 12 min self-attention playground + activity, 8 min checkpoint. (The conceptual heart of Day 1.)

## 3. Learning Objectives
- Explain **attention** intuitively as *learned, weighted relevance* between elements.
- Explain **self-attention**: every word attends to every other word *in the same sentence*.
- Understand **Query, Key, Value** through an intuitive "search" metaphor — *no equations required*.

## 4. Teaching Content

**Start with the human experience, not the math.** When you read *"The animal didn't cross the street because it was too tired,"* you instantly know **"it" = "the animal,"** not "the street." How? You weighed the words and decided "animal" is the most *relevant* antecedent. **Attention is that weighing, made mechanical and learnable.**

**Attention = for each word, a set of weights over all other words** saying "how much should I pay attention to you when I build my understanding of myself?" High weight = strong relationship; low weight = ignore.

**Self-attention** is attention applied *within a single sequence*: every token computes weights over every other token of the same sentence. The result is a **context-aware representation** of each word — "bank" near "river" leans toward riverbank; "bank" near "loan" leans toward finance. The word's meaning is *refined by its neighbors via attention*.

**Query, Key, Value — the library/search intuition (do this before any formula):**
- Imagine each word goes to a library to *understand itself in context*.
- Its **Query** is the question it's asking: *"Who here is relevant to me?"*
- Every word also advertises a **Key** — a label saying *"here's what I'm about."*
- The word compares its **Query** against everyone's **Keys**; good matches get high attention weight.
- It then collects each matched word's **Value** — its actual content/information — in proportion to the match.
- The word's new representation = a **weighted blend of Values**, weighted by Query–Key match.

So for "it": its Query ("what noun am I standing in for?") matches the Key of "animal" strongly → it pulls in "animal"'s Value → "it" now *means* "animal" in context.

**Multi-head attention (one sentence, no math):** the model runs several attention computations in parallel ("heads"), each free to focus on a different kind of relationship — one head tracks grammar (subject–verb), another tracks coreference (pronoun→noun), another tracks topic. Their results are combined. This is why a single layer can capture many relationship types at once.

> **Show the math (optional accordion only):** attention weights = softmax(Q·Kᵀ / √dₖ), output = weights · V. Present this *only* after the intuition lands, framed as "the search metaphor, written compactly." Keep it collapsed by default.

## 5. Storytelling Flow
1. **The pronoun puzzle:** put the "animal/street/tired" sentence on screen; ask the room "what does *it* refer to?" Everyone knows. "*How* did you know? You just used attention."
2. **Name the move:** weighing relevance. Define attention in that language.
3. **Generalize:** it's not just pronouns — every word refines its meaning by attending to others ("bank" demo).
4. **Open the engine:** introduce Q/K/V via the library/search metaphor; map it back to "it"→"animal."
5. **Multi-head:** "your brain tracks grammar *and* meaning *and* topic at once — so does the model, with multiple heads."
6. **Bridge:** "This weighing happens over *tokens*, not words exactly — what's a token? Module 4."

## 6. Analogies
- **Cocktail party effect:** in a noisy room you tune into the one conversation that's relevant — attention is selectively amplifying what matters.
- **Search engine:** Query = your search box, Keys = page titles/tags, Values = the page contents you actually read. Relevance ranking = attention weights.
- **Reading a paper:** a citation (Query) finds the relevant prior work (Key match) and pulls in its findings (Value).
- **Classroom discussion:** when a student asks a question (Query), you scan who in the room is best placed to answer (Keys) and draw out their contribution (Value).

## 7. Faculty Examples 🏫
- **Coreference in student writing:** "The committee rejected the proposal because *it* was too ambitious." Faculty resolve "it" instantly; attention models do too — useful framing for AI writing-feedback tools.
- **Reading comprehension question generation:** attention reveals which words a model "looked at" to answer — a window into automated assessment.

## 8. Research Examples 🔬
- **Attention as interpretability (with caveats):** attention maps can *suggest* which input tokens influenced an output (e.g., which clinical-note words drove a prediction). Note the active debate: attention weights are *not* a guaranteed faithful explanation — a great point for a research-literate audience.
- **Long-document QA:** linking a question to the exact distant sentence that answers it.

## 9. Industry Examples 💼
- **Search & retrieval / RAG:** the Query–Key–Value framing maps directly onto modern retrieval systems (query embeddings vs. document key embeddings).
- **Translation:** attention aligns source and target words (e.g., which French word each English word draws from), historically visualized as alignment heatmaps.

## 10. Visual Ideas
- **Attention heatmap grid:** rows = words, columns = words, cell brightness = attention weight. The classic, information-dense view.
- **Arc/chord diagram** over a sentence: curved lines whose thickness = attention strength; thickest arc from "it" to "animal."
- **Q/K/V "search desk" diagram:** a word's Query card slides along a row of Key cards, lighting up matches, then collecting Value cards.

## 11. Animation Ideas 🎬
**A. Attention Connection Animation (signature).**
- **Purpose:** make "weighing relevance" visible on a real sentence.
- **Learning outcome:** participants can read an attention map and explain why "it" attends to "animal."
- **Sequence:** tokens of *"The animal didn't cross the street because it was too tired"* appear one by one. Then, for a selected word, animated connection lines fan out to all others; line **thickness/brightness encodes attention weight**. Select "it" → the line to "animal" blazes; lines to "street" stay faint. A toggle shows the full heatmap.
- **UI behaviour:** **hover or click a word** to make it the focus; its outgoing attention lines animate in. A "head" dropdown switches between heads (grammar head vs. coreference head highlight different links). Keyboard: arrow to move focus word; `aria-live` announces "‘it’ attends most strongly to ‘animal’ (0.62)."
- **React implementation idea:** precomputed attention matrix as JSON (illustrative); SVG arcs between token centers with `stroke-width`/`opacity` ∝ weight; Framer Motion staggers line draw-in via `pathLength`.
- **Libraries:** Framer Motion + SVG (Canvas if rendering full dense heatmap).

**B. Q/K/V Search Animation.**
- **Purpose:** dramatize the search metaphor.
- **Sequence:** the focus word emits a glowing **Query**; it travels across the row of **Key** badges; matches pulse; matched words' **Value** tiles flow back and blend into a new representation tile for the focus word.
- **Libraries:** Framer Motion.

## 12/13. Self-Attention Playground 🕹️ (the must-have interactive)
- **What it does:** a `TextArea` where participants **type their own sentence**. On submit, an attention graph renders; hovering any word highlights its strongest relationships. A "head" selector and a sensitivity slider let them explore.
- **Data honesty:** for an offline FDP, drive it with a lightweight rule-based or precomputed approximation (e.g., a small word-embedding similarity + syntactic heuristics) and **label it "illustrative."** Optionally wire a real model via a Vercel serverless proxy for a live mode.
- **Controls:** `TextArea`, `Button` (Visualize), `Dropdown` (head), `Slider` (threshold to declutter lines), `Toggle` (arcs vs. heatmap), "Describe this view" for accessibility.
- **Outcome:** participants discover that *their own* sentences produce sensible relationship maps — pronouns find antecedents, adjectives find nouns.

## 13. Hands-on Activity ✋
**"Be the attention head."** (8 min.) Give participants the sentence *"The professor told the student that she had won the award."* In pairs, they (1) decide what "she" refers to and argue why, (2) draw arcs by hand for 3 chosen words, (3) compare with the playground's output and discuss disagreements (this sentence is *genuinely ambiguous* — a great discussion of how context/priors drive attention). *Goal: feel that attention is contextual relevance, and that ambiguity is real.*

## 14. Demonstration Ideas
- Ask an LLM the ambiguous "she" sentence: "Who does 'she' refer to, and why?" Then add a disambiguating clause and re-ask — show the resolution shift. Connect to "attention re-weighted given new context."
- Show a public attention-visualization tool (e.g., a BertViz-style demo) for a "real model" moment.

## 15. Quiz Questions ❓
**Q1 (MCQ).** In the Q/K/V metaphor, the **Value** is best described as:
- A) The question a word asks
- B) The label advertising what a word is about
- C) **The actual content a word contributes once it's deemed relevant** ✅
- D) The number of attention heads
*Explanation:* Query = the question, Key = the label/match-target, Value = the content blended in proportion to match.

**Q2 (MCQ).** Self-attention differs from attention in general because:
- A) It uses no weights
- B) **The sequence attends to itself — every token attends to every other token in the same sequence** ✅
- C) It only works on images
- D) It removes the need for tokens
*Explanation:* "Self" = the queries, keys, and values all come from the same sequence.

**Q3 (Conceptual).** Why do Transformers use *multiple* attention heads? *Answer:* so different heads can specialize in different relationship types (grammar, coreference, topic) simultaneously, then combine them.

**Q4 (Scenario).** A model answering a question over a 20-page document correctly cites a fact from page 2. Explain in attention terms. *Answer:* the question tokens' Queries matched the Keys of the page-2 fact strongly, so its Value dominated the answer's representation — a direct long-range link, no fading.

## 16. Common Misconceptions ⚠️
- **"Attention is just keyword matching."** It's *learned* relevance over rich representations, not literal string matching.
- **"Attention weights are a faithful explanation of the model's reasoning."** They're suggestive, not guaranteed faithful — an actively debated research point.
- **"More heads = strictly better."** Heads have diminishing returns; some are redundant and can be pruned.
- **"Self-attention means the word looks only at itself."** The opposite — it looks at *all* tokens (including itself) and weighs them.

## 17. Key Takeaways
- **Attention = learned, weighted relevance** between elements.
- **Self-attention** lets each word refine its meaning using all other words.
- **Query / Key / Value** = a search: ask (Q), match labels (K), collect content (V) by relevance.
- **Multi-head** = many relationship types captured in parallel.
- This is the engine that makes Transformers — and every LLM — work.

## 18. IBM Carbon Component Suggestions
- Playground inside `PlaygroundFrame` (custom) using `TextArea`, `Dropdown`, `Slider`, `Toggle`, `Button`.
- Q/K/V explained via `ExpandableTile`s (one per concept).
- Optional math as a single `Accordion` ("Show the math") — collapsed by default.
- Multi-head selector as Carbon `ContentSwitcher`.
- Misconceptions as warning `InlineNotification`s.

## 19. React Implementation Suggestions
- `AttentionGraph.tsx`: props `{ tokens, weights /* n×n */, focusIndex, head }`; render SVG arcs; memoize geometry; animate with Framer `pathLength`.
- `SelfAttentionPlayground.tsx`: local `useState` for the sentence; a `useMemo` that computes the illustrative weight matrix (embedding cosine + heuristics) so typing feels instant; debounce input.
- Provide `getAttentionDescription(tokens, weights, focus)` returning a sentence for screen readers and the "Describe this view" panel.
- Keep the dense heatmap on a `<canvas>` for performance with longer sentences.
