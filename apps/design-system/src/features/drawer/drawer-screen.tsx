import { DrawerService, AppButton } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function DrawerScreen() {
  return (
    <div>
      <ScreenHeader num="Drawer · Overlays" title="Drawer service" blurb="Imperative toasts & modals from anywhere — no props, no context." />

      <Scene title="Toasts" subtitle="DrawerService.toast(...)">
        <div className="flex flex-wrap gap-3">
          <AppButton size="sm" onClick={() => DrawerService.toast({ title: 'Answer saved — synced.', variant: 'good' })}>
            Success toast
          </AppButton>
          <AppButton size="sm" variant="secondary" onClick={() => DrawerService.toast({ title: 'Connection dropped — saving locally.', subtitle: 'We will retry in the background.', variant: 'warn', action: 'Retry' })}>
            Warn toast
          </AppButton>
          <AppButton size="sm" variant="ghost" onClick={() => DrawerService.toast({ title: 'Item retired from the bank.', variant: 'crit' })}>
            Critical toast
          </AppButton>
        </div>
      </Scene>

      <Scene title="Confirmation modal" subtitle="DrawerService.showConfirmation(...)">
        <div className="flex flex-wrap gap-3">
          <AppButton
            size="sm"
            onClick={() =>
              DrawerService.showConfirmation(
                'Submit this mock now?',
                'You have answered 36 of 40. The rest will be marked blank.',
                () => DrawerService.toast({ title: 'Mock submitted.', variant: 'good' }),
              )
            }
          >
            Confirm modal
          </AppButton>
          <AppButton
            size="sm"
            variant="danger"
            onClick={() =>
              DrawerService.showConfirmation(
                'Delete this attempt?',
                'Your recording and its feedback will be gone for good.',
                () => DrawerService.toast({ title: 'Attempt deleted.', variant: 'crit' }),
                undefined,
                'Delete',
                'Keep it',
                'crit',
              )
            }
          >
            Critical modal
          </AppButton>
        </div>
        <Note>
          <code>{'<ModalHost />'}</code> and <code>{'<ToastHost />'}</code> are mounted once at the app
          root (see app.tsx). Call the service from anywhere — a backing pub-sub store drives both.
        </Note>
      </Scene>
    </div>
  );
}
