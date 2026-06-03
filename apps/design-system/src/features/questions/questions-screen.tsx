import { useState } from 'react';

import { AppQuestionCard, AppWorkedSolution, AppButton, AppPill } from '@gaskya/ui';

import { ScreenHeader, Scene, SectionBreak, Note } from '@shared/preview-canvas.tsx';

export function QuestionsScreen() {
  const [pick, setPick] = useState('B');

  return (
    <div>
      <ScreenHeader num="21 · Data & state" title="Questions & the worked solution" blurb="Not “the answer is C” — the reusable method, in the coach's voice." />

      <Scene title="Live question — single select" subtitle="AppQuestionCard">
        <div className="max-w-[560px]">
          <AppQuestionCard
            family="Numerical · Ratio"
            provenance="Generated #NS-0021"
            stem="A trader buys goods for ₦4,800 and sells at ₦6,000. What is the percentage profit?"
            options={[
              { letter: 'A', text: '20%', state: 'idle' },
              { letter: 'B', text: '25%', state: pick === 'B' ? 'chosen' : 'idle' },
              { letter: 'C', text: '12.5%', state: 'idle' },
              { letter: 'D', text: '30%', state: 'idle' },
            ]}
            onPick={setPick}
          />
        </div>
      </Scene>

      <SectionBreak label="On review — your wrong pick, the key, the method" />
      <div className="max-w-[640px]">
        <AppQuestionCard
          family="Numerical · Number series"
          provenance="Generated #NS-4471"
          stem={
            <>
              Find the next term: <b>2, 6, 12, 20, 30, …</b>
            </>
          }
          options={[
            { letter: 'A', text: '38', state: 'idle' },
            { letter: 'B', text: '40', state: 'wrong' },
            { letter: 'C', text: '42', state: 'key' },
            { letter: 'D', text: '36', state: 'idle' },
          ]}
        />
        <div className="mt-3.5">
          <AppWorkedSolution
            steps={[
              { text: <>Look at the gaps, not the terms: 4, 6, 8, 10 — rising by 2.</> },
              { text: <>So the next gap is 12.</> },
              { text: <>Add it to the last term: 30 + 12 = 42. That's C.</> },
            ]}
            method="When a series doesn't grow at a steady rate, look at the differences — and then the differences of those. You had the right instinct; you just stopped one step early."
          />
        </div>
        <div className="mt-3.5 flex flex-wrap items-center gap-3">
          <AppButton size="sm">Try a similar one</AppButton>
          <AppButton size="sm" variant="ghost">
            Drill number series
          </AppButton>
          <AppPill tone="neutral" dot>
            Report a problem
          </AppPill>
        </div>
      </div>
      <Note>Every generated item carries one verified, worked solution — or it never reaches a student.</Note>
    </div>
  );
}
