import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Flatten an mdast node to its text content (for heuristics). */
function nodeText(node: any): string {
  if (!node) return '';
  if (node.type === 'text') return node.value ?? '';
  if (Array.isArray(node.children)) return node.children.map(nodeText).join('');
  return '';
}

/**
 * Rich renderers that turn plain prose into organized visual blocks:
 * - h3 sub-headings get an accent tick
 * - blockquotes become callout cards
 * - short bullet lists render as a chip row instead of a vertical list
 */
const components: Components = {
  h3: ({ children }) => (
    <h3 className="difp-md-h3">
      <span className="difp-md-h3__tick" aria-hidden />
      <span>{children}</span>
    </h3>
  ),
  blockquote: ({ children }) => <blockquote className="difp-callout">{children}</blockquote>,
  ul: ({ children, node }) => {
    const items = (node?.children ?? []).filter((c: any) => c.tagName === 'li');
    const texts = items.map(nodeText);
    const asChips =
      items.length >= 2 &&
      items.length <= 8 &&
      texts.every((t) => t.trim().length > 0 && t.trim().length <= 32);
    return <ul className={asChips ? 'difp-md-chips' : undefined}>{children}</ul>;
  },
};

const inlineComponents: Components = { p: ({ children }) => <>{children}</> };

/**
 * Renders markdown with GFM tables/strikethrough.
 * Callers provide the `.difp-md` wrapper. In `inline` mode paragraphs render
 * as <span> so the output is valid inside <p>/<span>/<li>.
 */
export default function MarkdownView({
  markdown,
  inline = false,
}: {
  markdown: string;
  inline?: boolean;
}) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={inline ? inlineComponents : components}>
      {markdown}
    </ReactMarkdown>
  );
}
