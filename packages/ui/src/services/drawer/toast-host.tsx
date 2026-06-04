import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../utils/cn.ts';
import { AppToast } from '../../overlays/app-feedback/index.ts';
import { DrawerService } from './drawer-service.ts';
import { drawerStore, type ToastEntry, type ToastPosition } from './drawer-store.ts';
import { SwipeableToast } from './swipeable-toast.tsx';

const POSITIONS: readonly ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const ZONE: Record<ToastPosition, string> = {
  'top-left': 'top-6 left-6 items-start',
  'top-center': 'top-6 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'top-6 right-6 items-end',
  'bottom-left': 'bottom-6 left-6 items-start flex-col-reverse',
  'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2 items-center flex-col-reverse',
  'bottom-right': 'bottom-6 right-6 items-end flex-col-reverse',
};

/**
 * ToastHost — mount once at the app root. Renders the toast queue grouped into
 * six position zones via createPortal; each toast is swipe-to-dismiss unless
 * sticky.
 */
export function ToastHost() {
  const state = useSyncExternalStore(drawerStore.subscribe, drawerStore.getState);
  if (state.toasts.length === 0 || typeof document === 'undefined') return null;

  return createPortal(
    <>
      {POSITIONS.map((pos) => {
        const zone = state.toasts.filter((t) => t.position === pos);
        if (zone.length === 0) return null;
        return (
          <div key={pos} className={cn('pointer-events-none fixed z-[60] flex max-w-[calc(100vw-3rem)] flex-col gap-3', ZONE[pos])}>
            {zone.map((t) => (
              <ToastSlot key={t.id} toast={t} />
            ))}
          </div>
        );
      })}
    </>,
    document.body,
  );
}

function ToastSlot({ toast }: { toast: ToastEntry }) {
  const action = toast.action;
  return (
    <div className="pointer-events-auto">
      <SwipeableToast disabled={toast.sticky} onDismiss={() => DrawerService.dismissToast(toast.id)}>
        <AppToast
          tone={toast.tone}
          {...(toast.subtitle !== undefined ? { subtitle: toast.subtitle } : {})}
          onDismiss={() => DrawerService.dismissToast(toast.id)}
          {...(action !== undefined
            ? {
                action: {
                  label: action.label,
                  onClick: () => {
                    action.onClick();
                    DrawerService.dismissToast(toast.id);
                  },
                },
              }
            : {})}
        >
          {toast.message}
        </AppToast>
      </SwipeableToast>
    </div>
  );
}
