import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavDivider,
  Content,
} from '@carbon/react';
import { Sun, Moon } from '@carbon/icons-react';
import { MODULES } from '../content/loader';

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

  const moduleItems = MODULES.filter((m) => m.slug.startsWith('module-') || m.slug === 'overview');
  const extraItems = MODULES.filter((m) => !m.slug.startsWith('module-') && m.slug !== 'overview');

  return (
    <>
      <Header aria-label="D.I. Notes — Generative AI FDP">
        <HeaderName prefix="D.I. Notes" href="#/overview" onClick={(e) => { e.preventDefault(); navigate('/overview'); }}>
          Generative AI · FDP
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label={theme === 'g100' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={onToggleTheme}
            tooltipAlignment="end"
          >
            {theme === 'g100' ? <Sun size={20} /> : <Moon size={20} />}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      <SideNav aria-label="Module navigation" isFixedNav expanded isChildOfHeader isPersistent>
        <SideNavItems>
          {moduleItems.map((m) => (
            <SideNavLink
              key={m.slug}
              href={`#/${m.slug}`}
              isActive={pathname === `/${m.slug}`}
              onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate(`/${m.slug}`); }}
            >
              {m.navLabel}
            </SideNavLink>
          ))}
          <SideNavDivider />
          {extraItems.map((m) => (
            <SideNavLink
              key={m.slug}
              href={`#/${m.slug}`}
              isActive={pathname === `/${m.slug}`}
              onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate(`/${m.slug}`); }}
            >
              {m.navLabel}
            </SideNavLink>
          ))}
        </SideNavItems>
      </SideNav>

      <Content style={{ marginInlineStart: '16rem', minHeight: '100vh' }}>
        {children}
      </Content>
    </>
  );
}
