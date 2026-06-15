import { useEffect, useRef, useState } from 'react';
import InteractiveLab from '../components/InteractiveLab';

const LOOP = [
  { k: 'Describe', d: '“Build me a page that shows my class’s quiz scores as a bar chart.”', c: 'var(--c-blue)' },
  { k: 'Generate', d: 'The AI writes the actual code — HTML, JavaScript, the lot.', c: 'var(--c-purple)' },
  { k: 'Run', d: 'You run it and see the result in seconds, not hours.', c: 'var(--c-teal)' },
  { k: 'Refine', d: '“Make the bars green and sort them high to low.” Repeat.', c: 'var(--c-green)' },
];

// Each task shows when vibe coding is efficient vs when it bites.
const TASKS = [
  { t: 'A quick script to rename 500 files', fit: 'great', why: 'One-off, easy to verify, low stakes — vibe coding shines.' },
  { t: 'A prototype dashboard for a pitch', fit: 'great', why: 'Speed matters more than perfection; you’ll rebuild it later anyway.' },
  { t: 'A small interactive teaching demo', fit: 'great', why: 'Self-contained, visual, instantly checkable.' },
  { t: 'The payment system for a real product', fit: 'risky', why: 'Security and correctness are critical and hard to eyeball. Needs real review.' },
  { t: 'A new feature in a large codebase', fit: 'risky', why: 'The AI can’t hold all the context; subtle breakage hides easily.' },
  { t: 'A novel, performance-critical algorithm', fit: 'risky', why: 'The hard 30% — edge cases and speed — still needs genuine understanding.' },
];

const TOOLS = [
  { group: 'AI coding IDEs & agents', items: ['Cursor', 'Claude Code', 'Windsurf', 'GitHub Copilot'], note: 'Work inside a real codebase you can keep.' },
  { group: 'App & prototype builders', items: ['v0', 'Bolt.new', 'Lovable', 'Replit Agent'], note: 'Describe an app, get a running one.' },
  { group: 'In-chat artifacts', items: ['Claude Artifacts', 'ChatGPT Canvas'], note: 'Build a small tool right in the chat.' },
];

export default function VibeCoding() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [task, setTask] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => setStep((s) => (s + 1) % LOOP.length), 1100);
      return () => { if (timer.current) clearInterval(timer.current); };
    }
  }, [playing]);

  return (
    <InteractiveLab
      name="Lab · Vibe Coding"
      hint="Build software by describing what you want in plain English — and see where that’s brilliant and where it bites."
      note={<><b>“Vibe coding”</b> (a term Andrej Karpathy popularised in 2025) means leaning on the vibes: you describe, the AI writes the code, you steer in plain English. It’s fast and freeing — and only as safe as your ability to check the result.</>}
    >
      {/* The loop */}
      <div className="difp-sub">The loop</div>
      <div className="difp-vc__loop">
        {LOOP.map((l, i) => (
          <button key={l.k} className={`difp-vc__node ${i === step ? 'is-active' : ''}`} onClick={() => { setPlaying(false); setStep(i); }} style={{ ['--nc' as string]: l.c }}>
            <span className="difp-vc__num">{i + 1}</span>
            <span className="difp-vc__name">{l.k}</span>
            {i < LOOP.length - 1 && <span className="difp-vc__sep" aria-hidden>→</span>}
            {i === LOOP.length - 1 && <span className="difp-vc__sep difp-vc__sep--loop" aria-hidden>↺</span>}
          </button>
        ))}
      </div>
      <div className="difp-vc__caption"><b>{LOOP[step].k}.</b> {LOOP[step].d}</div>
      <button className="difp-btn" style={{ marginBottom: '1.4rem' }} onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play the loop'}</button>

      {/* Good fit / risky fit */}
      <div className="difp-sub">Is it a good fit?</div>
      <p className="difp-lab__hint" style={{ marginTop: 0 }}>Tap a task to see whether vibe coding is the efficient choice — or a trap.</p>
      <div className="difp-vc__tasks">
        {TASKS.map((tk, i) => (
          <button key={i} className={`difp-vc__task ${task === i ? 'is-open' : ''} ${tk.fit}`} onClick={() => setTask(task === i ? null : i)}>
            <span className="difp-vc__dot" aria-hidden />{tk.t}
          </button>
        ))}
      </div>
      {task != null && (
        <div className={`difp-vc__verdict ${TASKS[task].fit}`}>
          <b>{TASKS[task].fit === 'great' ? 'Great fit' : 'Risky fit'}</b> — {TASKS[task].why}
        </div>
      )}

      {/* Pros / cons */}
      <div className="difp-sub" style={{ marginTop: '1.4rem' }}>The trade-off</div>
      <div className="difp-vc__pc">
        <div className="difp-vc__pccol difp-vc__pccol--pro">
          <div className="difp-vc__pchead">Where it’s brilliant</div>
          <ul>
            <li>Idea to working prototype in minutes</li>
            <li>Lets non-programmers build real things</li>
            <li>Kills boilerplate and glue code</li>
            <li>A fast, tireless junior developer</li>
          </ul>
        </div>
        <div className="difp-vc__pccol difp-vc__pccol--con">
          <div className="difp-vc__pchead">Where it bites</div>
          <ul>
            <li>You may ship code you don’t understand</li>
            <li>Security holes and hallucinated APIs</li>
            <li>Hard to debug, scale, and maintain</li>
            <li>The “70% problem”: the last 30% is the hard part</li>
          </ul>
        </div>
      </div>

      {/* Tools */}
      <div className="difp-sub" style={{ marginTop: '1.4rem' }}>The tools</div>
      <div className="difp-vc__tools">
        {TOOLS.map((g) => (
          <div key={g.group} className="difp-vc__toolcard">
            <div className="difp-vc__toolgroup">{g.group}</div>
            <div className="difp-chiprow" style={{ margin: '0.4rem 0' }}>{g.items.map((it) => <span key={it} className="difp-chip">{it}</span>)}</div>
            <div className="difp-vc__toolnote">{g.note}</div>
          </div>
        ))}
      </div>
    </InteractiveLab>
  );
}
