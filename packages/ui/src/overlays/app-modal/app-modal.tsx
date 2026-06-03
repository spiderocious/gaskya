import { useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../utils/cn.ts';
import { AppButton } from '../../primitives/app-button/index.ts';

/**
 * AppModal / AppTypedConfirmModal — overlays via createPortal to document.body.
 *
 * Visual spec: design-system/projects/gaskya/preview/40-modals.html
 * The CRITICAL idiom is mandatory: AppTypedConfirmModal guards an irreversible
 * action behind typing a literal word (e.g. DELETE).
 */
export interface AppModalProps {
  open: boolean;
  title: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  critical?: boolean;
  onClose: () => void;
  className?: string;
}

export function AppModal({ open, title, children, footer, critical, onClose, className }: AppModalProps) {
  if (!open) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(44,38,32,0.28)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn('w-full max-w-[420px] overflow-hidden rounded-[22px]', className)}
        style={{
          background: 'var(--sheet)',
          border: critical ? '1px solid var(--crit-edge)' : '1px solid var(--hair)',
          boxShadow: '0 24px 60px -24px rgba(44,38,32,0.4)',
        }}
        role="dialog"
        aria-modal="true"
      >
        {critical ? (
          <div
            className="border-b px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em]"
            style={{ background: 'var(--crit-soft)', borderColor: 'var(--crit-edge)', color: 'var(--crit)' }}
          >
            Can't be undone
          </div>
        ) : null}
        <div className="p-6">
          <div className="mb-2 font-serif text-[18px] font-medium" style={{ color: 'var(--ink)' }}>
            {title}
          </div>
          {children ? (
            <div className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>
              {children}
            </div>
          ) : null}
        </div>
        {footer ? <div className="flex items-center gap-3 px-6 pb-5">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

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
  const [typed, setTyped] = useState('');
  const armed = typed === confirmWord;
  return (
    <AppModal
      open={open}
      critical
      title={title}
      onClose={onClose}
      footer={
        <>
          <AppButton variant="secondary" onClick={onClose}>
            {cancelLabel}
          </AppButton>
          <AppButton
            variant="danger"
            className="ml-auto"
            disabled={!armed}
            onClick={() => {
              onConfirm();
              setTyped('');
            }}
          >
            {confirmLabel}
          </AppButton>
        </>
      }
    >
      {body ? <div className="mb-4">{body}</div> : null}
      <label className="mb-1.5 block text-[11.5px] font-semibold" style={{ color: 'var(--ink-3)' }}>
        Type <span style={{ color: 'var(--crit)' }}>{confirmWord}</span> to confirm
      </label>
      <input
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        placeholder={confirmWord}
        className="h-[46px] w-full rounded-[14px] border bg-[var(--sheet)] px-4 font-mono text-[15px] outline-none focus:border-[var(--crit)] focus:shadow-[0_0_0_4px_var(--crit-soft)]"
        style={{ borderColor: 'var(--hair)', color: 'var(--ink)' }}
      />
    </AppModal>
  );
}
