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

// ---------- Combobox (search field WITH a results dropdown) ----------
export interface ComboResult {
  value: string;
  label: ReactNode;
  /** Short tag shown on the left (e.g. "NUM"). */
  tag?: string;
}
export interface AppComboboxProps {
  value: string;
  onChange: (value: string) => void;
  results: ReadonlyArray<ComboResult>;
  onPick?: (value: string) => void;
  placeholder?: string;
  /** Show the dropdown. Default: show when there are results. */
  open?: boolean;
  className?: string;
}
export function AppCombobox({ value, onChange, results, onPick, placeholder = 'Search…', open, className }: AppComboboxProps) {
  const showList = (open ?? results.length > 0) && results.length > 0;
  const q = value.trim().toLowerCase();
  return (
    <div className={cn('relative', className)}>
      <span className="pointer-events-none absolute left-3.5 top-[23px] -translate-y-1/2" style={{ color: 'var(--ink-4)' }} aria-hidden>
        ⌕
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'h-[46px] w-full border bg-[var(--sheet)] pl-10 pr-4 text-[15px] outline-none focus:border-[var(--ac)] focus:shadow-[0_0_0_4px_var(--ac-soft)]',
          showList ? 'rounded-t-[14px] rounded-b-none' : 'rounded-[14px]',
        )}
        style={{ borderColor: showList ? 'var(--ac)' : 'var(--hair)', color: 'var(--ink)' }}
        role="combobox"
        aria-expanded={showList}
      />
      {showList ? (
        <ul
          className="absolute z-20 w-full overflow-hidden rounded-b-[14px] border border-t-0"
          style={{ borderColor: 'var(--ac)', background: 'var(--sheet)' }}
          role="listbox"
        >
          {results.map((r) => (
            <li
              key={r.value}
              role="option"
              aria-selected={false}
              onClick={() => onPick?.(r.value)}
              className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-[13.5px] hover:bg-[var(--ac-soft)]"
            >
              {r.tag ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-4)' }}>
                  {r.tag}
                </span>
              ) : null}
              <Highlight text={r.label} q={q} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Highlights the query substring in a plain-string label; passes through nodes. */
function Highlight({ text, q }: { text: ReactNode; q: string }) {
  if (typeof text !== 'string' || q.length === 0) return <span>{text}</span>;
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, i)}
      <mark style={{ background: 'var(--ac-soft)', color: 'var(--ac)', fontWeight: 600 }}>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </span>
  );
}

// ---------- Pin input (inline rounded-cell code entry, alt OTP) ----------
export interface AppPinInputProps {
  value: string;
  length?: number;
  className?: string;
}
export function AppPinInput({ value, length = 6, className }: AppPinInputProps) {
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');
  const firstEmpty = value.length;
  return (
    <div className={cn('flex gap-2', className)}>
      {chars.map((c, i) => (
        <div
          key={i}
          className={cn(
            'grid h-[50px] w-[42px] place-items-center rounded-[12px] border font-mono text-[20px] font-semibold',
            c ? 'border-[var(--ac)] text-[var(--ac)]' : 'border-[var(--hair)] text-[var(--ink-4)]',
            i === firstEmpty ? 'border-[var(--ac)] shadow-[0_0_0_4px_var(--ac-soft)]' : '',
          )}
          style={{ background: 'var(--sheet)' }}
        >
          {c || '·'}
        </div>
      ))}
    </div>
  );
}

// ---------- Difficulty band picker ----------
export interface AppDifficultyProps {
  value: string;
  onChange: (value: string) => void;
  bands?: ReadonlyArray<{ value: string; label: string }>;
  className?: string;
}
const DEFAULT_BANDS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'mixed', label: 'Mixed' },
];
export function AppDifficulty({ value, onChange, bands = DEFAULT_BANDS, className }: AppDifficultyProps) {
  return (
    <div className={cn('flex overflow-hidden rounded-full border', className)} style={{ borderColor: 'var(--hair)' }}>
      {bands.map((b) => {
        const on = b.value === value;
        return (
          <button
            key={b.value}
            type="button"
            onClick={() => onChange(b.value)}
            className="flex-1 py-2.5 text-[13px] font-semibold transition-colors"
            style={{ background: on ? 'var(--ac)' : 'var(--sheet)', color: on ? '#fff' : 'var(--ink-3)' }}
          >
            {b.label}
          </button>
        );
      })}
    </div>
  );
}
