import { type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppCard — the one soft card idiom (the wider family is composed from it).
 *
 * Visual spec: design-system/projects/gaskya/preview/27-cards.html
 * Hairline edge, no shadow, rounded 18px (or 22px with `size="lg"`).
 */
export interface AppCardProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'md' | 'lg';
  pad?: boolean;
  tone?: 'sheet' | 'accent' | 'soft';
}

export function AppCard({ size = 'md', pad = true, tone = 'sheet', className, children, ...rest }: AppCardProps) {
  const toneStyle =
    tone === 'accent'
      ? { background: 'var(--ac)', borderColor: 'var(--ac-deep)', color: '#fff' }
      : tone === 'soft'
        ? { background: 'var(--ac-soft)', borderColor: 'var(--ac-edge)' }
        : { background: 'var(--sheet)', borderColor: 'var(--hair)' };
  return (
    <div
      className={cn('border', size === 'lg' ? 'rounded-[22px]' : 'rounded-[18px]', pad ? 'p-[18px]' : '', className)}
      style={toneStyle}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * AppResultCard — the sub-skill result, the hero artifact. Coach voice leads;
 * the number is a Fraunces achievement; a quiet pace bar; an optional tag.
 */
export interface AppResultCardProps {
  eyebrow: string;
  lead: ReactNode;
  score?: { value: number; outOf: number };
  pct?: number;
  tag?: string;
  footnote?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function AppResultCard({
  eyebrow,
  lead,
  score,
  pct,
  tag,
  footnote,
  actions,
  className,
}: AppResultCardProps) {
  return (
    <AppCard size="lg" className={className}>
      <div className="flex items-start justify-between gap-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--ink-3)' }}>
          {eyebrow}
        </div>
        {tag ? (
          <span
            className="rounded-full border px-2.5 py-1 text-[10.5px] font-semibold"
            style={{ color: 'var(--ac)', borderColor: 'var(--ac-edge)', background: 'var(--ac-soft)' }}
          >
            {tag}
          </span>
        ) : null}
      </div>

      {score ? (
        <div className="mt-2 flex items-end gap-1.5">
          <span
            className="font-serif font-semibold leading-[0.85] [font-feature-settings:'tnum']"
            style={{ color: 'var(--ac)', fontSize: 48, letterSpacing: '-0.03em' }}
          >
            {score.value}
          </span>
          <span className="pb-1.5 font-mono text-[13px]" style={{ color: 'var(--ink-3)' }}>
            / {score.outOf}
          </span>
        </div>
      ) : null}

      <div className="mt-2 font-serif text-[21px] font-medium leading-snug" style={{ color: 'var(--ink)' }}>
        {lead}
      </div>

      {pct !== undefined ? (
        <div className="mt-4 h-2 overflow-hidden rounded-full" style={{ background: 'var(--paper-2)' }}>
          <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--ac)' }} />
        </div>
      ) : null}

      {footnote ? (
        <div className="mt-3 text-[12.5px]" style={{ color: 'var(--ink-3)' }}>
          {footnote}
        </div>
      ) : null}

      {actions ? <div className="mt-4 flex flex-wrap items-center gap-3">{actions}</div> : null}
    </AppCard>
  );
}
