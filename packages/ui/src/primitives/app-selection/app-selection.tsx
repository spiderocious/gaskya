import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * Selection primitives — a tick, not a fill.
 *
 * Visual spec: design-system/projects/gaskya/preview/12-selection.html
 * Controlled components: pass `checked` + `onChange`.
 */

export interface AppCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  className?: string;
}

export function AppCheckbox({ checked, onChange, label, className }: AppCheckboxProps) {
  return (
    <label className={cn('flex cursor-pointer items-center gap-2.5 py-2 text-[14px]', className)}>
      <span
        className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[7px] border-[1.5px] transition-colors"
        style={{
          background: checked ? 'var(--ac)' : 'transparent',
          borderColor: checked ? 'var(--ac)' : 'var(--ink-4)',
        }}
      >
        {checked ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      {label}
    </label>
  );
}

export interface AppRadioProps {
  checked: boolean;
  onChange: () => void;
  label?: ReactNode;
  name?: string;
  className?: string;
}

export function AppRadio({ checked, onChange, label, name, className }: AppRadioProps) {
  return (
    <label className={cn('flex cursor-pointer items-center gap-2.5 py-2 text-[14px]', className)}>
      <span
        className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border-[1.5px]"
        style={{ borderColor: checked ? 'var(--ac)' : 'var(--ink-4)' }}
      >
        {checked ? <span className="h-[11px] w-[11px] rounded-full" style={{ background: 'var(--ac)' }} /> : null}
      </span>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  );
}

export interface AppSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  className?: string;
}

export function AppSwitch({ checked, onChange, label, className }: AppSwitchProps) {
  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-2.5 text-[14px]', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative h-[26px] w-[44px] rounded-full border transition-colors"
        style={{
          background: checked ? 'var(--ac)' : 'var(--paper-2)',
          borderColor: checked ? 'var(--ac)' : 'var(--hair)',
        }}
      >
        <span
          className="absolute top-[2px] h-5 w-5 rounded-full border bg-[var(--sheet)] transition-all"
          style={{ left: checked ? 20 : 2, borderColor: checked ? 'var(--ac-deep)' : 'var(--hair)' }}
        />
      </button>
      {label}
    </label>
  );
}

export interface AppSegmentedProps {
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function AppSegmented({ options, value, onChange, className }: AppSegmentedProps) {
  return (
    <div className={cn('inline-flex gap-1 rounded-full p-1', className)} style={{ background: 'var(--paper-2)' }}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className="rounded-full px-4 py-2 text-[13px] font-semibold transition-colors"
            style={{
              background: on ? 'var(--sheet)' : 'transparent',
              color: on ? 'var(--ac)' : 'var(--ink-3)',
              boxShadow: on ? '0 1px 0 var(--hair)' : 'none',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export interface AppChipProps {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function AppChip({ selected, onClick, children, className }: AppChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors', className)}
      style={{
        borderColor: selected ? 'var(--ac)' : 'var(--hair)',
        background: selected ? 'var(--ac-soft)' : 'var(--sheet)',
        color: selected ? 'var(--ac)' : 'var(--ink-2)',
      }}
    >
      {children}
    </button>
  );
}
