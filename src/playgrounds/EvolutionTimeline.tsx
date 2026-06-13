import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveLab from '../components/InteractiveLab';

interface Era {
  year: string; title: string; color: string;
  problem: string; limitation: string; innovation: string;
}
const ERAS: Era[] = [
  {
    year: '1950s+', title: 'Artificial Intelligence', color: 'var(--c-teal)',
    problem: 'Can machines do tasks that need "intelligence"?',
    limitation: 'Hand-written rules don\'t scale to messy, real-world inputs.',
    innovation: 'Symbolic logic, search, expert systems — explicit rules.',
  },
  {
    year: '1980s+', title: 'Machine Learning', color: 'var(--c-blue)',
    problem: 'Writing every rule by hand is impossible.',
    limitation: 'Still needs humans to hand-engineer the features.',
    innovation: 'Learn the rules from data + example outputs.',
  },
  {
    year: '2012+', title: 'Deep Learning', color: 'var(--c-purple)',
    problem: 'Who designs the features for images, audio, language?',
    limitation: 'Data-hungry; sequence models forget across long ranges.',
    innovation: 'Networks learn their own features — data + GPUs + architectures.',
  },
  {
    year: '2017+', title: 'Transformers', color: 'var(--c-pink)',
    problem: 'Recurrence is sequential and forgets distant context.',
    limitation: 'Compute and data cost grows with scale.',
    innovation: 'Attention: every token sees every token, in parallel.',
  },
  {
    year: '2020s+', title: 'Generative AI', color: 'var(--c-green)',
    problem: 'Can models create, not just classify?',
    limitation: 'Fluent ≠ true — hallucination is structural.',
    innovation: 'Scaled Transformers generate text, code, images, audio.',
  },
];

export default function EvolutionTimeline() {
  const [i, setI] = useState(0);
  const era = ERAS[i];

  return (
    <InteractiveLab
      name="Lab · AI Evolution Timeline"
      hint="Scrub the timeline. Each era reveals the problem it faced, the limitation that remained, and the innovation that broke through."
      note={<><b>The throughline:</b> each era solved the previous one's bottleneck — and exposed a new one. Generative AI sits on top of all four.</>}
    >
      <div className="difp-stage" style={{ padding: '1.5rem 1rem' }}>
        {/* track */}
        <div style={{ position: 'relative', height: 64, margin: '0 0.5rem' }}>
          <div style={{ position: 'absolute', top: 31, left: 0, right: 0, height: 2, background: 'var(--border-strong)' }} />
          <motion.div
            style={{ position: 'absolute', top: 31, left: 0, height: 2, background: era.color }}
            animate={{ width: `${(i / (ERAS.length - 1)) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between' }}>
            {ERAS.map((e, idx) => (
              <button
                key={e.title}
                onClick={() => setI(idx)}
                style={{ background: 'none', border: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 80 }}
                aria-label={e.title}
              >
                <motion.span
                  animate={{ scale: idx === i ? 1.4 : 1, backgroundColor: idx <= i ? e.color : '#3a3a3a' }}
                  style={{ width: 14, height: 14, borderRadius: '50%', marginTop: 24, display: 'block' }}
                />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: idx === i ? 'var(--text)' : 'var(--text-faint)' }}>{e.year}</span>
              </button>
            ))}
          </div>
        </div>

        {/* detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={era.title}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{ marginTop: '1.25rem', padding: '1.25rem', border: `1px solid var(--border)`, borderTop: `3px solid ${era.color}`, borderRadius: 10, background: 'var(--panel-bg)' }}
          >
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', margin: '0 0 0.75rem', color: era.color }}>{era.title}</h3>
            <Facet label="Problem" text={era.problem} />
            <Facet label="Limitation" text={era.limitation} />
            <Facet label="Innovation" text={era.innovation} />
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button className="difp-btn" disabled={i === 0} onClick={() => setI((x) => Math.max(0, x - 1))}>← Prev era</button>
          <button className="difp-btn difp-btn--primary" disabled={i === ERAS.length - 1} onClick={() => setI((x) => Math.min(ERAS.length - 1, x + 1))}>Next era →</button>
        </div>
      </div>
    </InteractiveLab>
  );
}

function Facet({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-faint)', flex: '0 0 5.5rem' }}>{label}</span>
      <span style={{ fontSize: '0.92rem', color: 'var(--text-dim)' }}>{text}</span>
    </div>
  );
}
