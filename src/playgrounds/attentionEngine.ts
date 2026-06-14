// Real self-attention, computed in the browser — no backend.
//
// We load a genuine pretrained transformer (all-MiniLM-L6-v2, a 6-layer / 12-head
// BERT encoder) exported with `output_attentions: true`, run it on the user's
// sentence, and read the real attention tensors. The model weights download once
// from the Hugging Face CDN (~91 MB) and are then cached by the browser; ONNX
// Runtime's WASM backend executes the forward pass locally.

// Types only — erased at build time, so they add no weight to the bundle. The
// ~1.5 MB library + 21 MB WASM runtime are pulled in via dynamic import() inside
// loadModel(), so a visitor only downloads them if they actually open this lab.
import type { PreTrainedTokenizer, PreTrainedModel } from '@huggingface/transformers';

const MODEL_ID = 'bradynapier/all_miniLM_L6_v2_with_attentions_onnx';

export interface AttentionResult {
  /** Display tokens, including the [CLS]/[SEP] markers BERT adds. */
  tokens: string[];
  /** True for [CLS]/[SEP] so the UI can de-emphasise them. */
  special: boolean[];
  layers: number;
  heads: number;
  /** attn[layer][head][query][key] — the real post-softmax weights, each row sums to 1. */
  attn: number[][][][];
}

let tokenizer: PreTrainedTokenizer | null = null;
let model: PreTrainedModel | null = null;
let loading: Promise<void> | null = null;

export function isReady(): boolean {
  return !!tokenizer && !!model;
}

export interface LoadProgress {
  file: string;
  loaded: number;
  total: number;
  /** 0–1 across the whole download, best-effort. */
  fraction: number;
}

/** Load the model once. Safe to call repeatedly; subsequent calls await the first. */
export function loadModel(onProgress?: (p: LoadProgress) => void): Promise<void> {
  if (isReady()) return Promise.resolve();
  if (loading) return loading;

  // Track per-file byte counts so we can report a single overall fraction.
  const files: Record<string, { loaded: number; total: number }> = {};
  const progress_callback = (data: any) => {
    if (data?.status === 'progress' && data.file) {
      files[data.file] = { loaded: data.loaded ?? 0, total: data.total ?? 0 };
      let loaded = 0;
      let total = 0;
      for (const f of Object.values(files)) {
        loaded += f.loaded;
        total += f.total;
      }
      onProgress?.({
        file: data.file,
        loaded,
        total,
        fraction: total > 0 ? Math.min(1, loaded / total) : 0,
      });
    }
  };

  loading = (async () => {
    const { AutoTokenizer, AutoModel, env } = await import('@huggingface/transformers');
    env.allowLocalModels = false; // always fetch from the hub; we ship no local copy
    tokenizer = await AutoTokenizer.from_pretrained(MODEL_ID, { progress_callback });
    model = await AutoModel.from_pretrained(MODEL_ID, {
      progress_callback,
      dtype: 'fp32',
    });
  })();

  loading.catch(() => {
    // Allow a later retry if the download failed.
    loading = null;
  });
  return loading;
}

/** Run the model on a sentence and return its real attention weights. */
export async function runAttention(text: string): Promise<AttentionResult> {
  if (!tokenizer || !model) throw new Error('Model not loaded');

  const inputs = await tokenizer(text);
  const output: any = await model(inputs);
  let attentions = output.attentions as any[]; // one tensor per layer
  if (!attentions?.length) {
    // Some ONNX exports name each layer separately (e.g. attentions.0, attn_0).
    const keys = Object.keys(output)
      .filter((k) => /attention|attn/i.test(k) && output[k]?.dims)
      .sort();
    if (keys.length) attentions = keys.map((k) => output[k]);
  }
  if (!attentions?.length) {
    throw new Error(
      'This model build did not return attention tensors. Output keys: ' + Object.keys(output).join(', '),
    );
  }

  // Token strings, aligned with the attention matrix (special tokens included).
  const ids: number[] = Array.from(inputs.input_ids.data as ArrayLike<number>, (x) => Number(x));
  const tokens = ids.map((id) => tokenizer!.decode([id], { skip_special_tokens: false }).trim());
  const special = tokens.map((t) => /^\[(CLS|SEP|PAD|UNK|MASK)\]$/.test(t));

  const layers = attentions.length;
  // dims: [batch=1, heads, seq, seq]
  const [, heads, seq] = attentions[0].dims as number[];

  const attn: number[][][][] = [];
  for (let l = 0; l < layers; l++) {
    const data = attentions[l].data as Float32Array;
    const layerArr: number[][][] = [];
    for (let h = 0; h < heads; h++) {
      const headArr: number[][] = [];
      for (let q = 0; q < seq; q++) {
        const row: number[] = [];
        const base = h * seq * seq + q * seq;
        for (let k = 0; k < seq; k++) row.push(data[base + k]);
        headArr.push(row);
      }
      layerArr.push(headArr);
    }
    attn.push(layerArr);
  }

  return { tokens, special, layers, heads, attn };
}
