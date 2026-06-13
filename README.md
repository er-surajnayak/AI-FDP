# D.I. Notes — Generative AI Faculty Development Program

**Digital Interactive Notes** for an FDP on Generative AI, built for an audience of PhD holders, professors, researchers, and academic administrators.

This repository holds the **production-ready educational content** for the program — written so it can be transformed directly into a **React + TypeScript + IBM Carbon Design System** interactive learning platform and deployed on **Vercel**.

> Inspiration: a premium interactive learning experience (e.g. https://mlsvu.vercel.app/) — not a digital PDF.

---

## What's in here

```
content/
  day1/
    00-overview.md            Day 1 framing, objectives, flow, how to read these notes
    module-1-evolution.md     The Evolution of AI
    module-2-transformers.md  From Deep Learning to Transformers
    module-3-attention.md     Attention Mechanism
    module-4-tokenization.md  Tokenization
    module-5-embeddings.md    Embeddings & Vector Representations
    module-6-how-llms-work.md How LLMs Work
    module-7-foundation.md    Foundation Models
    module-8-applications.md  Applications of Generative AI
    hands-on-activities.md    6+ executable FDP activities
    live-demos.md             ChatGPT / Claude / Gemini demos with prompts + outcomes
    assignment.md             End-of-day assignment + rubric
  design-system.md            Global IBM Carbon + React architecture spec
```

## How each module is structured

Every module follows the same 19-part contract so the content maps cleanly onto React components:

1. Module Title · 2. Estimated Duration · 3. Learning Objectives · 4. Teaching Content · 5. Storytelling Flow · 6. Analogies · 7. Faculty Examples · 8. Research Examples · 9. Industry Examples · 10. Visual Ideas · 11. Animation Ideas · 12. Interactive Playground Specs · 13. Hands-on Activities · 14. Demonstration Ideas · 15. Quiz Questions · 16. Common Misconceptions · 17. Key Takeaways · 18. IBM Carbon Components · 19. React Implementation Suggestions

## Pedagogy contract (applies everywhere)

- **Intuition before mathematics.** No dense derivations.
- **Show, don't tell.** Prefer interaction › animation › visualization › diagram › text.
- **Short blocks, not walls of text.**
- Examples are **faculty-, research-, consultancy-, and industry-relevant**.
- Every concept earns at least one *see it / interact with it* experience.

## Tech stack target

- **React 18 + TypeScript** (Vite)
- **IBM Carbon Design System** (`@carbon/react`, `@carbon/icons-react`)
- **Animation / viz:** Framer Motion, React Flow, D3.js, react-force-graph, native SVG/Canvas
- **Deployment:** Vercel

See [`content/design-system.md`](content/design-system.md) for the cross-cutting architecture, theming, accessibility, and component conventions.
