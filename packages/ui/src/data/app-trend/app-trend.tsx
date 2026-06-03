import { cn } from '../../utils/cn.ts';

/**
 * AppSparkline / AppTrendLine — improvement over time. Hairline SVG, aubergine.
 *
 * Visual spec: design-system/projects/gaskya/preview/22-trend.html
 * Pass normalised points (0–1, where 1 = best). Renders the climb.
 */
function toPath(values: ReadonlyArray<number>, w: number, h: number, pad = 4) {
  if (values.length === 0) return '';
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const step = (w - pad * 2) / Math.max(1, values.length - 1);
  return values
    .map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - ((v - min) / span) * (h - pad * 2);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export interface AppSparklineProps {
  values: ReadonlyArray<number>;
  width?: number;
  height?: number;
  className?: string;
}

export function AppSparkline({ values, width = 120, height = 36, className }: AppSparklineProps) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
      <path
        d={toPath(values, width, height)}
        fill="none"
        stroke="var(--ac)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface AppTrendLineProps {
  values: ReadonlyArray<number>;
  width?: number;
  height?: number;
  startLabel?: string;
  endLabel?: string;
  className?: string;
}

export function AppTrendLine({
  values,
  width = 600,
  height = 150,
  startLabel,
  endLabel,
  className,
}: AppTrendLineProps) {
  const path = toPath(values, width, height, 12);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const step = (width - 24) / Math.max(1, values.length - 1);
  return (
    <div className={cn('w-full', className)}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={0} x2={width} y1={height * g} y2={height * g} stroke="var(--hair-2)" />
        ))}
        <path d={path} fill="none" stroke="var(--ac)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {values.map((v, i) => {
          const x = 12 + i * step;
          const y = height - 12 - ((v - min) / span) * (height - 24);
          const last = i === values.length - 1;
          return <circle key={i} cx={x} cy={y} r={last ? 5.5 : 4} fill="var(--ac)" stroke={last ? '#fff' : undefined} strokeWidth={last ? 2 : 0} />;
        })}
      </svg>
      {startLabel || endLabel ? (
        <div className="mt-2 flex justify-between font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      ) : null}
    </div>
  );
}
