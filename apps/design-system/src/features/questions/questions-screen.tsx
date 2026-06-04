import { useState } from 'react';

import { AppQuestionCard, AppNumericEntry, AppWorkedSolution, AppButton, AppPill } from '@gaskya/ui';

import { ScreenHeader, Scene, SectionBreak, Note } from '@shared/preview-canvas.tsx';

export function QuestionsScreen() {
  const [pick, setPick] = useState('B');

  return (
    <div>
      <ScreenHeader num="30 · Data & state" title="Question types — text families" blurb="Every shape a generated item can take. One AppQuestionCard, many families." />

      <SectionBreak label="Numerical" />
      <div className="flex flex-col gap-5">
        <Scene title="Number series" subtitle="single select">
          <div className="max-w-[560px]">
            <AppQuestionCard
              family="Numerical · Number series"
              provenance="Generated #NS-4471"
              stem={<>Find the next term: <b>2, 6, 12, 20, 30, …</b></>}
              twoColumn
              options={[
                { letter: 'A', text: '38' },
                { letter: 'B', text: '40', state: pick === 'B' ? 'chosen' : 'idle' },
                { letter: 'C', text: '42' },
                { letter: 'D', text: '36' },
              ]}
              onPick={setPick}
            />
          </div>
        </Scene>

        <Scene title="Ratio & percentage (word problem)" subtitle="single select">
          <div className="max-w-[560px]">
            <AppQuestionCard
              family="Numerical · Ratio"
              stem="A trader buys goods for ₦4,800 and sells at ₦6,000. What is the percentage profit?"
              twoColumn
              options={[
                { letter: 'A', text: '20%' },
                { letter: 'B', text: '25%', state: 'chosen' },
                { letter: 'C', text: '12.5%' },
                { letter: 'D', text: '30%' },
              ]}
            />
          </div>
        </Scene>

        <Scene title="Numeric entry (type the answer)" subtitle="AppNumericEntry">
          <div className="max-w-[560px]">
            <AppNumericEntry
              family="Numerical · Free entry"
              stem="If 3 pumps fill a tank in 8 hours, how many hours for 4 pumps at the same rate?"
              value="6"
              unit="hours"
            />
          </div>
        </Scene>
      </div>

      <SectionBreak label="Verbal" />
      <div className="flex flex-col gap-5">
        <Scene title="Word relationships (analogy)" subtitle="single select">
          <div className="max-w-[560px]">
            <AppQuestionCard
              family="Verbal · Analogy"
              stem={<><b>Doctor</b> is to <b>Hospital</b> as <b>Teacher</b> is to …</>}
              twoColumn
              options={[
                { letter: 'A', text: 'Student' },
                { letter: 'B', text: 'School', state: 'key' },
                { letter: 'C', text: 'Book' },
                { letter: 'D', text: 'Lesson' },
              ]}
            />
          </div>
        </Scene>

        <Scene title="Syllogism (logical deduction)" subtitle="passage + question">
          <div className="max-w-[560px]">
            <AppQuestionCard
              family="Verbal · Syllogism"
              passage="All graduates wrote the aptitude test. Some who wrote the test passed. No one who failed got an interview."
              stem={<>Which conclusion <b>must</b> be true?</>}
              options={[
                { letter: 'A', text: 'All graduates got an interview' },
                { letter: 'B', text: 'Some graduates may have got an interview', state: 'chosen' },
                { letter: 'C', text: 'No graduate failed' },
                { letter: 'D', text: 'Everyone who passed got an interview' },
              ]}
            />
          </div>
        </Scene>

        <Scene title="Reading comprehension" subtitle="passage + question">
          <div className="max-w-[560px]">
            <AppQuestionCard
              family="Verbal · Comprehension"
              passage="Nigeria's graduate hiring funnel increasingly front-loads cognitive screening. Employers argue it scales; critics note it filters on format-familiarity as much as ability, disadvantaging candidates without access to paid preparation."
              stem="The critics' main concern is that the screening …"
              options={[
                { letter: 'A', text: 'takes too long to administer' },
                { letter: 'B', text: 'measures access to prep as much as ability', state: 'key' },
                { letter: 'C', text: 'is too easy for graduates' },
                { letter: 'D', text: 'should be done in person' },
              ]}
            />
          </div>
        </Scene>

        <Scene title="Sentence completion (cloze)" subtitle="single select">
          <div className="max-w-[560px]">
            <AppQuestionCard
              family="Verbal · Cloze"
              stem={<>The candidate remained ___ despite the ___ of the timed test.</>}
              twoColumn
              options={[
                { letter: 'A', text: 'anxious / calm' },
                { letter: 'B', text: 'composed / pressure', state: 'key' },
                { letter: 'C', text: 'hurried / ease' },
                { letter: 'D', text: 'confused / quiet' },
              ]}
            />
          </div>
        </Scene>
      </div>

      <SectionBreak label="Critical reasoning & logical" />
      <div className="flex flex-col gap-5">
        <Scene title="Assumption / inference" subtitle="passage + question">
          <div className="max-w-[560px]">
            <AppQuestionCard
              family="Critical · Assumption"
              passage="“We should adopt video interviews — they let us screen more candidates per hour than phone calls.”"
              stem="The argument assumes that …"
              options={[
                { letter: 'A', text: 'screening more candidates per hour is desirable', state: 'key' },
                { letter: 'B', text: 'video interviews are cheaper' },
                { letter: 'C', text: 'candidates prefer video' },
                { letter: 'D', text: 'phone calls are unreliable' },
              ]}
            />
          </div>
        </Scene>

        <Scene title="True / False / Cannot say" subtitle="three-way">
          <div className="max-w-[560px]">
            <AppQuestionCard
              family="Critical · TF/Cannot say"
              passage="The 2026 cohort had 412 students from the partner link. Average numerical scores rose 18 points over three mocks."
              stem={<i>“Every student in the cohort improved.”</i>}
              twoColumn
              options={[
                { letter: 'T', text: 'True' },
                { letter: 'F', text: 'False' },
                { letter: 'C', text: 'Cannot say', state: 'chosen' },
              ]}
            />
          </div>
        </Scene>

        <Scene title="Seating / ordering puzzle" subtitle="passage + question">
          <div className="max-w-[560px]">
            <AppQuestionCard
              family="Logical · Ordering"
              passage="Five candidates sit in a row. Ada is left of Bola. Chidi is right of Bola. Dele is at one end. Ngozi is between Bola and Chidi."
              stem="Who is in the middle seat?"
              twoColumn
              options={[
                { letter: 'A', text: 'Ada' },
                { letter: 'B', text: 'Bola' },
                { letter: 'C', text: 'Ngozi', state: 'key' },
                { letter: 'D', text: 'Chidi' },
              ]}
            />
          </div>
        </Scene>
      </div>

      <SectionBreak label="On review — the worked solution (the signature)" />
      <div className="max-w-[640px]">
        <AppQuestionCard
          family="Numerical · Number series"
          provenance="Generated #NS-4471"
          stem={<>Find the next term: <b>2, 6, 12, 20, 30, …</b></>}
          twoColumn
          options={[
            { letter: 'A', text: '38' },
            { letter: 'B', text: '40', state: 'wrong' },
            { letter: 'C', text: '42', state: 'key' },
            { letter: 'D', text: '36' },
          ]}
          footer={
            <>
              <AppButton size="sm">Try a similar one</AppButton>
              <AppButton size="sm" variant="ghost">Drill number series</AppButton>
              <AppPill dot>Report a problem</AppPill>
            </>
          }
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
      </div>
      <Note>Every generated item carries one verified, worked solution — or it never reaches a student.</Note>
    </div>
  );
}
