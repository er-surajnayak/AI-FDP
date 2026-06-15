// Day-1 deck — IBM Carbon design language, alternating dark / light themes.
// Pure native pptxgenjs shapes (no images) so everything stays editable.
const pptxgen = require('pptxgenjs');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10 x 5.625 in
pres.author = 'Generative AI FDP';
pres.title = 'Day 1 — From Deep Learning to LLMs';

const SANS = 'IBM Plex Sans';
const MONO = 'IBM Plex Mono';
const SERIF = 'IBM Plex Serif';

// Carbon Gray-100 (dark) and White (light) token sets.
const DARK = {
  bg: '161616', layer: '262626', layer2: '393939', border: '393939',
  text: 'F4F4F4', sub: 'C6C6C6', helper: '8D8D8D', dark: true,
};
const LIGHT = {
  bg: 'FFFFFF', layer: 'F4F4F4', layer2: 'E0E0E0', border: 'E0E0E0',
  text: '161616', sub: '525252', helper: '6F6F6F', dark: false,
};

const W = 10, H = 5.625, MX = 0.6;

// ── chrome shared by every slide ───────────────────────────────────────────
function base(t, accent, { kicker, title, n, total = 11 } = {}) {
  const s = pres.addSlide();
  s.background = { color: t.bg };
  if (kicker !== undefined) {
    // Carbon accent "tick" before the kicker
    s.addShape(pres.shapes.RECTANGLE, { x: MX, y: 0.52, w: 0.16, h: 0.16, fill: { color: accent } });
    s.addText(kicker, { x: MX + 0.28, y: 0.4, w: 8, h: 0.4, fontFace: MONO, fontSize: 11, color: t.helper, charSpacing: 2, valign: 'middle' });
  }
  if (title !== undefined) {
    s.addText(title, { x: MX, y: 0.78, w: 8.8, h: 0.9, fontFace: SANS, fontSize: 30, bold: true, color: t.text, margin: 0 });
  }
  // footer
  s.addText('Generative AI · Faculty Development Program', { x: MX, y: H - 0.42, w: 6, h: 0.3, fontFace: MONO, fontSize: 8.5, color: t.helper, valign: 'middle', margin: 0 });
  if (n) s.addText(`Day 1   ·   ${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`, { x: W - 3.0 - MX, y: H - 0.42, w: 3.0, h: 0.3, fontFace: MONO, fontSize: 8.5, color: t.helper, align: 'right', valign: 'middle', margin: 0 });
  return s;
}

// left-column key points (icon-free, Carbon list with thin leading rule)
function points(s, t, accent, items, { x = MX, y = 1.82, w = 4.2, gap = 0.84 } = {}) {
  items.forEach((it, i) => {
    const yy = y + i * gap;
    s.addShape(pres.shapes.RECTANGLE, { x, y: yy + 0.03, w: 0.04, h: 0.46, fill: { color: accent } });
    s.addText(it.h, { x: x + 0.24, y: yy, w: w - 0.24, h: 0.32, fontFace: SANS, fontSize: 14, bold: true, color: t.text, margin: 0, valign: 'middle' });
    s.addText(it.d, { x: x + 0.24, y: yy + 0.32, w: w - 0.24, h: 0.46, fontFace: SANS, fontSize: 10.5, color: t.sub, margin: 0, valign: 'top', lineSpacingMultiple: 1.0 });
  });
}

// a framed panel for the right-hand visual
function panel(s, t, { x = 5.2, y = 1.6, w = 4.2, h = 3.4 } = {}) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: t.layer }, line: { color: t.border, width: 1 } });
  return { x, y, w, h };
}

