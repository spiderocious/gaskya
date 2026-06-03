import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppToast / AppBanner — inline (presentational) feedback. The imperative
 * versions are launched via DrawerService (services/drawer).
 *
 * Visual spec: design-system/projects/gaskya/preview/41-feedback.html
 */
export type FeedbackTone = 'default' | 'good' | 'warn' | 'crit' | 'accent';

const KEEL: Record<FeedbackTone, string> = {
  default: 'var(--good)',
  good: 'var(--good)',
  warn: 'var(--warn)',
  crit: 'var(--crit)',
  accent: 'var(--ac)',
};

export interface AppToastProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  tone?: FeedbackTone;
  onDismiss?: () => void;
  className?: string;
}

export function AppToast({ title, subtitle, action, tone = 'default', onDismiss, className }: AppToastProps) {
  return (
    <div
      className={cn('flex min-w-[320px] max-w-[420px] flex-col gap-1 rounded-[14px] border-l-[3px] px-4 py-3 shadow-[0_10px_30px_-14px_rgba(44,38,32,0.5)]', className)}
      style={{ background: 'var(--ink)', borderLeftColor: KEEL[tone] }}
      role="status"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[13.5px] font-medium" style={{ color: 'var(--paper)' }}>
          {title}
        </span>
        {onDismiss ? (
          <button onClick={onDismiss} className="shrink-0 font-mono text-[12px]" style={{ color: 'rgba(246,241,236,0.5)' }} aria-label="Dismiss">
            ×
          </button>
        ) : null}
      </div>
      {subtitle ? (
        <span className="font-serif text-[11.5px] italic" style={{ color: 'rgba(246,241,236,0.7)' }}>
          {subtitle}
        </span>
      ) : null}
      {action ? (
        <span className="mt-1 text-[12px] underline" style={{ color: 'rgba(246,241,236,0.8)' }}>
          {action}
        </span>
      ) : null}
    </div>
  );
}

export interface AppBannerProps {
  tone?: FeedbackTone;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function AppBanner({ tone = 'accent', children, action, className }: AppBannerProps) {
  const bg =
    tone === 'good' ? 'var(--good-soft)' : tone === 'warn' ? 'var(--warn-soft)' : tone === 'crit' ? 'var(--crit-soft)' : 'var(--ac-soft)';
  return (
    <div
      className={cn('flex items-center gap-3 rounded-[14px] border-l-[3px] px-4 py-3.5 text-[13.5px]', className)}
      style={{ background: bg, borderLeftColor: KEEL[tone] }}
    >
      <span className="flex-1">{children}</span>
      {action}
    </div>
  );
}
