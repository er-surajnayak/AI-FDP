import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveLab from '../components/InteractiveLab';

const BASE = 'The keys that I left on the table by the door this morning are now completely missing'.split(' ');

export default function RnnMemoryLab() {
  const [mode, setMode] = useState<'rnn' | 'transformer'>('rnn');
  const [len, setLen] = useState(10);
  const [hover, setHover] = useState<number | null>(null);

  const tokens = useMemo(() => BASE.slice(0, len), [len]);
  // RNN: memory of the FIRST token as seen from position j decays with distance.
  const decay = 0.45;
  const strength = (j: number) => Math.exp(-decay * j); // strength of token0 info at step j

  const W = 720, H = 170, pad = 30;
  const step = tokens.length > 1 ? (W - 2 * pad) / (tokens.length - 1) : 0;
  const x = (i: number) => pad + i * step;
  const y = 120;

  const lastStrength = strength(tokens.length - 1);

  return (
    <InteractiveLab
      name="Lab · RNN Memory vs. Transformer"
      hint="Watch the first word's information fade as it passes step-by-step through an RNN. Flip to the Transformer view — every word connects directly, so distance no longer erases memory."
      note={
        mode === 'rnn'
          ? <>In <b>RNN</b> mode the first word's signal at the last step is only <b>{(lastStrength * 100).toFixed(0)}%</b>. Drag the length slider up and watch it collapse — that's the long-range dependency problem.</>
          : <>In <b>Transformer</b> mode every word links to every other word in one hop. Length doesn't erase the connection — that's what "attention" buys you.</>
      }
    >
      <div className="difp-ctrl-row">
        <div className="difp-checks">
          <label className={`difp-check${mode === 'rnn' ? ' is-on' : ''}`}>
            <input type="radio" name="mode" checked={mode === 'rnn'} onChange={() => setMode('rnn')} /> RNN (sequential memory)
          </label>
          <label className={`difp-check${mode === 'transformer' ? ' is-on' : ''}`}>
            <input type="radio" name="mode" checked={mode === 'transformer'} onChange={() => setMode('transformer')} /> Transformer (direct attention)
          </label>
        </div>
        <div className="difp-slider">
          <label>Sentence length</label>
          <input type="range" min={4} max={BASE.length} value={len} onChange={(e) => setLen(+e.target.value)} />
          <span className="difp-slider__val">{len} words</span>
        </div>
      </div>

      <div className="difp-stage">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
          aria-label={mode === 'rnn' ? `First word's memory fades to ${(lastStrength*100).toFixed(0)} percent by the last word` : 'Every word connects directly to every other word'}>
          {mode === 'rnn'
            ? tokens.slice(0, -1).map((_, i) => (
                <line key={i} x1={x(i)} y1={y} x2={x(i + 1)} y2={y} stroke="var(--border-strong)" strokeWidth={2} />
              ))
            : tokens.flatMap((_, a) =>
                tokens.slice(a + 1).map((__, b2) => {
                  const b = a + 1 + b2;
                  return (
                    <motion.path key={`${a}-${b}`}
                      d={`M ${x(a)} ${y} Q ${(x(a)+x(b))/2} ${y - 50 - Math.abs(b-a)*4} ${x(b)} ${y}`}
                      fill="none" stroke="var(--c-green)" strokeOpacity={0.28} strokeWidth={1}
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                  );
                })
              )}

          {tokens.map((tok, i) => {
            const s = mode === 'rnn' ? strength(i) : 1;
            const isHover = hover === i;
            return (
              <g key={i} transform={`translate(${x(i)}, ${y})`} style={{ cursor: 'pointer' }}
                 onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <motion.circle r={isHover ? 11 : 9}
                  animate={{ opacity: mode === 'rnn' ? 0.18 + s * 0.82 : 1 }}
                  style={{ fill: i === 0 ? 'var(--c-pink)' : mode === 'rnn' ? 'var(--c-blue)' : 'var(--c-green)' }} />
                <text y={32} textAnchor="middle" fontSize={11}
                  style={{ fill: 'var(--text-dim)', fontFamily: 'var(--mono)' }}
                  transform="rotate(20)">{tok.length > 8 ? tok.slice(0,7)+'…' : tok}</text>
                {isHover && mode === 'rnn' && (
                  <text y={-20} textAnchor="middle" fontSize={11} style={{ fill: 'var(--c-yellow)', fontFamily: 'var(--mono)' }}>
                    {(s * 100).toFixed(0)}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </InteractiveLab>
  );
}
