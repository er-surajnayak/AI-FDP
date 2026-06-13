import { useMemo, useState } from 'react';
import { TextArea, Slider, Tag, InlineNotification } from '@carbon/react';
import { motion } from 'framer-motion';
import PlaygroundFrame from '../components/PlaygroundFrame';
import { attentionMatrix } from './illustrative';

const DEFAULT = "The animal didn't cross the street because it was too tired";

export default function SelfAttentionPlayground() {
  const [text, setText] = useState(DEFAULT);
  const [threshold, setThreshold] = useState(0.08);
  const [focus, setFocus] = useState<number | null>(null);

  const tokens = useMemo(
    () => text.trim().split(/\s+/).filter(Boolean).slice(0, 18),
    [text],
  );
  const weights = useMemo(() => attentionMatrix(tokens), [tokens]);

  const W = 720;
  const H = 220;
  const pad = 40;
  const step = tokens.length > 1 ? (W - 2 * pad) / (tokens.length - 1) : 0;
  const x = (i: number) => pad + i * step;
  const baseY = 150;

  const activeRow = focus != null ? weights[focus] : null;
  const description =
    focus != null && activeRow
      ? `“${tokens[focus]}” attends most strongly to “${
          tokens[activeRow.indexOf(Math.max(...activeRow.filter((_, j) => j !== focus)))] ?? '—'
        }”.`
      : 'Hover or tap a word to see what it attends to.';

  return (
    <PlaygroundFrame
      title="Self-Attention Playground"
      hint="Type a sentence, then hover a word to see its attention. Illustrative weights (cosine of pseudo-embeddings + a coreference heuristic) — not live model inference."
    >
      <TextArea
        labelText="Your sentence"
        rows={2}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setFocus(null);
        }}
      />

      <div style={{ margin: '1rem 0', maxWidth: 320 }}>
        <Slider
          labelText="Hide weak connections below"
          min={0}
          max={0.4}
          step={0.01}
          value={threshold}
          onChange={({ value }) => setThreshold(value)}
        />
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={description}
        style={{ maxWidth: '100%' }}
      >
        {/* attention arcs from the focused token */}
        {focus != null &&
          activeRow!.map((w, j) => {
            if (j === focus || w < threshold) return null;
            const x1 = x(focus);
            const x2 = x(j);
            const midX = (x1 + x2) / 2;
            const arcH = baseY - 40 - Math.min(80, Math.abs(x2 - x1) * 0.35);
            return (
              <motion.path
                key={j}
                d={`M ${x1} ${baseY - 14} Q ${midX} ${arcH} ${x2} ${baseY - 14}`}
                fill="none"
                stroke="#4589ff"
                strokeWidth={1 + w * 10}
                strokeOpacity={0.25 + w * 0.7}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
            );
          })}

        {/* token labels */}
        {tokens.map((tok, i) => {
          const isFocus = i === focus;
          const w = activeRow ? activeRow[i] : 0;
          return (
            <g
              key={i}
              transform={`translate(${x(i)}, ${baseY})`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setFocus(i)}
              onClick={() => setFocus(i)}
            >
              <rect
                x={-22}
                y={-2}
                width={44}
                height={22}
                rx={4}
                fill={isFocus ? '#4589ff' : focus != null ? `rgba(69,137,255,${0.12 + w * 0.8})` : '#393939'}
              />
              <text
                textAnchor="middle"
                y={13}
                fontSize={11}
                fill="#f4f4f4"
                style={{ pointerEvents: 'none' }}
              >
                {tok.length > 9 ? tok.slice(0, 8) + '…' : tok}
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{ marginTop: '0.75rem' }}>
        {focus != null ? (
          <Tag type="blue">{description}</Tag>
        ) : (
          <Tag type="gray">Hover a word to begin</Tag>
        )}
      </div>

      <InlineNotification
        kind="info"
        lowContrast
        hideCloseButton
        title="Teaching simulation"
        subtitle="Weights are illustrative and deterministic so the demo is reproducible. Wire a model via a serverless proxy for live attention."
        style={{ marginTop: '1rem' }}
      />
    </PlaygroundFrame>
  );
}
