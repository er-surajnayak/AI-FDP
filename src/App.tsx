import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalTheme } from '@carbon/react';
import AppShell from './app/AppShell';
import ModulePage from './modules/ModulePage';

export default function App() {
  const [theme, setTheme] = useState<'g100' | 'g10'>('g100');

  // Carbon theme tokens don't style <body>; sync the page chrome to the theme.
  useEffect(() => {
    const dark = theme === 'g100';
    document.body.style.background = dark ? '#161616' : '#f4f4f4';
    document.body.style.color = dark ? '#f4f4f4' : '#161616';
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  }, [theme]);

  return (
    <GlobalTheme theme={theme}>
      <AppShell theme={theme} onToggleTheme={() => setTheme((t) => (t === 'g100' ? 'g10' : 'g100'))}>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/:slug" element={<ModulePage />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </AppShell>
    </GlobalTheme>
  );
}
