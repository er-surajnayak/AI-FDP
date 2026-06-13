import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalTheme } from '@carbon/react';
import AppShell from './app/AppShell';
import HomePage from './pages/HomePage';
import ModulePage from './modules/ModulePage';

export default function App() {
  const [theme, setTheme] = useState<'g100' | 'g10'>('g10');

  useEffect(() => {
    const dark = theme === 'g100';
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <GlobalTheme theme={theme}>
      <AppShell theme={theme} onToggleTheme={() => setTheme((t) => (t === 'g100' ? 'g10' : 'g100'))}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:slug" element={<ModulePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </GlobalTheme>
  );
}
