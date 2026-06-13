# Module 1 — The Evolution of AI

> *"Before we can understand where generative AI is going, we need an honest map of where it came from — and why this particular moment, not 1970 or 1995, is when it all clicked."*

---

## 2. Estimated Duration
**40 minutes** — 15 min teaching, 10 min timeline exploration, 10 min activity, 5 min checkpoint.

## 3. Learning Objectives
By the end of this module participants can:
- Distinguish **AI, Machine Learning, Deep Learning, and Generative AI** as nested ideas, not synonyms.
- State the **three forces** that made deep learning succeed: data, compute (GPUs), and architectures.
- Contrast **traditional programming, machine learning, and deep learning** by *what is given and what is learned*.

## 4. Teaching Content

**AI, ML, DL, GenAI are concentric circles, not a timeline of replacements.**

- **Artificial Intelligence (1950s–)**: the broad goal — machines that perform tasks we'd call "intelligent." Includes rule-based expert systems, search, planning, *and* learning.
- **Machine Learning (1980s–)**: a subset of AI where the machine *learns patterns from data* instead of being explicitly programmed with rules.
- **Deep Learning (2010s–)**: a subset of ML using many-layered neural networks that *learn their own features* directly from raw data.
- **Generative AI (2020s–)**: deep learning models that *produce new content* — text, images, code, audio — rather than only classifying or predicting a label.

**The three shifts, told as "what do you give, what do you get":**

| Paradigm | You provide | Machine produces |
|---|---|---|
| Traditional Programming | **Rules + Data** | Output |
| Machine Learning | **Data + Output** (examples) | **Rules** (a model) |
| Deep Learning | **Raw Data** | **Features *and* Predictions** (both learned) |

The leap of deep learning is that **feature engineering disappears**. You no longer hand-craft "edge detectors" or "keyword lists" — the network discovers useful representations itself.

**Why deep learning succeeded *when* it did — three forces converging (~2012):**
1. **Data explosion** — the internet, smartphones, and digitization produced labeled data at a scale earlier methods never had. Models that are "data-hungry" finally had enough to eat.
2. **GPU revolution** — graphics chips, built for parallel matrix math, turned out to be perfect for training neural networks. Training that took months now took days.
3. **Better architectures** — ideas like ReLU activations, dropout, batch norm, residual connections, and eventually attention made deep networks *trainable* and *stable*.

The 2012 ImageNet moment (AlexNet) is the usual marker: a deep network crushed hand-engineered computer-vision pipelines. The field's center of gravity shifted permanently.

## 5. Storytelling Flow
1. **Hook:** "Raise your hand if you've written an if/else rule. Congratulations — that was AI, 1970s style." Establish that AI is old and broad.
2. **Tension:** rules don't scale. You cannot write a rule for *every* way a student might phrase a question, or every way a cat appears in a photo.
3. **Turn:** "What if, instead of writing the rules, we showed the machine examples and let it write its own rules?" — ML.
4. **Deeper turn:** "What if even the *features* — what to look at — could be learned?" — DL.
5. **Payoff:** the three forces converge; the field explodes; generative models arrive.
6. **Bridge to Module 2:** "Deep learning conquered images. But language is *sequential* — and that broke the early models. That's our next story."

## 6. Analogies
- **Cooking:** Traditional programming = following a fixed recipe. ML = tasting many dishes and inferring the recipe. DL = learning to taste *and* cook from raw ingredients with no recipe at all.
- **Teaching a child colors:** You don't enumerate every shade ("if 620–750nm → red"). You show examples and they generalize. That's ML over hand-coded rules.
- **Nested Russian dolls:** GenAI sits inside DL sits inside ML sits inside AI.

## 7. Faculty Examples 🏫
- **Grading short answers:** A rule-based autograder fails the moment a student phrases a correct answer unexpectedly. An ML/DL model trained on many graded answers generalizes — illustrating *why* the data-driven paradigm matters in your own assessment workflow.
- **Plagiarism vs. paraphrase detection:** keyword rules catch copy-paste but miss paraphrase; learned representations catch meaning.

## 8. Research Examples 🔬
- **Protein folding (AlphaFold):** decades of hand-built biophysical heuristics were outperformed by a deep model that learned structure from sequence data — a vivid "DL learns features we couldn't hand-code" case for any STEM faculty.
- **Systematic reviews:** ML classifiers screen thousands of abstracts for inclusion/exclusion, a task that scales poorly by hand.

## 9. Industry Examples 💼
- **Spam filtering** moved from hand-written rules ("contains 'free money'") to learned classifiers, then to deep models robust to adversarial rewording.
- **Recommendation systems** (retail, streaming) learn preference patterns no analyst could enumerate as rules.

## 10. Visual Ideas
- **Concentric-circles diagram** (AI ⊃ ML ⊃ DL ⊃ GenAI) that highlights each ring as the narration reaches it.
- **Three-column "what you give / what you get" panel** that animates arrows reversing between Programming and ML.
- **The "three forces" as three rising bars** (data volume, compute, architecture quality) crossing a threshold line around 2012 where the curve takes off.

