import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../utils/cn.ts';
import { DrawerService } from './drawer-service.ts';

const KEEL = {
  default: 'var(--good)',
  good: 'var(--good)',
  warn: 'var(--warn)',
  crit: 'var(--crit)',
} as const;

/** Mount once at the app root. Renders stacked imperative toasts. */
export function ToastHost() {
  const { toasts } = useSyncExternalStore(
    (cb) => DrawerService.getStore().subscribe(cb),
    () => DrawerService.getStore().getState(),
  );

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn('flex min-w-[320px] max-w-[420px] flex-col gap-1 rounded-[14px] border-l-[3px] px-4 py-3')}
          style={{
            background: 'var(--ink)',
            borderLeftColor: KEEL[toast.variant ?? 'default'],
            boxShadow: '0 10px 30px -14px rgba(44,38,32,0.5)',
          }}
          role="status"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="text-[13.5px] font-medium" style={{ color: 'var(--paper)' }}>
              {toast.title}
            </span>
            <button
              onClick={() => DrawerService.dismissToast(toast.id)}
              className="shrink-0 font-mono text-[12px]"
              style={{ color: 'rgba(246,241,236,0.5)' }}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
          {toast.subtitle ? (
            <span className="font-serif text-[11.5px] italic" style={{ color: 'rgba(246,241,236,0.7)' }}>
              {toast.subtitle}
            </span>
          ) : null}
          {toast.action ? (
            <span className="mt-1 text-left text-[12px] underline" style={{ color: 'rgba(246,241,236,0.8)' }}>
              {toast.action}
            </span>
          ) : null}
        </div>
      ))}
    </div>,
    document.body,
  );
}
