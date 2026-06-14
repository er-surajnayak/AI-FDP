// Static, illustrative concept visuals shown in place of the old facilitator
// "activity / demo" instructions. They explain the concept at a glance — no
// "do this" steps — and are safe to project while teaching.
import { useState } from 'react';

function Figure({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="difp-cv">
      <div className="difp-cv__stage">{children}</div>
      <figcaption className="difp-cv__cap">{caption}</figcaption>
    </figure>
  );
}

/* ── Module 1 — AI ⊃ ML ⊃ DL ⊃ Generative AI ───────────────────────────── */
function NestingVisual() {
  const rings = [
    { label: 'Artificial Intelligence', sub: 'any machine that mimics intelligence', w: 460, h: 300, c: 'var(--c-blue)' },
    { label: 'Machine Learning', sub: 'learns patterns from data', w: 360, h: 232, c: 'var(--c-teal)' },
    { label: 'Deep Learning', sub: 'neural networks, many layers', w: 256, h: 162, c: 'var(--c-purple)' },
    { label: 'Generative AI', sub: 'creates new content', w: 150, h: 92, c: 'var(--c-pink)' },
  ];
  return (
    <Figure caption="Each field is a subset of the one around it — Generative AI is a specialised corner of deep learning, not a rival to it.">
      <svg viewBox="0 0 480 320" width="100%" role="img" aria-label="Nested fields: AI contains ML contains Deep Learning contains Generative AI">
        {rings.map((r, i) => (
          <g key={i}>
            <rect x={(480 - r.w) / 2} y={(320 - r.h) / 2} width={r.w} height={r.h} rx={16}
              fill="none" stroke={r.c} strokeWidth={1.5} opacity={0.9} />
            <text x={240} y={(320 - r.h) / 2 + 20} textAnchor="middle" fontSize={13}
              style={{ fontFamily: 'var(--sans)', fontWeight: 600, fill: r.c }}>{r.label}</text>
            {i < 3 && (
              <text x={240} y={(320 - r.h) / 2 + 35} textAnchor="middle" fontSize={9.5}
                style={{ fontFamily: 'var(--mono)', fill: 'var(--text-faint)' }}>{r.sub}</text>
            )}
          </g>
        ))}
        <text x={240} y={172} textAnchor="middle" fontSize={9.5}
          style={{ fontFamily: 'var(--mono)', fill: 'var(--text-faint)' }}>creates new content</text>
      </svg>
    </Figure>
  );
}

/* ── Module 2 — sequential RNN vs all-at-once attention ────────────────── */
function SequentialVsParallel() {
  const toks = ['The', 'cat', 'sat', 'on', 'mat'];
  const x = (i: number) => 40 + i * 78;
  return (
    <Figure caption="An RNN passes meaning hand-to-hand down the line, so early words fade by the end. Self-attention links every word to every other in one step — no fading, no waiting.">
      <svg viewBox="0 0 420 300" width="100%" role="img" aria-label="Recurrent chain versus all-to-all attention">
        {/* RNN row */}
        <text x={20} y={40} fontSize={11} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-dim)' }}>RNN — one step at a time</text>
        {toks.map((t, i) => (
          <g key={`r${i}`}>
            <rect x={x(i) - 22} y={56} width={44} height={26} rx={5} fill="var(--panel-bg-2)" stroke="var(--border)" />
            <text x={x(i)} y={73} textAnchor="middle" fontSize={11} style={{ fontFamily: 'var(--mono)', fill: 'var(--text)' }}>{t}</text>
            {i < toks.length - 1 && (
              <line x1={x(i) + 22} y1={69} x2={x(i + 1) - 22} y2={69} stroke="var(--c-yellow)" strokeWidth={1.5} markerEnd="url(#cv-arrow)" />
            )}
          </g>
        ))}
        <text x={x(4) + 8} y={73} fontSize={11} style={{ fill: 'var(--text-faint)' }}>→ fades</text>

        {/* Attention row */}
        <text x={20} y={150} fontSize={11} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-dim)' }}>Self-attention — all at once</text>
        {toks.map((_, i) =>
          toks.map((_, j) =>
            j > i ? (
              <line key={`a${i}-${j}`} x1={x(i)} y1={196} x2={x(j)} y2={196}
                stroke="var(--c-blue)" strokeWidth={0.8} strokeOpacity={0.5}
                transform={`translate(0,${-((j - i) * 6)})`} />
            ) : null,
          ),
        )}
        {toks.map((t, i) => (
          <g key={`p${i}`}>
            <rect x={x(i) - 22} y={196} width={44} height={26} rx={5} fill="var(--panel-bg-2)" stroke="var(--c-blue)" />
            <text x={x(i)} y={213} textAnchor="middle" fontSize={11} style={{ fontFamily: 'var(--mono)', fill: 'var(--text)' }}>{t}</text>
          </g>
        ))}
        <defs>
          <marker id="cv-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L6,3.5 L0,7 Z" fill="var(--c-yellow)" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

