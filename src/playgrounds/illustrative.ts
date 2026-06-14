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
// Traits that can only sensibly describe a living thing…
const ANIMATE_TRAITS = new Set([
  'tired', 'hungry', 'thirsty', 'scared', 'frightened', 'happy', 'sad', 'angry', 'mad', 'exhausted',
  'sleepy', 'asleep', 'awake', 'sick', 'ill', 'afraid', 'excited', 'nervous', 'anxious', 'bored',
  'smart', 'intelligent', 'kind', 'cruel', 'clever', 'curious', 'proud', 'lonely', 'lazy', 'busy',
  'brave', 'shy', 'friendly', 'jealous', 'confused', 'worried', 'upset', 'cheerful', 'grumpy',
  'polite', 'rude', 'gentle', 'patient', 'stubborn', 'honest', 'generous', 'selfish', 'hurt',
  'injured', 'dead', 'alive', 'pregnant', 'drunk', 'old', 'young', 'strong', 'weak', 'fast', 'slow',
]);
// …vs. traits that point at an inanimate object or place.
const OBJECT_TRAITS = new Set([
  'narrow', 'wide', 'long', 'short', 'big', 'small', 'large', 'tiny', 'empty', 'full', 'deep',
  'shallow', 'tall', 'heavy', 'light', 'expensive', 'cheap', 'steep', 'crowded', 'wet', 'dry',
  'broken', 'open', 'closed', 'shut', 'flat', 'round', 'square', 'sharp', 'blunt', 'smooth', 'rough',
  'hard', 'soft', 'hot', 'cold', 'warm', 'cool', 'new', 'fragile', 'sturdy', 'solid', 'hollow',
  'clean', 'dirty', 'bright', 'dark', 'loud', 'quiet', 'red', 'blue', 'green', 'rusty', 'shiny',
]);

/**
 * Illustrative self-attention weights for a list of tokens.
 * Base signal = cosine of pseudo-embeddings. Pronouns get a coreference boost
 * toward earlier *nouns*, and — crucially — toward the noun whose type
 * (animate vs object) matches the trait predicated after the pronoun, so the
 * classic "it = animal (tired)" vs "it = street (narrow)" flip works.
 * Returns an n×n row-stochastic matrix where row i = how much i attends to j.
 */
const isNoun = (wd: string) => ANIMATE_NOUNS.has(wd) || OBJECT_NOUNS.has(wd);
const CONTAIN_VERBS = new Set(['fit', 'fits', 'go', 'goes', 'squeeze', 'cram', 'pass']);
const BIG_TRAITS = new Set(['big', 'large', 'bigger', 'larger', 'huge', 'wide', 'tall', 'long', 'oversized']);
const SMALL_TRAITS = new Set(['small', 'little', 'smaller', 'tiny', 'narrow', 'short', 'cramped']);

/**
 * The trophy/suitcase Winograd schema turns on a containment relation, not on
 * animacy: "X didn't fit in Y because it was too big" → it = X (the thing being
 * placed); "…too small" → it = Y (the container). Both nouns are objects, so the
 * animate/object cue can't separate them — this returns the forced antecedent
 * index when that pattern is present, else null.
 */
function containmentAntecedent(tokens: string[], w: string[]): number | null {
  const verbIdx = tokens.findIndex((_, k) => CONTAIN_VERBS.has(w[k]));
  if (verbIdx < 0) return null;
  let subjectIdx = -1; // last noun before the verb (the thing being placed)
  for (let k = verbIdx - 1; k >= 0; k--) { if (isNoun(w[k])) { subjectIdx = k; break; } }
  let containerIdx = -1; // first noun after the verb (the container)
  for (let k = verbIdx + 1; k < tokens.length; k++) { if (isNoun(w[k])) { containerIdx = k; break; } }
  if (subjectIdx < 0 || containerIdx < 0) return null;
  // Only meaningful when both candidates are objects (animacy would otherwise decide).
  if (!OBJECT_NOUNS.has(w[subjectIdx]) || !OBJECT_NOUNS.has(w[containerIdx])) return null;
  const trait = w.find((wd) => BIG_TRAITS.has(wd) || SMALL_TRAITS.has(wd));
  if (!trait) return null;
  return BIG_TRAITS.has(trait) ? subjectIdx : containerIdx;
}

export function attentionMatrix(tokens: string[]): number[][] {
  const embs = tokens.map(embed);
  const w = tokens.map(word);
  const forced = containmentAntecedent(tokens, w);
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
        // Containment schema (trophy/suitcase) overrides the animacy cue.
        if (forced != null) { if (j === forced) s += 4.0; }
        else {
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
      }
      return s;
    });
    return softmax(scores);
  });
}
