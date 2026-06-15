import { useMemo, useState } from 'react';
import InteractiveLab from '../components/InteractiveLab';

// Document chunks placed in an illustrative 2-D "meaning space" — four topic
// clusters. Real embeddings have hundreds of dimensions; the idea is identical.
type Doc = { label: string; x: number; y: number; topic: string };
const DOCS: Doc[] = [
  { label: 'lesson planning', x: 0.18, y: 0.2, topic: 'teaching' },
  { label: 'grading rubric', x: 0.3, y: 0.3, topic: 'teaching' },
  { label: 'student feedback', x: 0.22, y: 0.36, topic: 'teaching' },
  { label: 'quiz design', x: 0.12, y: 0.32, topic: 'teaching' },
  { label: 'literature review', x: 0.74, y: 0.2, topic: 'research' },
  { label: 'data analysis', x: 0.88, y: 0.3, topic: 'research' },
  { label: 'paper summary', x: 0.7, y: 0.34, topic: 'research' },
  { label: 'citations', x: 0.86, y: 0.13, topic: 'research' },
  { label: 'annual leave', x: 0.22, y: 0.8, topic: 'admin' },
  { label: 'travel reimbursement', x: 0.36, y: 0.66, topic: 'admin' },
  { label: 'meeting minutes', x: 0.12, y: 0.6, topic: 'admin' },
  { label: 'data privacy', x: 0.82, y: 0.78, topic: 'it' },
  { label: 'password reset', x: 0.88, y: 0.64, topic: 'it' },
  { label: 'software install', x: 0.7, y: 0.82, topic: 'it' },
];

// Queries are worded as SYNONYMS so the "keyword search would miss this" point lands.
const QUERIES = [
  { q: 'marking essays', x: 0.26, y: 0.32, miss: '“marking” shares no word with “grading” — keyword search finds nothing.' },
  { q: 'summarising research papers', x: 0.79, y: 0.26, miss: 'no chunk literally says “summarising”, yet the meaning is a perfect match.' },
  { q: 'time off work', x: 0.22, y: 0.74, miss: '“time off” ≠ “leave” as keywords — only meaning connects them.' },
  { q: 'keeping data secure', x: 0.81, y: 0.73, miss: '“secure” ≠ “privacy” by spelling, but they sit side by side in meaning.' },
];

const TOPIC_COLOR: Record<string, string> = {
  teaching: 'var(--c-blue)', research: 'var(--c-purple)', admin: 'var(--c-teal)', it: 'var(--c-green)',
};

export default function VectorSearch() {
  const [qi, setQi] = useState(0);
  const Q = QUERIES[qi];
  const W = 720, H = 360, pad = 30;
  const px = (x: number) => pad + x * (W - 2 * pad);
  const py = (y: number) => pad + y * (H - 2 * pad);

  const ranked = useMemo(() => {
    return DOCS.map((d) => {
      const dist = Math.hypot(d.x - Q.x, d.y - Q.y);
      return { ...d, dist };
    }).sort((a, b) => a.dist - b.dist);
  }, [qi]);
  const top = ranked.slice(0, 3);
  const maxD = Math.max(...ranked.map((r) => r.dist));
  const nearest = new Set(top.map((t) => t.label));

  return (
    <InteractiveLab
      name="Lab · Vector Search Playground"
      hint="Each dot is a stored document chunk, placed by meaning. Pick a query and watch it snap to its nearest neighbours."
      note={<><b>This is what a vector database does.</b> Your query becomes a point; search returns the closest points by distance. Notice the queries are worded as synonyms — semantic search finds them anyway, where keyword search would draw a blank.</>}
    >
      <div className="difp-field" style={{ marginBottom: '0.8rem' }}>
        <label>Query</label>
        <div className="difp-rag__qs">
          {QUERIES.map((x, i) => (
            <button key={i} className={i === qi ? 'is-active' : ''} onClick={() => setQi(i)}>{x.q}</button>
          ))}
        </div>
      </div>

      <div className="difp-stage">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Query "${Q.q}" nearest to ${top.map((t) => t.label).join(', ')}`}>
          {/* lines to nearest 3 */}
          {top.map((t) => (
            <line key={t.label} x1={px(Q.x)} y1={py(Q.y)} x2={px(t.x)} y2={py(t.y)} stroke="var(--c-yellow)" strokeWidth={1.5} strokeDasharray="4 3" strokeOpacity={0.8} />
          ))}
          {/* doc dots */}
          {DOCS.map((d) => {
            const hot = nearest.has(d.label);
            return (
              <g key={d.label} transform={`translate(${px(d.x)}, ${py(d.y)})`}>
                <circle r={hot ? 7 : 5} style={{ fill: TOPIC_COLOR[d.topic], opacity: hot ? 1 : 0.5 }} />
                <text x={10} y={4} fontSize={11} style={{ fontFamily: 'var(--mono)', fill: hot ? 'var(--text)' : 'var(--text-faint)' }}>{d.label}</text>
              </g>
            );
          })}
          {/* query marker */}
          <g transform={`translate(${px(Q.x)}, ${py(Q.y)})`}>
            <rect x={-6} y={-6} width={12} height={12} transform="rotate(45)" style={{ fill: 'var(--c-yellow)', stroke: 'var(--page-bg)', strokeWidth: 2 }} />
            <text x={0} y={-12} textAnchor="middle" fontSize={11} style={{ fontFamily: 'var(--mono)', fontWeight: 700, fill: 'var(--c-yellow)' }}>“{Q.q}”</text>
          </g>
        </svg>
      </div>

      <p className="difp-lab__hint" style={{ marginTop: '0.6rem' }}><b>Why keyword search fails here:</b> {Q.miss}</p>

      <div className="difp-sub" style={{ marginTop: '0.8rem' }}>Top matches by similarity</div>
      <div className="difp-vs__results">
        {top.map((t, i) => {
          const simPct = Math.round((1 - t.dist / maxD) * 100);
          return (
            <div key={t.label} className="difp-vs__row">
              <span className="difp-vs__rank">{i + 1}</span>
              <span className="difp-vs__name" style={{ color: TOPIC_COLOR[t.topic] }}>{t.label}</span>
              <span className="difp-vs__simbar"><span style={{ width: `${simPct}%`, background: TOPIC_COLOR[t.topic] }} /></span>
              <span className="difp-vs__sim">{simPct}%</span>
            </div>
          );
        })}
      </div>
    </InteractiveLab>
  );
}
