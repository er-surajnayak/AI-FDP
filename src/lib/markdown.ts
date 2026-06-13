// Parses a module's markdown (the "## N. Section" contract) into typed
// sections so the UI can render each one with the right Carbon layout
// instead of dumping a wall of text.

export type SectionKey =
  | 'duration'
  | 'objectives'
  | 'teaching'
  | 'storytelling'
  | 'analogies'
  | 'faculty'
  | 'research'
  | 'industry'
  | 'visual'
  | 'animation'
  | 'playground'
  | 'activity'
  | 'demo'
  | 'quiz'
  | 'misconceptions'
  | 'takeaways'
  | 'carbon'
  | 'react'
  | 'other';

export interface Section {
  /** original heading text, e.g. "4. Teaching Content" */
  heading: string;
  /** heading with leading number stripped, e.g. "Teaching Content" */
  title: string;
  key: SectionKey;
  /** markdown body of the section (without the heading) */
  body: string;
}

export interface ParsedModule {
  /** the leading # title */
  title: string;
  /** the blockquote / intro before the first ## */
  intro: string;
  sections: Section[];
}

function classify(headingLower: string): SectionKey {
  const h = headingLower;
  if (h.includes('duration')) return 'duration';
  if (h.includes('objective')) return 'objectives';
  if (h.includes('teaching content')) return 'teaching';
  if (h.includes('storytelling')) return 'storytelling';
  if (h.includes('analog')) return 'analogies';
  if (h.includes('faculty')) return 'faculty';
  if (h.includes('research')) return 'research';
  if (h.includes('industry')) return 'industry';
  if (h.includes('visual')) return 'visual';
  if (h.includes('animation')) return 'animation';
  if (h.includes('playground') || h.includes('interactive')) return 'playground';
  if (h.includes('activit') || h.includes('hands-on') || h.includes('hands on')) return 'activity';
  if (h.includes('demonstration') || h.includes('demo')) return 'demo';
  if (h.includes('quiz')) return 'quiz';
  if (h.includes('misconception')) return 'misconceptions';
  if (h.includes('takeaway')) return 'takeaways';
  if (h.includes('carbon')) return 'carbon';
  if (h.includes('react implementation')) return 'react';
  return 'other';
}

const stripNum = (s: string) => s.replace(/^\s*[\d/.]+\.?\s*/, '').trim();

export function parseModule(md: string): ParsedModule {
  const lines = md.split('\n');
  let title = '';
  let i = 0;

  // first H1 = title
  for (; i < lines.length; i++) {
    const m = lines[i].match(/^#\s+(.*)/);
    if (m) {
      title = m[1].trim();
      i++;
      break;
    }
  }

  // intro = everything up to the first "## "
  const introLines: string[] = [];
  for (; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) break;
    introLines.push(lines[i]);
  }

  const sections: Section[] = [];
  let cur: { heading: string; bodyLines: string[] } | null = null;
  for (; i < lines.length; i++) {
    const m = lines[i].match(/^##\s+(.*)/);
    if (m) {
      if (cur) sections.push(finalize(cur));
      cur = { heading: m[1].trim(), bodyLines: [] };
    } else if (cur) {
      cur.bodyLines.push(lines[i]);
    }
  }
  if (cur) sections.push(finalize(cur));

  return { title, intro: introLines.join('\n').trim(), sections };
}

function finalize(cur: { heading: string; bodyLines: string[] }): Section {
  const cleanHeading = cur.heading.replace(/[#*]/g, '').trim();
  return {
    heading: cleanHeading,
    title: stripNum(cleanHeading),
    key: classify(cleanHeading.toLowerCase()),
    body: cur.bodyLines.join('\n').trim(),
  };
}

export function findSection(p: ParsedModule, key: SectionKey): Section | undefined {
  return p.sections.find((s) => s.key === key);
}
export function findSections(p: ParsedModule, keys: SectionKey[]): Section[] {
  return p.sections.filter((s) => keys.includes(s.key));
}

/** Split a quiz section body into per-question chunks ("**Q1 ...**"). */
export function splitQuiz(body: string): { label: string; content: string }[] {
  const parts = body.split(/\n(?=\*\*Q\d)/);
  return parts
    .map((p) => p.trim())
    .filter(Boolean)
    .map((chunk) => {
      const m = chunk.match(/^\*\*(Q\d+[^*]*)\*\*/);
      return { label: m ? m[1].replace(/[().]/g, '').trim() : 'Question', content: chunk };
    });
}

/** Parse misconception bullets ("- **\"wrong.\"** correction") into pairs. */
export function splitMisconceptions(body: string): { wrong: string; right: string }[] {
  return body
    .split('\n')
    .filter((l) => l.trim().startsWith('-'))
    .map((l) => {
      const line = l.replace(/^\s*-\s*/, '');
      const m = line.match(/\*\*(.+?)\*\*\s*(.*)/);
      if (m) return { wrong: m[1].replace(/^["“]|["”]$/g, ''), right: m[2].trim() };
      return { wrong: line, right: '' };
    });
}

export interface QuizOption { key: string; text: string; correct: boolean; }
export interface ParsedQuizQ {
  kind: 'mcq' | 'open';
  number: string;
  label: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

/** Parse a quiz section body into structured, scorable questions. */
export function parseQuiz(body: string): ParsedQuizQ[] {
  const chunks = body.split(/\n(?=\*\*Q\d)/).map((c) => c.trim()).filter(Boolean);
  return chunks.map((chunk) => {
    const lines = chunk.split('\n');
    const head = lines[0];
    const numM = head.match(/\*\*(Q\d+)\s*\(([^)]*)\)\.?\*\*/);
    const number = numM ? numM[1] : 'Q';
    const label = numM ? numM[2] : 'Question';
    const question = head.replace(/^\*\*Q\d+\s*\([^)]*\)\.?\*\*\s*/, '').replace(/\*\*/g, '').trim();

    const options: QuizOption[] = [];
    let explanation = '';
    for (const raw of lines.slice(1)) {
      const line = raw.trim();
      const optM = line.match(/^[-*]\s*([A-D])\)\s*(.*)$/);
      if (optM) {
        const correct = /✅|✔/.test(optM[2]);
        const text = optM[2].replace(/✅|✔/g, '').replace(/\*\*/g, '').trim();
        options.push({ key: optM[1], text, correct });
      } else if (/^[_*]?(Explanation|Answer)[:_*]/i.test(line)) {
        explanation = line.replace(/^[_*]?(Explanation|Answer)[:_*]*\s*/i, '').replace(/[_*]+$/g, '').trim();
      } else if (explanation && line) {
        explanation += ' ' + line.replace(/[_*]+/g, '').trim();
      }
    }
    return {
      kind: options.length >= 2 ? 'mcq' : 'open',
      number, label: label.trim(), question, options,
      explanation: explanation.replace(/^\*+|\*+$/g, '').trim(),
    };
  });
}

/** Parse a simple "- item" bullet list. */
export function splitBullets(body: string): string[] {
  return body
    .split('\n')
    .filter((l) => /^\s*[-*]\s+/.test(l))
    .map((l) => l.replace(/^\s*[-*]\s+/, '').trim());
}
