import { CloseOutline, CheckmarkOutline } from '@carbon/icons-react';
import { splitMisconceptions } from '../lib/markdown';
import MarkdownView from './MarkdownView';

/** Renders misconception bullets as paired wrong→right cards. */
export default function MisconceptionsList({ body }: { body: string }) {
  const items = splitMisconceptions(body);
  if (items.length === 0 || items.every((i) => !i.right)) {
    return <div className="difp-md"><MarkdownView markdown={body} /></div>;
  }
  return (
    <div className="difp-misc-grid">
      {items.map((it, i) => (
        <div key={i} className="difp-misc-tile">
          <p className="difp-misc-tile__wrong"><CloseOutline size={16} /> <span>{it.wrong}</span></p>
          <p className="difp-misc-tile__right">
            <CheckmarkOutline size={16} />
            <span className="difp-md difp-md--inline"><MarkdownView markdown={it.right} inline /></span>
          </p>
        </div>
      ))}
    </div>
  );
}
