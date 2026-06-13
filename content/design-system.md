# Design System & Architecture Spec
### React + TypeScript + IBM Carbon Design System

This is the cross-cutting specification shared by every module. Module files reference it instead of repeating boilerplate.

---

## 1. Stack & project shape

```
src/
  app/
    AppShell.tsx          UIShell: Header + SideNav + content outlet
    routes.tsx            Route table (one route per module)
  modules/
    module-1-evolution/
      Module1.tsx         Page composition
      content.ts          Typed content data (text, quiz, takeaways)
      EvolutionTimeline.tsx   Interactive visualization
    ...
  components/
    ConceptCard.tsx       Carbon Tile wrapper for a single concept
    LensTabs.tsx          Faculty / Research / Industry tabbed examples
    Checkpoint.tsx        Inline quiz (MCQ + reveal explanation)
    MisconceptionCallout.tsx
    PlaygroundFrame.tsx   Consistent chrome around interactive canvases
    KeyTakeaways.tsx
  viz/                    Reusable animation primitives (D3, Framer, ReactFlow)
  theme/                  Carbon theme tokens + g10/g100 toggle
  content-types.ts        Shared TS types for module content
```

### Recommended dependencies

```jsonc
"@carbon/react", "@carbon/icons-react", "@carbon/colors",
"framer-motion",        // step/scrub/reveal animations, layout transitions
"reactflow",            // pipelines, node graphs (LLM pipeline, transformer stack)
"d3",                   // scales, force layout math, probability bars
"react-force-graph-2d", // embedding / attention force graphs
"katex" + "react-katex" // optional, math shown ONLY in "Show the math" accordions
```

## 2. Content typing

A single typed contract lets every module render through shared components:

```ts
// content-types.ts
export interface QuizQuestion {
  id: string;
  kind: 'mcq' | 'conceptual' | 'scenario';
  prompt: string;
  options?: { id: string; label: string }[];
  answerId?: string;            // for mcq
  explanation: string;
}
export interface LensExample { faculty: string; research: string; industry: string; }
export interface Misconception { wrong: string; right: string; }
export interface ModuleContent {
  id: string; title: string; durationMin: number;
  objectives: string[];
  analogies: string[];
  examples: LensExample[];
  misconceptions: Misconception[];
  takeaways: string[];
  quiz: QuizQuestion[];
}
```

## 3. Carbon building blocks (used everywhere)

| Need | Carbon component |
|---|---|
| App frame + nav | `UIShell` → `Header`, `SideNav`, `SideNavItems`, `HeaderGlobalBar` |
| Module progress | `ProgressIndicator` / `ProgressStep` (vertical) |
| Concept card | `Tile`, `ClickableTile`, `ExpandableTile` |
| Domain examples | `Tabs`, `TabList`, `Tab`, `TabPanels` |
| Deep dive / "show the math" | `Accordion`, `AccordionItem` |
| Comparisons | `DataTable` (sortable), `StructuredList` |
| Controls in playgrounds | `Slider`, `Dropdown`, `TextArea`, `Toggle`, `Button`, `NumberInput` |
| Callouts | `InlineNotification`, `Callout` / custom `Tile` with status color |
| Quiz | `RadioButtonGroup`, `Button`, `InlineNotification` (reveal) |
| Status / metrics | `Tag`, `Tile` with `@carbon/colors` accents |
| Step reveal | `Pagination` of steps or custom Framer stepper |

## 4. Theming

- Default **g100** (dark) for projection; expose a `Theme` toggle (`@carbon/react` `Theme` + `GlobalTheme`) to **g10** for personal reading.
- Use Carbon tokens, never hard-coded hex: `$background`, `$layer-01`, `$text-primary`, `$support-success/-error/-warning/-info`.
- A small **accent palette** for the four lenses, drawn from `@carbon/colors`: Faculty = `blue60`, Research = `purple60`, Industry = `teal60`, Warning/Misconception = `yellow30`/`red50`.

## 5. Animation conventions (Framer Motion)

- **Respect `prefers-reduced-motion`** — gate every non-essential animation; provide a static final frame.
- Standard transitions: `ease: [0.2, 0, 0.38, 0.9]` (Carbon's productive easing), durations 240–400 ms.
- Every "storytelling" animation exposes **Play / Pause / Step / Scrub** controls (a shared `<PlaybackControls/>`), never autoplay-only.
- Animations are **driven by a single `step` state integer** so they're scrubable, testable, and resumable.

## 6. Accessibility (non-negotiable for an academic audience)

- All interactive canvases have a **text-equivalent** ("Describe this view") toggle and keyboard operability.
- Color is never the only signal (use labels + shape).
- Sliders/graphs expose `aria-valuetext` describing the current state ("Temperature 0.2 — distribution sharply peaked").
- WCAG AA contrast via Carbon tokens; focus rings preserved.

## 7. Reusable interactive primitives

- `<PlaygroundFrame title controls>{canvas}</PlaygroundFrame>` — consistent border, title, reset button, "Describe" toggle.
- `<ProbabilityBars data />` — D3/Framer animated horizontal bars (reused in Tokenization, Temperature, Next-token).
- `<TokenChips tokens />` — colored token pills (reused in Tokenization, Context window, Pipeline).
- `<ForceGraph nodes links />` — wraps react-force-graph (reused in Embeddings, Attention).
- `<PipelineFlow stages />` — React Flow node graph with clickable, inspectable stages (reused in Module 6 and as mini-pipelines elsewhere).

## 8. Performance

- Lazy-load each module route (`React.lazy` + `Suspense`) so the heavy viz libs (D3, force-graph) only load when needed.
- Memoize layout computations; precompute embedding coordinates and attention weights as static JSON (these are illustrative, not live-model — see each module's note).
- For the auditorium, ship a "Presenter mode" query param that enlarges typography and hides the side nav.

> **Honesty note baked into the content:** the playgrounds use *pre-computed or rule-based illustrative data*, not live model inference, unless a module explicitly wires an API. This is stated to participants so they don't mistake a teaching simulation for ground truth. Where live calls are desirable (Module 6/7 demos), use a serverless function on Vercel to proxy an API key — never ship keys to the client.
