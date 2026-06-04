import { AppTooltip, AppPopover, AppHovercard, AppButton, AppPill, AppProgressRing } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function TooltipsScreen() {
  return (
    <div>
      <ScreenHeader num="28 · Data & state" title="Tooltips · popovers · hovercards" blurb="The only place a soft shadow is allowed." />

      <Scene title="Tooltip — a quiet word" subtitle="AppTooltip (hover)">
        <div className="flex flex-wrap items-center gap-10 py-4">
          <AppTooltip label="No leaked set helps you — every item is fresh">
            <AppButton variant="secondary" size="sm">Why “generated”?</AppButton>
          </AppTooltip>
          <AppTooltip label="Situation · Task · Action · Result — all four covered">
            <AppPill tone="good" dot>STAR ✓</AppPill>
          </AppTooltip>
        </div>
      </Scene>

      <Scene title="Popover — what does “mock-ready” mean?" subtitle="AppPopover (click)">
        <AppPopover trigger={<AppPill tone="good" dot>Mock-ready</AppPill>}>
          <div className="mb-1.5 font-serif text-[16px] font-medium">Mock-ready</div>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
            70%+ on this family, under time, across your last three mocks. A grounded read on your
            real history — never a hollow “you're ready!”.
          </p>
        </AppPopover>
      </Scene>

      <Scene title="Hovercard — a sub-skill at a glance" subtitle="AppHovercard (hover)">
        <AppHovercard
          trigger={<span className="cursor-default font-serif text-[15px] underline decoration-dotted" style={{ color: 'var(--ac)' }}>Number series</span>}
        >
          <div className="flex items-center gap-3 p-4">
            <AppProgressRing value={30} tone="warn" size={52}>
              <span className="font-mono text-[12px] font-semibold" style={{ color: 'var(--warn)' }}>3/10</span>
            </AppProgressRing>
            <div>
              <div className="font-serif text-[16px] font-semibold">Number series</div>
              <div className="text-[12px]" style={{ color: 'var(--ink-3)' }}>Numerical · your weakest line</div>
            </div>
          </div>
          <div className="px-4 pb-4">
            <p className="mb-3 text-[12.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              You keep stopping one layer of differences too early. 12 fresh items waiting.
            </p>
            <AppButton size="sm" block>Drill this next</AppButton>
          </div>
        </AppHovercard>
        <Note>Overlays are the one exception to the no-shadow rule — a shallow soft shadow lifts them off the page.</Note>
      </Scene>
    </div>
  );
}
