import type { ModuleMeta, ModuleKind, PlaygroundKey } from '../content-types';

// Eagerly import every Day-1 markdown file as a raw string.
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
  number?: string;
  blurb: string;
  topics: string[];
  durationMin: number;
  kind: ModuleKind;
  file: string;
  playground?: PlaygroundKey;
}

const DEFS: ModuleDef[] = [
  {
    slug: 'module-1-evolution', navLabel: 'Evolution of AI', title: 'The Evolution of AI',
    number: '01', durationMin: 40, kind: 'module', file: 'module-1-evolution.md',
    blurb: 'How AI, ML, Deep Learning and Generative AI nest — and why deep learning finally won.',
    topics: ['AI vs ML vs DL', 'Data · GPUs · Architectures', 'Generative AI'],
  },
  {
    slug: 'module-2-transformers', navLabel: 'To Transformers', title: 'From Deep Learning to Transformers',
    number: '02', durationMin: 45, kind: 'module', file: 'module-2-transformers.md',
    blurb: 'Why CNNs, RNNs and LSTMs hit a wall — and the 2017 paper that changed everything.',
    topics: ['CNN · RNN · LSTM', 'Long-range memory', 'Attention Is All You Need'],
  },
  {
    slug: 'module-3-attention', navLabel: 'Attention', title: 'The Attention Mechanism',
    number: '03', durationMin: 55, kind: 'module', file: 'module-3-attention.md', playground: 'self-attention',
    blurb: 'The engine of every LLM, taught with intuition first — Query, Key, Value, no equations.',
    topics: ['Self-attention', 'Query · Key · Value', 'Multi-head'],
  },
  {
    slug: 'module-4-tokenization', navLabel: 'Tokenization', title: 'Tokenization',
    number: '04', durationMin: 40, kind: 'module', file: 'module-4-tokenization.md', playground: 'tokenizer',
    blurb: 'What the model actually reads — tokens, limits, cost, and the context window.',
    topics: ['Sub-word tokens', 'Context window', 'Cost & limits'],
  },
  {
    slug: 'module-5-embeddings', navLabel: 'Embeddings', title: 'Embeddings & Vector Representations',
    number: '05', durationMin: 45, kind: 'module', file: 'module-5-embeddings.md', playground: 'embedding',
    blurb: 'Where language becomes geometry — meaning as distance, and similarity search.',
    topics: ['Vector space', 'King − Man + Woman', 'Similarity / RAG'],
  },
  {
    slug: 'module-6-how-llms-work', navLabel: 'How LLMs Work', title: 'How Large Language Models Work',
    number: '06', durationMin: 55, kind: 'module', file: 'module-6-how-llms-work.md', playground: 'temperature',
    blurb: 'The full pipeline, prompt to response — autoregression, probabilities, temperature.',
    topics: ['Next-token prediction', 'Temperature', 'Hallucination'],
  },
  {
    slug: 'module-7-foundation', navLabel: 'Foundation Models', title: 'Foundation Models',
    number: '07', durationMin: 40, kind: 'module', file: 'module-7-foundation.md',
    blurb: 'GPT, Claude, Gemini, Llama, DeepSeek — a selection framework, not a hype ranking.',
    topics: ['Open vs closed', 'Selection axes', 'Governance'],
  },
  {
    slug: 'module-8-applications', navLabel: 'Applications', title: 'Applications of Generative AI',
    number: '08', durationMin: 60, kind: 'module', file: 'module-8-applications.md',
    blurb: 'Responsible, concrete workflows for Teaching, Research, Consultancy and Industry.',
    topics: ['C.R.A.F.T. prompts', '4 domains', 'Verify & disclose'],
  },
  {
    slug: 'overview', navLabel: 'Day 1 Overview', title: 'Day 1 — From Deep Learning to LLMs',
    durationMin: 360, kind: 'overview', file: '00-overview.md',
    blurb: 'The framing, objectives, and narrative arc for the whole day.',
    topics: ['Objectives', 'Narrative arc', 'How to read'],
  },
  {
    slug: 'hands-on-activities', navLabel: 'Hands-On Activities', title: 'Hands-On Activities',
    durationMin: 0, kind: 'doc', file: 'hands-on-activities.md',
    blurb: 'Eight executable, progressively-building activities — one per module plus a capstone.',
    topics: ['8 activities', 'Pairs & solo', 'Time-boxed'],
  },
  {
    slug: 'live-demos', navLabel: 'Live Demonstrations', title: 'Live Demonstrations',
    durationMin: 0, kind: 'doc', file: 'live-demos.md',
    blurb: 'Nine facilitator demos across ChatGPT, Claude and Gemini, with prompts and outcomes.',
    topics: ['9 demos', 'Prompts included', 'Verify beats'],
  },
  {
    slug: 'assignment', navLabel: 'End-of-Day Assignment', title: 'End-of-Day 1 Assignment',
    durationMin: 0, kind: 'doc', file: 'assignment.md',
    blurb: 'Multi-model paper analysis with a 100-point rubric and explicit learning outcomes.',
    topics: ['Multi-model', 'Hallucination hunt', 'Rubric'],
  },
];

export const MODULES: ModuleMeta[] = DEFS.map((d) => ({
  slug: d.slug,
  navLabel: d.navLabel,
  title: d.title,
  number: d.number,
  blurb: d.blurb,
  topics: d.topics,
  durationMin: d.durationMin,
  kind: d.kind,
  markdown: md(d.file),
  playground: d.playground,
}));

export const CORE_MODULES = MODULES.filter((m) => m.kind === 'module');
export const RESOURCE_DOCS = MODULES.filter((m) => m.kind === 'doc');
export const OVERVIEW = MODULES.find((m) => m.kind === 'overview')!;

export function getModule(slug: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.slug === slug);
}
