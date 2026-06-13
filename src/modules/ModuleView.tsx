import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tabs, TabList, Tab, TabPanels, TabPanel, Tag, Tile, Button,
} from '@carbon/react';
import { Time, ArrowRight, ArrowLeft, Idea, Bullhorn } from '@carbon/icons-react';
import type { ModuleMeta } from '../content-types';
import { CORE_MODULES } from '../content/loader';
import { parseModule, findSection, findSections, splitBullets } from '../lib/markdown';
import type { Section, SectionKey } from '../lib/markdown';
import MarkdownView from '../components/MarkdownView';
import ExamplesGrid from '../components/ExamplesGrid';
import QuizAccordion from '../components/QuizAccordion';
import MisconceptionsList from '../components/MisconceptionsList';
import TakeawaysTile from '../components/TakeawaysTile';
import { PLAYGROUNDS } from '../playgrounds/registry';

function Block({ s, icon }: { s?: Section; icon?: string }) {
  if (!s) return null;
  return (
    <div className="difp-block">
      <h3 className="difp-block__title">{icon && <span aria-hidden>{icon} </span>}{s.title}</h3>
      <div className="difp-md">
        <MarkdownView markdown={s.body} />
      </div>
    </div>
  );
}

export default function ModuleView({ mod }: { mod: ModuleMeta }) {
  const navigate = useNavigate();
  const parsed = useMemo(() => parseModule(mod.markdown), [mod.markdown]);

  const get = (k: SectionKey) => findSection(parsed, k);
  const objectives = get('objectives');
  const objList = objectives ? splitBullets(objectives.body) : [];
  const exampleSections = findSections(parsed, ['faculty', 'research', 'industry']).filter((s) => s.body.length > 20);
  const Playground = mod.playground ? PLAYGROUNDS[mod.playground] : null;

  const idx = CORE_MODULES.findIndex((m) => m.slug === mod.slug);
  const prev = idx > 0 ? CORE_MODULES[idx - 1] : undefined;
  const next = idx >= 0 && idx < CORE_MODULES.length - 1 ? CORE_MODULES[idx + 1] : undefined;

  return (
    <div className="difp-module">
      {/* Hero header */}
      <header className="difp-mod-hero">
        <div className="difp-mod-hero__row">
          {mod.number && <span className="difp-mod-hero__num">{mod.number}</span>}
          <div>
            <div className="difp-chiprow">
              <Tag type="cool-gray" size="sm"><Time size={12} /> {mod.durationMin} min</Tag>
              {mod.playground && <Tag type="green" size="sm">Interactive playground</Tag>}
            </div>
            <h1 className="difp-mod-hero__title">{mod.title}</h1>
          </div>
        </div>
        {parsed.intro && (
          <div className="difp-md difp-mod-hero__intro">
            <MarkdownView markdown={parsed.intro} />
          </div>
        )}
      </header>

      {/* Objectives strip */}
      {objList.length > 0 && (
        <Tile className="difp-objectives">
          <p className="difp-objectives__head"><Idea size={16} /> What you'll be able to do</p>
          <ul>
            {objList.map((o, i) => (
              <li key={i}><span className="difp-md difp-md--inline"><MarkdownView markdown={o} inline /></span></li>
            ))}
          </ul>
        </Tile>
      )}

      <Tabs>
        <TabList aria-label="Module sections" contained>
          <Tab>Learn</Tab>
          <Tab>Examples</Tab>
          <Tab>Interactive</Tab>
          <Tab>Practice</Tab>
          <Tab>Reference</Tab>
        </TabList>
        <TabPanels>
          {/* Learn */}
          <TabPanel>
            <Block s={get('teaching')} icon="📘" />
            <Block s={get('storytelling')} icon="🎞️" />
            <Block s={get('analogies')} icon="💡" />
          </TabPanel>

          {/* Examples */}
          <TabPanel>
            {exampleSections.length > 0 ? (
              <ExamplesGrid sections={exampleSections} />
            ) : (
              <p className="difp-empty">Domain examples are woven into the Learn tab for this module.</p>
            )}
          </TabPanel>

          {/* Interactive */}
          <TabPanel>
            {Playground && (
              <div className="difp-block">
                <h3 className="difp-block__title">▶ Try it yourself</h3>
                <Playground />
              </div>
            )}
            <Block s={get('visual')} icon="🖼️" />
            <Block s={get('animation')} icon="🎬" />
            <Block s={get('playground')} icon="🕹️" />
          </TabPanel>

          {/* Practice */}
          <TabPanel>
            <Block s={get('activity')} icon="✋" />
            <Block s={get('demo')} icon="🖥️" />
            {get('quiz') && (
              <div className="difp-block">
                <h3 className="difp-block__title">❓ Checkpoint quiz</h3>
                <p className="difp-block__hint">Read each question, then expand to reveal the answer and explanation.</p>
                <QuizAccordion body={get('quiz')!.body} />
              </div>
            )}
          </TabPanel>

          {/* Reference */}
          <TabPanel>
            {get('takeaways') && (
              <div className="difp-block">
                <h3 className="difp-block__title">⭐ Key takeaways</h3>
                <TakeawaysTile body={get('takeaways')!.body} />
              </div>
            )}
            {get('misconceptions') && (
              <div className="difp-block">
                <h3 className="difp-block__title">⚠️ Common misconceptions</h3>
                <MisconceptionsList body={get('misconceptions')!.body} />
              </div>
            )}
            <details className="difp-buildnotes">
              <summary><Bullhorn size={14} /> Build notes (IBM Carbon &amp; React)</summary>
              <Block s={get('carbon')} />
              <Block s={get('react')} />
            </details>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Prev / Next */}
      <nav className="difp-pager">
        {prev ? (
          <Button kind="ghost" renderIcon={ArrowLeft} onClick={() => navigate(`/${prev.slug}`)}>
            {prev.number} · {prev.navLabel}
          </Button>
        ) : <span />}
        {next ? (
          <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate(`/${next.slug}`)}>
            {next.number} · {next.navLabel}
          </Button>
        ) : <span />}
      </nav>
    </div>
  );
}