// ════════════════════════════════════════════════════════════════════════
// 1 · TITLE (dark)
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = DARK, accent = '0F62FE';
  const s = base(t, accent, {});
  s.addShape(pres.shapes.RECTANGLE, { x: MX, y: 1.5, w: 0.5, h: 0.5, fill: { color: accent } });
  s.addText('GENERATIVE AI · FACULTY DEVELOPMENT PROGRAM', { x: MX, y: 2.15, w: 9, h: 0.4, fontFace: MONO, fontSize: 12, color: t.sub, charSpacing: 2, margin: 0 });
  s.addText('From Deep Learning to\nLarge Language Models', { x: MX, y: 2.55, w: 9, h: 1.5, fontFace: SERIF, fontSize: 40, bold: true, color: t.text, margin: 0, lineSpacingMultiple: 1.02 });
  s.addText([
    { text: 'Day 1', options: { color: 'F4F4F4', bold: true } },
    { text: '   —   Foundations of Generative AI', options: { color: t.sub } },
  ], { x: MX, y: 4.25, w: 9, h: 0.4, fontFace: SANS, fontSize: 16, margin: 0 });
  // Carbon 2x2 dot motif, top-right
  const dot = (cx, cy, c) => s.addShape(pres.shapes.OVAL, { x: cx, y: cy, w: 0.22, h: 0.22, fill: { color: c } });
  dot(8.7, 0.55, '4589FF'); dot(9.05, 0.55, '08BDBA'); dot(8.7, 0.9, '8A3FFC'); dot(9.05, 0.9, 'EE5396');
})();

// ════════════════════════════════════════════════════════════════════════
// 2 · AGENDA (light)
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = LIGHT, accent = '0F62FE';
  const s = base(t, accent, { kicker: 'DAY 1 · AGENDA', title: 'Eight modules, one thread', n: 2 });
  const mods = [
    ['01', 'The Evolution of AI', 'AI ⊃ ML ⊃ DL ⊃ GenAI', '4589FF'],
    ['02', 'To Transformers', 'Why recurrence hit a wall', '1192E8'],
    ['03', 'The Attention Mechanism', 'Query · Key · Value', '8A3FFC'],
    ['04', 'Tokenization', 'What the model reads', '009D9A'],
    ['05', 'Embeddings', 'Meaning as geometry', 'EE5396'],
    ['06', 'How LLMs Work', 'Next-token prediction', '24A148'],
    ['07', 'Foundation Models', 'Choosing by constraint', 'FF832B'],
    ['08', 'Applications', 'C.R.A.F.T. & responsible use', '0F62FE'],
  ];
  const colW = 4.35, rowH = 0.78, x0 = MX, y0 = 1.85;
  mods.forEach((m, i) => {
    const col = Math.floor(i / 4), row = i % 4;
    const x = x0 + col * (colW + 0.3), y = y0 + row * rowH;
    s.addText(m[0], { x, y, w: 0.7, h: rowH - 0.12, fontFace: MONO, fontSize: 19, bold: true, color: m[3], valign: 'middle', margin: 0 });
    s.addText(m[1], { x: x + 0.72, y: y + 0.04, w: colW - 0.8, h: 0.34, fontFace: SANS, fontSize: 14, bold: true, color: t.text, valign: 'middle', margin: 0 });
    s.addText(m[2], { x: x + 0.72, y: y + 0.36, w: colW - 0.8, h: 0.3, fontFace: SANS, fontSize: 10.5, color: t.sub, valign: 'middle', margin: 0 });
  });
})();

