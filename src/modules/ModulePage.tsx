import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import MarkdownView from '../components/MarkdownView';
import { getModule } from '../content/loader';
import { PLAYGROUNDS } from '../playgrounds/registry';

export default function ModulePage() {
  const { slug } = useParams();
  const mod = slug ? getModule(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!mod) return <Navigate to="/overview" replace />;

  const Playground = mod.playground ? PLAYGROUNDS[mod.playground] : null;

  return (
    <article className="difp-content">
      <MarkdownView markdown={mod.markdown} />
      {Playground && (
        <>
          <h2 style={{ marginTop: '2.5rem' }}>Interactive Playground</h2>
          <Playground />
        </>
      )}
    </article>
  );
}
