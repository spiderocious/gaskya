import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../utils/cn.ts';
import { AppButton } from '../../primitives/app-button/index.ts';

/**
 * Modal family — ModalShell primitive + Modal / CriticalModal / CustomModal.
 *
 * Visual spec: design-system/projects/gaskya/preview/40-modals.html
 *
 * Positions turn the modal into sheets/drawers: center (confirm), top/bottom
 * (sheets), left/right (side drawers). closeOnOutsideClick / closeOnEscape /
 * sticky control dismissal. The CRITICAL idiom (type-to-confirm) is mandatory.
 */
export type ModalIntent = 'standard' | 'danger';
export type ModalPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

export interface SharedModalConfig {
  /** Where on screen the modal renders. Default: 'center'. */
  position?: ModalPosition;
  /** Clicking the scrim closes the modal. Default: true. Ignored when sticky. */
  closeOnOutsideClick?: boolean;
  /** Pressing Escape closes the modal. Default: true. Ignored when sticky. */
  closeOnEscape?: boolean;
  /** Only confirm/cancel dismisses — no scrim click, no Escape, no X. */
  sticky?: boolean;
}

const POSITION_ALIGN: Record<ModalPosition, string> = {
  center: 'items-center justify-center p-4',
  top: 'items-start justify-center',
  bottom: 'items-end justify-center',
  left: 'items-stretch justify-start',
  right: 'items-stretch justify-end',
};

const POSITION_PANEL: Record<ModalPosition, string> = {
  center: 'w-full max-w-[440px] rounded-[22px] p-6',
  top: 'w-full max-w-[680px] rounded-b-[22px] p-6',
  bottom: 'w-full max-w-[680px] rounded-t-[22px] p-6',
  left: 'h-full w-full max-w-[420px] rounded-r-[22px] overflow-y-auto p-6',
  right: 'h-full w-full max-w-[420px] rounded-l-[22px] overflow-y-auto p-6',
};

interface ModalShellProps extends SharedModalConfig {
  open: boolean;
  onClose: () => void;
  role?: 'dialog' | 'alertdialog';
  critical?: boolean;
  className?: string;
  children: ReactNode;
}

