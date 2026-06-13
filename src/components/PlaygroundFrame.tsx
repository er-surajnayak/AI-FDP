import type { ReactNode } from 'react';

/** Consistent chrome around an interactive playground canvas. */
export default function PlaygroundFrame({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="difp-playground" aria-label={title}>
      <p className="difp-playground__title">
        <span aria-hidden>🕹️</span> {title}
      </p>
      {hint && <p className="difp-playground__hint">{hint}</p>}
      {children}
    </section>
  );
}
