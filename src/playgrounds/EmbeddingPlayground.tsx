import { useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveLab from '../components/InteractiveLab';

interface Word { word: string; x: number; y: number; group: string }
const WORDS: Word[] = [
  { word: 'professor', x: 0.18, y: 0.22, group: 'academic' },
  { word: 'research', x: 0.26, y: 0.16, group: 'academic' },
  { word: 'publication', x: 0.32, y: 0.26, group: 'academic' },
  { word: 'student', x: 0.14, y: 0.34, group: 'academic' },
  { word: 'faculty', x: 0.22, y: 0.30, group: 'academic' },
  { word: 'citation', x: 0.36, y: 0.18, group: 'academic' },
  { word: 'peer-review', x: 0.30, y: 0.12, group: 'academic' },
  { word: 'bank', x: 0.74, y: 0.30, group: 'finance' },
  { word: 'loan', x: 0.82, y: 0.26, group: 'finance' },
  { word: 'invoice', x: 0.86, y: 0.36, group: 'finance' },
  { word: 'budget', x: 0.78, y: 0.40, group: 'finance' },
  { word: 'banana', x: 0.52, y: 0.78, group: 'everyday' },
  { word: 'kitchen', x: 0.60, y: 0.84, group: 'everyday' },
  { word: 'recipe', x: 0.46, y: 0.86, group: 'everyday' },
  { word: 'coffee', x: 0.40, y: 0.76, group: 'everyday' },
];
const COLORS: Record<string, string> = { academic: 'var(--c-blue)', finance: 'var(--c-teal)', everyday: 'var(--c-yellow)' };
const dist = (a: Word, b: Word) => Math.hypot(a.x - b.x, a.y - b.y);

export default function EmbeddingPlayground() {
  const [anchor, setAnchor] = useState('professor');
  const anchorWord = WORDS.find((w) => w.word === anchor)!;
  const ranked = WORDS.filter((w) => w.word !== anchor).map((w) => ({ w, sim: 1 - dist(anchorWord, w) / 1.2 })).sort((a, b) => b.sim - a.sim);
  const W = 560, H = 360;

  return (
    <InteractiveLab
      name="Lab · Embedding Similarity Explorer"
      hint="Pick an anchor word; nearest words = most similar. Coordinates are hand-placed for teaching; real embeddings are high-dimensional projections."
      note={<><b>Honest caveat:</b> clusters emerge from usage, not labels. Vector arithmetic (King − Man + Woman ≈ Queen) is approximate, model-dependent, and embeddings can encode social bias.</>}
    >
      <div className="difp-ctrl-row">
        <div className="difp-field" style={{ minWidth: 220 }}>
          <label htmlFor="anchor">Anchor word</label>
          <select id="anchor" value={anchor} onChange={(e) => setAnchor(e.target.value)}>
            {WORDS.map((w) => <option key={w.word} value={w.word}>{w.word}</option>)}
          </select>
        </div>
      </div>

      <div className="difp-stage">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Words near “${anchor}”`}>
          {ranked.slice(0, 3).map(({ w, sim }) => (
            <line key={w.word} x1={anchorWord.x * W} y1={anchorWord.y * H} x2={w.x * W} y2={w.y * H}
              stroke="var(--c-blue)" strokeOpacity={Math.max(0.15, sim)} strokeWidth={1 + sim * 3} />
          ))}
          {WORDS.map((w) => {
            const isAnchor = w.word === anchor;
            return (
              <motion.g key={w.word} animate={{ x: w.x * W, y: w.y * H }} transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                style={{ cursor: 'pointer' }} onClick={() => setAnchor(w.word)}>
                <circle r={isAnchor ? 8 : 5} fill={COLORS[w.group]} style={{ stroke: isAnchor ? 'var(--text)' : 'none' }} strokeWidth={2} />
                <text x={10} y={4} fontSize={12} style={{ fill: 'var(--text)', fontFamily: 'var(--mono)' }}>{w.word}</text>
              </motion.g>
            );
          })}
        </svg>
      </div>
      <p className="difp-lab__hint" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
        Closest to “{anchor}”: {ranked.slice(0, 4).map(({ w, sim }) => `${w.word} (${sim.toFixed(2)})`).join(' · ')}
      </p>
    </InteractiveLab>
  );
}
