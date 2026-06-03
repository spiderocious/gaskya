import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { DrawerService } from './drawer-service.ts';

/** Mount once at the app root. Renders the active imperative modal. */
export function ModalHost() {
  const { modal } = useSyncExternalStore(
    (cb) => DrawerService.getStore().subscribe(cb),
    () => DrawerService.getStore().getState(),
  );

  if (!modal) return null;
  const isCrit = modal.variant === 'crit';

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(44,38,32,0.28)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) DrawerService.dismissModal();
      }}
    >
      <div
        className="w-full max-w-[420px] overflow-hidden rounded-[22px]"
        style={{
          background: 'var(--sheet)',
          border: isCrit ? '1px solid var(--crit-edge)' : '1px solid var(--hair)',
          boxShadow: '0 24px 60px -24px rgba(44,38,32,0.4)',
        }}
        role="dialog"
        aria-modal="true"
      >
        {isCrit ? (
          <div
            className="border-b px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em]"
            style={{ background: 'var(--crit-soft)', borderColor: 'var(--crit-edge)', color: 'var(--crit)' }}
          >
            Can't be undone
          </div>
        ) : null}
        <div className="p-6">
          <div className="mb-2 font-serif text-[18px] font-medium" style={{ color: isCrit ? 'var(--crit)' : 'var(--ink)' }}>
            {modal.title}
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            {modal.body}
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 pb-5">
          <button
            onClick={() => {
              modal.onCancel?.();
              DrawerService.dismissModal();
            }}
            className="rounded-full border px-4 py-2 text-[13px] font-semibold"
            style={{ borderColor: '#C9BEB2', color: 'var(--ink)', background: 'var(--sheet)' }}
          >
            {modal.cancelLabel ?? 'Cancel'}
          </button>
          <button
            onClick={() => {
              modal.onConfirm?.();
              DrawerService.dismissModal();
            }}
            className="ml-auto rounded-full px-4 py-2 text-[13px] font-semibold text-white"
            style={{ background: isCrit ? 'var(--crit)' : 'var(--ac)' }}
          >
            {modal.confirmLabel ?? 'Confirm'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
