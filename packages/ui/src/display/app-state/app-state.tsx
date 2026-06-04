import { type ReactNode } from 'react';

import { Sparkles } from '../../icons/index.ts';
import { cn } from '../../utils/cn.ts';

/**
 * State display — skeleton, empty, error.
 *
 * Visual spec: design-system/projects/gaskya/preview/25-skeletons-empty.html
 * Built for Halima's network: the video failing is an amber inconvenience,
 * never a crimson catastrophe. Empty states speak in the coach's voice.
 */

export interface AppSkeletonProps {
  className?: string;
  /** preset shape; or compose your own with className */
  shape?: 'line' | 'block' | 'circle';
}

export function AppSkeleton({ className, shape = 'line' }: AppSkeletonProps) {
  const base =
    'rounded-[8px] bg-[linear-gradient(90deg,var(--paper-2)_25%,var(--hair-2)_37%,var(--paper-2)_63%)] [background-size:400%_100%] [animation:gk-shimmer_1.4s_ease_infinite]';
  const shapeCls =
    shape === 'circle' ? 'rounded-full' : shape === 'block' ? 'h-24' : 'h-3';
  return <span className={cn('block', base, shapeCls, className)} />;
}

export interface AppEmptyStateProps {
  icon?: ReactNode;
  title: string;
  body?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function AppEmptyState({ icon, title, body, action, className }: AppEmptyStateProps) {
  return (
    <div className={cn('px-4 py-8 text-center', className)}>
      <div
        className="mx-auto mb-4 grid h-[52px] w-[52px] place-items-center rounded-full border"
        style={{ background: 'var(--ac-soft)', borderColor: 'var(--ac-edge)', color: 'var(--ac)' }}
      >
        {icon ?? <Sparkles size={20} strokeWidth={2} />}
      </div>
      <div className="mb-2 font-serif text-[17px] font-medium" style={{ color: 'var(--ink)' }}>
        {title}
      </div>
      {body ? (
        <p className="mx-auto mb-[18px] max-w-[36ch] text-[13px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>
          {body}
        </p>
      ) : null}
      {action}
    </div>
  );
}

export interface AppErrorStateProps {
  title: string;
  body?: ReactNode;
  tone?: 'crit' | 'warn';
  className?: string;
}

/** A left-keel callout. Default amber (degrade, don't catastrophise). */
export function AppErrorState({ title, body, tone = 'warn', className }: AppErrorStateProps) {
  const keel = tone === 'crit' ? 'var(--crit)' : 'var(--warn)';
  const bg = tone === 'crit' ? 'var(--crit-soft)' : 'var(--warn-soft)';
  return (
    <div
      className={cn('rounded-[10px] p-4', className)}
      style={{ borderLeft: `3px solid ${keel}`, background: bg }}
    >
      <div className="mb-1 text-[13.5px] font-semibold" style={{ color: 'var(--ink)' }}>
        {title}
      </div>
      {body ? (
        <p className="m-0 text-[12.5px]" style={{ color: 'var(--ink-3)' }}>
          {body}
        </p>
      ) : null}
    </div>
  );
}
