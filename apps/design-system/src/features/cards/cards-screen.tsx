import { AppCard, AppResultCard, AppButton, AppPill, AppTag } from '@gaskya/ui';

import { ScreenHeader, SectionBreak, Note } from '@shared/preview-canvas.tsx';

export function CardsScreen() {
  return (
    <div>
      <ScreenHeader num="27 · Data & state" title="Cards" blurb="The result card is the hero; the family is composed from one soft idiom." />

      <SectionBreak label="The hero — sub-skill result" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <AppResultCard
          eyebrow="Numerical Reasoning"
          tag="Mock-ready"
          lead={
            <>
              You're <b style={{ color: 'var(--ac)' }}>mock-ready</b> on numerical. The only thing
              between you and full marks is the clock.
            </>
          }
          pct={70}
          footnote={
            <>
              Latest: <b style={{ color: 'var(--ink)' }}>7 / 10</b> · up 3 over four practices
            </>
          }
        />
        <AppResultCard
          eyebrow="Numerical · Number series"
          score={{ value: 3, outOf: 10 }}
          tag="Keep drilling"
          lead="Two slipped under time, not skill — your method is sound."
          actions={
            <>
              <AppButton size="sm">Drill this</AppButton>
              <AppButton size="sm" variant="ghost">
                Solutions
              </AppButton>
            </>
          }
        />
      </div>

      <SectionBreak label="The wider family — composed from AppCard" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <AppCard>
          <div className="flex items-center justify-between">
            <AppTag>Numerical</AppTag>
            <AppPill tone="warn" dot>weakest</AppPill>
          </div>
          <div className="mt-2 font-serif text-[18px] font-semibold">Number series</div>
          <div className="mb-3.5 mt-1 text-[12.5px]" style={{ color: 'var(--ink-3)' }}>
            12 fresh items · worked methods
          </div>
          <AppButton size="sm" block>
            Drill this
          </AppButton>
        </AppCard>

        <AppCard>
          <AppTag>Mocks taken</AppTag>
          <div className="mt-1 font-serif text-[48px] font-semibold leading-none" style={{ color: 'var(--ac)' }}>
            12
          </div>
          <div className="mt-1.5 text-[12.5px]" style={{ color: 'var(--ink-3)' }}>
            <span style={{ color: 'var(--good)' }}>▲ 4</span> this week
          </div>
        </AppCard>

        <AppCard tone="accent">
          <div className="font-serif text-[17px] font-medium">Free for every student. Always.</div>
          <p className="mb-3.5 mt-2 text-[12.5px]" style={{ color: '#E8D6E2' }}>
            Sponsors keep it that way — never the student.
          </p>
          <AppButton size="sm" variant="secondary">
            Sponsor a cohort
          </AppButton>
        </AppCard>

        <AppCard tone="soft">
          <AppPill tone="accent" dot>Tip</AppPill>
          <p className="mt-2.5 font-serif text-[14px] italic leading-relaxed" style={{ color: 'var(--ac-deep)' }}>
            On bank tests the number-series pattern is almost always one layer of differences down.
            Check the gaps first.
          </p>
        </AppCard>

        <AppCard>
          <div className="flex items-center justify-between">
            <AppTag>Yesterday</AppTag>
            <span className="font-mono text-[13px] font-semibold">28/40</span>
          </div>
          <div className="mb-3 mt-2 font-serif text-[16px] font-semibold">Full numerical mock</div>
          <div className="flex gap-2">
            <AppButton size="sm" variant="secondary">
              Review
            </AppButton>
            <AppButton size="sm" variant="ghost">
              Retake
            </AppButton>
          </div>
        </AppCard>

        <AppCard>
          <AppTag>Stage 2</AppTag>
          <div className="mb-3 mt-1 font-serif text-[18px] font-semibold">Video interview</div>
          <div className="h-[5px] overflow-hidden rounded-full" style={{ background: 'var(--paper-2)' }}>
            <span className="block h-full rounded-full" style={{ width: '45%', background: 'var(--ac)' }} />
          </div>
          <div className="mt-2.5 text-[12.5px]" style={{ color: 'var(--ink-3)' }}>
            3 of 6 prompts practised
          </div>
        </AppCard>
      </div>
      <Note>Every card is the same hairline-edged soft idiom — only the contents change.</Note>
    </div>
  );
}
