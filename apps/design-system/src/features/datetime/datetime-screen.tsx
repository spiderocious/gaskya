import { AppClock } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function DatetimeScreen() {
  return (
    <div>
      <ScreenHeader num="13 · Primitives" title="Date & time" blurb="Time pressure is the product. The clock is the one place crimson lives." />

      <Scene title="The think-timer — before you answer" subtitle="AppClock (steady)">
        <div className="flex items-center justify-center rounded-[22px] py-7" style={{ background: 'var(--paper-2)' }}>
          <span className="font-mono text-[56px] font-semibold [font-feature-settings:'tnum']" style={{ color: 'var(--ink)' }}>
            0:28
          </span>
        </div>
      </Scene>

      <Scene title="The live clock chip" subtitle="steady · urgent">
        <div className="flex flex-wrap items-center gap-4">
          <AppClock time="08:24" />
          <AppClock time="00:19" urgent />
          <Note>Steady aubergine dot while there's time; pulsing crimson when the clock is the thing that matters most.</Note>
        </div>
      </Scene>

      <Scene title="Relative time, said plainly">
        <div className="flex flex-col gap-2">
          {[
            ['2h ago', 'Number-series drill · 7/10'],
            ['Yesterday', 'Full numerical mock · 28/40'],
            ['3 days ago', 'Video answer · “solved under pressure”'],
          ].map(([when, what]) => (
            <div key={when} className="flex items-center gap-3">
              <span className="w-[80px] font-mono text-[12px]" style={{ color: 'var(--ink-3)' }}>
                {when}
              </span>
              <span className="text-[14px]">{what}</span>
            </div>
          ))}
        </div>
      </Scene>
    </div>
  );
}
