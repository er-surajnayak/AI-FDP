import { useCallback, useMemo, useRef, useState } from 'react';
import InteractiveLab from '../components/InteractiveLab';
import {
  loadModel,
  runAttention,
  type AttentionResult,
  type LoadProgress,
} from './attentionEngine';

const DEFAULT = "The animal didn't cross the street because it was too tired";

type Phase = 'idle' | 'loading' | 'ready' | 'error';

const PRONOUNS = new Set(['it', 'he', 'she', 'they', 'them', 'this', 'that', 'him', 'her', 'its', 'his', 'their']);
// Function words that attention often spikes on but which aren't interesting links.
const STOPWORDS = new Set([
  'the', 'a', 'an', 'was', 'were', 'is', 'are', 'be', 'been', 'to', 'of', 'in', 'on', 'because',
  'too', 'and', 'but', 'that', 'this', 'did', 'didn', "'", 't', 's', 'will', 'would', 'so', 'then',
  'as', 'at', 'by', 'for', 'with', 'not', 'no', 'very', 'just', 'it', 'its',
]);

const norm = (t: string) => t.replace(/^##/, '').toLowerCase();

/**
 * Pick the layer/head that gives `focus` its sharpest *interpretable* link:
 * skip self, special tokens, immediate neighbours and function words. For a
 * pronoun, only look backward — an antecedent precedes the pronoun — which
 * surfaces the coreference head (e.g. "it" → "animal").
 */
function bestHeadFor(r: AttentionResult, focus: number): { layer: number; head: number } | null {
  const isPron = PRONOUNS.has(norm(r.tokens[focus]));
  let best = { score: -1, layer: -1, head: -1 };
  for (let l = 0; l < r.layers; l++) {
    for (let h = 0; h < r.heads; h++) {
      const row = r.attn[l][h][focus];
      for (let k = 0; k < row.length; k++) {
        if (k === focus || r.special[k] || Math.abs(k - focus) <= 1) continue;
        if (isPron && k > focus) continue;
        if (STOPWORDS.has(norm(r.tokens[k]))) continue;
        if (row[k] > best.score) best = { score: row[k], layer: l, head: h };
      }
    }
  }
  return best.layer < 0 ? null : { layer: best.layer, head: best.head };
}

/** The last pronoun in the sentence (the most teachable query), else the last real token. */
function defaultFocus(r: AttentionResult): number | null {
  for (let i = r.tokens.length - 1; i >= 0; i--) {
    if (!r.special[i] && PRONOUNS.has(norm(r.tokens[i]))) return i;
  }
  const lastReal = r.special.lastIndexOf(false);
  return lastReal >= 0 ? lastReal : null;
}

export default function SelfAttentionLive() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [errMsg, setErrMsg] = useState('');

  const [text, setText] = useState(DEFAULT);
  const [result, setResult] = useState<AttentionResult | null>(null);
  const [running, setRunning] = useState(false);

  const [layer, setLayer] = useState(5); // last layer carries the richest relations
  const [head, setHead] = useState<number | 'avg'>('avg');
  const [focus, setFocus] = useState<number | null>(null);
  const [threshold, setThreshold] = useState(0.08);

  const lastRun = useRef('');

  const load = useCallback(async () => {
    setPhase('loading');
    setErrMsg('');
    try {
      await loadModel((p: LoadProgress) => setProgress(p.fraction));
      setPhase('ready');
    } catch (e: any) {
      setErrMsg(e?.message || 'Could not load the model. Check your connection and retry.');
      setPhase('error');
    }
  }, []);

  const run = useCallback(async () => {
    const t = text.trim();
    if (!t) return;
    setRunning(true);
    setErrMsg('');
    // Yield once so React paints the "Running…" state before the synchronous
    // WASM forward pass briefly occupies the main thread.
    await new Promise((r) => setTimeout(r, 20));
    try {
      const r = await runAttention(t);
      setResult(r);
      lastRun.current = t;
      const f = defaultFocus(r);
      setFocus(f);
      // Land on the clearest head for that token so the first view is legible.
      if (f != null) {
        const best = bestHeadFor(r, f);
        if (best) { setLayer(best.layer); setHead(best.head); }
      }
    } catch (e: any) {
      setErrMsg(e?.message || 'Inference failed.');
    } finally {
      setRunning(false);
    }
  }, [text]);

  // Weights from the selected query token under the current layer/head choice.
  const activeRow = useMemo<number[] | null>(() => {
    if (!result || focus == null) return null;
    const heads = result.attn[layer];
    if (head === 'avg') {
      const n = heads.length;
      const seq = heads[0][focus].length;
      const row = new Array(seq).fill(0);
      for (let h = 0; h < n; h++) for (let k = 0; k < seq; k++) row[k] += heads[h][focus][k] / n;
      return row;
    }
    return heads[head][focus];
  }, [result, focus, layer, head]);

  // Jump to the layer/head with the clearest interpretable link for this token.
  const autoHead = useCallback(() => {
    if (!result || focus == null) return;
    const best = bestHeadFor(result, focus);
    if (best) { setLayer(best.layer); setHead(best.head); }
  }, [result, focus]);

  const strongest = useMemo(() => {
    if (!result || !activeRow || focus == null) return null;
    let bi = -1;
    let bv = -1;
    for (let k = 0; k < activeRow.length; k++) {
      if (k === focus) continue;
      if (activeRow[k] > bv) { bv = activeRow[k]; bi = k; }
    }
    return bi >= 0 ? result.tokens[bi] : null;
  }, [result, activeRow, focus]);

  const stale = result != null && lastRun.current !== text.trim();

  // ---- pre-model gate -------------------------------------------------------
  if (phase !== 'ready') {
    return (
      <InteractiveLab
        name="Lab · Self-Attention (real model)"
        hint="Runs a genuine pretrained transformer (MiniLM, 6 layers · 12 heads) entirely in your browser to show its real attention — no server, no API."
      >
        <div className="difp-loadcard">
          <p>
            This lab runs <b>real self-attention</b> from a pretrained model — not a scripted
            approximation. The weights download once (~91&nbsp;MB) from the Hugging Face CDN, then
            your browser caches them and everything runs locally.
          </p>
          <p className="difp-lab__hint" style={{ margin: '0.4rem 0 1rem' }}>
            Teaching tip: click <b>Load model</b> once on the room Wi-Fi before your session so it’s
            cached and instant during the talk.
          </p>
          {phase === 'loading' ? (
            <div className="difp-progress" role="status" aria-live="polite">
              <div className="difp-progress__bar" style={{ width: `${Math.round(progress * 100)}%` }} />
              <span className="difp-progress__pct">{Math.round(progress * 100)}% — downloading model…</span>
            </div>
          ) : (
            <button className="difp-btn" onClick={load}>Load model (~91 MB, one-time)</button>
          )}
          {phase === 'error' && (
            <p className="difp-error" role="alert">
              {errMsg} <button className="difp-link-btn" onClick={load}>Retry</button>
            </p>
          )}
        </div>
      </InteractiveLab>
    );
  }

  // ---- live lab -------------------------------------------------------------
  const W = 760, H = 210, pad = 44;
  const toks = result?.tokens ?? [];
  const step = toks.length > 1 ? (W - 2 * pad) / (toks.length - 1) : 0;
  const xAt = (i: number) => pad + i * step;
  const baseY = 150;

  return (
    <InteractiveLab
      name="Lab · Self-Attention (real model)"
      hint="Type a sentence and run it through a real pretrained transformer. Click a word to see what it attends to. These are the model’s actual attention weights."
      note={
        <>
          <b>This is real inference.</b> All-MiniLM-L6-v2 (a 6-layer · 12-head BERT) runs in your
          browser via ONNX/WASM — no server. Attention is spread across {result?.layers}×{result?.heads}{' '}
          heads: some track grammar, some track word order, and a few track coreference, so browse the
          heads or hit <b>Auto-pick clearest head</b>. <b>Teaching caveat:</b> this is a small model —
          it links “it” to its grammatical subject, so swapping “tired” for “narrow” won’t flip it to
          “street.” Getting that flip right takes a much larger model; that’s exactly why scale matters.
        </>
      }
    >
      <div className="difp-field" style={{ marginBottom: '0.85rem' }}>
        <label htmlFor="sa-input">Your sentence</label>
        <textarea id="sa-input" rows={2} value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <div className="difp-row" style={{ gap: '0.6rem', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
        <button className="difp-btn" onClick={run} disabled={running}>
          {running ? 'Running…' : result == null ? 'Run' : stale ? 'Run this sentence' : 'Re-run'}
        </button>
        {result && (
          <button className="difp-btn difp-btn--ghost" onClick={autoHead} disabled={focus == null}>
            Auto-pick clearest head
          </button>
        )}
      </div>

      {result && (
        <>
          <div className="difp-row difp-attn-controls">
            <div className="difp-field difp-field--inline">
              <label>Layer</label>
              <div className="difp-seg">
                {Array.from({ length: result.layers }, (_, l) => (
                  <button key={l} className={l === layer ? 'is-active' : ''} onClick={() => setLayer(l)}>
                    {l + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="difp-field difp-field--inline">
              <label>Head</label>
              <div className="difp-seg">
                <button className={head === 'avg' ? 'is-active' : ''} onClick={() => setHead('avg')}>avg</button>
                {Array.from({ length: result.heads }, (_, h) => (
                  <button key={h} className={h === head ? 'is-active' : ''} onClick={() => setHead(h)}>
                    {h + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="difp-slider" style={{ maxWidth: 320, margin: '0.4rem 0 1rem' }}>
            <label>Hide weak links</label>
            <input type="range" min={0} max={0.4} step={0.01} value={threshold}
              onChange={(e) => setThreshold(+e.target.value)} />
            <span className="difp-slider__val">&lt; {threshold.toFixed(2)}</span>
          </div>

          <div className="difp-stage">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
              aria-label={strongest && focus != null ? `“${toks[focus]}” attends most strongly to “${strongest}”` : 'Click a word to see its attention'}>
              {focus != null && activeRow?.map((wv, j) => {
                if (j === focus || wv < threshold) return null;
                const x1 = xAt(focus), x2 = xAt(j), midX = (x1 + x2) / 2;
                const arcH = baseY - 30 - Math.min(86, Math.abs(x2 - x1) * 0.34);
                return (
                  <path key={j} d={`M ${x1} ${baseY - 14} Q ${midX} ${arcH} ${x2} ${baseY - 14}`}
                    fill="none" stroke="var(--c-blue)" strokeWidth={1 + wv * 12} strokeOpacity={0.22 + wv * 0.7} />
                );
              })}
              {toks.map((tok, i) => {
                const isFocus = i === focus;
                const wv = activeRow ? activeRow[i] : 0;
                const isSpecial = result.special[i];
                const label = tok.replace(/^##/, '');
                return (
                  <g key={i} transform={`translate(${xAt(i)}, ${baseY})`} style={{ cursor: 'pointer' }}
                     onClick={() => setFocus(i)}>
                    <rect x={-26} y={-2} width={52} height={24} rx={5}
                      style={{
                        fill: isFocus ? 'var(--c-blue)' : focus != null ? `rgba(69,137,255,${0.08 + wv * 0.85})` : 'var(--panel-bg-2)',
                        stroke: 'var(--border)',
                        opacity: isSpecial ? 0.45 : 1,
                      }} />
                    <text textAnchor="middle" y={14} fontSize={10.5}
                      style={{ pointerEvents: 'none', fontFamily: 'var(--mono)', fill: isFocus ? '#fff' : 'var(--text)' }}>
                      {label.length > 9 ? label.slice(0, 8) + '…' : label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="difp-lab__hint" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
            {stale
              ? 'Sentence changed — hit “Run this sentence”.'
              : strongest && focus != null
              ? `In layer ${layer + 1}${head === 'avg' ? ' (avg heads)' : `, head ${head + 1}`}, “${toks[focus].replace(/^##/, '')}” attends most strongly to “${strongest.replace(/^##/, '')}”.`
              : 'Click a word to see what it attends to.'}
          </p>
        </>
      )}
    </InteractiveLab>
  );
}