/* ── Module 3 — genuine coreference ambiguity ──────────────────────────── */
function CoreferenceAmbiguity() {
  const [ctx, setCtx] = useState<'none' | 'prof' | 'stud'>('none');
  const toks = ['The', 'professor', 'told', 'the', 'student', 'that', 'she', 'had', 'won', '.'];
  const x = (i: number) => 30 + i * 56;
  const profX = x(1), studX = x(4), sheX = x(6);
  const lean = ctx === 'prof' ? 'professor' : ctx === 'stud' ? 'student' : null;
  return (
    <Figure caption="Nothing in the grammar settles who “she” is — both readings are valid. Attention leans on the surrounding context, so adding a clause tips the balance.">
      <svg viewBox="0 0 600 150" width="100%" role="img" aria-label="The pronoun she could refer to professor or student">
        {/* arcs */}
        <path d={`M ${sheX} 70 Q ${(sheX + profX) / 2} 24 ${profX} 70`} fill="none"
          stroke="var(--c-pink)" strokeWidth={lean === 'professor' ? 3 : 1.4}
          strokeDasharray={lean === 'professor' ? '0' : '4 4'} strokeOpacity={lean === 'student' ? 0.3 : 0.95} />
        <path d={`M ${sheX} 70 Q ${(sheX + studX) / 2} 30 ${studX} 70`} fill="none"
          stroke="var(--c-teal)" strokeWidth={lean === 'student' ? 3 : 1.4}
          strokeDasharray={lean === 'student' ? '0' : '4 4'} strokeOpacity={lean === 'professor' ? 0.3 : 0.95} />
        {toks.map((t, i) => {
          const hot = i === 6;
          const ante = i === 1 || i === 4;
          return (
            <g key={i}>
              <rect x={x(i) - 25} y={72} width={50} height={24} rx={5}
                fill={hot ? 'var(--c-yellow)' : 'var(--panel-bg-2)'} stroke="var(--border)" />
              <text x={x(i)} y={88} textAnchor="middle" fontSize={10.5}
                style={{ fontFamily: 'var(--mono)', fill: hot ? '#161616' : ante ? 'var(--text)' : 'var(--text-dim)', fontWeight: hot || ante ? 700 : 400 }}>{t}</text>
            </g>
          );
        })}
        <text x={profX} y={120} textAnchor="middle" fontSize={9} style={{ fontFamily: 'var(--mono)', fill: 'var(--c-pink)' }}>?</text>
        <text x={studX} y={120} textAnchor="middle" fontSize={9} style={{ fontFamily: 'var(--mono)', fill: 'var(--c-teal)' }}>?</text>
      </svg>
      <div className="difp-cv__toggles">
        <span>Add context:</span>
        <button className={ctx === 'prof' ? 'is-active' : ''} onClick={() => setCtx(ctx === 'prof' ? 'none' : 'prof')}>“…for her research.” → professor</button>
        <button className={ctx === 'stud' ? 'is-active' : ''} onClick={() => setCtx(ctx === 'stud' ? 'none' : 'stud')}>“…the scholarship.” → student</button>
      </div>
    </Figure>
  );
}

/* ── Module 7 — model selection axes ───────────────────────────────────── */
function SelectionAxes() {
  const axes = [
    { left: 'Open weights', right: 'Closed / API', v: 0.5 },
    { left: 'Lower cost', right: 'Higher cost', v: 0.5 },
    { left: 'Small context', right: 'Huge context', v: 0.5 },
    { left: 'Fast / cheap', right: 'Deep reasoning', v: 0.5 },
    { left: 'Self-hosted control', right: 'Managed convenience', v: 0.5 },
  ];
  return (
    <Figure caption="There is no single “best” model — only the right point on each axis for your task, budget, and governance constraints. Choosing means placing yourself on these sliders, not picking a winner.">
      <svg viewBox="0 0 520 230" width="100%" role="img" aria-label="Model selection trade-off axes">
        {axes.map((a, i) => {
          const y = 30 + i * 40;
          return (
            <g key={i}>
              <text x={8} y={y - 9} fontSize={10} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-dim)' }}>{a.left}</text>
              <text x={512} y={y - 9} textAnchor="end" fontSize={10} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-dim)' }}>{a.right}</text>
              <line x1={8} y1={y} x2={512} y2={y} stroke="var(--border-strong)" strokeWidth={2} strokeLinecap="round" />
              <circle cx={8 + a.v * 504} cy={y} r={6} fill="var(--c-blue)" stroke="var(--page-bg)" strokeWidth={2} />
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

/* ── Module 8 — C.R.A.F.T. prompt anatomy ──────────────────────────────── */
function CraftAnatomy() {
  const parts = [
    { k: 'C', label: 'Context', c: 'var(--c-blue)', text: 'I teach second-year biology and my students struggle with statistics.' },
    { k: 'R', label: 'Role', c: 'var(--c-teal)', text: 'Act as a patient teaching assistant who explains with everyday analogies.' },
    { k: 'A', label: 'Action', c: 'var(--c-green)', text: 'Explain p-values in 150 words, then give one worked example.' },
    { k: 'F', label: 'Few-shot', c: 'var(--c-yellow)', text: 'Here is the tone I like: “Think of it as…”.' },
    { k: 'T', label: 'Test', c: 'var(--c-pink)', text: 'Flag anything a statistician might dispute.' },
  ];
  return (
    <Figure caption="A strong prompt isn’t a sentence — it’s five labelled parts. Naming them turns “ask the AI” into a repeatable structure you reuse in every domain.">
      <div className="difp-craft">
        {parts.map((p) => (
          <div key={p.k} className="difp-craft__row" style={{ borderLeftColor: p.c }}>
            <span className="difp-craft__badge" style={{ background: p.c }}>{p.k}</span>
            <div>
              <div className="difp-craft__label" style={{ color: p.c }}>{p.label}</div>
              <div className="difp-craft__text">{p.text}</div>
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
}

export const CONCEPT_VISUALS: Record<string, () => JSX.Element> = {
  'module-1-evolution': NestingVisual,
  'module-2-transformers': SequentialVsParallel,
  'module-3-attention': CoreferenceAmbiguity,
  'module-7-foundation': SelectionAxes,
  'module-8-applications': CraftAnatomy,
};
