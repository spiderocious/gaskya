import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppButton — GasKya's physical key-press button.
 *
 * Visual spec: design-system/projects/gaskya/preview/10-buttons.html
 * Tokens:      design-system/projects/gaskya/preview/_foundation.css
 *              (the `.b` button family — user hand-tuned the press)
 *
 * The system's single tactile flourish: each button sits RAISED on a solid
 * coloured edge (its physical side). Hover lifts it 1px; :active drops it the
 * full lift and the edge collapses to 0 — it lands like a real key. A hard
 * coloured edge, never a blurred drop-shadow (the no-shadow stance). The
 * hover/active mechanics live in the `.gk-key` rule in styles.css.
 */
export type AppButtonVariant = 'primary' | 'secondary' | 'ghost' | 'skip' | 'danger';
export type AppButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  loading?: boolean;
  block?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

// Face colours per variant. The raised edge is set via --gk-edge inline.
const VARIANT_CLASSES: Record<AppButtonVariant, string> = {
  primary: 'bg-[var(--ac)] text-white hover:bg-[var(--ac-deep)]',
  secondary:
    'bg-[var(--sheet)] text-[var(--ink)] border border-[#C9BEB2] hover:border-[var(--ink)]',
  ghost: 'bg-[var(--ac-soft)] text-[var(--ac)] hover:bg-[#ECDFE9]',
  skip: 'bg-transparent text-[var(--ink-3)] border-[1.5px] border-dashed border-[#C9BEB2] hover:text-[var(--ink)] hover:border-[var(--ink-3)]',
  danger:
    'bg-transparent text-[var(--crit)] border border-[var(--crit-edge)] hover:bg-[var(--crit-soft)]',
};

const EDGE: Record<AppButtonVariant, string> = {
  primary: 'var(--ac-deep)',
  secondary: '#D8CCBE',
  ghost: 'var(--ac-edge)',
  skip: '#E0D5C8',
  danger: '#E0CFC0',
};

const SIZE_CLASSES: Record<AppButtonSize, string> = {
  sm: 'h-[36px] px-4 text-[13px]',
  md: 'h-[42px] px-5 text-[13.5px]',
  lg: 'h-[50px] px-[26px] text-[15px]',
};

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(function AppButton(
  {
    variant = 'primary',
    size = 'md',
    className,
    style,
    loading,
    block,
    leadingIcon,
    trailingIcon,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  const lift = variant === 'skip' ? 2 : 3;
  const keyStyle = {
    '--gk-edge': EDGE[variant],
    '--gk-lift': `${lift}px`,
    boxShadow: `0 ${lift}px 0 0 ${EDGE[variant]}`,
    ...style,
  } as CSSProperties;

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'gk-key relative inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ac-soft)]',
        'disabled:cursor-not-allowed disabled:opacity-45',
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        block ? 'w-full' : '',
        className,
      )}
      style={keyStyle}
      {...rest}
    >
      {leadingIcon ? <span className="-ml-0.5 inline-flex">{leadingIcon}</span> : null}
      <span>{loading ? 'Loading…' : children}</span>
      {trailingIcon ? <span className="-mr-0.5 inline-flex">{trailingIcon}</span> : null}
    </button>
  );
});
