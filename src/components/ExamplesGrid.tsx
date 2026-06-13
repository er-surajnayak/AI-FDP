import MarkdownView from './MarkdownView';
import type { Section } from '../lib/markdown';

const META: Record<string, { label: string; color: string; icon: string }> = {
  faculty: { label: 'Faculty', color: 'var(--c-blue)', icon: '🏫' },
  research: { label: 'Research', color: 'var(--c-purple)', icon: '🔬' },
  industry: { label: 'Industry', color: 'var(--c-teal)', icon: '💼' },
};

/** Faculty / Research / Industry example sections as colored lens tiles. */
export default function ExamplesGrid({ sections }: { sections: Section[] }) {
  return (
    <div className="difp-lens-grid">
      {sections.map((s) => {
        const m = META[s.key] ?? { label: s.title, color: 'var(--c-blue)', icon: '•' };
        return (
          <div key={s.key} className="difp-lens-tile" style={{ ['--ltc' as string]: m.color }}>
            <p className="difp-lens-tile__head"><span aria-hidden>{m.icon}</span> {m.label}</p>
            <div className="difp-md difp-md--compact"><MarkdownView markdown={s.body} /></div>
          </div>
        );
      })}
    </div>
  );
}