// ════════════════════════════════════════════════════════════════════════
// 3 · M1 EVOLUTION (dark) — nesting visual
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = DARK, accent = '4589FF';
  const s = base(t, accent, { kicker: '01 · THE EVOLUTION OF AI', title: 'Each field nests inside the last', n: 3 });
  points(s, t, accent, [
    { h: 'AI is the broad goal', d: 'Any machine that mimics intelligent behaviour — rules included.' },
    { h: 'Machine learning inverts it', d: 'Give data + answers; the model infers the rules itself.' },
    { h: 'Deep learning learns features', d: 'Neural nets find their own features from raw pixels, audio, text.' },
    { h: 'Generative AI creates', d: 'A specialised corner of deep learning — not a rival to it.' },
  ]);
  const p = panel(s, t);
  // concentric rectangles
  const rings = [
    ['Artificial Intelligence', '4589FF'],
    ['Machine Learning', '08BDBA'],
    ['Deep Learning', '8A3FFC'],
    ['Generative AI', 'EE5396'],
  ];
  rings.forEach((r, i) => {
    const inset = i * 0.42, ih = i * 0.36;
    const x = p.x + 0.25 + inset, y = p.y + 0.28 + ih;
    const w = p.w - 0.5 - inset * 2, h = p.h - 0.56 - ih * 2;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { type: 'none' }, line: { color: r[1], width: 1.25 } });
    s.addText(r[0], { x: x, y: y + 0.05, w, h: 0.26, fontFace: SANS, fontSize: i === 3 ? 11 : 10.5, bold: true, color: r[1], align: 'center', valign: 'middle', margin: 0 });
  });
})();

// ════════════════════════════════════════════════════════════════════════
// 4 · M2 TRANSFORMERS (light) — sequential vs parallel
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = LIGHT, accent = '1192E8';
  const s = base(t, accent, { kicker: '02 · FROM DEEP LEARNING TO TRANSFORMERS', title: 'Recurrence hit a wall', n: 4 });
  points(s, t, accent, [
    { h: 'RNNs read one step at a time', d: 'Meaning is passed hand-to-hand, so early words fade by the end.' },
    { h: 'Long-range dependencies break', d: 'Distance is the enemy of a fading memory.' },
    { h: '“Attention Is All You Need”, 2017', d: 'Remove recurrence; link every word to every word at once.' },
    { h: 'Parallel + no fading', d: 'The whole sequence processes together, scaling on GPUs.' },
  ]);
  const p = panel(s, t);
  const toks = ['The', 'cat', 'sat', 'on', 'mat'];
  const bw = 0.58, bh = 0.34, gap = 0.16;
  const totalW = toks.length * bw + (toks.length - 1) * gap;
  const sx = p.x + (p.w - totalW) / 2;
  // RNN row
  s.addText('RNN — one step at a time', { x: p.x + 0.2, y: p.y + 0.18, w: p.w - 0.4, h: 0.24, fontFace: MONO, fontSize: 9.5, color: t.sub, margin: 0 });
  const ry = p.y + 0.55;
  toks.forEach((tk, i) => {
    const x = sx + i * (bw + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: ry, w: bw, h: bh, fill: { color: t.bg }, line: { color: t.layer2, width: 1 } });
    s.addText(tk, { x, y: ry, w: bw, h: bh, fontFace: MONO, fontSize: 9, color: t.text, align: 'center', valign: 'middle', margin: 0 });
    if (i < toks.length - 1) s.addShape(pres.shapes.LINE, { x: x + bw, y: ry + bh / 2, w: gap, h: 0, line: { color: 'FF832B', width: 1.5, endArrowType: 'triangle' } });
  });
  // Attention row
  s.addText('Self-attention — all at once', { x: p.x + 0.2, y: p.y + 1.55, w: p.w - 0.4, h: 0.24, fontFace: MONO, fontSize: 9.5, color: t.sub, margin: 0 });
  const ay = p.y + 2.5;
  // all-to-all links
  for (let i = 0; i < toks.length; i++)
    for (let j = i + 1; j < toks.length; j++) {
      const xi = sx + i * (bw + gap) + bw / 2, xj = sx + j * (bw + gap) + bw / 2;
      s.addShape(pres.shapes.LINE, { x: xi, y: ay, w: xj - xi, h: -(0.12 + (j - i) * 0.12), line: { color: accent, width: 0.75, transparency: 35 } });
    }
  toks.forEach((tk, i) => {
    const x = sx + i * (bw + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: ay, w: bw, h: bh, fill: { color: t.bg }, line: { color: accent, width: 1 } });
    s.addText(tk, { x, y: ay, w: bw, h: bh, fontFace: MONO, fontSize: 9, color: t.text, align: 'center', valign: 'middle', margin: 0 });
  });
})();

