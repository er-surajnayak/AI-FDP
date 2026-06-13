import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getModule } from '../content/loader';
import ModuleView from './ModuleView';
import DocView from '../pages/DocView';

export default function ModulePage() {
  const { slug } = useParams();
  const mod = slug ? getModule(slug) : undefined;

  useEffect(() => {
    document.querySelector('.difp-scroll')?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!mod) return <Navigate to="/" replace />;

  return mod.kind === 'module' ? <ModuleView mod={mod} /> : <DocView mod={mod} />;
}
