import { AppToast, AppBanner, AppButton, AppTooltip, AppPopover, AppPill } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function FeedbackScreen() {
  return (
    <div>
      <ScreenHeader num="41 · Overlays" title="Toasts · banners · tooltips" blurb="The system speaking quietly. The one place a shallow shadow is allowed." />

      <Scene title="Toasts — brief, then gone" subtitle="AppToast">
        <div className="flex flex-col gap-3">
          <AppToast title="Answer saved — synced to your account" tone="good" onDismiss={() => {}} />
          <AppToast title="Connection dropped — saving locally" tone="warn" action="Retry" onDismiss={() => {}} />
          <AppToast title="Attempt deleted" action="Undo" onDismiss={() => {}} />
        </div>
      </Scene>

      <Scene title="Page banners" subtitle="AppBanner">
        <div className="flex flex-col gap-3">
          <AppBanner tone="good" action={<AppButton size="sm">Try video next</AppButton>}>
            <strong>You hit mock-ready on numerical.</strong> Grounded in your last three timed mocks.
          </AppBanner>
          <AppBanner tone="accent">
            <strong>New questions added.</strong> Your number-series bank was topped up — no repeats.
          </AppBanner>
          <AppBanner tone="warn">
            <strong>Your video upload is still retrying.</strong> Your transcript coaching is ready now.
          </AppBanner>
        </div>
      </Scene>

      <Scene title="Tooltip & popover" subtitle="AppTooltip · AppPopover">
        <div className="flex flex-wrap items-center gap-8 py-4">
          <AppTooltip label="No leaked set helps you — every item is fresh">
            <AppButton variant="secondary" size="sm">
              Why “generated”?
            </AppButton>
          </AppTooltip>
          <AppPopover trigger={<AppPill tone="good" dot>Mock-ready</AppPill>}>
            <div className="mb-1.5 font-serif text-[16px] font-medium">Mock-ready</div>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              70%+ on this family, under time, across your last three mocks. A grounded read on your
              real history — never a hollow “you're ready!”.
            </p>
          </AppPopover>
        </div>
        <Note>Overlays are the one exception to the no-shadow rule — a shallow soft shadow lifts them off the page.</Note>
      </Scene>
    </div>
  );
}
