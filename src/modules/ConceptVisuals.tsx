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

// ── Shared building blocks for the architecture diagrams ──────────────────
function NBox({ x, y, w, h, label, sub, c, fill }: { x: number; y: number; w: number; h: number; label: string; sub?: string; c: string; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} style={{ fill: fill ?? 'var(--panel-bg-2)', stroke: c, strokeWidth: 1.4 }} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle" fontSize={11} style={{ fontFamily: 'var(--sans)', fontWeight: 600, fill: 'var(--text)' }}>{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontSize={8} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-faint)' }}>{sub}</text>}
    </g>
  );
}
function ArrowDefs({ id, color = 'var(--text-faint)' }: { id: string; color?: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={color} />
      </marker>
    </defs>
  );
}
function Arrow({ x1, y1, x2, y2, m, color = 'var(--text-faint)', dash, flow }: { x1: number; y1: number; x2: number; y2: number; m: string; color?: string; dash?: boolean; flow?: boolean }) {
  return <line className={flow ? 'difp-flow-arrow' : undefined} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5} markerEnd={`url(#${m})`} strokeDasharray={dash ? '4 3' : undefined} />;
}
function StageLabel({ x, y, text, c }: { x: number; y: number; text: string; c: string }) {
  return <text x={x} y={y} fontSize={9.5} style={{ fontFamily: 'var(--mono)', fill: c, fontWeight: 700 }}>{text}</text>;
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

/* ── Day 2 · M1 — anatomy of a strong prompt ───────────────────────────── */
function PromptAnatomy() {
  const parts = [
    { k: 'Role', d: 'act as a peer reviewer…', c: 'var(--c-blue)' },
    { k: 'Context', d: 'who, situation, audience', c: 'var(--c-teal)' },
    { k: 'Examples', d: 'a few worked samples', c: 'var(--c-purple)' },
    { k: 'Task', d: 'the precise ask', c: 'var(--c-green)' },
    { k: 'Format', d: 'a table / JSON / 150 words', c: 'var(--c-yellow)' },
  ];
  const bx = 22, bw = 232, rh = 34, gap = 5, y0 = 30;
  return (
    <Figure caption="A strong prompt isn’t a sentence — it’s a stack of parts. Assemble the layers, feed them to the same model, and a vague reply becomes a usable one.">
      <svg viewBox="0 0 600 250" width="100%" role="img" aria-label="The parts of a prompt feed a model to produce a better answer">
        <ArrowDefs id="cv-pa" />
        <text x={bx} y={20} fontSize={9.5} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-faint)' }}>YOUR PROMPT</text>
        {parts.map((p, i) => {
          const y = y0 + i * (rh + gap);
          return (
            <g key={p.k}>
              <rect x={bx} y={y} width={bw} height={rh} rx={5} fill="var(--panel-bg-2)" stroke="var(--border)" />
              <rect x={bx} y={y} width={5} height={rh} fill={p.c} />
              <text x={bx + 16} y={y + rh / 2 + 1} fontSize={11.5} style={{ fontFamily: 'var(--sans)', fontWeight: 700, fill: p.c }}>{p.k}</text>
              <text x={bx + 86} y={y + rh / 2 + 1} fontSize={9.5} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-faint)' }}>{p.d}</text>
            </g>
          );
        })}
        <Arrow x1={bx + bw + 6} y1={125} x2={bx + bw + 56} y2={125} m="cv-pa" />
        <NBox x={316} y={98} w={108} h={54} label="LLM" sub="same model" c="var(--accent)" />
        <Arrow x1={428} y1={125} x2={470} y2={125} m="cv-pa" />
        <NBox x={472} y={100} w={112} h={50} label="Usable answer" c="var(--c-green)" />
      </svg>
    </Figure>
  );
}

