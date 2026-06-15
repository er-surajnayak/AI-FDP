import { useState } from 'react';
import InteractiveLab from '../components/InteractiveLab';

// Each technique pairs a vague prompt with a stronger one for the SAME task,
// so the lesson is "the model didn't change — the prompt did."
const TECHNIQUES = [
  {
    key: 'zero', name: 'Zero-shot', tag: 'just ask',
    idea: 'Ask directly, with no examples — but be specific about who, what, and the constraints.',
    before: 'Write a tagline.',
    after: 'Write a punchy 6-word tagline for a campus mental-health app aimed at anxious first-year students. Warm, not clinical.',
    change: 'Specificity and constraints replace the model’s guesswork about what you meant.',
  },
  {
    key: 'few', name: 'Few-shot', tag: 'show examples',
    idea: 'Show two or three worked examples first; the model copies the pattern.',
    before: 'Classify the sentiment of: "Honestly not bad."',
    after: 'Examples:\n"Loved every minute" → Positive\n"Total waste of money" → Negative\n"It was fine, I guess" → Neutral\n\nNow classify: "Honestly not bad" →',
    change: 'Examples teach the exact format and how to handle the tricky in-between cases.',
  },
  {
    key: 'cot', name: 'Chain-of-Thought', tag: 'show working',
    idea: 'Ask the model to reason step by step before answering — accuracy on maths and logic jumps.',
    before: 'A lecture starts at 14:50 and runs 75 minutes. When does it end? Answer only.',
    after: 'A lecture starts at 14:50 and runs 75 minutes. Think step by step, then give the final time on its own line.',
    change: '“Show your working” lets the model catch its own slips instead of blurting a wrong guess.',
  },
  {
    key: 'role', name: 'Role / Persona', tag: 'give it a hat',
    idea: 'Tell the model who to be; the role sets its standards, vocabulary, and tone.',
    before: 'Review my abstract.',
    after: 'Act as a critical peer reviewer in computational biology. Review my abstract for clarity, novelty, and any overclaiming. Be specific and direct.',
    change: 'A role raises the bar — it reviews like a reviewer, not a cheerleader.',
  },
  {
    key: 'structured', name: 'Structured output', tag: 'demand a shape',
    idea: 'Ask for a precise format — a table, JSON, bullet list — so the result is usable as-is.',
    before: 'List the pros and cons of open-book exams.',
    after: 'Return a markdown table with columns | Aspect | Pro | Con | covering preparation, fairness, and workload.',
    change: 'A fixed shape makes the output something you can paste straight into a doc or a script.',
  },
  {
    key: 'chain', name: 'Prompt chaining', tag: 'break it up',
    idea: 'Split one big task into a sequence of smaller prompts, each building on the last.',
    before: 'Write a full literature review on AI in education.',
    after: 'Step 1 — list the 6 main themes.\nStep 2 — for each theme, summarise the 3 key papers.\nStep 3 — stitch the summaries into a flowing review.',
    change: 'Small, checkable steps give you control and far fewer compounding errors.',
  },
];

export default function PromptExplorer() {
  const [sel, setSel] = useState(0);
  const t = TECHNIQUES[sel];
  return (
    <InteractiveLab
      name="Lab · Prompt Technique Explorer"
      hint="Pick a technique. The task stays the same — watch how rewording the prompt changes everything."
      note={<><b>Same model, different steering.</b> Every pair below asks for the same thing. The only variable is how you ask — that is the whole craft of prompting.</>}
    >
      <div className="difp-seg" style={{ marginBottom: '1rem' }}>
        {TECHNIQUES.map((tk, i) => (
          <button key={tk.key} className={i === sel ? 'is-active' : ''} onClick={() => setSel(i)} style={{ minWidth: 'auto', padding: '0.4rem 0.7rem', fontFamily: 'var(--sans)', fontSize: '0.82rem' }}>
            {tk.name}
          </button>
        ))}
      </div>

      <p className="difp-pe__idea"><span className="difp-pe__tag">{t.tag}</span>{t.idea}</p>

      <div className="difp-pe__grid">
        <div className="difp-pe__col difp-pe__col--before">
          <div className="difp-pe__label">Vague prompt</div>
          <pre className="difp-pe__prompt">{t.before}</pre>
        </div>
        <div className="difp-pe__arrow" aria-hidden>→</div>
        <div className="difp-pe__col difp-pe__col--after">
          <div className="difp-pe__label difp-pe__label--good">{t.name} prompt</div>
          <pre className="difp-pe__prompt">{t.after}</pre>
        </div>
      </div>

      <p className="difp-pe__change"><b>What changed:</b> {t.change}</p>
    </InteractiveLab>
  );
}
