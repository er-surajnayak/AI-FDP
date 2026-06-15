# Module 2 — Vibe Coding

> *"You describe what you want in plain English, the AI writes the actual code, and a working app appears — and somewhere along the way you stop caring what the code even says."*

---

## 2. Estimated Duration
**45 minutes** — roughly 25 minutes on what vibe coding is and the describe-generate-run-refine loop, 12 minutes on the real tools and where it shines versus bites, and 8 minutes on healthy practice, examples, and the quiz.

## 3. Learning Objectives
- Understand what "vibe coding" actually means and how it differs from disciplined AI-assisted engineering.
- Recognise where vibe coding genuinely saves time (prototypes, glue code, throwaway scripts) and where it quietly creates debt (security, scale, code nobody understands).
- Know the real 2026 tools by category and form a healthy habit: treat the AI like a fast, tireless junior developer you still direct and verify.

## 4. Teaching Content

### What "vibe coding" actually means

For decades, building software meant learning a programming language. You memorised syntax, fought with semicolons, and looked up the same error message for the hundredth time. Vibe coding flips that on its head. You describe what you want — *"build me a page that lets students upload an essay and shows the word count"* — and an AI writes the code for you. You run it, look at the result, and say *"nice, now make the button blue and add a download option."* English becomes the programming language.

The term was popularised by Andrej Karpathy in early 2025. He described a mood where you "fully give in to the vibes, embrace exponentials, and forget that the code even exists." You barely read what the AI produces. If something breaks, you paste the error back in and let the AI fix it. It is fast, a little reckless, and surprisingly fun. Collins Dictionary even made "vibe coding" its Word of the Year — proof the idea jumped from a tweet to the mainstream in about a year.

It helps to draw one honest line. **Pure vibe coding** means you genuinely don't read the code — you steer by vibes and trust the output. **AI-assisted engineering** means the AI still writes most of it, but you read it, review it, and stay responsible for what ships. Both are useful. The trouble starts when people do the first while believing they are doing the second.

### The loop: English becomes the interface

The whole practice runs on a tight little cycle:

**Describe → AI generates → Run it → See the result → Refine in plain English → repeat.**

You say what you want, the AI produces code, you run it, you look at what actually happened, and then you describe the next tweak — not in Python or JavaScript, but in ordinary sentences. The remarkable part is how short that loop becomes. You can go from idea to a clickable thing in minutes, then reshape it sentence by sentence. The interface to the computer is no longer a language you had to learn. It is the language you already speak.

### Different aspects of the shift

Several things change at once. **Iteration velocity** goes up: you try ten ideas in the time it used to take to set up one. **Accessibility** widens: a historian, a biologist, or a dean with zero coding background can now build a working tool. The mental work shifts **from syntax to intent** — your job is to say clearly what you want, not to remember how a `for` loop is spelled. **Feedback loops tighten** because you see results immediately. And the **barrier to prototyping collapses**, so "let me just try it" becomes a five-minute experiment instead of a weekend project.

### Pros: why people love it

- Idea to working prototype in minutes, not days.
- Brilliant for MVPs, demos, one-off scripts, data wrangling, and small internal tools.
- Unblocks non-engineers — researchers and faculty can build the thing they imagined without waiting for a developer.
- Removes the boring boilerplate (setup, plumbing, repetitive scaffolding) that nobody enjoys writing.
- A genuinely good way to *learn* — you can ask the AI to explain each piece as it builds.

### Cons and risks: the part people skip

Vibe coding has a shadow side, and pretending otherwise does no favours.

- **You may ship code you don't understand.** When it breaks at 2 a.m., "the vibes" won't debug it for you.
- **Security holes.** AI happily writes code that leaks secrets, trusts user input, or exposes data — and it looks perfectly fine until someone exploits it.
- **Hard-to-debug black boxes.** A 600-line file you never read is a maze when something goes wrong.
- **Hallucinated APIs.** The AI sometimes confidently calls functions and libraries that simply do not exist.
- **Maintenance and scaling debt.** Code that works for ten users can collapse at ten thousand, and nobody on the team knows why.
- **"Works until it doesn't."** Demos beautifully, then fails on the one input you didn't try.
- **Skill erosion.** Lean on it for everything and your own ability to reason about code quietly fades.

And the one everyone eventually meets: **the 70% problem.** AI gets you about 70% of the way to a finished product astonishingly fast. The last 30% — edge cases, error handling, polish, real reliability — still demands genuine understanding. That final stretch is where vibe coding stalls, because you can't refine-by-vibe a bug you don't comprehend.

### Tools used for vibe coding (2026)

The 2026 landscape splits roughly into three groups.

**AI coding IDEs and agents** — for people comfortable around code, who want power and control:
- **Cursor** — an AI-native code editor; you chat, it edits across your whole project.
- **Claude Code** — Anthropic's terminal-based agent that reads, writes, and runs code in your real repository.
- **Windsurf** — an agentic IDE that takes larger, multi-step tasks on its own.
- **GitHub Copilot (agent mode)** — the familiar autocomplete grown into a fuller agent that can carry out tasks.