function ModalShell({
  open,
  onClose,
  role = 'dialog',
  critical,
  position = 'center',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  sticky = false,
  className,
  children,
}: ModalShellProps) {
  useEffect(() => {
    if (!open || sticky || !closeOnEscape) return undefined;
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, sticky, closeOnEscape, onClose]);

  if (!open || typeof document === 'undefined') return null;

  function handleScrim() {
    if (sticky || !closeOnOutsideClick) return;
    onClose();
  }
  function stop(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return createPortal(
    <div
      role={role}
      aria-modal="true"
      onClick={handleScrim}
      className={cn('fixed inset-0 z-50 flex', POSITION_ALIGN[position])}
      style={{ background: 'rgba(44,38,32,0.28)' }}
    >
      <div
        onClick={stop}
        className={cn('relative', POSITION_PANEL[position], className)}
        style={{
          background: 'var(--sheet)',
          border: critical ? '1px solid var(--crit-edge)' : '1px solid var(--hair)',
          boxShadow: '0 24px 60px -24px rgba(44,38,32,0.4)',
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

// ============== Modal (standard / danger confirm) ==============

export interface AppModalProps extends SharedModalConfig {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  intent?: ModalIntent;
  confirmLabel: string;
  onConfirm: () => void;
  cancelLabel?: string;
  children?: ReactNode;
  className?: string;
}

export function AppModal({
  open,
  onClose,
  title,
  description,
  intent = 'standard',
  confirmLabel,
  onConfirm,
  cancelLabel = 'Cancel',
  children,
  className,
  ...shared
}: AppModalProps) {
  return (
    <ModalShell open={open} onClose={onClose} role="dialog" {...(className !== undefined ? { className } : {})} {...shared}>
      <h2 className="m-0 mb-1.5 font-serif text-[18px] font-medium tracking-[-0.01em]" style={{ color: 'var(--ink)' }}>
        {title}
      </h2>
      {description !== undefined && description !== null ? (
        <p className="m-0 mb-[18px] text-[13px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>
          {description}
        </p>
      ) : null}
      {children}
      <div className="mt-[18px] flex items-center gap-3">
        <AppButton variant="secondary" onClick={onClose}>
          {cancelLabel}
        </AppButton>
        <AppButton variant={intent === 'danger' ? 'danger' : 'primary'} className="ml-auto" onClick={onConfirm}>
          {confirmLabel}
        </AppButton>
      </div>
    </ModalShell>
  );
}

// ============== CriticalModal (type-to-confirm) ==============

export interface AppCriticalModalProps extends SharedModalConfig {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  /** Word/phrase the user must type, case-sensitive. */
  confirmPhrase: string;
  /** Label above the input. */
  confirmPrompt: ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  cancelLabel?: string;
  children?: ReactNode;
  className?: string;
}

export function AppCriticalModal({
  open,
  onClose,
  title,
  description,
  confirmPhrase,
  confirmPrompt,
  confirmLabel,
  onConfirm,
  cancelLabel = 'Cancel',
  children,
  className,
  closeOnOutsideClick = false,
  ...shared
}: AppCriticalModalProps) {
  const [typed, setTyped] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const matched = typed === confirmPhrase;

  useEffect(() => {
    if (open) {
      setTyped('');
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    return undefined;
  }, [open]);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      role="alertdialog"
      critical
      closeOnOutsideClick={closeOnOutsideClick}
      className={className ?? ''}
      {...shared}
    >
      <span
        className="mb-3.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em]"
        style={{ background: 'var(--crit-soft)', color: 'var(--crit)' }}
      >
        Can't be undone
      </span>
      <h2 className="m-0 mb-1.5 font-serif text-[18px] font-medium tracking-[-0.01em]" style={{ color: 'var(--ink)' }}>
        {title}
      </h2>
      {description !== undefined && description !== null ? (
        <p className="m-0 mb-[18px] text-[13px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>
          {description}
        </p>
      ) : null}
      {children}
      <div className="my-3.5 rounded-[16px] px-[18px] py-4" style={{ background: 'var(--paper)' }}>
        <p className="m-0 mb-2 text-[12px] font-bold" style={{ color: 'var(--ink-3)' }}>
          {confirmPrompt}
        </p>
        <input
          ref={inputRef}
          type="text"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder={confirmPhrase}
          className="w-full rounded-[12px] border-2 px-3.5 py-3 font-mono text-[15px] tracking-[0.02em] outline-none"
          style={{
            background: matched ? 'var(--crit-soft)' : 'var(--sheet)',
            borderColor: matched ? 'var(--crit)' : 'var(--hair)',
            color: matched ? 'var(--crit)' : 'var(--ink)',
          }}
        />
      </div>
      <div className="mt-[18px] flex items-center gap-3">
        <AppButton variant="secondary" onClick={onClose}>
          {cancelLabel}
        </AppButton>
        <AppButton variant="danger" className="ml-auto" disabled={!matched} onClick={onConfirm}>
          {confirmLabel}
        </AppButton>
      </div>
    </ModalShell>
  );
}

// ============== CustomModal (arbitrary body) ==============

export interface AppCustomModalProps extends SharedModalConfig {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  hideCloseButton?: boolean;
  className?: string;
}

export function AppCustomModal({
  open,
  onClose,
  children,
  hideCloseButton = false,
  className,
  sticky,
  ...shared
}: AppCustomModalProps) {
  return (
    <ModalShell open={open} onClose={onClose} role="dialog" {...(sticky !== undefined ? { sticky } : {})} {...(className !== undefined ? { className } : {})} {...shared}>
      {hideCloseButton || sticky === true ? null : (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: 'var(--paper)', color: 'var(--ink)' }}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </svg>
        </button>
      )}
      <div className="relative">{children}</div>
    </ModalShell>
  );
}

// Back-compat alias: the original AppTypedConfirmModal maps to AppCriticalModal.
export interface AppTypedConfirmModalProps {
  open: boolean;
  title: ReactNode;
  body?: ReactNode;
  confirmWord: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function AppTypedConfirmModal({
  open,
  title,
  body,
  confirmWord,
  confirmLabel = 'Delete',
  cancelLabel = 'Keep it',
  onConfirm,
  onClose,
}: AppTypedConfirmModalProps) {
  return (
    <AppCriticalModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      {...(body !== undefined ? { description: body } : {})}
      confirmPhrase={confirmWord}
      confirmPrompt={
        <>
          Type <span style={{ color: 'var(--crit)' }}>{confirmWord}</span> to confirm
        </>
      }
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
    />
  );
}
