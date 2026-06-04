import { AppItemRecord, AppValidityGate, AppReviewQueue, AppBankStat, AppButton } from '@gaskya/ui';

import { ScreenHeader, Scene, SectionBreak, Note } from '@shared/preview-canvas.tsx';

export function QuestionBankScreen() {
  return (
    <div>
      <ScreenHeader num="32 · Data & state" title="Question bank & review" blurb="The engine, the quality gate, the provenance. No item reaches a student without passing the gate." />

      <Scene title="A live item — full record" subtitle="AppItemRecord">
        <div className="max-w-[640px]">
          <AppItemRecord
            id="#NS-4471"
            verified
            stem="Find the next term: 2, 6, 12, 20, 30, …"
            answer="42"
            meta={[
              { label: 'Family', value: 'Numerical' },
              { label: 'Sub-skill', value: 'Number series' },
              { label: 'Difficulty', value: 'Medium' },
              { label: 'Style of', value: 'Access Bank' },
            ]}
            provenance="seed: dragnet-2023-pack · p.14"
          />
        </div>
      </Scene>

      <SectionBreak label="The validity gate — auto-checked before going live" />
      <Scene title="AppValidityGate">
        <div className="max-w-[640px]">
          <AppValidityGate
            checks={[
              { ok: true, label: 'Exactly one defensible correct answer' },
              { ok: true, label: 'All distractors plausible (no give-aways)' },
              { ok: true, label: 'Maths reconciles (re-computed independently)' },
              { ok: true, label: 'Worked, teaching-grade solution present' },
              { ok: false, label: 'Figure required but not yet generated', note: '→ fell back to reviewed seed, flagged' },
            ]}
          />
        </div>
        <Note>Failures are discarded or sent to review — never silently shipped. A figure that can't be generated falls back to a flagged curated seed, explicitly.</Note>
      </Scene>

      <SectionBreak label="Review queue — low-confidence & disputed items" />
      <Scene title="AppReviewQueue">
        <div className="max-w-[720px]">
          <AppReviewQueue
            items={[
              {
                stem: '“Which is the odd one out: 3, 5, 7, 9, 11?”',
                sub: 'Generated #NS-5120 · flagged: ambiguous key',
                dispute: { label: 'dispute 14%', tone: 'crit' },
                actions: (<><AppButton size="sm" variant="ghost">Review</AppButton><AppButton size="sm" variant="danger">Retire</AppButton></>),
              },
              {
                stem: 'Garbled OCR — “the rat3 per ann…m is”',
                sub: 'Extraction #EX-882 · low confidence 0.41',
                dispute: { label: 'unseen', tone: 'neutral' },
                actions: (<><AppButton size="sm" variant="ghost">Fix</AppButton><AppButton size="sm" variant="danger">Reject</AppButton></>),
              },
              {
                stem: '“Doctor : Hospital :: Teacher : ___”',
                sub: 'Generated #WR-3301 · 2 students reported',
                dispute: { label: 'dispute 6%', tone: 'warn' },
                actions: (<><AppButton size="sm" variant="ghost">Review</AppButton><AppButton size="sm" variant="secondary">Keep</AppButton></>),
              },
            ]}
          />
        </div>
      </Scene>

      <SectionBreak label="Bank health — at a glance" />
      <Scene title="AppBankStat">
        <div className="grid max-w-[640px] grid-cols-3 gap-4">
          <AppBankStat value="18.4k" label="live generated items" />
          <AppBankStat value="214" label="in review queue" tone="warn" />
          <AppBankStat value="99.2%" label="passed validity gate" tone="good" />
        </div>
      </Scene>
    </div>
  );
}