**App and prototype builders** — describe an app in a chat box, get a deployable product, no setup required:
- **v0 (Vercel)** — turns prompts into polished web UI components and pages.
- **Bolt.new** — builds and runs full web apps in the browser, great for fast prototypes.
- **Lovable** — a friendly, guided builder aimed squarely at non-developers.
- **Replit Agent** — builds, runs, and hosts complete apps, backend included.

**In-context artifacts** — build a small tool right inside a chat, no separate app:
- **Claude Artifacts** — generates a working mini-app beside the conversation.
- **ChatGPT Canvas** — a side-by-side workspace for writing and revising code in place.

A rough rule of thumb: IDEs and agents suit real projects you'll maintain; app builders suit standalone prototypes and demos; artifacts suit quick one-off tools you want *right now*.

### Efficiency — when it shines vs when it bites

Vibe coding **shines** for prototypes, glue code, boilerplate, UI scaffolding, learning a new framework, and throwaway scripts you'll delete next week. It **bites** on complex or novel logic, performance-critical code, large existing codebases, security-sensitive work, and anything you cannot easily verify.

Notice the pattern. The speed comes from fast iteration — but iteration is only "efficient" when you can *check* each result and the cost of being wrong is low. A prototype that's slightly wrong is no big deal; you tweak and re-run. A payroll calculation or a medical data pipeline that's subtly wrong is a serious problem you might not even notice. The same tool is a rocket for the first and a trap for the second.

### Healthy practice

The healthiest mindset is simple: **stay in the loop.** Read enough of the code to trust it. Run it on inputs that might break it. Treat the AI like a fast, eager **junior developer** — wonderful output, infinite stamina, occasionally confidently wrong — whom you direct and verify rather than blindly obey. For academics, the analogy is comforting: it is a tireless research assistant who happens to write code. You'd never put an assistant's draft into a journal without reading it. Same rule here.

## 6. Analogies

- **The eager junior developer.** Vibe coding is like directing a brilliant, fast, slightly over-confident junior who codes at superhuman speed. Give clear direction and check the work, and you're unstoppable. Hand over the keys and stop reviewing, and you'll discover the surprises in production.
- **GPS instead of a paper map.** It gets you where you're going with almost no effort — until it cheerfully routes you straight into a lake because it never actually understood the terrain. Convenient, mostly right, occasionally catastrophic when unsupervised.
- **Microwave vs a full kitchen.** Perfect for reheating leftovers and quick meals in two minutes. Not what you'd use to cater a wedding. Vibe coding is the microwave: fast and great for the everyday, wrong tool for the high-stakes feast.

## 7. Faculty Examples 🏫

- Build a quick interactive visualisation that animates a concept (a sorting algorithm, a supply-and-demand curve) for tomorrow's lecture.
- Generate a small grading helper that reads a folder of submissions and flags ones missing required sections.
- Spin up a one-page web tool where students drop in a sentence and see it tokenised, to make an abstract idea tangible.
- Create a throwaway demo app mid-lecture to show, live, how an idea becomes software.

## 8. Research Examples 🔬

- Write a data-cleaning script that standardises messy survey responses and dates without hand-coding every rule.
- Stand up a quick dashboard to explore a dataset visually before committing to a full analysis pipeline.
- Prototype the interactive tool or figure that accompanies a paper, fast enough to test whether the idea is worth pursuing.
- Build a small simulation to sanity-check a hypothesis before investing in a rigorous implementation.

## 9. Industry Examples 💼

- Assemble an internal tool — a request tracker, a report generator — that a small team needs but no one wants to staff a project for.
- Build a clickable MVP for a pitch meeting, so stakeholders react to a real prototype instead of a slide.
- Write automation glue that stitches two systems together: pull from one, transform, push to another.
- Prototype a feature quickly to test the concept, before engineers build the production-grade version.

## 13. Hands-on Activity ✋

Take a closer look at the **70% problem**, because it explains most of the disappointment people feel after the honeymoon. Vibe coding delivers the first 70% — a working shell of an app — almost magically. The trap is that 70% *feels* like 95%. It runs, it looks finished, it demos well. So the real cost hides in plain sight: the remaining 30% is the hard 30%, full of edge cases, failure handling, and reliability work that only genuine understanding can finish.

The deeper cost isn't the missing code — it's **understanding-debt.** Every line you accepted without reading is a small loan against your future self. The interest comes due the moment something breaks, because you can only refine-by-vibe a system you actually comprehend. A bug in code you've never read isn't a quick "fix this" prompt; it's an excavation. That's why the practitioners who get the most from vibe coding are the ones who read enough to keep the debt low.

## 14. Demonstration Ideas

