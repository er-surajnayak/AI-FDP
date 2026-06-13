import { Tag } from '@carbon/react';
import type { ModuleMeta } from '../content-types';
import MarkdownView from '../components/MarkdownView';

/** Clean prose layout for the overview + resource docs (activities/demos/assignment). */
export default function DocView({ mod }: { mod: ModuleMeta }) {
  return (
    <div className="difp-doc">
      <div className="difp-chiprow" style={{ marginBottom: '0.5rem' }}>
        {mod.topics.map((t) => (
          <Tag key={t} size="sm" type="cool-gray">{t}</Tag>
        ))}
      </div>
      <article className="difp-md difp-doc__body">
        <MarkdownView markdown={mod.markdown} />
      </article>
    </div>
  );
}
