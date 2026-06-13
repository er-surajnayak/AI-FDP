// Shared content contract (see content/design-system.md).

export type PlaygroundKey =
  | 'self-attention'
  | 'tokenizer'
  | 'temperature'
  | 'embedding';

export type ModuleKind = 'overview' | 'module' | 'doc';

export interface ModuleMeta {
  /** route slug, e.g. "module-1-evolution" */
  slug: string;
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
  /** optional interactive playground key */
  playground?: PlaygroundKey;
}
