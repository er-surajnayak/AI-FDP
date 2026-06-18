import type { PlaygroundKey } from '../content-types';
import EvolutionTimeline from './EvolutionTimeline';
import RnnMemoryLab from './RnnMemoryLab';
import SelfAttentionLive from './SelfAttentionLive';
import TokenizerPlayground from './TokenizerPlayground';
import TemperaturePlayground from './TemperaturePlayground';
import LlmPipeline from './LlmPipeline';
import EmbeddingPlayground from './EmbeddingPlayground';
import PromptExplorer from './PromptExplorer';
import VibeCoding from './VibeCoding';
import RagPipeline from './RagPipeline';
import VectorSearch from './VectorSearch';
import LoraExplorer from './LoraExplorer';
import EvalMetrics from './EvalMetrics';

export const PLAYGROUNDS: Record<PlaygroundKey, () => JSX.Element> = {
  'evolution-timeline': EvolutionTimeline,
  'rnn-memory': RnnMemoryLab,
  'self-attention': SelfAttentionLive,
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
  'prompt-explorer': PromptExplorer,
  'vibe-coding': VibeCoding,
  'rag-pipeline': RagPipeline,
  'vector-search': VectorSearch,
  'lora-explorer': LoraExplorer,
  'eval-metrics': EvalMetrics,
};
