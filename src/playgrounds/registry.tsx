import type { PlaygroundKey } from '../content-types';
import EvolutionTimeline from './EvolutionTimeline';
import RnnMemoryLab from './RnnMemoryLab';
import SelfAttentionPlayground from './SelfAttentionPlayground';
import TokenizerPlayground from './TokenizerPlayground';
import TemperaturePlayground from './TemperaturePlayground';
import EmbeddingPlayground from './EmbeddingPlayground';

export const PLAYGROUNDS: Record<PlaygroundKey, () => JSX.Element> = {
  'evolution-timeline': EvolutionTimeline,
  'rnn-memory': RnnMemoryLab,
  'self-attention': SelfAttentionPlayground,
  tokenizer: TokenizerPlayground,
  temperature: TemperaturePlayground,
  embedding: EmbeddingPlayground,
};
