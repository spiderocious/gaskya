import type { ReactNode } from 'react';

import type { FeedbackTone } from '../../overlays/app-feedback/index.ts';
import type { ModalPosition } from '../../overlays/app-modal/index.ts';
import { drawerStore, type BannerPosition, type ToastPosition } from './drawer-store.ts';

// Imperative service. Call from anywhere — no props, no context, no Provider.
// Mount <ToastHost />, <BannerHost />, <ModalHost /> once at the app root.

interface SharedModalConfig {
  position?: ModalPosition;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  sticky?: boolean;
}

// ============== Toast ==============

export interface ToastOptions {
  tone?: FeedbackTone;
  subtitle?: ReactNode;
  /** Auto-dismiss after this many ms. Default 3500. Ignored when sticky. */
  durationMs?: number;
  /** Won't auto-dismiss, can't be swiped. Default false. */
  sticky?: boolean;
  /** Which of six zones. Default 'bottom-center'. */
  position?: ToastPosition;
  action?: { label: string; onClick: () => void };
}

function toast(message: ReactNode, opts: ToastOptions = {}): string {
  return drawerStore.pushToast({
    tone: opts.tone ?? 'default',
    message,
    ...(opts.subtitle !== undefined ? { subtitle: opts.subtitle } : {}),
    durationMs: opts.durationMs ?? 3500,
    sticky: opts.sticky ?? false,
    position: opts.position ?? 'bottom-center',
    ...(opts.action ? { action: opts.action } : {}),
  });
}

function dismissToast(id: string): void {
  drawerStore.dismissToast(id);
}

// ============== Banner ==============

export interface BannerOptions {
  tone?: FeedbackTone;
  description?: ReactNode;
  icon?: ReactNode;
  cta?: { label: string; onClick: () => void };
  /** Top or bottom. Default 'top'. */
  position?: BannerPosition;
  /** Won't auto-dismiss. Default true (banners are sticky by default). */
  sticky?: boolean;
  /** Auto-dismiss ms when not sticky. Default 0 (never). */
  durationMs?: number;
}

function banner(title: ReactNode, opts: BannerOptions = {}): string {
  return drawerStore.pushBanner({
    tone: opts.tone ?? 'accent',
    title,
    ...(opts.description !== undefined ? { description: opts.description } : {}),
    ...(opts.icon !== undefined ? { icon: opts.icon } : {}),
    ...(opts.cta !== undefined ? { cta: opts.cta } : {}),
    position: opts.position ?? 'top',
    sticky: opts.sticky ?? true,
    durationMs: opts.durationMs ?? 0,
  });
}

function dismissBanner(id: string): void {
  drawerStore.dismissBanner(id);
}

// ============== Confirm (standard / destructive) ==============

export interface ConfirmOptions extends SharedModalConfig {
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  children?: ReactNode;
  onCancel?: () => void;
}

function confirm(title: ReactNode, options: ConfirmOptions & { onConfirm: () => void }): void {
  const { onConfirm, description, confirmLabel, cancelLabel, destructive, children, onCancel, ...shared } = options;
  drawerStore.openModal({
    kind: destructive === true ? 'danger' : 'standard',
    title,
    ...(description !== undefined ? { description } : {}),
    confirmLabel: confirmLabel ?? (destructive === true ? 'Confirm' : 'OK'),
    ...(cancelLabel !== undefined ? { cancelLabel } : {}),
    onConfirm: () => {
      drawerStore.closeModal();
      onConfirm();
    },
    ...(onCancel !== undefined
      ? { onCancel: () => { drawerStore.closeModal(); onCancel(); } }
      : {}),
    ...(children !== undefined ? { children } : {}),
    position: shared.position ?? 'center',
    closeOnOutsideClick: shared.closeOnOutsideClick ?? true,
    closeOnEscape: shared.closeOnEscape ?? true,
    sticky: shared.sticky ?? false,
  });
}

// ============== Critical (irreversible, type-to-confirm) ==============

export interface CriticalOptions extends SharedModalConfig {
  description?: ReactNode;
  confirmLabel: string;
  /** Word/phrase the user must type, case-sensitive. */
  confirmPhrase: string;
  confirmPrompt: ReactNode;
  cancelLabel?: string;
  children?: ReactNode;
  onCancel?: () => void;
}

function critical(title: ReactNode, options: CriticalOptions & { onConfirm: () => void }): void {
  const { onConfirm, description, confirmPhrase, confirmPrompt, confirmLabel, cancelLabel, children, onCancel, ...shared } = options;
  drawerStore.openModal({
    kind: 'critical',
    title,
    ...(description !== undefined ? { description } : {}),
    confirmPhrase,
    confirmPrompt,
    confirmLabel,
    ...(cancelLabel !== undefined ? { cancelLabel } : {}),
    onConfirm: () => {
      drawerStore.closeModal();
      onConfirm();
    },
    ...(onCancel !== undefined
      ? { onCancel: () => { drawerStore.closeModal(); onCancel(); } }
      : {}),
    ...(children !== undefined ? { children } : {}),
    position: shared.position ?? 'center',
    closeOnOutsideClick: shared.closeOnOutsideClick ?? false, // safer default for critical
    closeOnEscape: shared.closeOnEscape ?? true,
    sticky: shared.sticky ?? false,
  });
}

// ============== Custom modal ==============

export interface CustomModalOptions extends SharedModalConfig {
  hideCloseButton?: boolean;
  onClose?: () => void;
}

function openModal(body: ReactNode, options: CustomModalOptions = {}): void {
  const { onClose, hideCloseButton, ...shared } = options;
  drawerStore.openModal({
    kind: 'custom',
    body,
    hideCloseButton: hideCloseButton ?? false,
    ...(onClose !== undefined
      ? { onCancel: () => { drawerStore.closeModal(); onClose(); } }
      : {}),
    position: shared.position ?? 'center',
    closeOnOutsideClick: shared.closeOnOutsideClick ?? true,
    closeOnEscape: shared.closeOnEscape ?? true,
    sticky: shared.sticky ?? false,
  });
}

function closeModal(): void {
  drawerStore.closeModal();
}

/**
 * DrawerService — imperative toast + banner + modal singleton.
 *
 *   DrawerService.toast('Answer saved.', { tone: 'good' });
 *   DrawerService.toast('Offline', { sticky: true, position: 'top-right' });
 *   DrawerService.banner('Your video is still uploading', { tone: 'warn',
 *     cta: { label: 'Retry', onClick: () => {} } });
 *   DrawerService.confirm('Submit this mock?', { onConfirm: () => {} });
 *   DrawerService.critical('Delete account?', {
 *     confirmPhrase: 'DELETE',
 *     confirmPrompt: <>Type <strong>DELETE</strong> to confirm</>,
 *     confirmLabel: 'Delete', onConfirm: () => {} });
 *   DrawerService.openModal(<MyBody />, { position: 'right', sticky: true });
 */
export const DrawerService = {
  toast,
  dismissToast,
  banner,
  dismissBanner,
  confirm,
  critical,
  openModal,
  closeModal,
};