Picture building a small "meeting countdown" web tool. You type: *"Make a page with a big timer counting down to a time I enter."* Seconds later a working timer appears. You run it, look, and refine: *"Add a start and reset button."* It updates. *"Make it turn red in the last minute and play a soft sound at zero."* It updates again. In four plain-English sentences you've shaped a real, working tool — that's the describe-generate-run-refine loop at its best, and it genuinely feels like magic.

Then watch where it stumbles. Ask for something subtler — *"keep the countdown accurate even if I switch browser tabs for ten minutes"* — and the cracks show. The AI may patch it in a way that looks fine but drifts by a few seconds, or quietly breaks the reset button while fixing the timer. The first 70% flowed effortlessly; this last slice needs someone who understands *why* timers drift. That contrast, live, is the whole lesson: dazzling speed up front, real understanding required at the finish.

## 15. Quiz Questions ❓

**Q1 (MCQ).** What best describes "pure vibe coding"?
- A) Writing all the code yourself while an AI watches
- B) **Describing what you want in plain English and trusting the AI's code without really reading it** ✅
- C) Manually reviewing every line the AI produces before running it
- D) Pair-programming with two human developers
*Explanation:* Pure vibe coding means steering by intent and largely not reading the code — distinct from AI-assisted engineering, where you still review what ships.

**Q2 (Conceptual).** What is the "70% problem" in vibe coding? *Answer:* AI gets you about 70% of the way to a finished product very quickly, but the final 30% — edge cases, polish, error handling, and real reliability — still requires genuine understanding, which is exactly where vibe coding tends to stall.

**Q3 (MCQ).** Which task is the *best* fit for vibe coding?
- A) A safety-critical medical dosing calculator for production
- B) A subtle change deep inside a large legacy codebase
- C) **A quick throwaway script to clean up a messy spreadsheet for a one-off analysis** ✅
- D) Performance-critical code where every millisecond counts
*Explanation:* Vibe coding shines on verifiable, low-stakes, throwaway work; it bites on safety-critical, performance-critical, and hard-to-verify tasks.

**Q4 (MCQ).** Which of these is an *app/prototype builder* rather than an AI coding IDE/agent?
- A) Cursor
- B) Claude Code
- C) **Lovable** ✅
- D) GitHub Copilot (agent mode)
*Explanation:* Lovable is a guided app builder aimed at non-developers; Cursor, Claude Code, and Copilot are IDEs/agents for people working directly with code.

**Q5 (Conceptual).** Why is "if it runs without errors, it must be correct and secure" a dangerous assumption? *Answer:* Running successfully only means the code didn't crash on the inputs you tried. It says nothing about edge cases, security holes, or hidden bugs — vibe-coded software often "works until it doesn't," failing on the one input or attack you never tested.

**Q6 (Conceptual).** What does treating the AI like "a fast junior developer" imply about how you should work with it? *Answer:* You direct it clearly and *verify* its output — reading enough of the code to trust it and testing it — rather than blindly accepting everything. You stay responsible for what ships, the way you'd review a junior's or research assistant's work before relying on it.

## 16. Common Misconceptions ⚠️

- **"Vibe coding replaces programmers."** It lowers the barrier and removes boilerplate, but the hard 30% — architecture, security, debugging, reliability — still needs people who understand code. It changes what programmers do, not whether they're needed.
- **"If it runs, it's correct and secure."** Running only means it didn't crash on your test inputs. Correctness and security are separate questions, and AI-generated code frequently hides bugs and vulnerabilities that surface later.
- **"You never need to read the code."** You can ignore the code for a quick throwaway, but the moment something breaks or ships to real users, the code you skipped becomes understanding-debt you have to pay back the hard way.
- **"More AI output means more productivity."** Generating a lot of code you can't verify isn't progress — it's risk. Efficiency depends on the task being verifiable and the cost of being wrong staying low, not on raw lines produced.

## 17. Key Takeaways

- **Vibe coding means describing intent in plain English** and letting the AI write the code — English becomes the interface, popularised by Karpathy in early 2025.
- **The loop is describe → generate → run → see → refine,** and its power is iteration speed: idea to working prototype in minutes.
- **It shines on prototypes, glue code, and throwaway scripts** — and bites on security-sensitive, performance-critical, novel, or hard-to-verify work.
- **The 70% problem and understanding-debt are the real costs:** the fast first 70% hides the hard last 30% that demands genuine understanding.
- **Stay in the loop:** treat the AI like a fast junior developer or tireless research assistant — direct it, read enough to trust it, test it, and own what ships.

---

*Sources: [10 Best Vibe Coding Tools in 2026 (Manus)](https://manus.im/blog/best-vibe-coding-tools), [Best Vibe Coding Tools in 2026 (Lovable)](https://lovable.dev/guides/best-vibe-coding-tools-2026-build-apps-chatting), [Which Vibe Coding Tool Should You Use in 2026? (Tech Coffee House)](https://techcoffeehouse.com/2026/06/01/best-vibe-coding-tools-2026/).*
