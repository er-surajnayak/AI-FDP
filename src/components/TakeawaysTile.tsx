import { CheckmarkFilled } from '@carbon/icons-react';
import { splitBullets } from '../lib/markdown';
import MarkdownView from './MarkdownView';

/** Renders key takeaways as a highlighted checklist. */
export default function TakeawaysTile({ body }: { body: string }) {
  const items = splitBullets(body);
  if (items.length === 0) {
    return (
      <div className="difp-md">
        <MarkdownView markdown={body} />
      </div>
    );
  }
  return (
    <ul className="difp-takeaways">
      {items.map((it, i) => (
        <li key={i}>
          <CheckmarkFilled size={18} className="difp-takeaways__icon" />
          <span className="difp-md difp-md--inline">
            <MarkdownView markdown={it} inline />
          </span>
        </li>
      ))}
    </ul>
  );
}
