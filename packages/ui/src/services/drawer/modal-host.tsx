import { useSyncExternalStore } from 'react';

import { AppModal, AppCriticalModal, AppCustomModal } from '../../overlays/app-modal/index.ts';
import { drawerStore, type ModalEntry } from './drawer-store.ts';

/**
 * ModalHost — mount once at the app root. Renders at most one modal, driven by
 * DrawerService.confirm / .critical / .openModal. Each hosted modal handles its
 * own createPortal. Shared config (position / escape / outside-click / sticky)
 * flows through.
 */
export function ModalHost() {
  const state = useSyncExternalStore(drawerStore.subscribe, drawerStore.getState);
  const m = state.modal;
  if (m === null) return null;

  const handleClose = () => {
    if (m.onCancel !== undefined) m.onCancel();
    else drawerStore.closeModal();
  };

  const shared = pickShared(m);

  if (m.kind === 'custom') {
    return (
      <AppCustomModal open onClose={handleClose} hideCloseButton={m.hideCloseButton} {...shared}>
        {m.body}
      </AppCustomModal>
    );
  }

  if (m.kind === 'critical') {
    return (
      <AppCriticalModal
        open
        onClose={handleClose}
        onConfirm={m.onConfirm}
        title={m.title}
        {...(m.description !== undefined ? { description: m.description } : {})}
        confirmPhrase={m.confirmPhrase}
        confirmPrompt={m.confirmPrompt}
        confirmLabel={m.confirmLabel}
        {...(m.cancelLabel !== undefined ? { cancelLabel: m.cancelLabel } : {})}
        {...shared}
      >
        {m.children}
      </AppCriticalModal>
    );
  }

  return (
    <AppModal
      open
      onClose={handleClose}
      onConfirm={m.onConfirm}
      title={m.title}
      {...(m.description !== undefined ? { description: m.description } : {})}
      intent={m.kind === 'danger' ? 'danger' : 'standard'}
      confirmLabel={m.confirmLabel}
      {...(m.cancelLabel !== undefined ? { cancelLabel: m.cancelLabel } : {})}
      {...shared}
    >
      {m.children}
    </AppModal>
  );
}

function pickShared(m: ModalEntry) {
  return {
    position: m.position,
    closeOnOutsideClick: m.closeOnOutsideClick,
    closeOnEscape: m.closeOnEscape,
    sticky: m.sticky,
  };
}
