// Illustrative, deterministic helpers used by the offline playgrounds.
// IMPORTANT: these are teaching approximations, NOT live model inference.
// They are stable (no randomness) so demos are reproducible.

const DIM = 24;

/** Deterministic pseudo-embedding for a token (stable hash → unit vector). */
export function embed(token: string): number[] {
  const t = token.toLowerCase().replace(/[^a-z0-9]/g, '');
  const v = new Array(DIM).fill(0);
  for (let i = 0; i < t.length; i++) {
    const c = t.charCodeAt(i);
    // spread each character across dimensions with a couple of cheap mixers
    v[(c + i) % DIM] += Math.sin(c * 0.7 + i);
    v[(c * 3 + i * 5) % DIM] += Math.cos(c * 0.31 + i * 1.7);
  }
  const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map((x) => x / norm);
}

export function cosine(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot; // inputs are unit vectors
}

export function softmax(xs: number[], temperature = 1): number[] {
  const t = Math.max(temperature, 1e-6);
  const scaled = xs.map((x) => x / t);
  const max = Math.max(...scaled);
  const exps = scaled.map((x) => Math.exp(x - max));
  const sum = exps.reduce((s, x) => s + x, 0) || 1;
  return exps.map((x) => x / sum);
}

const PRONOUNS = new Set(['it', 'he', 'she', 'they', 'them', 'this', 'that', 'its', 'his', 'her', 'their']);
export const isPronoun = (w: string) => PRONOUNS.has(w.toLowerCase().replace(/[^a-z]/g, ''));

const word = (t: string) => t.toLowerCase().replace(/[^a-z]/g, '');

// Small lexicons so the coreference demo reflects the actual Winograd cue:
// a pronoun's antecedent depends on the trait predicated of it.
// "…it was too tired" → an animate thing; "…it was too narrow" → an object/place.
const ANIMATE_NOUNS = new Set(['animal', 'dog', 'cat', 'professor', 'student', 'man', 'woman', 'person', 'child', 'people', 'teacher', 'researcher', 'author', 'doctor', 'bird', 'horse', 'baby', 'boy', 'girl', 'scientist', 'engineer', 'player', 'driver', 'reader']);
const OBJECT_NOUNS = new Set(['street', 'road', 'table', 'door', 'box', 'room', 'car', 'house', 'building', 'bridge', 'wall', 'path', 'river', 'chair', 'book', 'phone', 'computer', 'window', 'bag', 'trophy', 'suitcase', 'cup', 'ball', 'sky', 'city']);
const ANIMATE_TRAITS = new Set(['tired', 'hungry', 'scared', 'happy', 'angry', 'exhausted', 'sleepy', 'sick', 'afraid', 'excited', 'nervous', 'bored', 'smart', 'kind', 'clever', 'curious', 'proud', 'sad', 'lonely']);
const OBJECT_TRAITS = new Set(['narrow', 'wide', 'long', 'short', 'big', 'small', 'empty', 'full', 'deep', 'tall', 'heavy', 'expensive', 'steep', 'crowded', 'wet', 'dry', 'broken', 'open', 'closed', 'flat']);

/**
 * Illustrative self-attention weights for a list of tokens.
 * Base signal = cosine of pseudo-embeddings. Pronouns get a coreference boost
 * toward earlier *nouns*, and — crucially — toward the noun whose type
 * (animate vs object) matches the trait predicated after the pronoun, so the
 * classic "it = animal (tired)" vs "it = street (narrow)" flip works.
 * Returns an n×n row-stochastic matrix where row i = how much i attends to j.
 */
export function attentionMatrix(tokens: string[]): number[][] {
  const embs = tokens.map(embed);
  const w = tokens.map(word);
  return tokens.map((tok, i) => {
    // For a pronoun, look ahead for the trait that disambiguates its antecedent.
    let prefer: 'animate' | 'object' | null = null;
    if (isPronoun(tok)) {
      for (let k = i + 1; k < tokens.length; k++) {
        if (ANIMATE_TRAITS.has(w[k])) { prefer = 'animate'; break; }
        if (OBJECT_TRAITS.has(w[k])) { prefer = 'object'; break; }
      }
    }
    const scores = tokens.map((_, j) => {
      let s = cosine(embs[i], embs[j]) * 3;
      if (i === j) s += 1.2; // mild self-attention
      if (isPronoun(tok) && j < i) {
        const animate = ANIMATE_NOUNS.has(w[j]);
        const object = OBJECT_NOUNS.has(w[j]);
        if (animate || object) {
          s += 0.8 + 0.5 * (1 - (i - j) / tokens.length); // attend to earlier nouns, mild proximity
          if (prefer === 'animate') s += animate ? 3.0 : -1.0; // match the predicated trait
          else if (prefer === 'object') s += object ? 3.0 : -1.0;
        } else {
          s += 0.4 * (1 - (i - j) / tokens.length); // weak fallback toward any earlier word
        }
      }
      return s;
    });
    return softmax(scores);
  });
}
