import { useNavigate } from 'react-router-dom';
import type { ModuleMeta } from '../content-types';
import MarkdownView from '../components/MarkdownView';

/** Clean prose layout for the overview + resource docs. */
export default function DocView({ mod }: { mod: ModuleMeta }) {
  const navigate = useNavigate();
  return (
    <div className="difp-doc">
      <nav className="difp-breadcrumb">
        <button onClick={() => navigate('/')}>Home</button> /
        <span>Day {mod.day}</span> /
        <span>{mod.navLabel}</span>
      </nav>
      <div className="difp-chiprow" style={{ marginBottom: '1.25rem' }}>
        {mod.topics.map((t) => <span key={t} className="difp-chip">{t}</span>)}
      </div>
      <article className="difp-md"><MarkdownView markdown={mod.markdown} /></article>
    </div>
  );
}