// ════════════════════════════════════════════════════════════════════════
// 5 · M3 ATTENTION (dark) — Q/K/V cards
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = DARK, accent = '8A3FFC';
  const s = base(t, accent, { kicker: '03 · THE ATTENTION MECHANISM', title: 'A search every word runs', n: 5 });
  points(s, t, accent, [
    { h: 'Self-attention', d: 'Every token weighs every other token in the same sequence.' },
    { h: 'Relevance, not proximity', d: '“It” links to “animal” by meaning, not by distance.' },
    { h: 'Multi-head', d: 'Many relationship types — grammar, coreference — captured in parallel.' },
    { h: 'The engine of every LLM', d: 'This single idea is what makes Transformers work.' },
  ]);
  const p = panel(s, t);
  const cards = [
    ['Q', 'Query', 'The question a word asks', '4589FF'],
    ['K', 'Key', 'The label advertising what a word is about', '08BDBA'],
    ['V', 'Value', 'The content blended in by relevance', 'EE5396'],
  ];
  const ch = 0.92, cgap = 0.16, cy0 = p.y + 0.22;
  cards.forEach((c, i) => {
    const y = cy0 + i * (ch + cgap);
    s.addShape(pres.shapes.RECTANGLE, { x: p.x + 0.22, y, w: p.w - 0.44, h: ch, fill: { color: t.layer2 } });
    s.addShape(pres.shapes.RECTANGLE, { x: p.x + 0.22, y, w: 0.06, h: ch, fill: { color: c[3] } });
    s.addText(c[0], { x: p.x + 0.36, y, w: 0.7, h: ch, fontFace: MONO, fontSize: 26, bold: true, color: c[3], align: 'center', valign: 'middle', margin: 0 });
    s.addText(c[1], { x: p.x + 1.1, y: y + 0.14, w: p.w - 1.4, h: 0.34, fontFace: SANS, fontSize: 14, bold: true, color: t.text, valign: 'middle', margin: 0 });
    s.addText(c[2], { x: p.x + 1.1, y: y + 0.44, w: p.w - 1.4, h: 0.42, fontFace: SANS, fontSize: 10, color: t.sub, valign: 'top', margin: 0 });
  });
})();

