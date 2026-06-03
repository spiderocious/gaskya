import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppField / AppInput / AppTextarea — GasKya form fields.
 *
 * Visual spec: design-system/projects/gaskya/preview/11-inputs.html
 * Tokens:      _foundation.css (the `.f` / `.field` family)
 *
 * Rounded 14px white sheets on warm paper, aubergine focus ring. AppField is
 * the label/hint/error wrapper; AppInput/AppTextarea are the controls.
 */
export interface AppFieldProps {
  label?: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export function AppField({ label, hint, error, htmlFor, children, className }: AppFieldProps) {
  return (
    <div className={cn('mb-3.5', className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="mb-1.5 block text-[11.5px] font-semibold tracking-[0.02em]"
          style={{ color: 'var(--ink-3)' }}
        >
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <div className="mt-1.5 text-[11.5px]" style={{ color: 'var(--crit)' }}>
          {error}
        </div>
      ) : hint ? (
        <div className="mt-1.5 text-[11.5px]" style={{ color: 'var(--ink-4)' }}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}

const BASE_FIELD =
  'w-full bg-[var(--sheet)] text-[var(--ink)] outline-none transition-[border-color,box-shadow] ' +
  'placeholder:text-[var(--ink-4)] border border-[var(--hair)] rounded-[14px] ' +
  'focus:border-[var(--ac)] focus:shadow-[0_0_0_4px_var(--ac-soft)]';

export interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  mono?: boolean;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(function AppInput(
  { className, invalid, mono, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        BASE_FIELD,
        'h-[46px] px-4 text-[15px]',
        mono ? 'font-mono tracking-[0.02em] [font-feature-settings:"tnum"]' : '',
        invalid ? 'border-[var(--crit)] focus:shadow-[0_0_0_4px_var(--crit-soft)]' : '',
        className,
      )}
      {...rest}
    />
  );
});

export interface AppTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const AppTextarea = forwardRef<HTMLTextAreaElement, AppTextareaProps>(function AppTextarea(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        BASE_FIELD,
        'min-h-[120px] resize-y px-4 py-3 text-[15px] leading-relaxed',
        invalid ? 'border-[var(--crit)] focus:shadow-[0_0_0_4px_var(--crit-soft)]' : '',
        className,
      )}
      {...rest}
    />
  );
});

export interface AppSelectProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: ReadonlyArray<{ value: string; label: string }>;
}

/** Native styled select — the chevron is drawn, the menu is the browser's. */
export const AppSelect = forwardRef<HTMLSelectElement, AppSelectProps>(function AppSelect(
  { className, options, ...rest },
  ref,
) {
  const id = useId();
  return (
    <div className="relative">
      <select
        ref={ref}
        id={id}
        className={cn(
          BASE_FIELD,
          'h-[46px] cursor-pointer appearance-none px-4 pr-8 text-[15px]',
          className,
        )}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px]"
        style={{ color: 'var(--ink-3)' }}
        aria-hidden
      >
        ▾
      </span>
    </div>
  );
});
