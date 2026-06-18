import type { ModuleMeta, ModuleKind, PlaygroundKey, DayMeta } from '../content-types';

// Eagerly import every day's markdown file as a raw string.
const files = import.meta.glob('../../content/day*/*.md', {
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
  day: number;
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
    slug: 'module-1-evolution', day: 1, navLabel: 'Evolution of AI', title: 'The Evolution of AI',
    number: '01', durationMin: 40, kind: 'module', file: 'module-1-evolution.md', playground: 'evolution-timeline',
    blurb: 'How AI, ML, Deep Learning and Generative AI nest — and why deep learning finally won.',
    topics: ['AI vs ML vs DL', 'Data · GPUs · Architectures', 'Generative AI'],
  },
  {
    slug: 'module-2-transformers', day: 1, navLabel: 'To Transformers', title: 'From Deep Learning to Transformers',
    number: '02', durationMin: 45, kind: 'module', file: 'module-2-transformers.md', playground: 'rnn-memory',
    blurb: 'Why CNNs, RNNs and LSTMs hit a wall — and the 2017 paper that changed everything.',
    topics: ['CNN · RNN · LSTM', 'Long-range memory', 'Attention Is All You Need'],
  },
  {
    slug: 'module-3-attention', day: 1, navLabel: 'Attention', title: 'The Attention Mechanism',
    number: '03', durationMin: 55, kind: 'module', file: 'module-3-attention.md', playground: 'self-attention',
    blurb: 'The engine of every LLM, taught with intuition first — Query, Key, Value, no equations.',
    topics: ['Self-attention', 'Query · Key · Value', 'Multi-head'],
  },
  {
    slug: 'module-4-tokenization', day: 1, navLabel: 'Tokenization', title: 'Tokenization',
    number: '04', durationMin: 40, kind: 'module', file: 'module-4-tokenization.md', playground: 'tokenizer',
    blurb: 'What the model actually reads — tokens, limits, cost, and the context window.',
    topics: ['Sub-word tokens', 'Context window', 'Cost & limits'],
  },
  {
    slug: 'module-5-embeddings', day: 1, navLabel: 'Embeddings', title: 'Embeddings & Vector Representations',
    number: '05', durationMin: 45, kind: 'module', file: 'module-5-embeddings.md', playground: 'embedding',
    blurb: 'Where language becomes geometry — meaning as distance, and similarity search.',
    topics: ['Vector space', 'King − Man + Woman', 'Similarity / RAG'],
  },
  {
    slug: 'module-6-how-llms-work', day: 1, navLabel: 'How LLMs Work', title: 'How Large Language Models Work',
    number: '06', durationMin: 55, kind: 'module', file: 'module-6-how-llms-work.md', playground: 'llm-pipeline',
    blurb: 'The full pipeline, prompt to response — autoregression, probabilities, temperature.',
    topics: ['Next-token prediction', 'Temperature', 'Hallucination'],
  },
  {
    slug: 'module-7-foundation', day: 1, navLabel: 'Foundation Models', title: 'Foundation Models',
    number: '07', durationMin: 40, kind: 'module', file: 'module-7-foundation.md',
    blurb: 'GPT, Claude, Gemini, Llama, DeepSeek — a selection framework, not a hype ranking.',
    topics: ['Open vs closed', 'Selection axes', 'Governance'],
  },
  {
    slug: 'module-8-applications', day: 1, navLabel: 'Applications', title: 'Applications of Generative AI',
    number: '08', durationMin: 60, kind: 'module', file: 'module-8-applications.md',
    blurb: 'Responsible, concrete workflows for Teaching, Research, Consultancy and Industry.',
    topics: ['C.R.A.F.T. prompts', '4 domains', 'Verify & disclose'],
  },
  {
    slug: 'day2-module-1-prompting', day: 2, navLabel: 'Prompting', title: 'Prompting Techniques',
    number: '01', durationMin: 50, kind: 'module', file: 'day2-module-1-prompting.md', playground: 'prompt-explorer',
    blurb: 'Same model, better answers — zero-shot, few-shot, chain-of-thought, roles, structure.',
    topics: ['Few-shot', 'Chain-of-thought', 'Role & structure'],
  },
  {
    slug: 'day2-module-2-vibe-coding', day: 2, navLabel: 'Vibe Coding', title: 'Vibe Coding',
    number: '02', durationMin: 45, kind: 'module', file: 'day2-module-2-vibe-coding.md', playground: 'vibe-coding',
    blurb: 'Building software by describing it — the loop, the tools, the pros, the cons, the limits.',
    topics: ['The loop', 'Tools', 'When it works'],
  },
  {
    slug: 'day2-module-3-rag', day: 2, navLabel: 'RAG', title: 'Retrieval-Augmented Generation',
    number: '03', durationMin: 50, kind: 'module', file: 'day2-module-3-rag.md', playground: 'rag-pipeline',
    blurb: 'Ground the model in your own documents — retrieve, augment, generate, cite.',
    topics: ['Grounding', 'The pipeline', 'Citations'],
  },
  {
    slug: 'day2-module-4-vector-db', day: 2, navLabel: 'Vector Databases', title: 'Vector Databases',
    number: '04', durationMin: 45, kind: 'module', file: 'day2-module-4-vector-db.md', playground: 'vector-search',
    blurb: 'The searchable memory behind RAG — similarity, nearest-neighbour search, and the tools.',
    topics: ['Similarity search', 'ANN / HNSW', 'Pinecone · pgvector'],
  },
  {
    slug: 'day4-module-1-lora', day: 4, navLabel: 'LoRA Fine-Tuning', title: 'Fine-Tuning with LoRA',
    number: '01', durationMin: 55, kind: 'module', file: 'day4-module-1-lora.md', playground: 'lora-explorer',
    blurb: 'Teach a model new knowledge by training a tiny adapter — not the whole 1.1B-parameter model.',
    topics: ['Frozen weights', 'ΔW = A·B', 'Adapters · rank'],
  },
  {
    slug: 'overview', day: 1, navLabel: 'Day 1 Overview', title: 'Day 1 — From Deep Learning to LLMs',
    durationMin: 360, kind: 'overview', file: '00-overview.md',
    blurb: 'The framing, objectives, and narrative arc for the whole day.',
    topics: ['Objectives', 'Narrative arc', 'How to read'],
  },
  {
    slug: 'hands-on-activities', day: 1, navLabel: 'Hands-On Activities', title: 'Hands-On Activities',
    durationMin: 0, kind: 'doc', file: 'hands-on-activities.md',
    blurb: 'Eight executable, progressively-building activities — one per module plus a capstone.',
    topics: ['8 activities', 'Pairs & solo', 'Time-boxed'],
  },
  {
    slug: 'live-demos', day: 1, navLabel: 'Live Demonstrations', title: 'Live Demonstrations',
    durationMin: 0, kind: 'doc', file: 'live-demos.md',
    blurb: 'Nine facilitator demos across ChatGPT, Claude and Gemini, with prompts and outcomes.',
    topics: ['9 demos', 'Prompts included', 'Verify beats'],
  },
  {
    slug: 'assignment', day: 1, navLabel: 'End-of-Day Assignment', title: 'End-of-Day 1 Assignment',
    durationMin: 0, kind: 'doc', file: 'assignment.md',
    blurb: 'Multi-model paper analysis with a 100-point rubric and explicit learning outcomes.',
    topics: ['Multi-model', 'Hallucination hunt', 'Rubric'],
  },
];

