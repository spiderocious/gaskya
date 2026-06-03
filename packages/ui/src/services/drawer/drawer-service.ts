import { DrawerStore } from './drawer-store.ts';
import type { ModalItem, ToastItem } from './drawer-store.ts';

/**
 * DrawerService — imperative toasts + modals from anywhere, no props/context.
 *
 *   DrawerService.toast({ title: 'Saved.', variant: 'good' });
 *   DrawerService.showConfirmation('Delete attempt?', 'This can't be undone.',
 *     () => removeAttempt(), undefined, 'Delete', 'Keep it');
 *
 * Mount <ModalHost /> and <ToastHost /> once at the app root.
 */
class DrawerServiceClass {
  private store = new DrawerStore();

  getStore(): DrawerStore {
    return this.store;
  }

  toast = (item: Omit<ToastItem, 'id'>): void => {
    this.store.toast(item);
  };

  dismissToast = (id: string): void => {
    this.store.dismissToast(id);
  };

  showModal = (item: Omit<ModalItem, 'id'>): void => {
    this.store.showModal(item);
  };

  dismissModal = (): void => {
    this.store.dismissModal();
  };

  showConfirmation = (
    title: string,
    body: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant: ModalItem['variant'] = 'confirm',
  ): void => {
    this.store.showModal({ title, body, variant, confirmLabel, cancelLabel, onConfirm, onCancel });
  };
}

export const DrawerService = new DrawerServiceClass();
