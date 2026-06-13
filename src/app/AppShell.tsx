import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@carbon/react';
import { Light, Asleep, Continue } from '@carbon/icons-react';
import { CORE_MODULES, RESOURCE_DOCS, OVERVIEW } from '../content/loader';

export default function AppShell({
  theme,
  onToggleTheme,
  children,
}: {
  theme: 'g100' | 'g10';
  onToggleTheme: () => void;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = (slug: string) => pathname === `/${slug}`;

  return (
    <div className="difp-shell">
      {/* Top bar */}
      <header className="difp-topbar">
        <button className="difp-brand" onClick={() => navigate('/')}>
          <span className="difp-brand__mark">DI</span>
          <span className="difp-brand__text">
            <strong>D.I. Notes</strong>
            <small>Generative AI · FDP</small>
          </span>
        </button>
        <div className="difp-topbar__actions">
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            iconDescription={theme === 'g100' ? 'Light theme' : 'Dark theme'}
            tooltipPosition="bottom"
            renderIcon={theme === 'g100' ? Light : Asleep}
            onClick={onToggleTheme}
          />
        </div>
      </header>

      <div className="difp-body">
        {/* Side nav */}
        <nav className="difp-sidenav" aria-label="Course navigation">
          <NavLink label="Home" onClick={() => navigate('/')} active={pathname === '/'} />
          <NavLink
            label={OVERVIEW.navLabel}
            onClick={() => navigate(`/${OVERVIEW.slug}`)}
            active={active(OVERVIEW.slug)}
          />

          <p className="difp-sidenav__group">Modules</p>
          {CORE_MODULES.map((m) => (
            <NavLink
              key={m.slug}
              num={m.number}
              label={m.navLabel}
              onClick={() => navigate(`/${m.slug}`)}
              active={active(m.slug)}
            />
          ))}

          <p className="difp-sidenav__group">Resources</p>
          {RESOURCE_DOCS.map((m) => (
            <NavLink key={m.slug} label={m.navLabel} onClick={() => navigate(`/${m.slug}`)} active={active(m.slug)} />
          ))}
        </nav>

        {/* Scrollable content */}
        <main className="difp-scroll">{children}</main>
      </div>
    </div>
  );
}

function NavLink({
  label, num, onClick, active,
}: { label: string; num?: string; onClick: () => void; active: boolean }) {
  return (
    <button className={`difp-navlink${active ? ' is-active' : ''}`} onClick={onClick}>
      {num && <span className="difp-navlink__num">{num}</span>}
      <span className="difp-navlink__label">{label}</span>
      {active && <Continue size={14} className="difp-navlink__caret" />}
    </button>
  );
}