## 11. Animation Ideas 🎬
**AI Evolution Timeline (the signature animation of the module).**
- **Purpose:** let participants *scrub* through AI history and feel the acceleration.
- **Learning outcome:** participants can place ML, DL, Transformers, and GenAI in order and recall the limitation each era hit.
- **Animation sequence:** a horizontal timeline (1950 → today). As the user scrubs, era cards rise into view; each flips to reveal three facets — **Problem · Limitation · Innovation**. The "three forces" bars grow underneath; near 2012 the performance curve visibly steepens.
- **UI behaviour:** draggable scrubber + Prev/Next + Play. Clicking an era pins its detail card open. Keyboard arrows move between eras; each era announces itself via `aria-live`.
- **React implementation idea:** Framer Motion `useMotionValue` bound to the scrubber; map scrub position → active era index; `AnimatePresence` for era cards; an SVG `<path>` whose `pathLength` animates with scrub for the performance curve.
- **Suggested libraries:** Framer Motion + SVG.

## 12. (covered above — animations are the medium)

## 12/13. Interactive Playground Specifications 🕹️
**"Rules vs. Examples" sorter.**
- Two modes. In **Rules mode**, the user tries to write if/else conditions (via dropdowns) to separate cats from dogs in a tiny image set — and watches edge cases break it. In **Examples mode**, they label a handful of images and a toy classifier (precomputed) generalizes, visibly improving as more labels are added.
- **Outcome:** participants *feel* the brittleness of rules and the generalization of learning.
- **Controls:** Carbon `Toggle` (Rules/Examples), `Button` to add a labeled example, a live accuracy `meter`.

## 13. Hands-on Activity ✋
**"Classify your discipline."** In pairs (5 min): each participant names a task from their own field and classifies it as best solved by (a) explicit rules, (b) classical ML, or (c) deep learning — and justifies why. Share two examples with the room. *Goal: transfer the framework to their own world immediately.*

## 14. Demonstration Ideas
- Live: ask an LLM "Write 5 if/else rules to detect sarcasm," then "Now explain why this approach fails." The model itself articulates the motivation for learning-based methods — a memorable, self-referential demo.

## 15. Quiz Questions ❓
**Q1 (MCQ).** In the machine-learning paradigm, what does the machine *produce*?
- A) Output, given rules and data
- B) **Rules (a model), given data and example outputs** ✅
- C) Raw data
- D) Features only
*Explanation:* ML inverts traditional programming — you supply data + desired outputs, the model infers the rules.

**Q2 (MCQ).** Which was **not** one of the three forces behind deep learning's success?
- A) Data explosion
- B) GPU/parallel compute
- C) Better architectures
- D) **Blockchain ledgers** ✅
*Explanation:* Data, compute, and architecture converged ~2012; blockchain is unrelated.

**Q3 (Conceptual).** In one sentence, what disappears in deep learning that was central to classical ML? *Answer:* manual **feature engineering** — the network learns its own features from raw data.

**Q4 (Scenario).** A colleague says "AI is just a fancy name for deep learning." Correct them in two sentences. *Answer:* AI is the broad goal (including rule-based systems); deep learning is one recent, powerful *subset* of machine learning, which is itself a subset of AI.

## 16. Common Misconceptions ⚠️
- **"DL replaced AI/ML."** No — they're nested. Rule-based and classical ML systems are still widely used and often better for small-data or high-interpretability problems.
- **"More layers always means better."** Depth helped *because* of enabling tricks (ReLU, residuals); naively stacking layers without them fails to train.
- **"GenAI is a totally new kind of AI."** It's deep learning applied to *generation*; the foundations are the same neural networks.

## 17. Key Takeaways
- AI ⊃ ML ⊃ DL ⊃ GenAI — **nested, not sequential replacements.**
- The paradigm flip: ML learns the **rules**; DL also learns the **features**.
- DL succeeded when **data + GPUs + architectures** converged (~2012).
- This sets up the next problem: vision was solved, but **language is sequential** — and that's where older models broke.

## 18. IBM Carbon Component Suggestions
- Page in a `Grid`/`Column` layout; concept points as `Tile`s.
- The "what you give / what you get" table as a Carbon `StructuredList` or `DataTable`.
- The three lenses (Faculty/Research/Industry) as `Tabs`.
- Misconceptions as `InlineNotification` (warning kind).
- Module-end `Checkpoint` quiz with `RadioButtonGroup` + reveal `InlineNotification`.
- Vertical `ProgressIndicator` advances on checkpoint completion.

## 19. React Implementation Suggestions
- `EvolutionTimeline.tsx`: state `const [step, setStep] = useState(0)`; an array of era objects `{year, title, problem, limitation, innovation}`; Framer Motion for card entrance + SVG path scrub. Bind a Carbon `Slider` as the scrubber so the control is accessible and themed.
- Keep all copy in `content.ts` typed as `ModuleContent` (see `design-system.md`) so the same shell renders every module.
- Gate the autoplay behind `useReducedMotion()`; provide a static "final frame" with all eras revealed.
