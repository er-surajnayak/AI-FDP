import { useNavigate } from 'react-router-dom';
import { ArrowRight, Time, Locked } from '@carbon/icons-react';
import { DAYS, modulesForDay, docsForDay, overviewForDay } from '../content/loader';
import type { ModuleMeta, DayMeta } from '../content-types';

const STATS = [
  { value: '4', label: 'Days' },
  { value: '8', label: 'Day-1 Modules' },
  { value: '6', label: 'Interactive Labs' },
  { value: '8', label: 'Hands-on Activities' },
];

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="difp-home">
      <header className="difp-hero">
        <span className="difp-chip">Faculty Development Program</span>
        <h1 className="difp-hero__title">From Deep Learning to <span>Large Language Models</span></h1>
        <p className="difp-hero__sub">
          A premium interactive notebook on the foundations of Generative AI — for PhD holders,
          professors, researchers and academic administrators. Intuition first, mathematics later.
          See it, interact with it, experiment with it.
        </p>
        <div className="difp-stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="difp-stat__value">{s.value}</div>
              <div className="difp-stat__label">{s.label}</div>
            </div>
          ))}
        </div>
        <button className="difp-hero__cta" onClick={() => navigate('/module-1-evolution')}>
          Start Day 1 <ArrowRight size={16} />
        </button>
      </header>

      {DAYS.map((d) => (
        <DaySection key={d.day} d={d} onOpen={(slug) => navigate(`/${slug}`)} />
      ))}
    </div>
  );
}

function DaySection({ d, onOpen }: { d: DayMeta; onOpen: (slug: string) => void }) {
  const modules = modulesForDay(d.day);
  const docs = docsForDay(d.day);
  const overview = overviewForDay(d.day);
  const live = d.status === 'live';

  return (
    <section className="difp-section">
      <div className="difp-dayband">
        <span className="difp-dayband__num">DAY {d.day}</span>
        <span className="difp-dayband__title">{d.title}</span>
        <span className="difp-dayband__sub">{d.subtitle}</span>
        {!live && <span className="difp-chip" style={{ color: 'var(--c-yellow)', borderColor: 'var(--c-yellow)' }}>Coming soon</span>}
      </div>

      {live ? (
        <>
          <div className="difp-grid">
            {modules.map((m) => <ModuleCard key={m.slug} m={m} onOpen={() => onOpen(m.slug)} />)}
          </div>
          {(overview || docs.length > 0) && (
            <div className="difp-grid difp-grid--wide" style={{ marginTop: '1rem' }}>
              {[overview, ...docs].filter(Boolean).map((m) => (
                <button key={m!.slug} className="difp-card" onClick={() => onOpen(m!.slug)} style={{ minHeight: '9rem' }}>
                  <p className="difp-card__title" style={{ marginTop: 0 }}>{m!.title}</p>
                  <p className="difp-card__blurb">{m!.blurb}</p>
                  <div className="difp-chiprow">{m!.topics.map((t) => <span key={t} className="difp-chip">{t}</span>)}</div>
                  <span className="difp-open">Open <ArrowRight size={14} /></span>
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="difp-card difp-card--locked" style={{ minHeight: '7rem' }}>
          <div className="difp-card__top">
            <span className="difp-card__num" style={{ color: 'var(--text-faint)' }}>0{d.day}</span>
            <Locked size={18} style={{ color: 'var(--text-faint)' }} />
          </div>
          <p className="difp-card__blurb" style={{ marginTop: '0.75rem' }}>
            Content for Day {d.day} is being authored and will appear here.
          </p>
        </div>
      )}
    </section>
  );
}

function ModuleCard({ m, onOpen }: { m: ModuleMeta; onOpen: () => void }) {
  return (
    <button className="difp-card" onClick={onOpen}>
      <div className="difp-card__top">
        <span className="difp-card__num">{m.number}</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
          {m.playground && <span className="difp-tag-int">LAB</span>}
          <span className="difp-card__time"><Time size={13} /> {m.durationMin}m</span>
        </div>
      </div>
      <h3 className="difp-card__title">{m.title}</h3>
      <p className="difp-card__blurb">{m.blurb}</p>
      <div className="difp-chiprow">{m.topics.map((t) => <span key={t} className="difp-chip">{t}</span>)}</div>
      <span className="difp-open">Open module <ArrowRight size={14} /></span>
    </button>
  );
}
