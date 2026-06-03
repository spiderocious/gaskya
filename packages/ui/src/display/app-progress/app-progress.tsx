import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * Progress family — track, ring, spinner, pipeline.
 *
 * Visual spec: design-system/projects/gaskya/preview/24-progress.html
 * Soft tracks, aubergine fill. Spinner/indeterminate honour reduced-motion
 * via the global rule in styles.css.
 */

export interface AppTrackProps {
  value: number; // 0–100
  tone?: 'accent' | 'good' | 'warn';
  thin?: boolean;
  className?: string;
}

const TRACK_FILL = { accent: 'var(--ac)', good: 'var(--good)', warn: 'var(--warn)' } as const;

export function AppTrack({ value, tone = 'accent', thin, className }: AppTrackProps) {
  return (
    <span
      className={cn('block overflow-hidden rounded-full', thin ? 'h-[5px]' : 'h-2', className)}
      style={{ background: 'var(--paper-2)' }}
    >
      <span
        className="block h-full rounded-full transition-[width] duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: TRACK_FILL[tone] }}
      />
    </span>
  );
}

export interface AppProgressRingProps {
  value: number; // 0–100
  size?: number;
  children?: ReactNode;
  tone?: 'accent' | 'good' | 'warn';
  className?: string;
}

export function AppProgressRing({ value, size = 76, children, tone = 'accent', className }: AppProgressRingProps) {
  const fill = TRACK_FILL[tone];
  const inner = Math.round(size * 0.76);
  return (
    <span
      className={cn('grid shrink-0 place-items-center rounded-full', className)}
      style={{ width: size, height: size, background: `conic-gradient(${fill} 0 ${value}%, var(--paper-2) ${value}% 100%)` }}
    >
      <span className="grid place-items-center rounded-full" style={{ width: inner, height: inner, background: 'var(--sheet)' }}>
        {children}
      </span>
    </span>
  );
}

export interface AppSpinnerProps {
  size?: number;
  onDark?: boolean;
  className?: string;
}

export function AppSpinner({ size = 16, onDark, className }: AppSpinnerProps) {
  return (
    <span
      className={cn('inline-block rounded-full', className)}
      style={{
        width: size,
        height: size,
        border: `2px solid ${onDark ? 'rgba(255,255,255,0.4)' : 'var(--ac-soft)'}`,
        borderTopColor: onDark ? '#fff' : 'var(--ac)',
        animation: 'gk-spin 0.7s linear infinite',
      }}
      aria-label="Loading"
    />
  );
}

export interface AppIndeterminateProps {
  className?: string;
}

export function AppIndeterminate({ className }: AppIndeterminateProps) {
  return (
    <span className={cn('relative block h-1.5 overflow-hidden rounded-full', className)} style={{ background: 'var(--paper-2)' }}>
      <span
        className="absolute top-0 bottom-0 w-2/5 rounded-full"
        style={{ background: 'var(--ac)', animation: 'gk-indet 1.3s ease-in-out infinite' }}
      />
    </span>
  );
}

export interface PipelineStage {
  label: string;
  sub?: string;
  state: 'done' | 'now' | 'todo';
}

export interface AppPipelineProps {
  stages: ReadonlyArray<PipelineStage>;
  className?: string;
}

/** Multi-stage pipeline — what happens after a graded video. */
export function AppPipeline({ stages, className }: AppPipelineProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {stages.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-3.5 border-b py-3 last:border-0"
          style={{ borderColor: 'var(--hair-2)', opacity: s.state === 'todo' ? 0.5 : 1 }}
        >
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-[12px]"
            style={{
              background: s.state === 'done' ? 'var(--good)' : 'transparent',
              borderColor: s.state === 'done' ? 'var(--good)' : s.state === 'now' ? 'var(--ac)' : 'var(--hair)',
              color: s.state === 'done' ? '#fff' : 'var(--ink-4)',
            }}
          >
            {s.state === 'done' ? '✓' : s.state === 'now' ? <AppSpinner size={11} /> : i + 1}
          </span>
          <span>
            <span className="block text-[14px] font-semibold" style={{ color: 'var(--ink)' }}>
              {s.label}
            </span>
            {s.sub ? (
              <span className="block text-[12px]" style={{ color: 'var(--ink-3)' }}>
                {s.sub}
              </span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}
