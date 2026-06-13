import { useMemo, useState } from 'react';
import { TextArea, Tile, InlineNotification } from '@carbon/react';
import { motion } from 'framer-motion';
import PlaygroundFrame from '../components/PlaygroundFrame';

const DEFAULT = 'Tokenization splits research papers into sub-word tokens.';

// Illustrative sub-word tokenizer: keeps common short words whole, splits long
// words on a few frequent morphemes, and emits punctuation/space as tokens.
const SUFFIXES = ['ization', 'isation', 'ation', 'ingly', 'ization', 'ation', 'ness', 'ment', 'tion', 'sion', 'able', 'ible', 'ing', 'ers', 'er', 'ed', 'ly', 's'];

function tokenize(text: string): string[] {
  const out: string[] = [];
  const parts = text.match(/\s+|[a-zA-Z]+|[0-9]+|[^\sa-zA-Z0-9]+/g) ?? [];
  for (const p of parts) {
    if (/^[a-zA-Z]+$/.test(p) && p.length > 6) {
      let rest = p;
      const pieces: string[] = [];
      let guard = 0;
      while (rest.length > 6 && guard++ < 4) {
        const suf = SUFFIXES.find((s) => rest.toLowerCase().endsWith(s) && rest.length - s.length >= 3);
        if (!suf) break;
        pieces.unshift(rest.slice(rest.length - suf.length));
        rest = rest.slice(0, rest.length - suf.length);
      }
      pieces.unshift(rest);
      out.push(...pieces);
    } else {
      out.push(p);
    }
  }
  return out;
}

// Stable pseudo token-ID
const tokenId = (t: string) => {
  let h = 0;
  for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) >>> 0;
  return h % 50000;
};

export default function TokenizerPlayground() {
  const [text, setText] = useState(DEFAULT);
  const tokens = useMemo(() => tokenize(text), [text]);
  const visible = tokens.filter((t) => t.trim().length > 0);
  const chars = text.length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  // simple illustrative pricing
  const pricePerK = 0.003;
  const cost = ((visible.length / 1000) * pricePerK).toFixed(5);

  const colors = ['#4589ff', '#a56eff', '#08bdba', '#ff7eb6', '#fa4d56', '#d2a106'];

  return (
    <PlaygroundFrame
      title="Tokenizer & Cost Estimator"
      hint="Watch text split into sub-word tokens with IDs. Illustrative tokenizer — real models (e.g. BPE) differ, but the lesson holds: tokens ≠ words."
    >
      <TextArea
        labelText="Your text"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '1rem 0' }}>
        {tokens.map((t, i) =>
          t.trim().length === 0 ? (
            <span key={i} style={{ width: 6 }} />
          ) : (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.4) }}
              title={`token id ${tokenId(t)}`}
              style={{
                background: colors[i % colors.length] + '33',
                border: `1px solid ${colors[i % colors.length]}`,
                borderRadius: 4,
                padding: '2px 6px',
                fontSize: 13,
                fontFamily: 'monospace',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                lineHeight: 1.2,
              }}
            >
              <span>{t.replace(/ /g, '␣')}</span>
              <span style={{ fontSize: 9, opacity: 0.7 }}>{tokenId(t)}</span>
            </motion.span>
          ),
        )}
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Metric label="Tokens" value={visible.length} accent="#4589ff" />
        <Metric label="Words" value={words} accent="#08bdba" />
        <Metric label="Characters" value={chars} accent="#a56eff" />
        <Metric label="≈ chars/token" value={visible.length ? (chars / visible.length).toFixed(1) : '0'} accent="#d2a106" />
        <Metric label="Est. input cost" value={`$${cost}`} accent="#ff7eb6" />
      </div>

      <InlineNotification
        kind="info"
        lowContrast
        hideCloseButton
        title="Tokens ≠ words"
        subtitle="Long words split (e.g. token + ization); spaces and punctuation count. Cost is per-token, so length is money."
        style={{ marginTop: '1rem' }}
      />
    </PlaygroundFrame>
  );
}

function Metric({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <Tile style={{ minWidth: 96, borderTop: `3px solid ${accent}` }}>
      <div style={{ fontSize: 22, fontWeight: 600 }}>{value}</div>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
    </Tile>
  );
}
