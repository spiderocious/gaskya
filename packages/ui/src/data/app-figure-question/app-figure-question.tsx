import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';
import { AppTag } from '../../display/app-pill/index.ts';

/**
 * Figure question types — diagrammatic & abstract, rendered as crisp SVG.
 *
 * Visual spec: design-system/projects/gaskya/preview/31-questions-figure.html
 * The hardest families to render (a blurry PD fails them worst). Tiles, the
 * dashed aubergine "?" target, and SVG option chips are the shared language.
 */

export type FigureOptionState = 'idle' | 'key' | 'chosen';

const OPT_BORDER: Record<FigureOptionState, string> = {
  idle: 'var(--hair)',
  key: 'var(--good)',
  chosen: 'var(--ac)',
};

export interface FigureOption {
  label: string;
  state?: FigureOptionState;
  figure: ReactNode; // an <svg> (or any node)
}

interface FigureShellProps {
  family: string;
  stem: ReactNode;
  provenance?: string;
  children: ReactNode; // the prompt row (sequence / matrix)
  options: ReadonlyArray<FigureOption>;
  className?: string;
}

function FigureShell({ family, stem, provenance, children, options, className }: FigureShellProps) {
  return (
    <div className={cn('overflow-hidden rounded-[18px] border', className)} style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
      <div className="flex items-center gap-2.5 border-b px-[18px] py-3" style={{ borderColor: 'var(--hair-2)' }}>
        <AppTag>{family}</AppTag>
        {provenance ? <span className="ml-auto font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>{provenance}</span> : null}
      </div>
      <div className="p-5">
        <div className="mb-4 font-serif text-[16px] leading-relaxed" style={{ color: 'var(--ink)' }}>{stem}</div>
        {children}
        <div className="mt-[18px] flex flex-wrap gap-3">
          {options.map((o) => {
            const st = o.state ?? 'idle';
            return (
              <div key={o.label} className="w-[72px] overflow-hidden rounded-[12px] border" style={{ borderColor: OPT_BORDER[st] }}>
                <div className="grid h-16 place-items-center" style={{ background: 'var(--paper)' }}>
                  {o.figure}
                </div>
                <div
                  className="border-t py-1 text-center font-mono text-[11px]"
                  style={{
                    borderColor: 'var(--hair)',
                    color: st === 'key' ? 'var(--good)' : 'var(--ink-3)',
                    background: st === 'key' ? 'var(--good-soft)' : undefined,
                  }}
                >
                  {o.label}
                  {st === 'key' ? ' ✓' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const Tile = ({ children, q }: { children?: ReactNode; q?: boolean }) => (
  <div
    className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-[12px] border"
    style={{
      borderColor: q ? 'var(--ac)' : 'var(--hair)',
      borderStyle: q ? 'dashed' : 'solid',
      borderWidth: q ? '1.5px' : '1px',
      background: q ? 'var(--ac-soft)' : 'var(--paper)',
    }}
  >
    {q ? <span className="font-serif text-[26px]" style={{ color: 'var(--ac)' }}>?</span> : children}
  </div>
);

// ---------- Shape sequence ----------
export interface AppShapeSequenceProps {
  family?: string;
  stem: ReactNode;
  sequence: ReadonlyArray<ReactNode>;
  options: ReadonlyArray<FigureOption>;
  provenance?: string;
  className?: string;
}
export function AppShapeSequence({ family = 'Diagrammatic · Sequence', stem, sequence, options, provenance, className }: AppShapeSequenceProps) {
  return (
    <FigureShell family={family} stem={stem} options={options} {...(provenance !== undefined ? { provenance } : {})} {...(className !== undefined ? { className } : {})}>
      <div className="flex flex-wrap items-center gap-3.5">
        {sequence.map((s, i) => (
          <Tile key={i}>{s}</Tile>
        ))}
        <Tile q />
      </div>
    </FigureShell>
  );
}

// ---------- Flow / operator rule ----------
export interface AppFlowRuleProps {
  family?: string;
  stem: ReactNode;
  /** alternating nodes and operator labels, e.g. [fig, '◐', fig, '◑', '?'] */
  steps: ReadonlyArray<ReactNode | string>;
  options: ReadonlyArray<FigureOption>;
  provenance?: string;
  className?: string;
}
export function AppFlowRule({ family = 'Diagrammatic · Operator', stem, steps, options, provenance, className }: AppFlowRuleProps) {
  return (
    <FigureShell family={family} stem={stem} options={options} {...(provenance !== undefined ? { provenance } : {})} {...(className !== undefined ? { className } : {})}>
      <div className="flex flex-wrap items-center gap-3.5">
        {steps.map((s, i) =>
          typeof s === 'string' ? (
            <span key={i} className="font-mono text-[18px]" style={{ color: 'var(--ink-4)' }}>
              {s === '?' ? '' : s}
            </span>
          ) : (
            <Tile key={i}>{s}</Tile>
          ),
        )}
        <Tile q />
      </div>
    </FigureShell>
  );
}

// ---------- 3×3 matrix ----------
export interface AppMatrix3x3Props {
  family?: string;
  stem: ReactNode;
  /** 8 cells; the 9th is the dashed "?" target. */
  cells: ReadonlyArray<ReactNode>;
  options: ReadonlyArray<FigureOption>;
  provenance?: string;
  className?: string;
}
export function AppMatrix3x3({ family = 'Abstract · Matrix', stem, cells, options, provenance, className }: AppMatrix3x3Props) {
  return (
    <FigureShell family={family} stem={stem} options={options} {...(provenance !== undefined ? { provenance } : {})} {...(className !== undefined ? { className } : {})}>
      <div className="inline-grid grid-cols-3 gap-2">
        {cells.slice(0, 8).map((c, i) => (
          <div key={i} className="grid h-[72px] w-[72px] place-items-center rounded-[10px] border" style={{ borderColor: 'var(--hair)', background: 'var(--paper)' }}>
            {c}
          </div>
        ))}
        <div className="grid h-[72px] w-[72px] place-items-center rounded-[10px] border" style={{ borderColor: 'var(--ac)', borderStyle: 'dashed', borderWidth: '1.5px', background: 'var(--ac-soft)' }}>
          <span className="font-serif text-[28px]" style={{ color: 'var(--ac)' }}>?</span>
        </div>
      </div>
    </FigureShell>
  );
}
