import { DrawerService, AppButton } from '@gaskya/ui';

import { ScreenHeader, Scene, SectionBreak, Note } from '@shared/preview-canvas.tsx';

export function DrawerScreen() {
  return (
    <div>
      <ScreenHeader num="Drawer · Overlays" title="Drawer service" blurb="Imperative toasts, banners & modals from anywhere — no props, no context. Six toast zones, swipe-to-dismiss, four modal kinds, five modal positions." />

      <SectionBreak label="Toasts — tone" />
      <Scene title="DrawerService.toast(message, { tone })" subtitle="default · good · warn · crit · accent">
        <div className="flex flex-wrap gap-3">
          <AppButton size="sm" onClick={() => DrawerService.toast('Answer saved — synced.', { tone: 'good' })}>Good</AppButton>
          <AppButton size="sm" variant="secondary" onClick={() => DrawerService.toast('Connection dropped — saving locally.', { tone: 'warn', subtitle: 'We will retry in the background.', action: { label: 'Retry', onClick: () => {} } })}>Warn + action</AppButton>
          <AppButton size="sm" variant="ghost" onClick={() => DrawerService.toast('Item retired from the bank.', { tone: 'crit' })}>Critical</AppButton>
          <AppButton size="sm" variant="ghost" onClick={() => DrawerService.toast('Generated 12 fresh items.', { tone: 'accent' })}>Accent</AppButton>
          <AppButton size="sm" variant="secondary" onClick={() => DrawerService.toast('Offline — your work is safe on this phone.', { sticky: true, tone: 'warn' })}>Sticky (no auto-dismiss)</AppButton>
        </div>
        <Note>Drag any non-sticky toast sideways to dismiss it. Sticky toasts stay until dismissed programmatically.</Note>
      </Scene>

      <SectionBreak label="Toasts — the six position zones" />
      <Scene title="DrawerService.toast(message, { position })">
        <div className="grid max-w-[480px] grid-cols-3 gap-3">
          {([
            'top-left', 'top-center', 'top-right',
            'bottom-left', 'bottom-center', 'bottom-right',
          ] as const).map((pos) => (
            <AppButton key={pos} size="sm" variant="secondary" onClick={() => DrawerService.toast(pos, { position: pos, tone: 'accent' })}>
              {pos}
            </AppButton>
          ))}
        </div>
      </Scene>

      <SectionBreak label="Banners — top / bottom, sticky or timed" />
      <Scene title="DrawerService.banner(title, { ... })">
        <div className="flex flex-wrap gap-3">
          <AppButton size="sm" onClick={() => DrawerService.banner('You hit mock-ready on numerical.', { tone: 'good', description: 'Grounded in your last three timed mocks.', cta: { label: 'Try video', onClick: () => {} } })}>Top · good + CTA</AppButton>
          <AppButton size="sm" variant="secondary" onClick={() => DrawerService.banner('Your video is still uploading.', { tone: 'warn', position: 'bottom', cta: { label: 'Retry', onClick: () => {} } })}>Bottom · warn</AppButton>
          <AppButton size="sm" variant="ghost" onClick={() => DrawerService.banner('New questions added — no repeats.', { tone: 'accent', sticky: false, durationMs: 4000 })}>Auto-dismiss (4s)</AppButton>
        </div>
      </Scene>

      <SectionBreak label="Modals — four kinds" />
      <Scene title="confirm · destructive · critical · custom">
        <div className="flex flex-wrap gap-3">
          <AppButton size="sm" onClick={() => DrawerService.confirm('Submit this mock now?', { description: 'You have answered 36 of 40. The rest will be marked blank.', confirmLabel: 'Submit', onConfirm: () => DrawerService.toast('Mock submitted.', { tone: 'good' }) })}>Confirm</AppButton>
          <AppButton size="sm" variant="danger" onClick={() => DrawerService.confirm('Delete this attempt?', { description: 'Your recording and its feedback will be gone for good.', destructive: true, confirmLabel: 'Delete', cancelLabel: 'Keep it', onConfirm: () => DrawerService.toast('Attempt deleted.', { tone: 'crit' }) })}>Destructive</AppButton>
          <AppButton size="sm" variant="danger" onClick={() => DrawerService.critical('Delete your account?', { description: 'Everything will be permanently erased.', confirmPhrase: 'DELETE', confirmPrompt: <>Type <strong>DELETE</strong> to confirm</>, confirmLabel: 'Delete account', onConfirm: () => DrawerService.toast('Account deleted.', { tone: 'crit' }) })}>Critical (type-to-confirm)</AppButton>
          <AppButton size="sm" variant="ghost" onClick={() => DrawerService.openModal(<div className="font-serif text-[18px]">Any JSX body — image preview, a long form, a tutorial. The service gives you the scrim, the X, and the dismiss behaviour.</div>)}>Custom body</AppButton>
        </div>
      </Scene>

      <SectionBreak label="Modals — five positions (sheets & drawers)" />
      <Scene title="DrawerService.openModal(body, { position })">
        <div className="flex flex-wrap gap-3">
          {(['center', 'top', 'bottom', 'left', 'right'] as const).map((position) => (
            <AppButton key={position} size="sm" variant="secondary" onClick={() => DrawerService.openModal(<div className="font-serif text-[18px]">Position: <strong>{position}</strong></div>, { position })}>
              {position}
            </AppButton>
          ))}
        </div>
        <Note>center = confirm dialog · top/bottom = sheets · left/right = side drawers. Add <code>sticky: true</code> or <code>closeOnOutsideClick: false</code> for hard-to-dismiss modals.</Note>
      </Scene>

      <Scene title="Hard-to-dismiss" subtitle="closeOnOutsideClick: false · sticky">
        <div className="flex flex-wrap gap-3">
          <AppButton size="sm" variant="secondary" onClick={() => DrawerService.openModal(<div className="font-serif text-[18px]">Outside-click won't close me — use the X or Escape.</div>, { closeOnOutsideClick: false })}>No outside-click</AppButton>
          <AppButton size="sm" variant="secondary" onClick={() => DrawerService.confirm('Finish setup first', { description: 'Only the buttons dismiss this — no scrim, no Escape.', sticky: true, confirmLabel: 'Done', onConfirm: () => {} })}>Sticky modal</AppButton>
        </div>
        <Note><code>{'<ModalHost /> <ToastHost /> <BannerHost />'}</code> are mounted once at the app root (app.tsx). A pub-sub store drives all three.</Note>
      </Scene>
    </div>
  );
}
