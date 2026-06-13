import { useMemo, useState } from 'react';
import { Slider, Button, Tag, InlineNotification } from '@carbon/react';
import { motion } from 'framer-motion';
import PlaygroundFrame from '../components/PlaygroundFrame';
import { softmax } from './illustrative';

// Illustrative next-token distribution after "The capital of France is ___".
const CANDIDATES = [
  { token: 'Paris', logit: 6.0 },
  { token: 'the', logit: 3.1 },
  { token: 'located', logit: 2.6 },
  { token: 'a', logit: 2.2 },
  { token: 'home', logit: 1.8 },
  { token: 'beautiful', logit: 1.3 },
  { token: 'Lyon', logit: 0.9 },
  { token: 'famous', logit: 0.6 },
];

export default function TemperaturePlayground() {
  const [temp, setTemp] = useState(0.7);
  const [tally, setTally] = useState<Record<string, number>>({});

  const probs = useMemo(
    () => softmax(CANDIDATES.map((c) => c.logit), temp),
    [temp],
  );

  function sampleOnce(): string {
    // deterministic-ish but spread sampler using current probs
    let r = (Object.values(tally).reduce((a, b) => a + b, 0) * 0.6180339887 + temp) % 1;
    let acc = 0;
    for (let i = 0; i < probs.length; i++) {
      acc += probs[i];
      if (r <= acc) return CANDIDATES[i].token;
    }
    return CANDIDATES[0].token;
  }

  function sampleTen() {
    setTally((prev) => {
      const next = { ...prev };
      for (let k = 0; k < 10; k++) {
        const tok = sampleOnce();
        next[tok] = (next[tok] ?? 0) + 1;
      }
      return next;
    });
  }

  const valueText =
    temp < 0.3
      ? `Temperature ${temp.toFixed(2)} — distribution sharply peaked on the top token.`
      : temp > 1.0
        ? `Temperature ${temp.toFixed(2)} — distribution flattened; low-probability tokens get a real chance.`
        : `Temperature ${temp.toFixed(2)} — moderate spread.`;

  return (
    <PlaygroundFrame
      title="Temperature Playground"
      hint='Prompt: "The capital of France is ___". Drag temperature to reshape the next-token distribution. Illustrative logits, not live inference.'
    >
      <div style={{ maxWidth: 360, marginBottom: '1rem' }}>
        <Slider
          labelText="Temperature"
          min={0}
          max={1.5}
          step={0.05}
          value={temp}
          onChange={({ value }) => setTemp(value)}
          aria-valuetext={valueText}
        />
      </div>

      <div role="img" aria-label={valueText}>
        {CANDIDATES.map((c, i) => (
          <div key={c.token} style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
            <span style={{ width: 80, fontSize: 13, fontFamily: 'monospace' }}>{c.token}</span>
            <div style={{ flex: 1, background: 'var(--cds-layer-02, #e8e8e8)', borderRadius: 3, height: 18, overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${probs[i] * 100}%` }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%', background: i === 0 ? 'var(--accent)' : '#8a3ffc' }}
              />
            </div>
            <span style={{ width: 48, fontSize: 12, textAlign: 'right', opacity: 0.8 }}>
              {(probs[i] * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button size="sm" onClick={sampleTen}>Sample ×10</Button>
        <Button size="sm" kind="ghost" onClick={() => setTally({})}>Reset tally</Button>
        {Object.entries(tally)
          .sort((a, b) => b[1] - a[1])
          .map(([tok, n]) => (
            <Tag key={tok} type={tok === 'Paris' ? 'blue' : 'purple'}>
              {tok}: {n}
            </Tag>
          ))}
      </div>

      <InlineNotification
        kind="info"
        lowContrast
        hideCloseButton
        title="Low vs. high temperature"
        subtitle="Low → focused, deterministic, repetitive (good for facts/code). High → diverse, creative, riskier (good for brainstorming)."
        style={{ marginTop: '1rem' }}
      />
    </PlaygroundFrame>
  );
}
