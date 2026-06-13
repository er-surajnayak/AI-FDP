import type { PlaygroundKey } from '../content-types';
import SelfAttentionPlayground from './SelfAttentionPlayground';
import TokenizerPlayground from './TokenizerPlayground';
import TemperaturePlayground from './TemperaturePlayground';
import EmbeddingPlayground from './EmbeddingPlayground';

export const PLAYGROUNDS: Record<PlaygroundKey, () => JSX.Element> = {
  'self-attention': SelfAttentionPlayground,
  tokenizer: TokenizerPlayground,
  temperature: TemperaturePlayground,
  embedding: EmbeddingPlayground,
};