// ════════════════════════════════════════════════════════════════════════
// 6 · M4 TOKENIZATION (light) — chips + context meter
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = LIGHT, accent = '009D9A';
  const s = base(t, accent, { kicker: '04 · TOKENIZATION', title: 'What the model actually reads', n: 6 });
  points(s, t, accent, [
    { h: 'Tokens ≠ words', d: '~100 tokens ≈ 75 English words; code and other scripts skew high.' },
    { h: 'One shared budget', d: 'System prompt + input + history + reply all live in the context window.' },
    { h: 'Eviction is silent', d: 'Past the window, the oldest turns drop — the model “forgets”.' },
    { h: 'Tokens are a cost line', d: 'Every token in and out is billed — length is a budget decision.' },
  ]);
  const p = panel(s, t);
  s.addText('“Tokenization”  →  4 tokens', { x: p.x + 0.22, y: p.y + 0.2, w: p.w - 0.44, h: 0.26, fontFace: MONO, fontSize: 10, color: t.sub, margin: 0 });
  const chips = ['Token', 'iz', 'ation', '!'];
  let cx = p.x + 0.22; const cyr = p.y + 0.55;
  chips.forEach((c, i) => {
    const cw = 0.32 + c.length * 0.135;
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cyr, w: cw, h: 0.4, fill: { color: i % 2 ? 'D9F2F1' : 'B3E5E3' }, line: { color: accent, width: 1 } });
    s.addText(c, { x: cx, y: cyr, w: cw, h: 0.4, fontFace: MONO, fontSize: 11, color: '004144', align: 'center', valign: 'middle', margin: 0 });
    cx += cw + 0.12;
  });
  // context window meter
  s.addText('Context window — filling up', { x: p.x + 0.22, y: p.y + 1.35, w: p.w - 0.44, h: 0.26, fontFace: MONO, fontSize: 9.5, color: t.sub, margin: 0 });
  const mx = p.x + 0.22, mw = p.w - 0.44, my = p.y + 1.72, mh = 0.5;
  s.addShape(pres.shapes.RECTANGLE, { x: mx, y: my, w: mw, h: mh, fill: { color: t.bg }, line: { color: t.layer2, width: 1 } });
  const segs = [['system', 0.15, 'A6C8FF'], ['history', 0.42, '78A9FF'], ['your prompt', 0.2, '4589FF']];
  let segx = mx;
  segs.forEach((sg) => { const sw = mw * sg[1]; s.addShape(pres.shapes.RECTANGLE, { x: segx, y: my, w: sw, h: mh, fill: { color: sg[2] } }); s.addText(sg[0], { x: segx, y: my, w: sw, h: mh, fontFace: MONO, fontSize: 7.5, color: '161616', align: 'center', valign: 'middle', margin: 0 }); segx += sw; });
  // remaining slack on the right is the "evicted" zone
  s.addText('evicted →', { x: segx + 0.04, y: my, w: mx + mw - segx - 0.08, h: mh, fontFace: MONO, fontSize: 7.5, italic: true, color: t.helper, align: 'center', valign: 'middle', margin: 0 });
  s.addText('full = oldest tokens fall out', { x: p.x + 0.22, y: p.y + 2.4, w: p.w - 0.44, h: 0.3, fontFace: SANS, fontSize: 10, italic: true, color: t.sub, margin: 0 });
})();

// ════════════════════════════════════════════════════════════════════════
// 7 · M5 EMBEDDINGS (dark) — clustered scatter
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = DARK, accent = 'EE5396';
  const s = base(t, accent, { kicker: '05 · EMBEDDINGS', title: 'Where language becomes geometry', n: 7 });
  points(s, t, accent, [
    { h: 'Meaning as position', d: 'Related words land near each other — distance is similarity.' },
    { h: 'Directions carry meaning', d: 'king − man + woman ≈ queen: relationships are consistent vectors.' },
    { h: 'Context shifts the vector', d: '“Bank” by a river vs. a loan gets different embeddings.' },
    { h: 'Powers search & RAG', d: 'Retrieve by meaning, not keywords — even with no shared words.' },
  ]);
  const p = panel(s, t);
  const clusters = [
    { c: '4589FF', label: 'academic', pts: [[0.28, 0.34], [0.36, 0.28], [0.22, 0.46], [0.4, 0.42]] },
    { c: '24A148', label: 'everyday', pts: [[0.34, 0.74], [0.46, 0.8], [0.26, 0.82], [0.42, 0.68]] },
    { c: 'F1C21B', label: 'finance', pts: [[0.74, 0.5], [0.82, 0.42], [0.68, 0.58], [0.8, 0.62]] },
  ];
  clusters.forEach((cl) => {
    cl.pts.forEach((pt) => s.addShape(pres.shapes.OVAL, { x: p.x + 0.2 + pt[0] * (p.w - 0.4) - 0.06, y: p.y + 0.2 + pt[1] * (p.h - 0.4) - 0.06, w: 0.13, h: 0.13, fill: { color: cl.c } }));
    const lx = p.x + 0.2 + cl.pts[0][0] * (p.w - 0.4);
    const ly = p.y + 0.2 + cl.pts[0][1] * (p.h - 0.4);
    s.addText(cl.label, { x: lx - 0.7, y: ly - 0.42, w: 1.4, h: 0.24, fontFace: MONO, fontSize: 9, color: cl.c, align: 'center', margin: 0 });
  });
})();