export const MODULES: ModuleMeta[] = DEFS.map((d) => ({
  slug: d.slug,
  day: d.day,
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

export const DAYS: DayMeta[] = [
  { day: 1, title: 'From Deep Learning to LLMs', subtitle: 'Foundations of Generative AI', status: 'live' },
  { day: 2, title: 'Prompting, Vibe Coding & RAG', subtitle: 'Getting real work done with LLMs', status: 'live' },
  { day: 3, title: 'Agents & Building with LLMs', subtitle: 'From chat to autonomous workflows', status: 'coming-soon' },
  { day: 4, title: 'Fine-Tuning & Customizing LLMs', subtitle: 'Teaching a model your own knowledge — LoRA & QLoRA', status: 'live' },
];

export const CORE_MODULES = MODULES.filter((m) => m.kind === 'module');
export const RESOURCE_DOCS = MODULES.filter((m) => m.kind === 'doc');
export const OVERVIEW = MODULES.find((m) => m.kind === 'overview')!;

export const modulesForDay = (day: number) => CORE_MODULES.filter((m) => m.day === day);
export const docsForDay = (day: number) => RESOURCE_DOCS.filter((m) => m.day === day);
export const overviewForDay = (day: number) => MODULES.find((m) => m.kind === 'overview' && m.day === day);

export function getModule(slug: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.slug === slug);
}

/** Flat searchable index of everything navigable. */
export interface SearchEntry { slug: string; label: string; sub: string; day: number; keywords: string; }
export const SEARCH_INDEX: SearchEntry[] = MODULES.map((m) => ({
  slug: m.slug,
  label: m.title,
  sub: m.number ? `Day ${m.day} · Module ${m.number}` : `Day ${m.day}`,
  day: m.day,
  keywords: `${m.title} ${m.navLabel} ${m.blurb} ${m.topics.join(' ')}`.toLowerCase(),
}));
