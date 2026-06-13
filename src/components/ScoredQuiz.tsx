import { useMemo, useState } from 'react';
import { CheckmarkFilled, CloseFilled } from '@carbon/icons-react';
import { parseQuiz } from '../lib/markdown';
import MarkdownView from './MarkdownView';

type Answers = Record<string, number>; // questionNumber -> selected option index

/** Interactive, scored quiz: click an option, see correct/incorrect + explanation. */
export default function ScoredQuiz({ body }: { body: string }) {
  const questions = useMemo(() => parseQuiz(body), [body]);
  const [answers, setAnswers] = useState<Answers>({});

  const mcqs = questions.filter((q) => q.kind === 'mcq');
  const correctCount = mcqs.filter((q) => {
    const sel = answers[q.number];
    return sel != null && q.options[sel]?.correct;
  }).length;

  return (
    <div>
      <p className="difp-quiz__score">
        Score: <b>{correctCount}</b> / {mcqs.length} correct
      </p>

      {questions.map((q) => {
        const selected = answers[q.number];
        const answered = selected != null;
        return (
          <div key={q.number} className="difp-qcard">
            <p className="difp-qcard__q">
              <span className="difp-chip">{q.number} · {q.label}</span>
              {q.question}
            </p>

            {q.kind === 'mcq' ? (
              <>
                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  let cls = 'difp-opt';
                  if (answered && opt.correct) cls += ' is-correct';
                  else if (isSelected && !opt.correct) cls += ' is-wrong';
                  return (
                    <button
                      key={opt.key}
                      className={cls}
                      disabled={answered}
                      onClick={() => setAnswers((a) => ({ ...a, [q.number]: i }))}
                    >
                      <span className="difp-opt__k">{opt.key}</span>
                      <span>{opt.text}</span>
                      {answered && opt.correct && <CheckmarkFilled size={18} className="difp-opt__mark" />}
                      {answered && isSelected && !opt.correct && <CloseFilled size={18} className="difp-opt__mark" />}
                    </button>
                  );
                })}
                {answered && q.explanation && (
                  <div className="difp-qexp"><strong>Why:</strong> {q.explanation}</div>
                )}
              </>
            ) : (
              <OpenQuestion explanation={q.explanation} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OpenQuestion({ explanation }: { explanation: string }) {
  const [show, setShow] = useState(false);
  return show ? (
    <div className="difp-qexp difp-md difp-md--compact">
      <MarkdownView markdown={explanation || '_No model answer provided._'} inline />
    </div>
  ) : (
    <button className="difp-btn" onClick={() => setShow(true)}>Reveal model answer</button>
  );
}
