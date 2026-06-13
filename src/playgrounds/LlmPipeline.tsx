import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveLab from '../components/InteractiveLab';

interface Stage { key: string; label: string; icon: string; color: string; short: string; detail: string; }

const STAGES: Stage[] = [
  { key: 'prompt', label: 'Prompt', icon: '⌨', color: 'var(--c-blue)',
    short: 'Your text enters', detail: '“The capital of France is” — your prompt, together with any system instructions and the conversation so far.' },
  { key: 'tokenize', label: 'Tokenize', icon: '⊟', color: 'var(--c-purple)',
    short: 'Text → token IDs', detail: 'The text is split into sub-word tokens, each mapped to an integer ID — e.g. [“The”, “ capital”, “ of”, “ France”, “ is”] → [791, 6864, 315, 9822, 374].' },
  { key: 'embed', label: 'Embed', icon: '⋮⋮', color: 'var(--c-teal)',
    short: 'IDs → vectors', detail: 'Each token ID becomes a dense vector, and positional information is added so the model knows the order of the words.' },
  { key: 'layers', label: 'Transformer layers', icon: '≋', color: 'var(--c-blue)',
    short: 'Attention builds context', detail: 'Dozens of self-attention + feed-forward layers. Every token attends to every other one, refining each word’s meaning from its context.' },
  { key: 'probs', label: 'Probabilities', icon: '▥', color: 'var(--c-yellow)',
    short: 'Score every next token', detail: 'The final layer produces a probability over the entire vocabulary for the next token. Here “Paris” scores highest.' },
  { key: 'select', label: 'Select', icon: '◎', color: 'var(--c-pink)',
    short: 'Pick one token', detail: 'One token is chosen from the distribution (temperature controls how adventurous the pick is). It is appended to the input…' },
  { key: 'response', label: 'Response', icon: '✦', color: 'var(--c-green)',
    short: 'Loop → full answer', detail: '…and the whole pipeline runs again for the next token. This loop — autoregression — assembles the complete response.' },
];

const RESPONSE = ['Paris', '.', ' It', ' is', ' the', ' capital', ' of', ' France', '.'];

export default function LlmPipeline() {
  const [active, setActive] = useState<number>(-1);   // running highlight
  const [selected, setSelected] = useState<number>(0); // click-to-inspect
  const [running, setRunning] = useState(false);
  const [tokens, setTokens] = useState<string[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearAll, []);

  function run() {
    clearAll();
    setRunning(true);
    setTokens([]);
    setActive(0);
    setSelected(0);
    const STEP = 650;
    STAGES.forEach((_, i) => {
      timers.current.push(setTimeout(() => { setActive(i); setSelected(i); }, i * STEP));
    });
    // after reaching "response", reveal the answer token by token
    const base = STAGES.length * STEP;
    RESPONSE.forEach((tok, i) => {
      timers.current.push(setTimeout(() => setTokens((t) => [...t, tok]), base + i * 230));
    });
    timers.current.push(setTimeout(() => { setActive(-1); setRunning(false); }, base + RESPONSE.length * 230 + 200));
  }

  function reset() { clearAll(); setActive(-1); setRunning(false); setTokens([]); setSelected(0); }

  const detail = STAGES[selected];

  return (
    <InteractiveLab
      name="Lab · The LLM Pipeline"
      hint="Press Run to watch a prompt travel from text to answer, one token at a time. Click any stage to inspect what it does. Illustrative, not live inference."
      note={<>An LLM is a <b>next-token predictor</b>: the last three stages loop (autoregression), generating the response one token at a time.</>}
    >
      <div className="difp-ctrl-row">
        <button className="difp-btn difp-btn--primary" onClick={run} disabled={running}>{running ? 'Running…' : '▶ Run'}</button>
        <button className="difp-btn" onClick={reset}>Reset</button>
      </div>

      <div className="difp-stage" style={{ padding: '1.25rem 1rem' }}>
        {/* stage rail */}
        <div className="difp-pipe">
          {STAGES.map((s, i) => {
            const isActive = active === i;
            const isSel = selected === i;
            const done = active > i || (!running && tokens.length > 0);
            return (
              <div key={s.key} className="difp-pipe__cell">
                <motion.button
                  className={`difp-pipe__node${isSel ? ' is-sel' : ''}`}
                  onClick={() => setSelected(i)}
                  animate={{
                    scale: isActive ? 1.08 : 1,
                    borderColor: isActive || isSel ? s.color : 'var(--border)',
                    boxShadow: isActive ? `0 0 0 3px color-mix(in srgb, ${s.color} 35%, transparent)` : 'none',
                  }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0.38, 0.9] }}
                  style={{ ['--nc' as string]: s.color }}
                >
                  <span className="difp-pipe__icon" style={{ color: done || isActive || isSel ? s.color : 'var(--text-faint)' }}>{s.icon}</span>
                  <span className="difp-pipe__label">{s.label}</span>
                  <span className="difp-pipe__sub">{s.short}</span>
                </motion.button>
                {i < STAGES.length - 1 && (
                  <motion.span className="difp-pipe__arrow" animate={{ color: active > i ? STAGES[i].color : 'var(--text-faint)' }}>›</motion.span>
                )}
              </div>
            );
          })}
        </div>

        {/* autoregression loop hint */}
        <div className="difp-pipe__loop">↺ the last stages repeat — one token per pass (autoregression)</div>

        {/* inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={detail.key}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0.38, 0.9] }}
            className="difp-pipe__inspect"
            style={{ borderColor: detail.color }}
          >
            <span className="difp-pipe__inspect-tag" style={{ color: detail.color, borderColor: detail.color }}>{detail.label}</span>
            <p>{detail.detail}</p>
          </motion.div>
        </AnimatePresence>

        {/* assembled response */}
        <div className="difp-pipe__out">
          <span className="difp-pipe__out-label">Response</span>
          <div className="difp-pipe__out-tokens">
            {tokens.length === 0 ? (
              <span className="difp-pipe__out-empty">Press Run to generate…</span>
            ) : (
              tokens.map((t, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                  className="difp-pipe__tok">{t}</motion.span>
              ))
            )}
            {running && tokens.length > 0 && tokens.length < RESPONSE.length && <span className="difp-pipe__caret" />}
          </div>
        </div>
      </div>
    </InteractiveLab>
  );
}
