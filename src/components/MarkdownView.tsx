import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={inline ? { p: ({ children }) => <>{children}</> } : undefined}
    >
      {markdown}
    </ReactMarkdown>
  );
}