/* ── Day 2 · M2 — the vibe-coding loop (human in the loop) ──────────────── */
function VibeWorkflow() {
  const steps = [
    { k: 'You describe', d: 'intent in English', c: 'var(--c-blue)' },
    { k: 'AI writes', d: 'the actual code', c: 'var(--c-purple)' },
    { k: 'Run & preview', d: 'see it in seconds', c: 'var(--c-teal)' },
    { k: 'You review', d: '✓ verify & refine', c: 'var(--c-green)' },
  ];
  const bw = 122, bh = 56, y = 64, xs = [16, 158, 300, 442];
  return (
    <Figure caption="Vibe coding is a loop, not a vending machine. The AI generates fast; the human review step — verify, then refine in plain English — is what keeps it honest.">
      <svg viewBox="0 0 600 200" width="100%" role="img" aria-label="Describe, generate, run, review — and loop">
        <ArrowDefs id="cv-vw" />
        {steps.map((s, i) => (
          <g key={s.k}>
            <NBox x={xs[i]} y={y} w={bw} h={bh} label={s.k} sub={s.d} c={i === 3 ? 'var(--c-green)' : s.c} fill={i === 3 ? 'color-mix(in srgb, var(--c-green) 12%, var(--panel-bg-2))' : undefined} />
            {i < 3 && <Arrow x1={xs[i] + bw} y1={y + bh / 2} x2={xs[i + 1]} y2={y + bh / 2} m="cv-vw" />}
          </g>
        ))}
        {/* return loop */}
        <path d={`M ${442 + bw / 2} ${y + bh} Q ${442 + bw / 2} ${y + bh + 44} ${(442 + bw / 2 + 16 + bw / 2) / 2} ${y + bh + 44} L ${16 + bw / 2 + 30} ${y + bh + 44} Q ${16 + bw / 2} ${y + bh + 44} ${16 + bw / 2} ${y + bh}`} fill="none" stroke="var(--c-green)" strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#cv-vw)" />
        <text x={300} y={y + bh + 48} textAnchor="middle" fontSize={9.5} style={{ fontFamily: 'var(--mono)', fill: 'var(--c-green)' }}>refine in plain English ↺</text>
      </svg>
    </Figure>
  );
}

/* ── Day 2 · M3 — the RAG architecture ─────────────────────────────────── */
function RagArchitecture() {
  const m = 'cv-rag', bw = 84, bh = 44, y = 168;
  const X = { q: 12, e: 112, db: 212, aug: 344, llm: 448, ans: 548 };
  const dbCx = X.db + bw / 2;
  return (
    <Figure caption="Two flows meet at the vector database. Offline, your documents are chunked, embedded and stored. Online, a question is embedded, the closest chunks are retrieved, pasted into the prompt, and the model answers from real sources.">
      <svg viewBox="0 0 640 250" width="100%" role="img" aria-label="RAG architecture: index documents offline, retrieve and generate online">
        <ArrowDefs id={m} />
        {/* indexing feeder */}
        <StageLabel x={118} y={26} text="① INDEX YOUR DOCS · offline" c="var(--c-teal)" />
        <NBox x={118} y={36} w={86} h={34} label="Documents" c="var(--c-teal)" />
        <Arrow x1={204} y1={53} x2={224} y2={53} m={m} />
        <NBox x={224} y={36} w={104} h={34} label="Chunk + embed" c="var(--c-teal)" />
        <Arrow x1={dbCx} y1={70} x2={dbCx} y2={y - 2} m={m} flow color="var(--c-teal)" />

        {/* query lane */}
        <StageLabel x={X.q} y={150} text="② ASK A QUESTION · online" c="var(--c-green)" />
        <NBox x={X.q} y={y} w={bw} h={bh} label="Question" c="var(--c-green)" />
        <Arrow x1={X.q + bw} y1={y + bh / 2} x2={X.e} y2={y + bh / 2} m={m} flow color="var(--c-green)" />
        <NBox x={X.e} y={y} w={bw} h={bh} label="Embed" c="var(--c-green)" />
        <Arrow x1={X.e + bw} y1={y + bh / 2} x2={X.db} y2={y + bh / 2} m={m} flow color="var(--c-green)" />
        <NBox x={X.db} y={y} w={bw} h={bh} label="Vector DB" sub="retrieve" c="var(--accent)" fill="color-mix(in srgb, var(--accent) 12%, var(--panel-bg-2))" />
        <Arrow x1={X.db + bw} y1={y + bh / 2} x2={X.aug} y2={y + bh / 2} m={m} flow color="var(--c-green)" />
        <text x={(X.db + bw + X.aug) / 2} y={y - 4} textAnchor="middle" fontSize={8.5} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-faint)' }}>top-k chunks</text>
        <NBox x={X.aug} y={y} w={bw} h={bh} label="Augment" sub="+ prompt" c="var(--c-green)" />
        <Arrow x1={X.aug + bw} y1={y + bh / 2} x2={X.llm} y2={y + bh / 2} m={m} flow color="var(--c-green)" />
        <NBox x={X.llm} y={y} w={bw} h={bh} label="LLM" c="var(--c-green)" />
        <Arrow x1={X.llm + bw} y1={y + bh / 2} x2={X.ans} y2={y + bh / 2} m={m} flow color="var(--c-green)" />
        <NBox x={X.ans} y={y} w={bw} h={bh} label="Answer" sub="+ source" c="var(--c-green)" />
      </svg>
    </Figure>
  );
}

