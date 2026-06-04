import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * Chart family — hairline by default, aubergine fills. All SVG, all
 * presentational (data in, chart out).
 *
 * Visual spec: design-system/projects/gaskya/preview/23-charts.html
 * AppSparkline / AppTrendLine live in ../app-trend; the readiness ring in
 * ../../display/app-progress. This module adds: bar, stacked bar, donut,
 * heatmap, bullet, radar, distribution.
 */

// ---------- Bar ----------
export interface BarDatum {
  label: string;
  value: number; // 0–1 (share of the tallest)
  muted?: boolean;
}
export interface AppBarChartProps {
  data: ReadonlyArray<BarDatum>;
  height?: number;
  className?: string;
}
export function AppBarChart({ data, height = 130, className }: AppBarChartProps) {
  return (
    <div className={cn('flex items-end gap-3.5', className)} style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="w-full rounded-t-[6px]"
            style={{ height: `${Math.max(2, d.value * 100)}%`, background: d.muted ? 'var(--ac-mid)' : 'var(--ac)' }}
          />
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------- Stacked bar ----------
export interface StackedRow {
  label: string;
  segments: ReadonlyArray<{ value: number; tone: 'good' | 'crit' | 'muted' }>;
}
const SEG_BG = { good: 'var(--good)', crit: 'var(--crit)', muted: 'var(--paper-2)' } as const;
export interface AppStackedBarProps {
  rows: ReadonlyArray<StackedRow>;
  className?: string;
}
export function AppStackedBar({ rows, className }: AppStackedBarProps) {
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      {rows.map((r) => {
        const total = r.segments.reduce((s, x) => s + x.value, 0) || 1;
        return (
          <div key={r.label} className="flex items-center gap-2.5">
            <span className="w-[46px] font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
              {r.label}
            </span>
            <div className="flex h-[18px] flex-1 overflow-hidden rounded-[6px]">
              {r.segments.map((s, i) => (
                <span key={i} style={{ width: `${(s.value / total) * 100}%`, background: SEG_BG[s.tone] }} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Donut ----------
export interface AppDonutProps {
  value: number; // 0–100
  size?: number;
  tone?: 'accent' | 'good' | 'warn';
  children?: ReactNode;
  className?: string;
}
const DONUT_FILL = { accent: 'var(--ac)', good: 'var(--good)', warn: 'var(--warn)' } as const;
export function AppDonut({ value, size = 120, tone = 'accent', children, className }: AppDonutProps) {
  const inner = Math.round(size * 0.72);
  return (
    <span
      className={cn('grid shrink-0 place-items-center rounded-full', className)}
      style={{ width: size, height: size, background: `conic-gradient(${DONUT_FILL[tone]} 0 ${value}%, var(--paper-2) ${value}% 100%)` }}
    >
      <span className="grid place-items-center rounded-full" style={{ width: inner, height: inner, background: 'var(--sheet)' }}>
        {children}
      </span>
    </span>
  );
}

// ---------- Heatmap ----------
export interface HeatRow {
  label: string;
  cells: ReadonlyArray<number>; // 0–1 intensity (0 = empty)
}
export interface AppHeatmapProps {
  columns: ReadonlyArray<string>;
  rows: ReadonlyArray<HeatRow>;
  className?: string;
}
export function AppHeatmap({ columns, rows, className }: AppHeatmapProps) {
  return (
    <div className={cn('inline-grid gap-1', className)} style={{ gridTemplateColumns: `auto repeat(${columns.length}, 1fr)` }}>
      <span />
      {columns.map((c) => (
        <span key={c} className="text-center font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>
          {c}
        </span>
      ))}
      {rows.map((r) => (
        <FragmentRow key={r.label} row={r} />
      ))}
    </div>
  );
}
function FragmentRow({ row }: { row: HeatRow }) {
  return (
    <>
      <span className="pr-1 font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
        {row.label}
      </span>
      {row.cells.map((v, i) => (
        <span
          key={i}
          className="aspect-square rounded-[5px]"
          style={{ width: 22, background: v === 0 ? 'var(--paper-2)' : 'var(--ac)', opacity: v === 0 ? 1 : Math.max(0.2, v) }}
        />
      ))}
    </>
  );
}

// ---------- Bullet ----------
export interface AppBulletProps {
  value: number; // 0–100
  target: number; // 0–100
  className?: string;
}
export function AppBullet({ value, target, className }: AppBulletProps) {
  return (
    <div className={cn('relative h-[26px] overflow-hidden rounded-[7px]', className)} style={{ background: 'var(--paper-2)' }}>
      <span className="absolute left-0 top-0 bottom-0 rounded-[7px]" style={{ width: `${value}%`, background: 'var(--ac)' }} />
      <span className="absolute -top-1 -bottom-1 w-[3px]" style={{ left: `${target}%`, background: 'var(--ink)' }} title="target" />
    </div>
  );
}

// ---------- Radar ----------
export interface AppRadarProps {
  /** 5 axes, values 0–1, order: top, upper-right, lower-right, lower-left, upper-left */
  values: readonly [number, number, number, number, number];
  labels?: readonly [string, string, string, string, string];
  size?: number;
  className?: string;
}
export function AppRadar({ values, labels, size = 160, className }: AppRadarProps) {
  const c = size / 2;
  const r = size * 0.4;
  const pts = (scale: number) =>
    values
      .map((v, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        const rad = r * scale * (scale === 1 ? 1 : v);
        return `${(c + rad * Math.cos(ang)).toFixed(1)},${(c + rad * Math.sin(ang)).toFixed(1)}`;
      })
      .join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden>
      <polygon points={pts(1)} fill="none" stroke="var(--hair)" strokeWidth={1} />
      <polygon
        points={values
          .map((v, i) => {
            const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
            return `${(c + r * v * Math.cos(ang)).toFixed(1)},${(c + r * v * Math.sin(ang)).toFixed(1)}`;
          })
          .join(' ')}
        fill="var(--ac)"
        fillOpacity={0.18}
        stroke="var(--ac)"
        strokeWidth={2}
      />
      {labels?.map((l, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        return (
          <text
            key={l}
            x={c + (r + 12) * Math.cos(ang)}
            y={c + (r + 12) * Math.sin(ang)}
            fontSize="9"
            fill="var(--ink-3)"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {l}
          </text>
        );
      })}
    </svg>
  );
}

// ---------- Distribution ----------
export interface AppDistributionProps {
  /** marker position 0–1 along the curve */
  marker: number;
  width?: number;
  height?: number;
  className?: string;
}
export function AppDistribution({ marker, width = 400, height = 90, className }: AppDistributionProps) {
  const mx = marker * width;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d={`M5,${height - 5} C${width * 0.2},${height - 5} ${width * 0.22},25 ${width / 2},25 C${width * 0.78},25 ${width * 0.8},${height - 5} ${width - 5},${height - 5} Z`}
        fill="var(--ac-soft)"
        stroke="var(--ac-edge)"
        strokeWidth={1}
      />
      <line x1={mx} y1={12} x2={mx} y2={height - 5} stroke="var(--ac)" strokeWidth={2} strokeDasharray="3 3" />
    </svg>
  );
}
