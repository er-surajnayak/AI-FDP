import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Light, Asleep, Locked, Close } from '@carbon/icons-react';
import { DAYS, modulesForDay, docsForDay, overviewForDay, SEARCH_INDEX } from '../content/loader';

export default function AppShell({
  theme, onToggleTheme, children,
}: { theme: 'g100' | 'g10'; onToggleTheme: () => void; children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = (slug: string) => pathname === `/${slug}`;

  return (
    <div className="difp-shell">
      <header className="difp-topbar">
        <button className="difp-brand" onClick={() => navigate('/')}>
          <span className="difp-brand__mark">DI</span>
          <span className="difp-brand__text"><strong>D.I. Notes</strong><small>Generative AI · FDP</small></span>
        </button>
        <div className="difp-topbar__spacer" />
        <SearchBox onPick={(slug) => navigate(`/${slug}`)} />
        <button className="difp-iconbtn" aria-label="Toggle theme" onClick={onToggleTheme}>
          {theme === 'g100' ? <Light size={18} /> : <Asleep size={18} />}
        </button>
      </header>

      <div className="difp-body">
        <nav className="difp-sidenav" aria-label="Course navigation">
          <button className={`difp-navlink${pathname === '/' ? ' is-active' : ''}`} onClick={() => navigate('/')}>
            <span className="difp-navlink__label">Home</span>
          </button>

          {DAYS.map((d) => {
            const overview = overviewForDay(d.day);
            const modules = modulesForDay(d.day);
            const docs = docsForDay(d.day);
            return (
              <div key={d.day} className="difp-day">
                <p className="difp-day__head">
                  <b>Day {d.day}</b> · {d.title}
                  {d.status !== 'live' && <span className="difp-day__soon">soon</span>}
                </p>
                {d.status === 'live' ? (
                  <>
                    {overview && (
                      <button className={`difp-navlink${active(overview.slug) ? ' is-active' : ''}`} onClick={() => navigate(`/${overview.slug}`)}>
                        <span className="difp-navlink__label">Overview</span>
                      </button>
                    )}
                    {modules.map((m) => (
                      <button key={m.slug} className={`difp-navlink${active(m.slug) ? ' is-active' : ''}`} onClick={() => navigate(`/${m.slug}`)}>
                        <span className="difp-navlink__num">{m.number}</span>
                        <span className="difp-navlink__label">{m.navLabel}</span>
                      </button>
                    ))}
                    {docs.length > 0 && <p className="difp-subnav__group">Resources</p>}
                    {docs.map((m) => (
                      <button key={m.slug} className={`difp-navlink${active(m.slug) ? ' is-active' : ''}`} onClick={() => navigate(`/${m.slug}`)}>
                        <span className="difp-navlink__label">{m.navLabel}</span>
                      </button>
                    ))}
                  </>
                ) : (
                  <button className="difp-navlink" disabled>
                    <span className="difp-navlink__num"><Locked size={13} /></span>
                    <span className="difp-navlink__label">Coming soon</span>
                  </button>
                )}
              </div>
            );
          })}
        </nav>

        <main className="difp-scroll">{children}</main>
      </div>
    </div>
  );
}

function SearchBox({ onPick }: { onPick: (slug: string) => void }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const results = q.trim()
    ? SEARCH_INDEX.filter((e) => e.keywords.includes(q.toLowerCase())).slice(0, 8)
    : [];

  return (
    <div className="difp-search" ref={ref}>
      <div className="difp-search__field">
        <Search size={16} />
        <input
          value={q}
          placeholder="Search topics…"
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        {q ? (
          <button className="difp-iconbtn" style={{ width: 22, height: 22 }} aria-label="Clear" onClick={() => { setQ(''); setOpen(false); }}>
            <Close size={14} />
          </button>
        ) : <span className="difp-search__kbd">/</span>}
      </div>
      {open && q.trim() && (
        <div className="difp-search__results">
          {results.length === 0 ? (
            <p className="difp-search__empty">No matches for “{q}”.</p>
          ) : results.map((r) => (
            <button key={r.slug} className="difp-search__item" onClick={() => { onPick(r.slug); setOpen(false); setQ(''); }}>
              {r.label}<small>{r.sub}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