// ════════════════════════════════════════════════════════════════════════
// 8 · M6 HOW LLMs WORK (light) — probability bars
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = LIGHT, accent = '24A148';
  const s = base(t, accent, { kicker: '06 · HOW LARGE LANGUAGE MODELS WORK', title: 'Predict one token, repeat', n: 8 });
  points(s, t, accent, [
    { h: 'Autoregression', d: 'Predict the next token, append it, feed it back — hundreds of times.' },
    { h: 'Temperature', d: 'Low = focused & repeatable; high = diverse, creative, riskier.' },
    { h: 'Same prompt, new answer', d: 'Generation samples a distribution; at T=0 it is deterministic.' },
    { h: 'Hallucination', d: 'It optimises for likely-looking text, not truth — always verify.' },
  ]);
  const p = panel(s, t);
  s.addText('“…powerhouse of the ___”', { x: p.x + 0.22, y: p.y + 0.2, w: p.w - 0.44, h: 0.28, fontFace: MONO, fontSize: 11, color: t.sub, margin: 0 });
  const dist = [['cell', 0.86], ['organ', 0.06], ['body', 0.04], ['unit', 0.02]];
  const bx = p.x + 1.05, bw = p.w - 2.0, by0 = p.y + 0.7, bh = 0.42, bgap = 0.18;
  dist.forEach((d, i) => {
    const y = by0 + i * (bh + bgap);
    s.addText(d[0], { x: p.x + 0.22, y, w: 0.78, h: bh, fontFace: MONO, fontSize: 11, color: t.text, align: 'right', valign: 'middle', margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: bx, y, w: bw, h: bh, fill: { color: t.bg }, line: { color: t.layer2, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: bx, y, w: Math.max(0.04, bw * d[1]), h: bh, fill: { color: accent } });
    // fixed value column at the panel's right edge — never overflows
    s.addText(Math.round(d[1] * 100) + '%', { x: p.x + p.w - 0.82, y, w: 0.6, h: bh, fontFace: MONO, fontSize: 9.5, color: t.sub, align: 'right', valign: 'middle', margin: 0 });
  });
})();

// ════════════════════════════════════════════════════════════════════════
// 9 · M7 FOUNDATION MODELS (dark) — selection axes
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = DARK, accent = 'FF832B';
  const s = base(t, accent, { kicker: '07 · FOUNDATION MODELS', title: 'There is no single “best”', n: 9 });
  points(s, t, accent, [
    { h: 'Match task to constraints', d: 'Data sensitivity, budget, context length, latency, control.' },
    { h: 'Open weights vs. closed API', d: 'Self-host for privacy, or take managed convenience.' },
    { h: 'Benchmarks rarely decide', d: 'A real constraint like confidentiality usually wins.' },
    { h: 'Choose a point, not a winner', d: 'Different answers rightly point to different models.' },
  ]);
  const p = panel(s, t);
  const axes = [['Open weights', 'Closed API', 0.3], ['Lower cost', 'Higher cost', 0.6], ['Small context', 'Huge context', 0.7], ['Fast / cheap', 'Deep reasoning', 0.45], ['Self-hosted', 'Managed', 0.55]];
  const ax = p.x + 0.3, aw = p.w - 0.6, ay0 = p.y + 0.45, agap = 0.6;
  axes.forEach((a, i) => {
    const y = ay0 + i * agap;
    s.addText(a[0], { x: ax, y: y - 0.26, w: aw / 2, h: 0.22, fontFace: MONO, fontSize: 8, color: t.helper, margin: 0 });
    s.addText(a[1], { x: ax + aw / 2, y: y - 0.26, w: aw / 2, h: 0.22, fontFace: MONO, fontSize: 8, color: t.helper, align: 'right', margin: 0 });
    s.addShape(pres.shapes.LINE, { x: ax, y, w: aw, h: 0, line: { color: t.layer2, width: 2 } });
    s.addShape(pres.shapes.OVAL, { x: ax + aw * a[2] - 0.08, y: y - 0.08, w: 0.16, h: 0.16, fill: { color: accent }, line: { color: t.bg, width: 1.5 } });
  });
})();

