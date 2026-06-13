import { useState } from 'react';
import { Dropdown, Tag, InlineNotification } from '@carbon/react';
import { motion } from 'framer-motion';
import PlaygroundFrame from '../components/PlaygroundFrame';

// Precomputed 2-D coordinates for a small curated vocabulary, hand-placed so
// related words cluster (academic / everyday / finance). Illustrative — real
// embeddings live in hundreds of dimensions, projected down for display.
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

const COLORS: Record<string, string> = {
  academic: '#4589ff',
  finance: '#08bdba',
  everyday: '#d2a106',
};

const dist = (a: Word, b: Word) => Math.hypot(a.x - b.x, a.y - b.y);

export default function EmbeddingPlayground() {
  const [anchor, setAnchor] = useState<string>('professor');
  const anchorWord = WORDS.find((w) => w.word === anchor)!;

  const ranked = WORDS
    .filter((w) => w.word !== anchor)
    .map((w) => ({ w, sim: 1 - dist(anchorWord, w) / 1.2 }))
    .sort((a, b) => b.sim - a.sim);

  const W = 560;
  const H = 360;

  return (
    <PlaygroundFrame
      title="Embedding & Semantic Similarity Explorer"
      hint="Pick an anchor word; nearest words = most similar. Coordinates are hand-placed for teaching; real embeddings are high-dimensional projections."
    >
      <div style={{ maxWidth: 260, marginBottom: '1rem' }}>
        <Dropdown
          id="anchor"
          titleText="Anchor word"
          label="Choose a word"
          items={WORDS.map((w) => w.word)}
          selectedItem={anchor}
          onChange={({ selectedItem }) => selectedItem && setAnchor(selectedItem)}
        />
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: '100%' }} role="img" aria-label={`Words near “${anchor}”`}>
        {/* lines from anchor to nearest 3 */}
        {ranked.slice(0, 3).map(({ w, sim }) => (
          <line
            key={w.word}
            x1={anchorWord.x * W}
            y1={anchorWord.y * H}
            x2={w.x * W}
            y2={w.y * H}
            stroke="#4589ff"
            strokeOpacity={Math.max(0.15, sim)}
            strokeWidth={1 + sim * 3}
          />
        ))}
        {WORDS.map((w) => {
          const isAnchor = w.word === anchor;
          return (
            <motion.g
              key={w.word}
              animate={{ x: w.x * W, y: w.y * H }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              style={{ cursor: 'pointer' }}
              onClick={() => setAnchor(w.word)}
            >
              <circle r={isAnchor ? 8 : 5} fill={COLORS[w.group]} style={{ stroke: isAnchor ? 'var(--cds-text-primary)' : 'none' }} strokeWidth={2} />
              <text x={10} y={4} fontSize={12} style={{ fill: 'var(--cds-text-primary, #161616)' }}>{w.word}</text>
            </motion.g>
          );
        })}
      </svg>

      <div style={{ marginTop: '0.75rem' }}>
        <span style={{ fontSize: 13, opacity: 0.8 }}>Closest to “{anchor}”: </span>
        {ranked.slice(0, 4).map(({ w, sim }) => (
          <Tag key={w.word} type="blue">
            {w.word} ({sim.toFixed(2)})
          </Tag>
        ))}
      </div>

      <InlineNotification
        kind="warning"
        lowContrast
        hideCloseButton
        title="Honest caveat"
        subtitle="Clusters emerge from usage, not labels. Vector arithmetic (King − Man + Woman ≈ Queen) is approximate, model-dependent, and embeddings can encode social bias."
        style={{ marginTop: '1rem' }}
      />
    </PlaygroundFrame>
  );
}
