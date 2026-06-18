import { useMemo, useState } from 'react';
import InteractiveLab from '../components/InteractiveLab';

// 20 emails: a spam score (0–1) and the truth. Scores overlap in the middle so
// the precision/recall trade-off is real as you slide the threshold.
const EMAILS: { s: number; spam: boolean }[] = [
  { s: 0.96, spam: true }, { s: 0.91, spam: true }, { s: 0.87, spam: true }, { s: 0.83, spam: true },
  { s: 0.77, spam: true }, { s: 0.71, spam: true }, { s: 0.64, spam: true }, { s: 0.57, spam: true },
  { s: 0.51, spam: true }, { s: 0.44, spam: true },
  { s: 0.61, spam: false }, { s: 0.54, spam: false }, { s: 0.47, spam: false }, { s: 0.39, spam: false },
  { s: 0.33, spam: false }, { s: 0.26, spam: false }, { s: 0.19, spam: false }, { s: 0.13, spam: false },
  { s: 0.08, spam: false }, { s: 0.04, spam: false },
];

const PAIRS = [
  { ref: 'The student is intelligent', cand: 'The learner is smart', word: 18, mean: 94 },
  { ref: 'The cat sits on the mat', cand: 'The cat sits on mat', word: 82, mean: 97 },
  { ref: 'AI is changing education', cand: 'Artificial intelligence is transforming learning', word: 12, mean: 91 },
  { ref: 'The boy is running', cand: 'A child is jogging', word: 0, mean: 88 },
];

const pctBar = (v: number, c: string) => (
  <span className="difp-ev__bar"><span style={{ width: `${v}%`, background: c }} /></span>
);

