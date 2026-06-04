import { useState, type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppTable — a worklist, not a leaderboard.
 *
 * Visual spec: design-system/projects/gaskya/preview/20-tables.html
 * Column-driven. Supports sortable headers and expandable rows. Scores render
 * mono/tabular via `align: 'num'`.
 */
export interface AppTableColumn<T> {
  key: string;
  header: ReactNode;
  align?: 'left' | 'num';
  /** Provide to make this column sortable; returns a comparable value. */
  sortBy?: (row: T) => string | number;
  render: (row: T) => ReactNode;
}

export interface AppTableProps<T> {
  columns: ReadonlyArray<AppTableColumn<T>>;
  rows: ReadonlyArray<T>;
  rowKey: (row: T, i: number) => string;
  /** Render an expanded panel under a row (makes rows clickable to toggle). */
  renderExpanded?: (row: T) => ReactNode;
  className?: string;
}

export function AppTable<T>({ columns, rows, rowKey, renderExpanded, className }: AppTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const sortCol = sort ? columns.find((c) => c.key === sort.key) : null;
  const sorted =
    sortCol?.sortBy && sort
      ? [...rows].sort((a, b) => {
          const av = sortCol.sortBy!(a);
          const bv = sortCol.sortBy!(b);
          return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir;
        })
      : rows;

  function toggleSort(key: string) {
    setSort((s) => (s?.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: 1 }));
  }

  return (
    <div className={cn('overflow-hidden rounded-[18px] border', className)} style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((c) => {
              const sortable = c.sortBy !== undefined;
              const active = sort?.key === c.key;
              return (
                <th
                  key={c.key}
                  onClick={sortable ? () => toggleSort(c.key) : undefined}
                  className={cn(
                    'border-b px-[18px] py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em]',
                    c.align === 'num' ? 'text-right' : 'text-left',
                    sortable ? 'cursor-pointer select-none' : '',
                  )}
                  style={{ borderColor: 'var(--hair)', color: active ? 'var(--ac)' : 'var(--ink-3)' }}
                >
                  {c.header}
                  {sortable ? <span className="ml-1">{active ? (sort.dir === 1 ? '▲' : '▼') : '⇅'}</span> : null}
                </th>
              );
            })}
            {renderExpanded ? <th className="border-b" style={{ borderColor: 'var(--hair)' }} /> : null}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => {
            const key = rowKey(row, i);
            const isOpen = open === key;
            return (
              <FragmentRow key={key}>
                <tr
                  className="hover:bg-[var(--paper)]"
                  onClick={renderExpanded ? () => setOpen(isOpen ? null : key) : undefined}
                  style={renderExpanded ? { cursor: 'pointer' } : undefined}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={cn('border-b px-[18px] py-3.5 text-[13.5px]', c.align === 'num' ? 'text-right font-mono [font-feature-settings:"tnum"]' : 'text-left')}
                      style={{ borderColor: 'var(--hair-2)' }}
                    >
                      {c.render(row)}
                    </td>
                  ))}
                  {renderExpanded ? (
                    <td className="border-b px-[18px] text-right" style={{ borderColor: 'var(--hair-2)', color: 'var(--ac)' }}>
                      {isOpen ? '▾' : '▸'}
                    </td>
                  ) : null}
                </tr>
                {renderExpanded && isOpen ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="border-b p-0" style={{ borderColor: 'var(--hair-2)' }}>
                      <div className="border-l-[3px] px-[18px] py-3.5" style={{ borderColor: 'var(--ac)', background: 'var(--paper)' }}>
                        {renderExpanded(row)}
                      </div>
                    </td>
                  </tr>
                ) : null}
              </FragmentRow>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FragmentRow({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// ---------- Comparison table (two attempts side by side) ----------
export interface ComparisonRow {
  metric: ReactNode;
  a: ReactNode;
  b: ReactNode;
  delta?: ReactNode;
  deltaTone?: 'good' | 'crit' | 'neutral';
}
export interface AppComparisonTableProps {
  headers: { a: ReactNode; b: ReactNode };
  rows: ReadonlyArray<ComparisonRow>;
  className?: string;
}
export function AppComparisonTable({ headers, rows, className }: AppComparisonTableProps) {
  const dt = { good: 'var(--good)', crit: 'var(--crit)', neutral: 'var(--ink)' } as const;
  return (
    <div className={cn('overflow-hidden rounded-[18px] border', className)} style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b px-[18px] py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.12em]" style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}>
              Metric
            </th>
            <th className="border-b px-[18px] py-2.5 text-right font-mono text-[10px] uppercase tracking-[0.12em]" style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}>
              {headers.a}
            </th>
            <th className="border-b px-[18px] py-2.5 text-right font-mono text-[10px] uppercase tracking-[0.12em]" style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}>
              {headers.b}
            </th>
            <th className="border-b px-[18px] py-2.5 text-right font-mono text-[10px] uppercase tracking-[0.12em]" style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}>
              Δ
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="border-b px-[18px] py-3 text-[13.5px]" style={{ borderColor: 'var(--hair-2)' }}>
                {r.metric}
              </td>
              <td className="border-b px-[18px] py-3 text-right font-mono text-[13.5px] [font-feature-settings:'tnum']" style={{ borderColor: 'var(--hair-2)' }}>
                {r.a}
              </td>
              <td className="border-b px-[18px] py-3 text-right font-mono text-[13.5px] [font-feature-settings:'tnum']" style={{ borderColor: 'var(--hair-2)' }}>
                {r.b}
              </td>
              <td className="border-b px-[18px] py-3 text-right font-mono text-[13.5px] font-semibold" style={{ borderColor: 'var(--hair-2)', color: dt[r.deltaTone ?? 'neutral'] }}>
                {r.delta}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Pagination ----------
export interface AppPaginationProps {
  page: number;
  pageCount: number;
  total?: number;
  onPage: (page: number) => void;
  className?: string;
}
export function AppPagination({ page, pageCount, total, onPage, className }: AppPaginationProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {total !== undefined ? (
        <span className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>
          {total} total
        </span>
      ) : null}
      <span className="flex-1" />
      <button
        onClick={() => onPage(Math.max(1, page - 1))}
        className="rounded-full border px-3 py-1.5 text-[12px] font-semibold"
        style={{ borderColor: 'var(--hair)', color: 'var(--ink)' }}
      >
        ← Prev
      </button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className="h-7 min-w-7 rounded-full px-2 text-[12px] font-semibold"
          style={{
            background: p === page ? 'var(--ac-soft)' : 'transparent',
            color: p === page ? 'var(--ac)' : 'var(--ink-3)',
            border: `1px solid ${p === page ? 'var(--ac-edge)' : 'var(--hair)'}`,
          }}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPage(Math.min(pageCount, page + 1))}
        className="rounded-full border px-3 py-1.5 text-[12px] font-semibold"
        style={{ borderColor: 'var(--hair)', color: 'var(--ink)' }}
      >
        Next →
      </button>
    </div>
  );
}
