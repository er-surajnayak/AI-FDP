import { useState } from 'react';
import InteractiveLab from '../components/InteractiveLab';

interface Word { word: string; x: number; y: number; group: string }
const WORDS: Word[] = [
  { word: 'professor', x: 0.16, y: 0.24, group: 'academic' },
  { word: 'research', x: 0.27, y: 0.15, group: 'academic' },
  { word: 'publication', x: 0.20, y: 0.40, group: 'academic' },
  { word: 'student', x: 0.10, y: 0.55, group: 'academic' },
  { word: 'faculty', x: 0.30, y: 0.30, group: 'academic' },
  { word: 'citation', x: 0.36, y: 0.46, group: 'academic' },
  { word: 'peer-review', x: 0.40, y: 0.20, group: 'academic' },
  { word: 'bank', x: 0.72, y: 0.28, group: 'finance' },
  { word: 'loan', x: 0.85, y: 0.22, group: 'finance' },
  { word: 'invoice', x: 0.88, y: 0.42, group: 'finance' },
  { word: 'budget', x: 0.74, y: 0.46, group: 'finance' },
  { word: 'banana', x: 0.50, y: 0.80, group: 'everyday' },
  { word: 'kitchen', x: 0.64, y: 0.72, group: 'everyday' },
  { word: 'recipe', x: 0.42, y: 0.70, group: 'everyday' },
  { word: 'coffee', x: 0.58, y: 0.88, group: 'everyday' },
];
const COLORS: Record<string, string> = { academic: 'var(--c-blue)', finance: 'var(--c-teal)', everyday: 'var(--c-yellow)' };
const GROUP_LABEL: Record<string, string> = { academic: 'Academic', finance: 'Finance', everyday: 'Everyday' };
const dist = (a: Word, b: Word) => Math.hypot(a.x - b.x, a.y - b.y);

export default function EmbeddingPlayground() {
  const [anchor, setAnchor] = useState('professor');
  const anchorWord = WORDS.find((w) => w.word === anchor)!;
  const ranked = WORDS
    .filter((w) => w.word !== anchor)
    .map((w) => ({ w, sim: 1 - dist(anchorWord, w) / 1.25 }))
    .sort((a, b) => b.sim - a.sim);
  const nearest = new Set(ranked.slice(0, 3).map((r) => r.w.word));
  const W = 560, H = 380;

  return (
    <InteractiveLab
      name="Lab · Embedding Similarity Explorer"
      hint="Each word is a point; words with similar meaning sit close together. Pick an anchor — the lines connect it to its nearest neighbours. Coordinates are hand-placed for teaching; real embeddings are high-dimensional projections."
      note={<><b>Honest caveat:</b> clusters emerge from usage, not labels. Vector arithmetic (King − Man + Woman ≈ Queen) is approximate, model-dependent, and embeddings can encode social bias.</>}
    >
      <div className="difp-ctrl-row">
        <div className="difp-field" style={{ minWidth: 220 }}>
          <label htmlFor="anchor">Anchor word</label>
          <select id="anchor" value={anchor} onChange={(e) => setAnchor(e.target.value)}>
            {WORDS.map((w) => <option key={w.word} value={w.word}>{w.word}</option>)}
          </select>
        </div>
        <div className="difp-legend">
          {Object.entries(GROUP_LABEL).map(([g, label]) => (
            <span key={g} className="difp-legend-item"><i style={{ background: COLORS[g] }} />{label}</span>
          ))}
        </div>
      </div>

      <div className="difp-stage" style={{ padding: '0.5rem' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Words nearest to “${anchor}”: ${ranked.slice(0, 3).map((r) => r.w.word).join(', ')}`}>
          {/* connector lines to nearest neighbours */}
          {ranked.slice(0, 3).map(({ w, sim }) => (
            <line key={w.word} x1={anchorWord.x * W} y1={anchorWord.y * H} x2={w.x * W} y2={w.y * H}
              stroke="var(--c-blue)" strokeOpacity={Math.max(0.25, sim)} strokeWidth={1 + sim * 3} strokeLinecap="round" />
          ))}
          {/* word points + labels (static transform — reliable in SVG) */}
          {WORDS.map((w) => {
            const isAnchor = w.word === anchor;
            const isNear = nearest.has(w.word);
            const rightSide = w.x > 0.62;
            return (
              <g key={w.word} transform={`translate(${w.x * W}, ${w.y * H})`} style={{ cursor: 'pointer' }} onClick={() => setAnchor(w.word)}>
                <circle r={isAnchor ? 8 : isNear ? 6 : 4.5} fill={COLORS[w.group]}
                  style={{ stroke: isAnchor ? 'var(--text)' : 'none', opacity: isAnchor || isNear ? 1 : 0.6 }} strokeWidth={2} />
                <text x={rightSide ? -10 : 10} y={4} textAnchor={rightSide ? 'end' : 'start'} fontSize={12}
                  style={{ fill: isAnchor || isNear ? 'var(--text)' : 'var(--text-dim)', fontFamily: 'var(--mono)', fontWeight: isAnchor ? 600 : 400 }}>
                  {w.word}
                </text>
              </g>
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
