import { cn } from '../../utils/cn.ts';

/**
 * AppClock — the live test clock. The one place crimson is allowed.
 *
 * Visual spec: design-system/projects/gaskya/preview/13-datetime.html (.clock)
 *
 * Presentational: pass a formatted `time` string and `urgent` when the clock
 * is the thing that matters most (final seconds). The pulse animation is in
 * styles.css (gk-clockpulse).
 */
export interface AppClockProps {
  time: string;
  label?: string;
  urgent?: boolean;
  className?: string;
}

export function AppClock({ time, label = 'left', urgent, className }: AppClockProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2', className)}
      style={{
        borderColor: urgent ? 'var(--crit)' : 'var(--hair)',
        background: urgent ? 'var(--crit-soft)' : 'var(--sheet)',
      }}
    >
      <span
        className="h-[9px] w-[9px] shrink-0 rounded-full"
        style={{
          background: urgent ? 'var(--crit)' : 'var(--ac)',
          animation: urgent ? 'gk-clockpulse 1s ease-in-out infinite' : undefined,
        }}
      />
      <span
        className="font-mono text-[16px] font-semibold tracking-[0.02em] [font-feature-settings:'tnum']"
        style={{ color: urgent ? 'var(--crit)' : 'var(--ink)' }}
      >
        {time}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--ink-3)' }}>
        {label}
      </span>
    </span>
  );
}