export default function EvalMetrics() {
  const [thr, setThr] = useState(0.5);
  const [pair, setPair] = useState(0);

  const m = useMemo(() => {
    let TP = 0, FP = 0, FN = 0, TN = 0;
    for (const e of EMAILS) {
      const flagged = e.s >= thr;
      if (e.spam && flagged) TP++;
      else if (!e.spam && flagged) FP++;
      else if (e.spam && !flagged) FN++;
      else TN++;
    }
    const precision = TP + FP ? TP / (TP + FP) : 0;
    const recall = TP + FN ? TP / (TP + FN) : 0;
    const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;
    const accuracy = (TP + TN) / EMAILS.length;
    return { TP, FP, FN, TN, precision, recall, f1, accuracy };
  }, [thr]);

  const W = 700, H = 110, pad = 24;
  const x = (s: number) => pad + s * (W - 2 * pad);
  const P = PAIRS[pair];

  return (
    <InteractiveLab
      name="Lab · Evaluation Metrics"
      hint="Grade a spam filter by dragging one threshold — and watch precision and recall pull against each other."
      note={<><b>Precision vs recall is a trade-off, not a score to maximise.</b> A strict filter is precise but misses spam; a greedy net catches everything but flags real mail. F1 balances the two. (Scores below are illustrative.)</>}
    >
      {/* ── Precision / Recall ── */}
      <div className="difp-sub">A spam filter, one threshold</div>
      <div className="difp-slider" style={{ maxWidth: 360, marginBottom: '0.8rem' }}>
        <label>Flag as spam when score ≥</label>
        <input type="range" min={0.02} max={0.98} step={0.02} value={thr} onChange={(e) => setThr(+e.target.value)} />
        <span className="difp-slider__val">{thr.toFixed(2)}</span>
      </div>

      <div className="difp-stage">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Emails by spam score with a decision threshold">
          {/* predicted-spam region */}
          <rect x={x(thr)} y={0} width={W - pad - x(thr)} height={H} fill="var(--c-pink)" opacity={0.07} />
          <line x1={x(thr)} y1={6} x2={x(thr)} y2={H - 6} stroke="var(--c-pink)" strokeWidth={1.5} strokeDasharray="4 3" />
          <text x={x(thr)} y={H - 1} textAnchor="middle" fontSize={8} style={{ fontFamily: 'var(--mono)', fill: 'var(--c-pink)' }}>threshold</text>
          {/* rows: spam on top, ham below */}
          <text x={4} y={34} fontSize={8} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-faint)' }}>spam</text>
          <text x={4} y={74} fontSize={8} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-faint)' }}>real</text>
          {EMAILS.map((e, i) => {
            const correct = (e.s >= thr) === e.spam;
            return <circle key={i} cx={x(e.s)} cy={e.spam ? 30 : 70} r={6}
              style={{ fill: e.spam ? 'var(--c-pink)' : 'var(--c-teal)', opacity: correct ? 1 : 0.32, stroke: correct ? 'none' : 'var(--text-faint)' }} />;
          })}
        </svg>
      </div>

      <div className="difp-ev__cols">
        {/* confusion matrix */}
        <table className="difp-ev__cm">
          <tbody>
            <tr><td className="difp-ev__cmh" /><td className="difp-ev__cmh">pred. spam</td><td className="difp-ev__cmh">pred. real</td></tr>
            <tr><td className="difp-ev__cmh">is spam</td><td className="difp-ev__cm--tp">{m.TP}<span>caught</span></td><td className="difp-ev__cm--fn">{m.FN}<span>missed</span></td></tr>
            <tr><td className="difp-ev__cmh">is real</td><td className="difp-ev__cm--fp">{m.FP}<span>false alarm</span></td><td className="difp-ev__cm--tn">{m.TN}<span>correct</span></td></tr>
          </tbody>
        </table>
        {/* metrics */}
        <div className="difp-ev__metrics">
          <div className="difp-ev__mrow"><span>Precision</span>{pctBar(m.precision * 100, 'var(--c-blue)')}<b>{Math.round(m.precision * 100)}%</b></div>
          <div className="difp-ev__mrow"><span>Recall</span>{pctBar(m.recall * 100, 'var(--c-green)')}<b>{Math.round(m.recall * 100)}%</b></div>
          <div className="difp-ev__mrow"><span>F1</span>{pctBar(m.f1 * 100, 'var(--c-purple)')}<b>{Math.round(m.f1 * 100)}%</b></div>
          <div className="difp-ev__mrow"><span>Accuracy</span>{pctBar(m.accuracy * 100, 'var(--text-faint)')}<b>{Math.round(m.accuracy * 100)}%</b></div>
        </div>
      </div>
      <p className="difp-lab__hint" style={{ marginTop: '0.5rem' }}>
        Push the threshold <b>high</b> → precise but misses spam (low recall). Push it <b>low</b> → catches all spam but flags real mail (low precision).
      </p>

      {/* ── Word vs meaning ── */}
      <div className="difp-sub" style={{ marginTop: '1.4rem' }}>Word match vs meaning match</div>
      <div className="difp-seg" style={{ marginBottom: '0.8rem' }}>
        {PAIRS.map((_p, i) => (
          <button key={i} className={i === pair ? 'is-active' : ''} onClick={() => setPair(i)} style={{ minWidth: 'auto', padding: '0.35rem 0.6rem' }}>{i + 1}</button>
        ))}
      </div>
      <div className="difp-ev__pair">
        <div><span className="difp-ev__plabel">reference</span> {P.ref}</div>
        <div><span className="difp-ev__plabel">generated</span> {P.cand}</div>
      </div>
      <div className="difp-ev__metrics" style={{ marginTop: '0.6rem' }}>
        <div className="difp-ev__mrow"><span>Word overlap<br /><i>BLEU-style</i></span>{pctBar(P.word, 'var(--c-yellow)')}<b>{P.word}%</b></div>
        <div className="difp-ev__mrow"><span>Meaning<br /><i>BERTScore-style</i></span>{pctBar(P.mean, 'var(--c-green)')}<b>{P.mean}%</b></div>
      </div>
      <p className="difp-lab__hint" style={{ marginTop: '0.5rem' }}>
        Same meaning, different words: word-overlap metrics punish it, semantic metrics reward it. That gap is why BERTScore exists.
      </p>
    </InteractiveLab>
  );
}
