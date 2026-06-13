import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Renders a module's markdown body with GFM tables/strikethrough. */
export default function MarkdownView({ markdown }: { markdown: string }) {
  return (
    <div className="difp-md">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