// ════════════════════════════════════════════════════════════════════════
// 10 · M8 APPLICATIONS (light) — CRAFT
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = LIGHT, accent = '0F62FE';
  const s = base(t, accent, { kicker: '08 · APPLICATIONS OF GENERATIVE AI', title: 'Structure the prompt: C.R.A.F.T.', n: 10 });
  points(s, t, accent, [
    { h: 'One pattern, every domain', d: 'Teaching, research, consultancy, industry — same five parts.' },
    { h: 'From drafting to directing', d: 'The human specifies well and verifies the result.' },
    { h: 'Assistant, not authority', d: 'Treat output as a draft to verify and own.' },
    { h: 'Verify & disclose', d: 'Check facts and privacy; disclose AI use per policy.' },
  ]);
  const p = panel(s, t);
  const craft = [
    ['C', 'Context', 'who you are, the situation, the audience', '4589FF'],
    ['R', 'Role', 'act as a peer reviewer in…', '08BDBA'],
    ['A', 'Action', 'the precise task and output format', '24A148'],
    ['F', 'Few-shot', 'an example of a good output', 'FF832B'],
    ['T', 'Test', 'ask it to flag its own uncertainty', 'EE5396'],
  ];
  const rh = 0.56, rg = 0.08, ry0 = p.y + 0.2;
  craft.forEach((c, i) => {
    const y = ry0 + i * (rh + rg);
    s.addShape(pres.shapes.RECTANGLE, { x: p.x + 0.22, y, w: p.w - 0.44, h: rh, fill: { color: t.bg }, line: { color: t.border, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: p.x + 0.22, y, w: 0.5, h: rh, fill: { color: c[3] } });
    s.addText(c[0], { x: p.x + 0.22, y, w: 0.5, h: rh, fontFace: MONO, fontSize: 18, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', margin: 0 });
    s.addText(c[1], { x: p.x + 0.85, y: y + 0.05, w: 1.3, h: 0.28, fontFace: SANS, fontSize: 12.5, bold: true, color: t.text, valign: 'middle', margin: 0 });
    s.addText(c[2], { x: p.x + 0.85, y: y + 0.29, w: p.w - 1.15, h: 0.24, fontFace: MONO, fontSize: 8.5, color: t.sub, valign: 'middle', margin: 0 });
  });
})();

// ════════════════════════════════════════════════════════════════════════
// 11 · CLOSING (dark) — the thread
// ════════════════════════════════════════════════════════════════════════
(() => {
  const t = DARK, accent = '0F62FE';
  const s = base(t, accent, { kicker: 'DAY 1 · THE THREAD', title: 'From a notebook to a model', n: 11 });
  const takeaways = [
    ['Deep learning won', 'when data, compute, and architecture converged.'],
    ['Attention replaced recurrence', 'every word relates to every word, in parallel.'],
    ['Tokens & embeddings', 'are how language enters the model as numbers and meaning.'],
    ['LLMs predict the next token', 'fluently — which is power and the source of hallucination.'],
    ['Choose and use responsibly', 'match the model to constraints; verify, disclose, own the output.'],
  ];
  const y0 = 1.9, gap = 0.62;
  takeaways.forEach((tk, i) => {
    const y = y0 + i * gap;
    s.addText(String(i + 1).padStart(2, '0'), { x: MX, y, w: 0.6, h: 0.4, fontFace: MONO, fontSize: 16, bold: true, color: accent, valign: 'middle', margin: 0 });
    s.addText([
      { text: tk[0] + '  ', options: { bold: true, color: t.text } },
      { text: tk[1], options: { color: t.sub } },
    ], { x: MX + 0.7, y, w: 8.6, h: 0.5, fontFace: SANS, fontSize: 14, valign: 'middle', margin: 0 });
  });
})();

pres.writeFile({ fileName: 'Day1-GenerativeAI-Carbon.pptx' }).then((f) => console.log('WROTE', f));
