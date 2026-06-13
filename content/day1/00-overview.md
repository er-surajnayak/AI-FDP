# Day 1 — From Deep Learning to Large Language Models
### Understanding the Foundations of Generative AI

**Audience:** PhD holders, Professors, Associate & Assistant Professors, Researchers, Academic Administrators.
**Format:** Digital Interactive Notes (D.I. Notes) — explored live during the FDP and revisited afterward.
**Total Day 1 duration:** ~6 hours of contact time (modules + activities + demos + assignment briefing), modular and resequenceable.

---

## The promise of Day 1

By the end of today you will not just *know what an LLM is* — you will have **seen** attention connect words, **watched** memory fade inside an RNN, **dragged** the temperature dial and watched a probability distribution flatten, and **typed your own sentence** into a self-attention playground. You leave able to explain these ideas to a colleague and to apply them in your teaching, research, consultancy, and institutional work.

## Learning objectives

By the end of Day 1, participants will be able to:

1. Trace the **evolution of AI** — AI → ML → Deep Learning → Generative AI — and articulate *why* deep learning succeeded when it did.
2. Explain the **limitations of CNNs, RNNs, and LSTMs** that motivated a new architecture.
3. Describe the **significance of the Transformer** ("Attention Is All You Need", 2017) in plain language.
4. Develop an **intuitive understanding of attention** (and self-attention, query/key/value) without equations.
5. Explain **tokens**, **token limits**, and **context windows**, and reason about cost and truncation.
6. Explain **embeddings** and **vector representations**, and what semantic similarity means.
7. Walk the full **LLM generation pipeline** from prompt to response, including temperature and next-token prediction.
8. Compare major **foundation models** (GPT, Claude, Gemini, Llama, DeepSeek) and match them to use cases.
9. **Apply** generative AI responsibly across Teaching, Research, Consultancy, and Industry.

## The narrative arc of the day

> We follow one question through eight modules: *"How does a machine read my sentence and write a sensible next one?"*

| Module | Question it answers | Payoff |
|---|---|---|
| 1. Evolution of AI | Where did this come from? | Map of the field; the 3 reasons DL won |
| 2. To Transformers | Why did older models hit a wall? | Felt sense of the memory/sequential problem |
| 3. Attention | What replaced memory? | The core idea of modern AI, intuitively |
| 4. Tokenization | What does the model actually read? | Tokens, limits, cost, context windows |
| 5. Embeddings | How is meaning turned into numbers? | Vector space + semantic similarity |
| 6. How LLMs Work | Put it together — prompt to answer | The full pipeline, end to end |
| 7. Foundation Models | Which model, when? | A practical selection framework |
| 8. Applications | What do I do Monday morning? | Concrete academic + industry workflows |

## How to read these D.I. Notes

These notes are **interactive**. Throughout you'll see callouts:

- 🎬 **Animation** — press play, scrub, or step through.
- 🕹️ **Playground** — change inputs and watch outputs respond.
- 🔬 **Research lens** · 🏫 **Faculty lens** · 💼 **Industry lens** — domain-specific examples.
- ✋ **Hands-on** — do this yourself, now.
- ❓ **Checkpoint** — a quick quiz to confirm understanding before moving on.
- ⚠️ **Misconception** — a common wrong mental model, corrected.

## Top-level UX (Carbon)

- **Carbon `UIShell`** with a left `SideNav` listing the 8 modules + Activities, Demos, Assignment. A persistent header shows the program title and a global progress meter.
- A **`ProgressIndicator`** (vertical, in the side rail) shows module completion. Each "Checkpoint" passed advances it.
- Each module page is a scrollable sequence of Carbon `Tile`/`ClickableTile` "concept cards", `Accordion`s for deep-dives, and embedded interactive canvases.
- **Theme:** Carbon **g100 (dark)** as default for the auditorium projector, with a **g10 (light)** toggle for personal reading. See [`design-system.md`](../design-system.md).

---

*Continue to [Module 1 — The Evolution of AI](module-1-evolution.md).*