/* ── Day 2 · M4 — what's inside a vector database ──────────────────────── */
function VectorDbArchitecture() {
  const m = 'cv-vdb';
  // small HNSW-ish graph inside the index
  const nodes = [[60, 40], [110, 30], [95, 75], [48, 90], [135, 70], [85, 110], [125, 110]];
  const edges = [[0, 1], [0, 2], [1, 4], [2, 3], [2, 5], [4, 6], [5, 6], [2, 4]];
  const ix = 250, iy = 56, iw = 170, ih = 150; // index box
  return (
    <Figure caption="Inside a vector database: every chunk is embedded and woven into a navigable graph (HNSW). A query becomes a vector and hops through that graph — approximate but lightning-fast — to surface the nearest chunks. This is the searchable memory behind RAG.">
      <svg viewBox="0 0 620 240" width="100%" role="img" aria-label="Vector database internals: embed, index as a graph, search by approximate nearest neighbour">
        <ArrowDefs id={m} />
        {/* ingest */}
        <StageLabel x={14} y={36} text="STORE" c="var(--c-teal)" />
        <NBox x={14} y={44} w={90} h={40} label="Text chunk" c="var(--c-teal)" />
        <Arrow x1={104} y1={64} x2={124} y2={64} m={m} />
        <NBox x={124} y={44} w={84} h={40} label="Embed" sub="→ vector" c="var(--c-teal)" />
        <Arrow x1={208} y1={64} x2={ix} y2={84} m={m} />

        {/* index box with graph */}
        <rect x={ix} y={iy} width={iw} height={ih} rx={8} fill="var(--panel-bg)" stroke="var(--accent)" strokeWidth={1.5} />
        <text x={ix + iw / 2} y={iy + 16} textAnchor="middle" fontSize={10.5} style={{ fontFamily: 'var(--sans)', fontWeight: 700, fill: 'var(--text)' }}>Vector Index</text>
        <text x={ix + iw / 2} y={iy + 28} textAnchor="middle" fontSize={8} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-faint)' }}>ANN · HNSW graph</text>
        <g transform={`translate(${ix + 8}, ${iy + 24})`}>
          {edges.map(([a, b], i) => <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--border-strong)" strokeWidth={1} />)}
          {nodes.map((n, i) => <circle key={i} cx={n[0]} cy={n[1]} r={i === 5 ? 6 : 4} fill={i === 5 ? 'var(--c-yellow)' : 'var(--accent)'} />)}
        </g>

        {/* query */}
        <StageLabel x={14} y={150} text="SEARCH" c="var(--c-green)" />
        <NBox x={14} y={158} w={90} h={40} label="Query" c="var(--c-green)" />
        <Arrow x1={104} y1={178} x2={124} y2={178} m={m} />
        <NBox x={124} y={158} w={84} h={40} label="Embed" sub="→ vector" c="var(--c-green)" />
        <Arrow x1={208} y1={178} x2={ix} y2={iy + ih - 20} m={m} color="var(--c-yellow)" dash />

        {/* result */}
        <Arrow x1={ix + iw} y1={iy + ih / 2} x2={ix + iw + 24} y2={iy + ih / 2} m={m} />
        <NBox x={ix + iw + 26} y={iy + ih / 2 - 27} w={118} h={54} label="Top-k matches" sub="nearest chunks" c="var(--c-yellow)" />
        <text x={ix + iw / 2} y={iy + ih + 16} textAnchor="middle" fontSize={8.5} style={{ fontFamily: 'var(--mono)', fill: 'var(--text-faint)' }}>+ metadata filters (date, source, author)</text>
      </svg>
    </Figure>
  );
}

export const CONCEPT_VISUALS: Record<string, () => JSX.Element> = {
  'module-1-evolution': NestingVisual,
  'module-2-transformers': SequentialVsParallel,
  'module-3-attention': CoreferenceAmbiguity,
  'module-7-foundation': SelectionAxes,
  'module-8-applications': CraftAnatomy,
  'day2-module-1-prompting': PromptAnatomy,
  'day2-module-2-vibe-coding': VibeWorkflow,
  'day2-module-3-rag': RagArchitecture,
  'day2-module-4-vector-db': VectorDbArchitecture,
};
