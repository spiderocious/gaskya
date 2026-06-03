import { AppAnswerGrid, AppBubbleReview, AppPill, type AnswerCellState } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

function buildCells() {
  const pattern: AnswerCellState[] = [
    'right', 'right', 'wrong', 'right', 'right', 'right', 'wrong', 'right', 'right', 'right',
    'right', 'wrong', 'right', 'right', 'right', 'right', 'right', 'wrong', 'right', 'right',
    'right', 'right', 'right', 'wrong', 'right', 'right', 'right', 'right', 'wrong', 'right',
    'right', 'right', 'wrong', 'right', 'right', 'skip', 'skip', 'skip', 'skip', 'skip',
  ];
  return pattern.map((state, i) => ({ n: i + 1, state, flagged: i === 6 }));
}

export function AnswerReviewScreen() {
  return (
    <div>
      <ScreenHeader num="35 · Data & state" title="Answer review" blurb="Every way to look back at what you did — the same bubble language as the test." />

      <Scene title="Whole-mock grid — 40 questions at a glance" subtitle="AppAnswerGrid">
        <AppAnswerGrid cells={buildCells()} />
        <div className="mt-3.5 flex flex-wrap gap-4">
          <AppPill tone="good" dot>28 correct</AppPill>
          <AppPill tone="crit" dot>8 missed</AppPill>
          <AppPill dot>4 unanswered</AppPill>
          <AppPill tone="warn" dot>1 flagged</AppPill>
        </div>
      </Scene>

      <Scene title="Bubble review — your pick vs the key" subtitle="AppBubbleReview">
        <AppBubbleReview
          qno="07"
          stem="Next term: 2, 6, 12, 20, 30, …"
          letters={[
            { letter: 'A', state: 'idle' },
            { letter: 'B', state: 'was' },
            { letter: 'C', state: 'right' },
            { letter: 'D', state: 'idle' },
          ]}
          note="chose B · was C"
        />
        <AppBubbleReview
          qno="12"
          stem="A trader's profit percentage…"
          letters={[
            { letter: 'A', state: 'idle' },
            { letter: 'B', state: 'right' },
            { letter: 'C', state: 'was' },
            { letter: 'D', state: 'idle' },
          ]}
          note="chose C · was B"
        />
        <Note>Your wrong pick struck through in crimson, the right key ringed in sage — review feels continuous with the attempt.</Note>
      </Scene>
    </div>
  );
}
