import { AppToast, AppBanner, AppInlineAlert, AppButton, AppTooltip, AppPopover, AppPill } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function FeedbackScreen() {
  return (
    <div>
      <ScreenHeader num="41 · Overlays" title="Toasts · banners · alerts · tooltips" blurb="The system speaking quietly. The one place a shallow shadow is allowed." />

      <Scene title="Toasts — every tone" subtitle="AppToast (presentational)">
        <div className="flex flex-col gap-3">
          <AppToast tone="good" onDismiss={() => {}}>Answer saved — synced to your account</AppToast>
          <AppToast tone="warn" subtitle="We will retry in the background." action={{ label: 'Retry', onClick: () => {} }} onDismiss={() => {}}>
            Connection dropped — saving locally
          </AppToast>
          <AppToast tone="crit" onDismiss={() => {}}>Item retired from the bank</AppToast>
          <AppToast tone="accent" action={{ label: 'Review', onClick: () => {} }} onDismiss={() => {}}>Drill complete · 7/10</AppToast>
        </div>
      </Scene>

      <Scene title="Page banners — every tone, icon, CTA" subtitle="AppBanner">
        <div className="flex flex-col gap-3">
          <AppBanner tone="good" title="You hit mock-ready on numerical." description="Grounded in your last three timed mocks." cta={{ label: 'Try video next', onClick: () => {} }} />
          <AppBanner tone="accent" title="New questions added." description="Your number-series bank was topped up — no repeats." />
          <AppBanner tone="warn" title="Your video upload is still retrying." description="Your transcript coaching is ready now." cta={{ label: 'Retry', onClick: () => {} }} />
          <AppBanner tone="crit" title="An item you practised was found to be mis-keyed." description="It's been retired; the attempt won't count against you." />
        </div>
      </Scene>

      <Scene title="Inline alerts — compact, for forms & dense lists" subtitle="AppInlineAlert">
        <div className="flex max-w-[480px] flex-col gap-2">
          <AppInlineAlert tone="good">Saved continuously as you type.</AppInlineAlert>
          <AppInlineAlert tone="warn">This opening matches a widely-circulated template.</AppInlineAlert>
          <AppInlineAlert tone="crit">That doesn't look like a complete Nigerian number.</AppInlineAlert>
          <AppInlineAlert tone="accent">Generated · verified · worked solution attached.</AppInlineAlert>
        </div>
      </Scene>

      <Scene title="Tooltip & popover" subtitle="AppTooltip · AppPopover">
        <div className="flex flex-wrap items-center gap-8 py-4">
          <AppTooltip label="No leaked set helps you — every item is fresh">
            <AppButton variant="secondary" size="sm">Why “generated”?</AppButton>
          </AppTooltip>
          <AppPopover trigger={<AppPill tone="good" dot>Mock-ready</AppPill>}>
            <div className="mb-1.5 font-serif text-[16px] font-medium">Mock-ready</div>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              70%+ on this family, under time, across your last three mocks. A grounded read — never a hollow “you're ready!”.
            </p>
          </AppPopover>
        </div>
        <Note>Overlays are the one exception to the no-shadow rule — a shallow soft shadow lifts them off the page.</Note>
      </Scene>
    </div>
  );
}
