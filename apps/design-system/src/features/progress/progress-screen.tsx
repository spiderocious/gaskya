import {
  AppTrack,
  AppProgressRing,
  AppSpinner,
  AppIndeterminate,
  AppPipeline,
  AppButton,
  AppClock,
  AppPill,
} from '@gaskya/ui';

import { ScreenHeader, Scene, SectionBreak, Note } from '@shared/preview-canvas.tsx';

export function ProgressScreen() {
  return (
    <div>
      <ScreenHeader num="24 · Data & state" title="Progress & loading" blurb="Every named state — upload, submit, analyse, generate, the AI pipeline." />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Scene title="Inside a mock — Q 17 of 40" subtitle="AppTrack + AppClock">
          <div className="flex items-center gap-3">
            <AppTrack value={42} className="flex-1" />
            <span className="whitespace-nowrap font-mono text-[12px]" style={{ color: 'var(--ink-3)' }}>
              17 / 40
            </span>
          </div>
          <div className="mt-4">
            <AppClock time="08:24" />
          </div>
        </Scene>

        <Scene title="Readiness ring" subtitle="AppProgressRing">
          <div className="flex items-center gap-4">
            <AppProgressRing value={70}>
              <span className="font-serif text-[20px] font-semibold" style={{ color: 'var(--ac)' }}>
                7<span className="font-mono text-[12px]" style={{ color: 'var(--ink-3)' }}>/10</span>
              </span>
            </AppProgressRing>
            <span className="font-serif text-[17px] font-medium">Mock-ready</span>
          </div>
        </Scene>

        <Scene title="File upload — chunked & resumable" subtitle="AppTrack with %">
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-semibold">Uploading your answer</span>
            <span className="font-mono" style={{ color: 'var(--ink-3)' }}>
              3.2 / 4.6 MB · 70%
            </span>
          </div>
          <div className="mt-2">
            <AppTrack value={70} />
          </div>
        </Scene>

        <Scene title="Button — submitting" subtitle="AppButton loading + AppSpinner">
          <div className="flex flex-col items-start gap-2.5">
            <AppButton leadingIcon={<AppSpinner size={14} onDark />} loading>
              Submitting
            </AppButton>
            <AppButton>Submit mock</AppButton>
          </div>
        </Scene>

        <Scene title="Question loading (in a drill)" subtitle="AppIndeterminate">
          <AppIndeterminate />
          <Note>Fetching a fresh generated item — never one you've seen.</Note>
        </Scene>

        <Scene title="Transcribing audio" subtitle="AppIndeterminate">
          <AppIndeterminate />
          <Note>The cheap, valuable part — your video is already safe in storage.</Note>
        </Scene>
      </div>

      <Scene title="Multi-stage pipeline — after a graded video" subtitle="AppPipeline">
        <AppPipeline
          stages={[
            { label: 'Uploaded to storage', sub: 'whole video, never processed whole', state: 'done' },
            { label: 'Audio transcribed', sub: 'the cheap 90%', state: 'done' },
            { label: 'Analysing 8 frames', sub: 'timed to transcript events', state: 'now' },
            { label: 'Writing your coaching', sub: 'substance + visual, correlated', state: 'todo' },
          ]}
        />
        <Note>Each stage is bounded and cheap; if a later stage fails, everything before it is kept. The pipeline degrades, never dead-ends.</Note>
      </Scene>

      <SectionBreak label="The smaller signals" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Scene title="Generating fresh questions…" subtitle="AppIndeterminate">
          <AppIndeterminate />
          <Note>Topping up your number-series bank so you never see the same item twice.</Note>
        </Scene>

        <Scene title="Saving — continuous autosave pip" subtitle="AppPill + AppSpinner">
          <div className="flex items-center gap-2">
            <AppPill tone="good" dot>Saved · 2s ago</AppPill>
            <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold" style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}>
              <AppSpinner size={11} /> Saving…
            </span>
          </div>
        </Scene>

        <Scene title="Score count-up (settles on reveal)" subtitle="the one celebratory motion">
          <span className="font-serif text-[48px] font-semibold leading-none" style={{ color: 'var(--ac)' }}>
            7<span className="font-mono text-[19px]" style={{ color: 'var(--ink-3)' }}>/10</span>
          </span>
          <Note>Counts up on the Settle curve when a result lands.</Note>
        </Scene>

        <Scene title="Page load (full-screen splash)" subtitle="AppSpinner large">
          <div className="grid place-items-center gap-3 rounded-[18px] border p-6" style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
            <AppSpinner size={34} />
            <span className="font-serif text-[16px]">Loading your funnel…</span>
          </div>
        </Scene>
      </div>
    </div>
  );
}
