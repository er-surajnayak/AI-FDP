import type { PlaygroundKey } from '../content-types';
import EvolutionTimeline from './EvolutionTimeline';
import RnnMemoryLab from './RnnMemoryLab';
import SelfAttentionPlayground from './SelfAttentionPlayground';
import TokenizerPlayground from './TokenizerPlayground';
import TemperaturePlayground from './TemperaturePlayground';
import LlmPipeline from './LlmPipeline';
import EmbeddingPlayground from './EmbeddingPlayground';

export const PLAYGROUNDS: Record<PlaygroundKey, () => JSX.Element> = {
  'evolution-timeline': EvolutionTimeline,
  'rnn-memory': RnnMemoryLab,
  'self-attention': SelfAttentionPlayground,
  tokenizer: TokenizerPlayground,
  temperature: TemperaturePlayground,
  // Module 6 shows the full pipeline animation followed by the temperature sim.
  'llm-pipeline': () => (
    <>
      <LlmPipeline />
      <TemperaturePlayground />
    </>
  ),
  embedding: EmbeddingPlayground,
};
