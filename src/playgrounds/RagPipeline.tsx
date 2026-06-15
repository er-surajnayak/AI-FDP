import { useMemo, useState } from 'react';
import InteractiveLab from '../components/InteractiveLab';

// A tiny "institutional handbook" the lab retrieves from.
const CORPUS = [
  { id: 'P-1', src: 'Leave Policy §2', text: 'Faculty are entitled to 30 days of annual leave each year, applied for at least two weeks in advance through the HR portal.' },
  { id: 'P-2', src: 'Leave Policy §5', text: 'Unused annual leave may be carried over to the next year, up to a maximum of 10 days. Anything beyond that lapses.' },
  { id: 'P-3', src: 'Exam Rules §4', text: 'Final examinations are graded out of 100, and a minimum mark of 40 is required to pass each course.' },
  { id: 'P-4', src: 'Exam Rules §7', text: 'A student may request a re-evaluation of a graded exam within 15 days of the results being published.' },
  { id: 'P-5', src: 'IT Policy §3', text: 'Confidential research data must not be uploaded to third-party AI tools unless the tool is on the approved-vendors list.' },
  { id: 'P-6', src: 'Library §1', text: 'Borrowed books may be renewed online twice; a third renewal requires returning the book in person.' },
];

const QUESTIONS = [
  { q: 'How many days of annual leave do faculty get?', answer: 'Faculty get 30 days of annual leave per year, requested at least two weeks ahead via the HR portal.', noRag: 'Most universities offer somewhere around 20–25 days, but it really depends on the institution…' },
  { q: 'Can I carry unused leave into next year?', answer: 'Yes — up to 10 days of unused leave can be carried over; anything above that lapses.', noRag: 'Usually some carry-over is allowed, though many places cap it. Check your contract to be sure…' },
  { q: 'What mark do I need to pass a course?', answer: 'You need a minimum of 40 out of 100 to pass each course.', noRag: 'A pass is often around 50%, but the exact threshold varies by institution and program…' },
  { q: 'Can I put confidential data into ChatGPT?', answer: 'Not unless the tool is on the approved-vendors list — confidential research data is restricted by IT Policy §3.', noRag: 'It’s generally risky to upload sensitive data to AI tools, but policies differ widely…' },
];

const STOP = new Set(['the', 'a', 'an', 'of', 'to', 'do', 'i', 'is', 'are', 'can', 'how', 'many', 'what', 'in', 'into', 'my', 'get', 'need', 'for', 'and', 'put', 'does']);
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w));

// Illustrative similarity: normalised word overlap (real, transparent, deterministic).
function similarity(q: string, text: string): number {
  const a = new Set(words(q)), b = words(text);
  if (!a.size || !b.length) return 0;
  let hit = 0;
  for (const w of b) if (a.has(w)) hit++;
  return hit / Math.sqrt(a.size * b.length);
}

const STAGES = ['Embed question', 'Retrieve top-k', 'Augment prompt', 'Generate answer'];

export default function RagPipeline() {
  const [qi, setQi] = useState(0);
  const [ran, setRan] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const Q = QUESTIONS[qi];

  const ranked = useMemo(() => {
    return CORPUS.map((c) => ({ ...c, score: similarity(Q.q, c.text) }))
      .sort((a, b) => b.score - a.score);
  }, [qi]);
  const topK = ranked.slice(0, 3);
  const max = topK[0]?.score || 1;

  return (
    <InteractiveLab
      name="Lab · RAG Pipeline Explorer"
      hint="Ask a question about the institution’s handbook. Watch the model fetch the right passages before it answers."
      note={<><b>Illustrative retrieval.</b> Similarity here is transparent word-overlap over a 6-passage handbook (a real model uses embeddings, as in the Day-1 attention lab). The point is the flow: <i>retrieve → augment → generate</i>, so the answer is grounded in a real source instead of guesswork.</>}
    >
      <div className="difp-field" style={{ marginBottom: '0.8rem' }}>
        <label>Pick a question</label>
        <div className="difp-rag__qs">
          {QUESTIONS.map((x, i) => (
            <button key={i} className={i === qi ? 'is-active' : ''} onClick={() => { setQi(i); setRan(false); }}>{x.q}</button>
          ))}
        </div>
      </div>

      <button className="difp-btn" style={{ marginBottom: '1rem' }} onClick={() => setRan(true)}>Run retrieval →</button>

      {/* pipeline stages */}
      <div className="difp-rag__stages">
        {STAGES.map((st, i) => (
          <div key={st} className={`difp-rag__stage ${ran ? 'on' : ''}`}>
            <span className="difp-rag__sidx">{i + 1}</span>{st}
            {i < STAGES.length - 1 && <span className="difp-rag__sarrow" aria-hidden>→</span>}
          </div>
        ))}
      </div>

      {ran && (
        <>
          <div className="difp-sub" style={{ marginTop: '1.2rem' }}>Retrieved from the handbook</div>
          <div className="difp-rag__chunks">
            {ranked.map((c, i) => {
              const isTop = i < 3 && c.score > 0;
              return (
                <div key={c.id} className={`difp-rag__chunk ${isTop ? 'hit' : 'miss'}`}>
                  <div className="difp-rag__bar"><span style={{ width: `${Math.round((c.score / max) * 100)}%` }} /></div>
                  <div className="difp-rag__ctext">
                    <span className="difp-rag__csrc">{c.src}</span> {c.text}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="difp-sub" style={{ marginTop: '1.2rem' }}>The augmented prompt</div>
          <pre className="difp-rag__prompt">{`Use ONLY the context below to answer.

Context:
${topK.filter((c) => c.score > 0).map((c) => `- (${c.src}) ${c.text}`).join('\n')}

Question: ${Q.q}`}</pre>

          <div className="difp-sub" style={{ marginTop: '1.2rem' }}>The grounded answer</div>
          <div className="difp-rag__answer">
            {Q.answer} <span className="difp-rag__cite">— {topK[0]?.src}</span>
          </div>

          <button className="difp-link-btn" style={{ marginTop: '0.8rem' }} onClick={() => setShowRaw((s) => !s)}>
            {showRaw ? 'Hide' : 'Compare:'} the same model with no RAG
          </button>
          {showRaw && (
            <div className="difp-rag__answer difp-rag__answer--raw">
              {Q.noRag} <span className="difp-rag__cite difp-rag__cite--warn">— no source, just a guess</span>
            </div>
          )}
        </>
      )}
    </InteractiveLab>
  );
}
