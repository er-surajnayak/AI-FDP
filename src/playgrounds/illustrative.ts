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
