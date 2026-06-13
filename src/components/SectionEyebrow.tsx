import type { ReactNode } from 'react';

const ACCENTS: Record<string, string> = {
  blue: 'var(--c-blue)', green: 'var(--c-green)', yellow: 'var(--c-yellow)',
  purple: 'var(--c-purple)', pink: 'var(--c-pink)', teal: 'var(--c-teal)',
};

/** A numbered eyebrow + serif section heading, matching the reference layout. */
export default function SectionEyebrow({
  id, num, label, accent = 'blue', heading,
}: {
  id?: string; num: string; label: string; accent?: keyof typeof ACCENTS; heading: ReactNode;
}) {
  return (
    <header id={id} style={{ ['--eb-accent' as string]: ACCENTS[accent] }}>
      <p className="difp-eyebrow"><b>{num}</b> · {label}</p>
      <h2 className="difp-section-h">{heading}</h2>
    </header>
  );
}
