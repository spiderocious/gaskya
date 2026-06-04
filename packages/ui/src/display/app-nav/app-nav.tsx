import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * Navigation shell — how a student moves through GasKya.
 *
 * Visual spec: design-system/projects/gaskya/preview/29-navigation.html
 * AppTopBar (desktop), AppTabBar (phone, the primary surface), AppCommandMenu.
 */

export interface NavTab {
  label: string;
  active?: boolean;
}

export interface AppTopBarProps {
  brand?: ReactNode;
  tabs: ReadonlyArray<NavTab>;
  right?: ReactNode;
  className?: string;
}
export function AppTopBar({ brand, tabs, right, className }: AppTopBarProps) {
  return (
    <div className={cn('flex items-center gap-3.5 rounded-[18px] border px-4 py-3', className)} style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
      {brand ?? (
        <span className="font-serif text-[18px] font-semibold">
          GasKya<span style={{ color: 'var(--ac)' }}>.</span>
        </span>
      )}
      <nav className="flex gap-1">
        {tabs.map((t) => (
          <span
            key={t.label}
            className="cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-semibold"
            style={{ background: t.active ? 'var(--ac-soft)' : 'transparent', color: t.active ? 'var(--ac)' : 'var(--ink-3)' }}
          >
            {t.label}
          </span>
        ))}
      </nav>
      <span className="ml-auto flex items-center gap-2.5">{right}</span>
    </div>
  );
}

export interface TabItem {
  label: string;
  icon?: ReactNode;
  active?: boolean;
}
export interface AppTabBarProps {
  items: ReadonlyArray<TabItem>;
  className?: string;
}
/** Phone bottom tab bar — the primary navigation, thumb-reachable. */
export function AppTabBar({ items, className }: AppTabBarProps) {
  return (
    <nav className={cn('flex border-t', className)} style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
      {items.map((it) => (
        <span key={it.label} className="flex flex-1 cursor-pointer flex-col items-center gap-1 py-3 text-[10px] font-semibold" style={{ color: it.active ? 'var(--ac)' : 'var(--ink-4)' }}>
          <span
            className="grid h-[22px] w-[22px] place-items-center rounded-[7px]"
            style={{ background: 'currentColor', opacity: it.active ? 1 : 0.55 }}
          >
            {it.icon ? <span style={{ color: 'var(--sheet)' }}>{it.icon}</span> : null}
          </span>
          {it.label}
        </span>
      ))}
    </nav>
  );
}

export interface CommandItem {
  icon?: ReactNode;
  label: ReactNode;
  shortcut?: string;
  active?: boolean;
}
export interface AppCommandMenuProps {
  placeholder?: string;
  items: ReadonlyArray<CommandItem>;
  className?: string;
}
export function AppCommandMenu({ placeholder = 'Jump to a drill or sub-skill…', items, className }: AppCommandMenuProps) {
  return (
    <div className={cn('max-w-[460px] overflow-hidden rounded-[18px] border shadow-[0_16px_40px_-16px_rgba(44,38,32,0.3)]', className)} style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
      <div className="border-b px-[18px] py-4 text-[15px]" style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}>
        {placeholder}
      </div>
      {items.map((it, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-[18px] py-3 text-[13.5px]"
          style={{ background: it.active ? 'var(--ac-soft)' : 'transparent' }}
        >
          {it.icon ? <span style={{ color: 'var(--ac)' }}>{it.icon}</span> : null}
          <span>{it.label}</span>
          {it.shortcut ? <span className="ml-auto font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{it.shortcut}</span> : null}
        </div>
      ))}
    </div>
  );
}
