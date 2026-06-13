import type { ReactNode } from 'react';

/**
 * Panel chrome for an interactive lab — a labelled bar with an INTERACTIVE tag,
 * an optional hint line, the canvas, and an optional explanatory note.
 */
export default function InteractiveLab({
  name, hint, note, children,
}: {
  name: string; hint?: string; note?: ReactNode; children: ReactNode;
}) {
  return (
    <section className="difp-lab" aria-label={name}>
      <div className="difp-lab__bar">
        <span className="difp-lab__name">{name}</span>
        <span className="difp-tag-int">INTERACTIVE</span>
      </div>
      {hint && <p className="difp-lab__hint">{hint}</p>}
      {children}
      {note && <div className="difp-lab__note">{note}</div>}
    </section>
  );
}
