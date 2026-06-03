import { AppButton } from '@gaskya/ui';

import { ScreenHeader, SectionBreak, Note } from '@shared/preview-canvas.tsx';

/** Visual spec: design-system/projects/gaskya/preview/04-motion.html */
function Curve({ name, fn, use }: { name: string; fn: string; use: string }) {
  return (
    <div className="rounded-[18px] border p-[18px]" style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
      <div className="text-[14px] font-semibold" style={{ color: 'var(--ink)' }}>
        {name}
      </div>
      <div className="my-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
        {fn}
      </div>
      <div className="text-[12.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
        {use}
      </div>
    </div>
  );
}

export function MotionScreen() {
  return (
    <div>
      <ScreenHeader num="04 · Foundation" title="Motion" blurb="Calm, with one mechanical exception — the key press." />

      <SectionBreak label="Three named curves" />
      <div className="grid grid-cols-3 gap-[18px]">
        <Curve name="Settle" fn="cubic-bezier(.2,.7,.3,1) · 300ms" use="Cards arrive, the readiness number counts up. The default — long and soft." />
        <Curve name="Key" fn="cubic-bezier(.2,.7,.3,1) · 90ms" use="The one fast curve — only the button press. Snappy, lands like a real key." />
        <Curve name="Tick" fn="linear · per-second" use="The live clock. It does not animate; it ticks, and pulses crimson at the end." />
      </div>

      <SectionBreak label="Live — press the key" />
      <div className="rounded-[18px] border p-7" style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
        <div className="flex flex-wrap gap-3">
          <AppButton>Start when ready</AppButton>
          <AppButton variant="secondary">Look back</AppButton>
          <AppButton variant="ghost">Drill this</AppButton>
          <AppButton variant="skip">Skip for now</AppButton>
        </div>
        <Note>
          Hover lifts each button 1px toward your finger; click drops it the full 3px to land. The
          system's single tactile flourish — everything else stays calm. Honours reduced-motion.
        </Note>
      </div>
    </div>
  );
}
