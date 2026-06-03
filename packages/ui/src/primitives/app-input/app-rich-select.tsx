import { useState, type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppIconSelect / AppMultiSelect — hand-rolled selects (no headless lib, to
 * match the repo's zero-dependency style).
 *
 * Visual spec: design-system/projects/gaskya/preview/11-inputs.html
 *
 * Uncontrolled-open by default (manages its own open state); value is
 * controlled by the caller. Click outside is intentionally NOT trapped here —
 * keep it simple; the consumer can wrap if needed.
 */
export interface IconOption {
  value: string;
  label: string;
  sub?: string;
  icon?: ReactNode;
}

export interface AppIconSelectProps {
  options: ReadonlyArray<IconOption>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function AppIconSelect({ options, value, onChange, className }: AppIconSelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex h-[46px] w-full items-center gap-2.5 rounded-[14px] border bg-[var(--sheet)] px-3.5 text-left',
          open ? 'border-[var(--ac)] shadow-[0_0_0_4px_var(--ac-soft)]' : 'border-[var(--hair)]',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected?.icon ? (
          <span
            className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[9px] text-[14px]"
            style={{ background: 'var(--ac-soft)', color: 'var(--ac)' }}
          >
            {selected.icon}
          </span>
        ) : null}
        <span className="text-[14px] font-medium" style={{ color: 'var(--ink)' }}>
          {selected?.label ?? 'Select…'}
        </span>
        <span className="ml-auto text-[11px]" style={{ color: 'var(--ink-3)' }} aria-hidden>
          {open ? '▴' : '▾'}
        </span>
      </button>
      {open ? (
        <ul
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-[14px] border bg-[var(--sheet)] shadow-[0_12px_30px_-16px_rgba(44,38,32,0.3)]"
          style={{ borderColor: 'var(--ac)' }}
          role="listbox"
        >
          {options.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-3 px-3.5 py-2.5 text-[14px] hover:bg-[var(--ac-soft)]"
              style={o.value === value ? { background: 'var(--ac-soft)' } : undefined}
            >
              {o.icon ? (
                <span
                  className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[9px] text-[14px]"
                  style={{ background: 'var(--ac-soft)', color: 'var(--ac)' }}
                >
                  {o.icon}
                </span>
              ) : null}
              <span>
                <span className="block" style={{ color: 'var(--ink)' }}>
                  {o.label}
                </span>
                {o.sub ? (
                  <span className="block text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
                    {o.sub}
                  </span>
                ) : null}
              </span>
              {o.value === value ? (
                <span className="ml-auto" style={{ color: 'var(--ac)' }} aria-hidden>
                  ✓
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export interface AppMultiSelectProps {
  options: ReadonlyArray<{ value: string; label: string }>;
  value: ReadonlyArray<string>;
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function AppMultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Add more…',
  className,
}: AppMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);

  return (
    <div className={cn('relative', className)}>
      <div
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[46px] w-full cursor-pointer flex-wrap items-center gap-2 rounded-[14px] border bg-[var(--sheet)] px-3.5 py-2"
        style={{ borderColor: 'var(--hair)' }}
      >
        {value.length === 0 ? (
          <span className="text-[13px]" style={{ color: 'var(--ink-4)' }}>
            {placeholder}
          </span>
        ) : (
          value.map((v) => {
            const opt = options.find((o) => o.value === v);
            return (
              <span
                key={v}
                className="inline-flex items-center gap-1.5 rounded-full border py-1 pl-2.5 pr-1.5 text-[12.5px] font-semibold"
                style={{ background: 'var(--ac-soft)', color: 'var(--ac)', borderColor: 'var(--ac-edge)' }}
              >
                {opt?.label ?? v}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(v);
                  }}
                  className="grid h-4 w-4 place-items-center rounded-full text-[10px] text-white"
                  style={{ background: 'var(--ac)' }}
                  aria-label={`Remove ${opt?.label ?? v}`}
                >
                  ×
                </span>
              </span>
            );
          })
        )}
      </div>
      {open ? (
        <ul
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-[14px] border bg-[var(--sheet)] shadow-[0_12px_30px_-16px_rgba(44,38,32,0.3)]"
          style={{ borderColor: 'var(--hair)' }}
          role="listbox"
          aria-multiselectable
        >
          {options.map((o) => {
            const on = value.includes(o.value);
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={on}
                onClick={() => toggle(o.value)}
                className="flex cursor-pointer items-center gap-3 px-3.5 py-2.5 text-[14px] hover:bg-[var(--ac-soft)]"
              >
                <span
                  className="grid h-5 w-5 place-items-center rounded-[6px] border text-[11px] text-white"
                  style={{
                    background: on ? 'var(--ac)' : 'transparent',
                    borderColor: on ? 'var(--ac)' : 'var(--ink-4)',
                  }}
                >
                  {on ? '✓' : ''}
                </span>
                {o.label}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
