// Shared content contract (see content/design-system.md).

export type PlaygroundKey =
  | 'evolution-timeline'
  | 'rnn-memory'
  | 'self-attention'
  | 'tokenizer'
  | 'temperature'
  | 'llm-pipeline'
  | 'embedding';

export type ModuleKind = 'overview' | 'module' | 'doc';

export interface ModuleMeta {
  /** route slug, e.g. "module-1-evolution" */
  slug: string;
  /** which day this belongs to */
  day: number;
  /** short label for the side nav */
  navLabel: string;
  /** full title shown in the header */
  title: string;
  /** display number for module cards (e.g. "01"); undefined for docs */
  number?: string;
  /** one-line description for the card grid */
  blurb: string;
  /** key topic chips for the card grid */
  topics: string[];
  durationMin: number;
  kind: ModuleKind;
  /** raw markdown body, imported via the content loader */
  markdown: string;
  /** optional interactive lab(s) rendered inline */
  playground?: PlaygroundKey;
}

export interface DayMeta {
  day: number;
  title: string;
  subtitle: string;
  status: 'live' | 'coming-soon';
}
