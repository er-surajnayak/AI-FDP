import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveLab from '../components/InteractiveLab';
import { softmax } from './illustrative';

const CANDIDATES = [
  { token: 'Paris', logit: 6.0 }, { token: 'the', logit: 3.1 }, { token: 'located', logit: 2.6 },
  { token: 'a', logit: 2.2 }, { token: 'home', logit: 1.8 }, { token: 'beautiful', logit: 1.3 },
  { token: 'Lyon', logit: 0.9 }, { token: 'famous', logit: 0.6 },
];

export default function TemperaturePlayground() {
  const [temp, setTemp] = useState(0.7);
  const [tally, setTally] = useState<Record<string, number>>({});
  const probs = useMemo(() => softmax(CANDIDATES.map((c) => c.logit), temp), [temp]);

  function sampleTen() {
    setTally((prev) => {
      const next = { ...prev };
      let seed = Object.values(prev).reduce((a, b) => a + b, 0);
      for (let k = 0; k < 10; k++) {
        const r = ((seed + k + 1) * 0.6180339887 + temp * 0.731) % 1;
        let acc = 0, picked = CANDIDATES[0].token;
        for (let i = 0; i < probs.length; i++) { acc += probs[i]; if (r <= acc) { picked = CANDIDATES[i].token; break; } }
        next[picked] = (next[picked] ?? 0) + 1; seed += 7;
      }
      return next;
    });
  }

  const valueText = temp < 0.3 ? 'sharply peaked on the top token' : temp > 1.0 ? 'flattened — low-probability tokens get a real chance' : 'a moderate spread';

  return (
    <InteractiveLab
      name="Lab · Temperature & Next-Token"
      hint={'Prompt: "The capital of France is ___". Drag temperature to reshape the next-token distribution. Illustrative logits, not live inference.'}
      note={<><b>Low</b> temperature → focused, deterministic, repetitive (good for facts/code). <b>High</b> → diverse, creative, riskier (good for brainstorming).</>}
    >
      <div className="difp-ctrl-row">
        <div className="difp-slider" style={{ maxWidth: 360 }}>
          <label>Temperature</label>
          <input type="range" min={0} max={1.5} step={0.05} value={temp} onChange={(e) => setTemp(+e.target.value)} aria-valuetext={`Temperature ${temp}, distribution ${valueText}`} />
          <span className="difp-slider__val">{temp.toFixed(2)}</span>
        </div>
        <button className="difp-btn difp-btn--primary" onClick={sampleTen}>Sample ×10</button>
        <button className="difp-btn" onClick={() => setTally({})}>Reset</button>
      </div>

      <div className="difp-stage" role="img" aria-label={`Distribution is ${valueText}`} style={{ padding: '1rem' }}>
        {CANDIDATES.map((c, i) => (
          <div key={c.token} style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '5px 0' }}>
            <span style={{ width: 80, fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-dim)' }}>{c.token}</span>
            <div style={{ flex: 1, background: 'var(--panel-bg-2)', borderRadius: 4, height: 18, overflow: 'hidden' }}>
              <motion.div animate={{ width: `${probs[i] * 100}%` }} transition={{ duration: 0.3, ease: [0.2, 0, 0.38, 0.9] }}
                style={{ height: '100%', background: i === 0 ? 'var(--c-blue)' : 'var(--c-purple)' }} />
            </div>
            <span style={{ width: 50, fontFamily: 'var(--mono)', fontSize: 12, textAlign: 'right', color: 'var(--text-dim)' }}>{(probs[i] * 100).toFixed(1)}%</span>
            {tally[c.token] ? <span className="difp-chip" style={{ minWidth: 36, textAlign: 'center' }}>×{tally[c.token]}</span> : <span style={{ width: 36 }} />}
          </div>
        ))}
      </div>
    </InteractiveLab>
  );
}
