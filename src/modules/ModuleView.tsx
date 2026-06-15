import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { ModuleMeta } from '../content-types';
import { CORE_MODULES } from '../content/loader';
import { parseModule, findSection, findSections, splitBullets } from '../lib/markdown';
import type { SectionKey } from '../lib/markdown';
import MarkdownView from '../components/MarkdownView';
import SectionEyebrow from '../components/SectionEyebrow';
import ExamplesGrid from '../components/ExamplesGrid';
import ScoredQuiz from '../components/ScoredQuiz';
import MisconceptionsList from '../components/MisconceptionsList';
import TakeawaysTile from '../components/TakeawaysTile';
import { PLAYGROUNDS } from '../playgrounds/registry';
import { CONCEPT_VISUALS } from './ConceptVisuals';

type Accent = 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'teal';
interface Sec { id: string; label: string; heading: string; accent: Accent; body: ReactNode; }

export default function ModuleView({ mod }: { mod: ModuleMeta }) {
  const navigate = useNavigate();
  const parsed = useMemo(() => parseModule(mod.markdown), [mod.markdown]);
  const get = (k: SectionKey) => findSection(parsed, k);

  const Playground = mod.playground ? PLAYGROUNDS[mod.playground] : null;
  const Visual = CONCEPT_VISUALS[mod.slug] ?? null;
  const objectives = get('objectives');
  const objList = objectives ? splitBullets(objectives.body) : [];
  const exampleSections = findSections(parsed, ['faculty', 'research', 'industry']).filter((s) => s.body.length > 20);

  const md = (s?: { body: string }) => s ? <div className="difp-md"><MarkdownView markdown={s.body} /></div> : null;

  // Assemble only the sections that have content, in learner order.
  const secs: Sec[] = [];
  if (objList.length)
    secs.push({ id: 'objectives', label: 'Orientation', heading: "What you'll be able to do", accent: 'blue',
      body: <div className="difp-objectives"><ul>{objList.map((o, i) => <li key={i}><span className="difp-md difp-md--inline"><MarkdownView markdown={o} inline /></span></li>)}</ul></div> });
  if (get('teaching')) secs.push({ id: 'idea', label: 'The Idea', heading: 'The core idea', accent: 'blue', body: md(get('teaching')) });
  if (Visual) secs.push({ id: 'picture', label: 'Picture It', heading: 'The big picture', accent: 'purple', body: <Visual /> });
  if (get('analogies')) secs.push({ id: 'analogies', label: 'Analogies', heading: 'Ways to picture it', accent: 'teal', body: md(get('analogies')) });
  if (exampleSections.length) secs.push({ id: 'lenses', label: 'In Practice', heading: 'Through three lenses', accent: 'blue', body: <ExamplesGrid sections={exampleSections} /> });
  if (Playground) secs.push({ id: 'lab', label: 'Interactive Lab', heading: 'See it · try it', accent: 'green', body: <Playground /> });
  if (get('activity')) secs.push({ id: 'closer', label: 'Going Deeper', heading: 'A closer look', accent: 'teal', body: md(get('activity')) });
  if (get('demo')) secs.push({ id: 'practice', label: 'In the Wild', heading: 'Seeing it for real', accent: 'pink', body: md(get('demo')) });
  if (get('quiz')) secs.push({ id: 'quiz', label: 'Check Yourself', heading: 'Quiz yourself', accent: 'yellow', body: <ScoredQuiz body={get('quiz')!.body} /> });
  if (get('misconceptions')) secs.push({ id: 'myths', label: 'Watch Out', heading: 'Common misconceptions', accent: 'pink', body: <MisconceptionsList body={get('misconceptions')!.body} /> });
  if (get('takeaways')) secs.push({ id: 'takeaways', label: 'Recap', heading: 'Key takeaways', accent: 'green', body: <TakeawaysTile body={get('takeaways')!.body} /> });

  // Presenter-facing material (teaching script + build/animation/Carbon specs)
  // lives in a collapsible drawer, not the main learner flow.
  const presenterNotes = findSections(parsed, ['storytelling', 'visual', 'animation', 'playground', 'carbon', 'react']);

  const idx = CORE_MODULES.findIndex((m) => m.slug === mod.slug);
  const prev = idx > 0 ? CORE_MODULES[idx - 1] : undefined;
  const next = idx >= 0 && idx < CORE_MODULES.length - 1 ? CORE_MODULES[idx + 1] : undefined;
  const num2 = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="difp-layout">
      <div className="difp-layout__main">
        <nav className="difp-breadcrumb">
          <button onClick={() => navigate('/')}>Home</button> /
          <span>Day {mod.day}</span> /
          <span>Module {mod.number}</span>
        </nav>

        <header className="difp-mod-hero">
          <span className="difp-mod-hero__num">MODULE {mod.number}</span>
          <h1 className="difp-mod-hero__title">{mod.title}</h1>
          {parsed.intro && <div className="difp-md difp-mod-hero__intro"><MarkdownView markdown={parsed.intro} /></div>}
          <div className="difp-chiprow difp-mod-hero__meta">
            <span className="difp-chip">⏱ {mod.durationMin} min</span>
            {mod.playground && <span className="difp-tag-int">INTERACTIVE LAB</span>}
            {mod.topics.map((t) => <span key={t} className="difp-chip">{t}</span>)}
          </div>
        </header>

        {secs.map((s, n) => (
          <section key={s.id} className="difp-sec" id={s.id}>
            <SectionEyebrow num={num2(n + 1)} label={s.label} accent={s.accent} heading={s.heading} />
            {s.body}
          </section>
        ))}

        {presenterNotes.length > 0 && (
          <details className="difp-buildnotes">
            <summary>Facilitator notes — teaching script, animation &amp; build specs (presenter only)</summary>
            {presenterNotes.map((s, bi) => (
              <div key={`${s.key}-${bi}`} style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', margin: '0 0 0.4rem' }}>{s.title}</h3>
                <div className="difp-md difp-md--compact"><MarkdownView markdown={s.body} /></div>
              </div>
            ))}
          </details>
        )}

        <nav className="difp-pager">
          {prev ? (
            <button onClick={() => navigate(`/${prev.slug}`)}><small>← Previous</small>{prev.number} · {prev.navLabel}</button>
          ) : <span />}
          {next ? (
            <button className="is-next" onClick={() => navigate(`/${next.slug}`)}><small>Next →</small>{next.number} · {next.navLabel}</button>
          ) : <span />}
        </nav>
      </div>

      {/* On this page */}
      <aside className="difp-toc">
        <p className="difp-toc__head">On this page</p>
        {secs.map((s, n) => (
          <a key={s.id} href={`#${s.id}`}>{num2(n + 1)} · {s.label}</a>
        ))}
      </aside>
    </div>
  );
}
