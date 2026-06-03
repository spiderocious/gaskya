import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppAvatar — people as people. Initials by default; image when opted in.
 *
 * Visual spec: design-system/projects/gaskya/preview/26-avatars-pills.html
 * Shapes: circle (people) · squircle / rounded / square (non-person entities).
 */
export type AppAvatarShape = 'circle' | 'squircle' | 'rounded' | 'square';
export type AppAvatarSize = 'sm' | 'md' | 'lg';

export interface AppAvatarProps {
  initials?: string;
  src?: string;
  alt?: string;
  shape?: AppAvatarShape;
  size?: AppAvatarSize;
  ring?: 'good' | 'accent' | 'crit';
  className?: string;
}

const SIZE: Record<AppAvatarSize, string> = {
  sm: 'h-7 w-7 text-[10px]',
  md: 'h-[38px] w-[38px] text-[13px]',
  lg: 'h-14 w-14 text-[18px]',
};

const RADIUS: Record<AppAvatarShape, string> = {
  circle: '50%',
  squircle: '34% / 40%',
  rounded: '16px',
  square: '4px',
};

const RING_COLOR = { good: 'var(--good)', accent: 'var(--ac)', crit: 'var(--crit)' } as const;

export function AppAvatar({
  initials,
  src,
  alt,
  shape = 'circle',
  size = 'md',
  ring,
  className,
}: AppAvatarProps) {
  return (
    <span
      className={cn('inline-flex shrink-0 select-none items-center justify-center overflow-hidden border font-semibold', SIZE[size], className)}
      style={{
        borderRadius: RADIUS[shape],
        background: src ? undefined : 'var(--ac-soft)',
        color: 'var(--ac)',
        borderColor: 'var(--ac-edge)',
        boxShadow: ring ? `0 0 0 2px var(--sheet), 0 0 0 4px ${RING_COLOR[ring]}` : undefined,
      }}
    >
      {src ? <img src={src} alt={alt ?? ''} className="h-full w-full object-cover" /> : initials}
    </span>
  );
}

export interface AppAvatarStackProps {
  items: ReadonlyArray<{ initials: string; src?: string }>;
  size?: AppAvatarSize;
  extra?: number;
  className?: string;
}

export function AppAvatarStack({ items, size = 'md', extra, className }: AppAvatarStackProps) {
  return (
    <div className={cn('flex', className)}>
      {items.map((it, i) => (
        <span key={i} className={i === 0 ? '' : '-ml-2.5'} style={{ position: 'relative', zIndex: items.length - i }}>
          <AppAvatar
            initials={it.initials}
            {...(it.src !== undefined ? { src: it.src } : {})}
            size={size}
            className="ring-2 ring-[var(--sheet)]"
          />
        </span>
      ))}
      {extra ? (
        <span className="-ml-2.5">
          <AppAvatar initials={`+${extra}`} size={size} className="ring-2 ring-[var(--sheet)]" />
        </span>
      ) : null}
    </div>
  );
}

export interface AppLogoProps {
  children: ReactNode;
  tone?: 'accent' | 'good' | 'warn' | 'neutral';
  className?: string;
}

const LOGO_TONE = {
  accent: { bg: 'var(--ac-soft)', color: 'var(--ac)' },
  good: { bg: 'var(--good-soft)', color: 'var(--good)' },
  warn: { bg: 'var(--warn-soft)', color: 'var(--warn)' },
  neutral: { bg: 'var(--paper-2)', color: 'var(--ink-3)' },
} as const;

/** Squircle logo tile — partner / employer marks (landing only). */
export function AppLogo({ children, tone = 'neutral', className }: AppLogoProps) {
  const t = LOGO_TONE[tone];
  return (
    <span
      className={cn('inline-grid h-11 w-11 place-items-center rounded-[14px] border text-[13px] font-bold', className)}
      style={{ background: t.bg, color: t.color, borderColor: 'var(--hair)' }}
    >
      {children}
    </span>
  );
}
