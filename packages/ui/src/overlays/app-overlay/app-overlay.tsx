import { useState, type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppTooltip / AppPopover — the one place a shallow soft shadow is allowed.
 *
 * Visual spec: design-system/projects/gaskya/preview/28-tooltips.html
 * Hand-rolled (no headless lib). Hover for tooltip; click for popover.
 */
export interface AppTooltipProps {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AppTooltip({ label, children, className }: AppTooltipProps) {
  const [show, setShow] = useState(false);
  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show ? (
        <span
          className="absolute bottom-[calc(100%+10px)] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-[9px] px-2.5 py-1.5 text-[12px]"
          style={{ background: 'var(--ink)', color: 'var(--paper)' }}
          role="tooltip"
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}

export interface AppPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AppPopover({ trigger, children, className }: AppPopoverProps) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <span onClick={() => setOpen((o) => !o)} className="cursor-pointer">
        {trigger}
      </span>
      {open ? (
        <div
          className={cn(
            'absolute top-[calc(100%+10px)] left-0 z-30 w-[280px] rounded-[18px] border p-4 shadow-[0_8px_28px_-12px_rgba(44,38,32,0.25)]',
            className,
          )}
          style={{ background: 'var(--sheet)', borderColor: 'var(--hair)' }}
          role="dialog"
        >
          {children}
        </div>
      ) : null}
    </span>
  );
}

export interface AppHovercardProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Hovercard — a richer popover that opens on hover (a sub-skill at a glance). */
export function AppHovercard({ trigger, children, className }: AppHovercardProps) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {trigger}
      {show ? (
        <div
          className={cn(
            'absolute top-[calc(100%+10px)] left-0 z-30 w-[300px] overflow-hidden rounded-[18px] border shadow-[0_8px_28px_-12px_rgba(44,38,32,0.25)]',
            className,
          )}
          style={{ background: 'var(--sheet)', borderColor: 'var(--hair)' }}
          role="dialog"
        >
          {children}
        </div>
      ) : null}
    </span>
  );
}
