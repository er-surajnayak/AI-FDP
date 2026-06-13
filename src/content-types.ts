// Shared content contract (see content/design-system.md).

export interface QuizQuestion {
  id: string;
  kind: 'mcq' | 'conceptual' | 'scenario';
  prompt: string;
  options?: { id: string; label: string }[];
  answerId?: string;
  explanation: string;
}

export interface ModuleMeta {
  /** route slug, e.g. "module-1-evolution" */
  slug: string;
  /** short label for the side nav */
  navLabel: string;
  /** full title shown in the header */
  title: string;
  durationMin: number;
  /** raw markdown body, imported via the content loader */
  markdown: string;
  /** optional interactive playground key rendered alongside the notes */
  playground?: PlaygroundKey;
}

export type PlaygroundKey =
  | 'self-attention'
  | 'tokenizer'
  | 'temperature'
  | 'embedding';
