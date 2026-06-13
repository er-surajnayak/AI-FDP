import { useNavigate } from 'react-router-dom';
import { ClickableTile, Tag } from '@carbon/react';
import { ArrowRight, Time } from '@carbon/icons-react';
import { CORE_MODULES, RESOURCE_DOCS, OVERVIEW } from '../content/loader';
import type { ModuleMeta } from '../content-types';

const STATS = [
  { value: '8', label: 'Modules' },
  { value: '30+', label: 'Concepts' },
  { value: '4', label: 'Live Playgrounds' },
  { value: '8', label: 'Hands-on Activities' },
];

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="difp-home">
      {/* Hero */}
      <header className="difp-hero">
        <Tag type="cool-gray" size="sm">Faculty Development Program · Day 1</Tag>
        <h1 className="difp-hero__title">
          From Deep Learning to <span>Large Language Models</span>
        </h1>
        <p className="difp-hero__sub">
          Understanding the foundations of Generative AI — a premium interactive notebook for
          PhD holders, professors, researchers and academic administrators. Intuition first,
          mathematics later. See, interact with, and experiment with every concept.
        </p>
        <div className="difp-stats">
          {STATS.map((s) => (
            <div key={s.label} className="difp-stat">
              <span className="difp-stat__value">{s.value}</span>
              <span className="difp-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
        <button className="difp-hero__cta" onClick={() => navigate(`/${OVERVIEW.slug}`)}>
          Start with the Day 1 overview <ArrowRight size={16} />
        </button>
      </header>

      {/* Module grid */}
      <section className="difp-section">
        <h2 className="difp-section__title">Modules</h2>
        <div className="difp-grid">
          {CORE_MODULES.map((m) => (
            <ModuleCard key={m.slug} m={m} onOpen={() => navigate(`/${m.slug}`)} />
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="difp-section">
        <h2 className="difp-section__title">Activities &amp; Resources</h2>
        <div className="difp-grid difp-grid--wide">
          {RESOURCE_DOCS.map((m) => (
            <ClickableTile key={m.slug} className="difp-rescard" onClick={() => navigate(`/${m.slug}`)}>
              <p className="difp-rescard__title">{m.title}</p>
              <p className="difp-rescard__blurb">{m.blurb}</p>
              <div className="difp-chiprow">
                {m.topics.map((t) => (
                  <Tag key={t} size="sm" type="gray">{t}</Tag>
                ))}
              </div>
              <span className="difp-open">Open <ArrowRight size={14} /></span>
            </ClickableTile>
          ))}
        </div>
      </section>
    </div>
  );
}

function ModuleCard({ m, onOpen }: { m: ModuleMeta; onOpen: () => void }) {
  return (
    <ClickableTile className="difp-modcard" onClick={onOpen}>
      <div className="difp-modcard__top">
        <span className="difp-modcard__num">{m.number}</span>
        <div className="difp-modcard__meta">
          {m.playground && <Tag size="sm" type="green">Interactive</Tag>}
          <span className="difp-modcard__time"><Time size={14} /> {m.durationMin}m</span>
        </div>
      </div>
      <h3 className="difp-modcard__title">{m.title}</h3>
      <p className="difp-modcard__blurb">{m.blurb}</p>
      <div className="difp-chiprow">
        {m.topics.map((t) => (
          <Tag key={t} size="sm" type="cool-gray">{t}</Tag>
        ))}
      </div>
      <span className="difp-open">Open module <ArrowRight size={14} /></span>
    </ClickableTile>
  );
}
