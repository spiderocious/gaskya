import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppFunnelStepper — the assessment journey, shown as progress not pressure.
 *
 * Visual spec: design-system/projects/gaskya/preview/24-progress.html (stepper)
 * and 33-dashboard.html (the funnel stages). None of it is locked.
 */
export interface FunnelStage {
  label: string;
  state: 'done' | 'now' | 'todo';
  caption?: ReactNode;
}

export interface AppFunnelStepperProps {
  stages: ReadonlyArray<FunnelStage>;
  className?: string;
}

export function AppFunnelStepper({ stages, className }: AppFunnelStepperProps) {
  return (
    <div className={cn('flex items-start', className)}>
      {stages.map((s, i) => {
        const last = i === stages.length - 1;
        return (
          <div key={i} className="flex flex-1 items-start">
            <div className="flex flex-col items-center">
              <span
                className="grid h-[30px] w-[30px] place-items-center rounded-full border-[1.5px] font-mono text-[12px] font-semibold"
                style={{
                  background: s.state === 'done' ? 'var(--ac)' : 'var(--sheet)',
                  borderColor: s.state === 'todo' ? 'var(--hair)' : 'var(--ac)',
                  color: s.state === 'done' ? '#fff' : s.state === 'now' ? 'var(--ac)' : 'var(--ink-4)',
                }}
              >
                {s.state === 'done' ? '✓' : i + 1}
              </span>
              <span className="mt-2 whitespace-nowrap text-[11px]" style={{ color: 'var(--ink-3)' }}>
                {s.label}
              </span>
            </div>
            {!last ? (
              <span
                className="mt-[14px] h-[2px] flex-1"
                style={{ background: s.state === 'done' ? 'var(--ac)' : 'var(--hair)' }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
