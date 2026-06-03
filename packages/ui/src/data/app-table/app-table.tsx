import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * AppTable — a worklist, not a leaderboard.
 *
 * Visual spec: design-system/projects/gaskya/preview/20-tables.html
 * Generic, column-driven. Scores render mono/tabular via `align: 'num'`.
 */
export interface AppTableColumn<T> {
  key: string;
  header: ReactNode;
  align?: 'left' | 'num';
  render: (row: T) => ReactNode;
}

export interface AppTableProps<T> {
  columns: ReadonlyArray<AppTableColumn<T>>;
  rows: ReadonlyArray<T>;
  rowKey: (row: T, i: number) => string;
  className?: string;
}

export function AppTable<T>({ columns, rows, rowKey, className }: AppTableProps<T>) {
  return (
    <div
      className={cn('overflow-hidden rounded-[18px] border', className)}
      style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn(
                  'border-b px-[18px] py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em]',
                  c.align === 'num' ? 'text-right' : 'text-left',
                )}
                style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowKey(row, i)} className="hover:bg-[var(--paper)]">
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    'border-b px-[18px] py-3.5 text-[13.5px] last:[&]:border-0',
                    c.align === 'num' ? 'text-right font-mono [font-feature-settings:"tnum"]' : 'text-left',
                  )}
                  style={{ borderColor: 'var(--hair-2)' }}
                >
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
