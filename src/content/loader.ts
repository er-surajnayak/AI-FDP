import type { ModuleMeta, PlaygroundKey } from '../content-types';

// Eagerly import every Day-1 markdown file as a raw string.
// Keys look like "../../content/day1/module-1-evolution.md".
const files = import.meta.glob('../../content/day1/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function md(name: string): string {
  const entry = Object.entries(files).find(([path]) => path.endsWith(`/${name}`));
  return entry ? entry[1] : `# Missing content\n\n\`${name}\` was not found.`;
}

interface ModuleDef {
  slug: string;
  navLabel: string;
  title: string;
  durationMin: number;
  file: string;
  playground?: PlaygroundKey;
}

const DEFS: ModuleDef[] = [
  { slug: 'overview', navLabel: 'Day 1 Overview', title: 'Day 1 — From Deep Learning to LLMs', durationMin: 360, file: '00-overview.md' },
  { slug: 'module-1-evolution', navLabel: '1 · Evolution of AI', title: 'Module 1 — The Evolution of AI', durationMin: 40, file: 'module-1-evolution.md' },
  { slug: 'module-2-transformers', navLabel: '2 · To Transformers', title: 'Module 2 — From Deep Learning to Transformers', durationMin: 45, file: 'module-2-transformers.md' },
  { slug: 'module-3-attention', navLabel: '3 · Attention', title: 'Module 3 — The Attention Mechanism', durationMin: 55, file: 'module-3-attention.md', playground: 'self-attention' },
  { slug: 'module-4-tokenization', navLabel: '4 · Tokenization', title: 'Module 4 — Tokenization', durationMin: 40, file: 'module-4-tokenization.md', playground: 'tokenizer' },
  { slug: 'module-5-embeddings', navLabel: '5 · Embeddings', title: 'Module 5 — Embeddings & Vector Representations', durationMin: 45, file: 'module-5-embeddings.md', playground: 'embedding' },
  { slug: 'module-6-how-llms-work', navLabel: '6 · How LLMs Work', title: 'Module 6 — How Large Language Models Work', durationMin: 55, file: 'module-6-how-llms-work.md', playground: 'temperature' },
  { slug: 'module-7-foundation', navLabel: '7 · Foundation Models', title: 'Module 7 — Foundation Models', durationMin: 40, file: 'module-7-foundation.md' },
  { slug: 'module-8-applications', navLabel: '8 · Applications', title: 'Module 8 — Applications of Generative AI', durationMin: 60, file: 'module-8-applications.md' },
  { slug: 'hands-on-activities', navLabel: 'Hands-On Activities', title: 'Day 1 — Hands-On Activities', durationMin: 0, file: 'hands-on-activities.md' },
  { slug: 'live-demos', navLabel: 'Live Demonstrations', title: 'Day 1 — Live Demonstrations', durationMin: 0, file: 'live-demos.md' },
  { slug: 'assignment', navLabel: 'End-of-Day Assignment', title: 'End-of-Day 1 Assignment', durationMin: 0, file: 'assignment.md' },
];

export const MODULES: ModuleMeta[] = DEFS.map((d) => ({
  slug: d.slug,
  navLabel: d.navLabel,
  title: d.title,
  durationMin: d.durationMin,
  markdown: md(d.file),
  playground: d.playground,
}));

export function getModule(slug: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.slug === slug);
}
