import { Accordion, AccordionItem, Tag } from '@carbon/react';
import MarkdownView from './MarkdownView';
import { splitQuiz } from '../lib/markdown';

/**
 * Renders a quiz section as reveal cards: the question + options show as the
 * summary, the answer + explanation are hidden until the item is expanded.
 */
export default function QuizAccordion({ body }: { body: string }) {
  const questions = splitQuiz(body);
  if (questions.length === 0) {
    return (
      <div className="difp-md">
        <MarkdownView markdown={body} />
      </div>
    );
  }

  return (
    <Accordion>
      {questions.map((q, i) => {
        // First line = "**Q1 (MCQ).** prompt". Use the prompt as the title.
        const firstLine = q.content.split('\n')[0];
        const kindMatch = firstLine.match(/\((MCQ|Conceptual|Scenario)\)/i);
        const kind = kindMatch ? kindMatch[1] : 'Question';
        const prompt = firstLine.replace(/^\*\*Q\d+\s*\([^)]*\)\.\*\*\s*/, '').replace(/\*\*/g, '');
        const rest = q.content.split('\n').slice(1).join('\n').trim();
        const title = (
          <span className="difp-quiz__title">
            <Tag size="sm" type={kind.toLowerCase() === 'mcq' ? 'blue' : kind.toLowerCase() === 'scenario' ? 'teal' : 'purple'}>
              {q.label.split(' ')[0]} · {kind}
            </Tag>
            <span>{prompt}</span>
          </span>
        );
        return (
          <AccordionItem key={i} title={title}>
            <div className="difp-md difp-md--compact">
              <MarkdownView markdown={rest || '_Expand for the answer._'} />
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
