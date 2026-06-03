import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * More inputs — stepper, slider, tag input, search, dropzone.
 *
 * Visual spec: design-system/projects/gaskya/preview/15-inputs-more.html
 * Sliders/steppers are controlled; the slider is presentational (position from
 * `value`/`min`/`max`) — wire pointer dragging in the app if needed.
 */

export interface AppStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function AppStepper({ value, onChange, min = 0, max = 99, step = 1, className }: AppStepperProps) {
  return (
    <div
      className={cn('inline-flex items-center overflow-hidden rounded-[14px] border', className)}
      style={{ borderColor: 'var(--hair)' }}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - step))}
        className="h-[46px] w-11 text-[20px] hover:bg-[var(--ac-soft)]"
        style={{ color: 'var(--ac)' }}
        aria-label="Decrease"
      >
        −
      </button>
      <span
        className="w-14 border-x text-center font-mono text-[16px] font-semibold leading-[46px]"
        style={{ borderColor: 'var(--hair)' }}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + step))}
        className="h-[46px] w-11 text-[20px] hover:bg-[var(--ac-soft)]"
        style={{ color: 'var(--ac)' }}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

export interface AppSliderProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}

export function AppSlider({ value, min = 0, max = 100, label, className }: AppSliderProps) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div className={cn('relative mx-1.5 my-5 h-1.5 rounded-full', className)} style={{ background: 'var(--paper-2)' }}>
      <span className="absolute left-0 top-0 bottom-0 rounded-full" style={{ width: `${pct}%`, background: 'var(--ac)' }} />
      {label ? (
        <span
          className="absolute -top-7 -translate-x-1/2 font-mono text-[12px] font-semibold"
          style={{ left: `${pct}%`, color: 'var(--ac)' }}
        >
          {label}
        </span>
      ) : null}
      <span
        className="absolute top-1/2 h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[var(--sheet)] shadow-[0_2px_8px_-2px_rgba(44,38,32,0.3)]"
        style={{ left: `${pct}%`, borderColor: 'var(--ac)' }}
      />
    </div>
  );
}

export interface AppTagInputProps {
  tags: ReadonlyArray<string>;
  onRemove: (tag: string) => void;
  placeholder?: string;
  className?: string;
}

export function AppTagInput({ tags, onRemove, placeholder = 'Add a tag…', className }: AppTagInputProps) {
  return (
    <div
      className={cn('flex flex-wrap gap-1.5 rounded-[14px] border px-3 py-2.5', className)}
      style={{ borderColor: 'var(--hair)' }}
    >
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1.5 rounded-full py-1 pl-2.5 pr-2 text-[12.5px]"
          style={{ background: 'var(--paper-2)' }}
        >
          {t}
          <span onClick={() => onRemove(t)} className="cursor-pointer" style={{ color: 'var(--ink-3)' }} aria-label={`Remove ${t}`}>
            ×
          </span>
        </span>
      ))}
      <input className="min-w-[80px] flex-1 bg-transparent text-[14px] outline-none" placeholder={placeholder} />
    </div>
  );
}

export interface AppSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function AppSearch({ value, onChange, placeholder = 'Search…', className }: AppSearchProps) {
  return (
    <div className={cn('relative', className)}>
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--ink-4)' }} aria-hidden>
        ⌕
      </span>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-[46px] w-full rounded-[14px] border bg-[var(--sheet)] pl-10 pr-4 text-[15px] outline-none focus:border-[var(--ac)] focus:shadow-[0_0_0_4px_var(--ac-soft)]"
        style={{ borderColor: 'var(--hair)', color: 'var(--ink)' }}
      />
    </div>
  );
}

export interface AppDropzoneProps {
  title: string;
  hint?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function AppDropzone({ title, hint, icon = '⤓', className }: AppDropzoneProps) {
  return (
    <div
      className={cn('rounded-[14px] border-[1.5px] border-dashed p-7 text-center', className)}
      style={{ borderColor: 'var(--ac-edge)', background: 'var(--ac-soft)' }}
    >
      <div
        className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl border bg-[var(--sheet)] text-[18px]"
        style={{ borderColor: 'var(--ac-edge)', color: 'var(--ac)' }}
      >
        {icon}
      </div>
      <div className="text-[14px] font-semibold" style={{ color: 'var(--ink)' }}>
        {title}
      </div>
      {hint ? (
        <p className="mt-1.5 text-[11.5px]" style={{ color: 'var(--ink-4)' }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
