import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveLab from '../components/InteractiveLab';
import { attentionMatrix } from './illustrative';

const DEFAULT = "The animal didn't cross the street because it was too tired";

export default function SelfAttentionPlayground() {
  const [text, setText] = useState(DEFAULT);
  const [threshold, setThreshold] = useState(0.08);
  const [focus, setFocus] = useState<number | null>(null);

  const tokens = useMemo(() => text.trim().split(/\s+/).filter(Boolean).slice(0, 18), [text]);
  const weights = useMemo(() => attentionMatrix(tokens), [tokens]);

  const W = 720, H = 200, pad = 40;
  const step = tokens.length > 1 ? (W - 2 * pad) / (tokens.length - 1) : 0;
  const x = (i: number) => pad + i * step;
  const baseY = 140;

  const activeRow = focus != null ? weights[focus] : null;
  const strongest =
    activeRow ? tokens[activeRow.map((w, j) => (j === focus ? -1 : w)).indexOf(Math.max(...activeRow.filter((_, j) => j !== focus)))] : null;

  return (
    <InteractiveLab
      name="Lab · Self-Attention Explorer"
      hint="Type a sentence, then hover a word to see what it attends to. Illustrative weights (cosine of pseudo-embeddings + a coreference heuristic) — not live model inference."
      note={<><b>Teaching simulation:</b> the weights are illustrative and deterministic, so the demo is reproducible. A real model computes these from learned Query/Key vectors.</>}
    >
      <div className="difp-field" style={{ marginBottom: '1rem' }}>
        <label htmlFor="sa-input">Your sentence</label>
        <textarea id="sa-input" rows={2} value={text} onChange={(e) => { setText(e.target.value); setFocus(null); }} />
      </div>
      <div className="difp-slider" style={{ maxWidth: 320, marginBottom: '1rem' }}>
        <label>Hide weak links</label>
        <input type="range" min={0} max={0.4} step={0.01} value={threshold} onChange={(e) => setThreshold(+e.target.value)} />
        <span className="difp-slider__val">&lt; {threshold.toFixed(2)}</span>
      </div>

      <div className="difp-stage">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%"
          role="img" aria-label={strongest ? `“${tokens[focus!]}” attends most strongly to “${strongest}”` : 'Hover a word to see its attention'}>
          {focus != null && activeRow!.map((w, j) => {
            if (j === focus || w < threshold) return null;
            const x1 = x(focus), x2 = x(j), midX = (x1 + x2) / 2;
            const arcH = baseY - 30 - Math.min(80, Math.abs(x2 - x1) * 0.35);
            return (
              <motion.path key={j}
                d={`M ${x1} ${baseY - 14} Q ${midX} ${arcH} ${x2} ${baseY - 14}`}
                fill="none" stroke="var(--c-blue)" strokeWidth={1 + w * 11} strokeOpacity={0.25 + w * 0.7}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, ease: [0.2, 0, 0.38, 0.9] }} />
            );
          })}
          {tokens.map((tok, i) => {
            const isFocus = i === focus;
            const w = activeRow ? activeRow[i] : 0;
            return (
              <g key={i} transform={`translate(${x(i)}, ${baseY})`} style={{ cursor: 'pointer' }}
                 onMouseEnter={() => setFocus(i)} onClick={() => setFocus(i)}>
                <rect x={-24} y={-2} width={48} height={23} rx={5}
                  style={{ fill: isFocus ? 'var(--c-blue)' : focus != null ? `rgba(69,137,255,${0.1 + w * 0.85})` : 'var(--panel-bg-2)', stroke: 'var(--border)' }} />
                <text textAnchor="middle" y={14} fontSize={11} style={{ pointerEvents: 'none', fontFamily: 'var(--mono)', fill: isFocus ? '#fff' : 'var(--text)' }}>
                  {tok.length > 9 ? tok.slice(0, 8) + '…' : tok}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="difp-lab__hint" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
        {strongest ? `“${tokens[focus!]}” attends most strongly to “${strongest}”.` : 'Hover or tap a word to begin.'}
      </p>
    </InteractiveLab>
  );
}
