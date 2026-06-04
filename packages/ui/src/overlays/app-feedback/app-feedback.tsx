import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * Feedback components — Toast, Banner, InlineAlert (presentational).
 *
 * Visual spec: design-system/projects/gaskya/preview/41-feedback.html
 * The imperative versions are launched via DrawerService (services/drawer),
 * which stacks Toasts in six zones and Banners top/bottom. These standalone
 * components are renderable anywhere too.
 *
 * Tone set: default · good · warn · crit · accent. Crimson (crit) stays
 * reserved; amber (warn) is everyday; sage (good) is saved/on-track.
 */
export type FeedbackTone = 'default' | 'good' | 'warn' | 'crit' | 'accent';

export interface FeedbackAction {
  label: string;
  onClick: () => void;
}

const KEEL: Record<FeedbackTone, string> = {
  default: 'var(--good)',
  good: 'var(--good)',
  warn: 'var(--warn)',
  crit: 'var(--crit)',
  accent: 'var(--ac)',
};

// ============== Toast ==============

export interface AppToastProps {
  tone?: FeedbackTone;
  children: ReactNode;
  subtitle?: ReactNode;
  action?: FeedbackAction;
  onDismiss?: () => void;
  className?: string;
}

/** Floating dark pill. ToastHost stacks these in six position zones. */
export function AppToast({ tone = 'default', children, subtitle, action, onDismiss, className }: AppToastProps) {
  return (
    <div
      role="status"
      className={cn('flex min-w-[300px] max-w-[420px] flex-col gap-1 rounded-[16px] border-l-[3px] px-4 py-3 shadow-[0_10px_30px_-14px_rgba(44,38,32,0.5)]', className)}
      style={{ background: 'var(--ink)', borderLeftColor: KEEL[tone] }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[13.5px] font-medium" style={{ color: 'var(--paper)' }}>
          {children}
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
        <button
          onClick={action.onClick}
          className="mt-1 self-start rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] hover:bg-white/25"
          style={{ color: 'var(--paper)' }}
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}

// ============== Banner ==============

const BANNER_BG: Record<FeedbackTone, string> = {
  default: 'var(--paper-2)',
  good: 'var(--good-soft)',
  warn: 'var(--warn-soft)',
  crit: 'var(--crit-soft)',
  accent: 'var(--ac-soft)',
};

const DEFAULT_GLYPH: Record<FeedbackTone, string> = {
  default: 'i',
  good: '✓',
  warn: '!',
  crit: '!',
  accent: 'i',
};

export interface AppBannerProps {
  tone?: FeedbackTone;
  title: ReactNode;
  description?: ReactNode;
  cta?: FeedbackAction;
  icon?: ReactNode;
  className?: string;
}

/** Persistent full-width strip. BannerHost renders these top or bottom. */
export function AppBanner({ tone = 'accent', title, description, cta, icon, className }: AppBannerProps) {
  return (
    <div
      role={tone === 'crit' || tone === 'warn' ? 'alert' : 'status'}
      className={cn('flex items-center gap-3.5 rounded-[18px] border-l-[3px] px-5 py-4', className)}
      style={{ background: BANNER_BG[tone], borderLeftColor: KEEL[tone] }}
    >
      <span
        aria-hidden
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[14px] font-black text-white"
        style={{ background: KEEL[tone] }}
      >
        {icon ?? DEFAULT_GLYPH[tone]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="m-0 font-serif text-[16px] font-semibold" style={{ color: 'var(--ink)' }}>
          {title}
        </p>
        {description !== undefined && description !== null ? (
          <p className="m-0 mt-[2px] text-[13px] leading-[1.5]" style={{ color: 'var(--ink-3)' }}>
            {description}
          </p>
        ) : null}
      </div>
      {cta ? (
        <button
          onClick={cta.onClick}
          className="cursor-pointer bg-transparent px-0 text-[12px] font-bold uppercase tracking-[0.08em] hover:underline"
          style={{ color: 'var(--ink)' }}
        >
          {cta.label}
        </button>
      ) : null}
    </div>
  );
}

// ============== InlineAlert ==============

const INLINE_TONE: Record<FeedbackTone, { bg: string; color: string }> = {
  default: { bg: 'var(--paper-2)', color: 'var(--ink)' },
  good: { bg: 'var(--good-soft)', color: 'var(--good)' },
  warn: { bg: 'var(--warn-soft)', color: 'var(--warn)' },
  crit: { bg: 'var(--crit-soft)', color: 'var(--crit)' },
  accent: { bg: 'var(--ac-soft)', color: 'var(--ac)' },
};

export interface AppInlineAlertProps {
  tone?: FeedbackTone;
  children: ReactNode;
  className?: string;
}

/** Compact tone-tinted strip for inside forms / dense lists. No icon, no CTA. */
export function AppInlineAlert({ tone = 'accent', children, className }: AppInlineAlertProps) {
  const t = INLINE_TONE[tone];
  return (
    <div
      role={tone === 'crit' || tone === 'warn' ? 'alert' : 'status'}
      className={cn('rounded-[12px] px-4 py-2.5 text-[13px] font-semibold', className)}
      style={{ background: t.bg, color: t.color }}
    >
      {children}
    </div>
  );
}
