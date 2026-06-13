import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveLab from '../components/InteractiveLab';

const DEFAULT = 'Tokenization splits research papers into sub-word tokens.';
const SUFFIXES = ['ization', 'isation', 'ation', 'ingly', 'ness', 'ment', 'tion', 'sion', 'able', 'ible', 'ing', 'ers', 'er', 'ed', 'ly', 's'];

function tokenize(text: string): string[] {
  const out: string[] = [];
  const parts = text.match(/\s+|[a-zA-Z]+|[0-9]+|[^\sa-zA-Z0-9]+/g) ?? [];
  for (const p of parts) {
    if (/^[a-zA-Z]+$/.test(p) && p.length > 6) {
      let rest = p; const pieces: string[] = []; let guard = 0;
      while (rest.length > 6 && guard++ < 4) {
        const suf = SUFFIXES.find((s) => rest.toLowerCase().endsWith(s) && rest.length - s.length >= 3);
        if (!suf) break;
        pieces.unshift(rest.slice(rest.length - suf.length));
        rest = rest.slice(0, rest.length - suf.length);
      }
      pieces.unshift(rest); out.push(...pieces);
    } else out.push(p);
  }
  return out;
}
const tokenId = (t: string) => { let h = 0; for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) >>> 0; return h % 50000; };

export default function TokenizerPlayground() {
  const [text, setText] = useState(DEFAULT);
  const tokens = useMemo(() => tokenize(text), [text]);
  const visible = tokens.filter((t) => t.trim().length > 0);
  const chars = text.length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const cost = ((visible.length / 1000) * 0.003).toFixed(5);
  const colors = ['var(--c-blue)', 'var(--c-purple)', 'var(--c-teal)', 'var(--c-pink)', 'var(--c-green)', 'var(--c-yellow)'];

  return (
    <InteractiveLab
      name="Lab · Tokenizer & Cost Estimator"
      hint="Watch text split into sub-word tokens with IDs. Illustrative tokenizer — real BPE differs, but the lesson holds: tokens ≠ words."
      note={<><b>Tokens ≠ words.</b> Long words split (token + ization); spaces and punctuation count. Cost is per-token, so length is money.</>}
    >
      <div className="difp-field" style={{ marginBottom: '1rem' }}>
        <label htmlFor="tok-input">Your text</label>
        <textarea id="tok-input" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <div className="difp-stage" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0.9rem', marginBottom: '1rem' }}>
        {tokens.map((t, i) =>
          t.trim().length === 0 ? <span key={i} style={{ width: 6 }} /> : (
            <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.4) }}
              style={{ background: 'var(--panel-bg-2)', border: `1px solid ${colors[i % colors.length]}`, borderRadius: 5, padding: '3px 7px', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.25 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text)' }}>{t.replace(/ /g, '␣')}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: colors[i % colors.length] }}>{tokenId(t)}</span>
            </motion.span>
          ),
        )}
      </div>

      <div className="difp-metrics">
        <Metric v={visible.length} l="Tokens" c="var(--c-blue)" />
        <Metric v={words} l="Words" c="var(--c-teal)" />
        <Metric v={chars} l="Characters" c="var(--c-purple)" />
        <Metric v={visible.length ? (chars / visible.length).toFixed(1) : '0'} l="Chars / token" c="var(--c-yellow)" />
        <Metric v={`$${cost}`} l="Est. input cost" c="var(--c-pink)" />
      </div>
    </InteractiveLab>
  );
}

function Metric({ v, l, c }: { v: string | number; l: string; c: string }) {
  return (
    <div className="difp-metric" style={{ ['--mc' as string]: c }}>
      <div className="difp-metric__v">{v}</div>
      <div className="difp-metric__l">{l}</div>
    </div>
  );
}
