import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppPill / AppTag — status pills and quiet meta tags.
 *
 * Visual spec: design-system/projects/gaskya/preview/26-avatars-pills.html
 * Hairline, text-coloured, never loud.
 */
export type AppPillTone = 'neutral' | 'accent' | 'good' | 'warn' | 'crit' | 'ink';

export interface AppPillProps {
  tone?: AppPillTone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

const TONE: Record<AppPillTone, { color: string; border: string; bg: string }> = {
  neutral: { color: 'var(--ink-2)', border: 'var(--hair)', bg: 'var(--sheet)' },
  accent: { color: 'var(--ac)', border: 'var(--ac-edge)', bg: 'var(--ac-soft)' },
  good: { color: 'var(--good)', border: 'var(--good-edge)', bg: 'var(--good-soft)' },
  warn: { color: 'var(--warn)', border: 'var(--warn-edge)', bg: 'var(--warn-soft)' },
  crit: { color: 'var(--crit)', border: 'var(--crit-edge)', bg: 'var(--crit-soft)' },
  ink: { color: '#fff', border: 'var(--ink)', bg: 'var(--ink)' },
};

export function AppPill({ tone = 'neutral', dot, children, className }: AppPillProps) {
  const t = TONE[tone];
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold tracking-[0.02em]', className)}
      style={{ color: t.color, borderColor: t.border, background: t.bg }}
    >
      {dot ? <span className="h-[7px] w-[7px] rounded-full" style={{ background: tone === 'neutral' ? 'var(--ink-4)' : 'currentColor' }} /> : null}
      {children}
    </span>
  );
}

export interface AppTagProps {
  children: ReactNode;
  className?: string;
}

/** A quiet mono meta tag — family / sub-skill labels. */
export function AppTag({ children, className }: AppTagProps) {
  return (
    <span
      className={cn('font-mono text-[10px] uppercase tracking-[0.06em]', className)}
      style={{ color: 'var(--ink-4)' }}
    >
      {children}
    </span>
  );
}
