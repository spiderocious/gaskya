import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';
import { AppPill } from '../../display/app-pill/index.ts';

/**
 * Question bank / admin — the engine made visible (mostly invisible to students).
 *
 * Visual spec: design-system/projects/gaskya/preview/32-question-bank.html
 * extract → classify → generate → validity-gate → serve. No item reaches a
 * student without passing the gate; provenance is kept internally.
 */

// ---------- Item record ----------
export interface ItemMeta {
  label: string;
  value: ReactNode;
}
export interface AppItemRecordProps {
  id: string;
  stem: ReactNode;
  answer: ReactNode;
  meta: ReadonlyArray<ItemMeta>;
  provenance?: ReactNode;
  verified?: boolean;
  className?: string;
}
export function AppItemRecord({ id, stem, answer, meta, provenance, verified, className }: AppItemRecordProps) {
  return (
    <div className={cn('overflow-hidden rounded-[18px] border', className)} style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
      <div className="flex items-center gap-2.5 border-b px-4 py-3" style={{ borderColor: 'var(--hair)', background: 'var(--paper)' }}>
        <AppPill tone="accent" dot>Generated · live</AppPill>
        <span className="font-mono text-[12px]" style={{ color: 'var(--ink-3)' }}>{id}</span>
        {verified ? <AppPill tone="good" dot className="ml-auto">Verified answer</AppPill> : null}
      </div>
      <div className="p-4">
        <div className="mb-1.5 font-serif text-[16px]" style={{ color: 'var(--ink)' }}>{stem}</div>
        <div className="text-[13px]" style={{ color: 'var(--ink-3)' }}>Answer: <b style={{ color: 'var(--good)' }}>{answer}</b> · worked solution attached</div>
        <div className="mt-3.5 grid grid-cols-2 overflow-hidden rounded-[14px] border sm:grid-cols-4" style={{ borderColor: 'var(--hair-2)' }}>
          {meta.map((m, i) => (
            <div key={i} className="border-r px-3.5 py-3 last:border-r-0" style={{ borderColor: 'var(--hair-2)' }}>
              <div className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: 'var(--ink-4)' }}>{m.label}</div>
              <div className="mt-1 text-[14px] font-semibold">{m.value}</div>
            </div>
          ))}
        </div>
        {provenance ? (
          <div className="mt-3.5 flex items-center gap-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-4)' }}>Provenance (internal):</span>
            <span className="rounded-[6px] px-2 py-0.5 text-[12px]" style={{ background: 'var(--paper-2)', color: 'var(--ink-2)' }}>{provenance}</span>
            <span className="text-[11.5px]" style={{ color: 'var(--ink-4)' }}>never served verbatim</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ---------- Validity gate (checklist) ----------
export interface ValidityCheck {
  ok: boolean;
  label: ReactNode;
  note?: ReactNode;
}
export interface AppValidityGateProps {
  checks: ReadonlyArray<ValidityCheck>;
  className?: string;
}
export function AppValidityGate({ checks, className }: AppValidityGateProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {checks.map((c, i) => (
        <div key={i} className="flex items-center gap-2.5 py-2 text-[13.5px]">
          <span
            className="grid h-5 w-5 shrink-0 place-items-center rounded-[6px] text-[12px] text-white"
            style={{ background: c.ok ? 'var(--good)' : 'var(--crit)' }}
          >
            {c.ok ? '✓' : '✕'}
          </span>
          <span style={{ color: c.ok ? 'var(--ink)' : 'var(--crit)' }}>{c.label}</span>
          {c.note ? <span className="ml-auto text-[12px]" style={{ color: 'var(--ink-3)' }}>{c.note}</span> : null}
        </div>
      ))}
    </div>
  );
}

// ---------- Review queue row ----------
export interface ReviewItem {
  stem: ReactNode;
  sub: ReactNode;
  dispute?: { label: string; tone: 'crit' | 'warn' | 'neutral' };
  actions: ReactNode;
}
export interface AppReviewQueueProps {
  items: ReadonlyArray<ReviewItem>;
  className?: string;
}
export function AppReviewQueue({ items, className }: AppReviewQueueProps) {
  const dt = { crit: 'var(--crit)', warn: 'var(--warn)', neutral: 'var(--ink-3)' } as const;
  return (
    <div className={cn('flex flex-col', className)}>
      {items.map((it, i) => (
        <div key={i} className="grid grid-cols-[1fr_auto_auto] items-center gap-3.5 border-b py-3 last:border-0" style={{ borderColor: 'var(--hair-2)' }}>
          <div>
            <div className="text-[13.5px]" style={{ color: 'var(--ink)' }}>{it.stem}</div>
            <div className="mt-0.5 text-[11px]" style={{ color: 'var(--ink-3)' }}>{it.sub}</div>
          </div>
          {it.dispute ? (
            <span className="font-mono text-[12px] font-semibold" style={{ color: dt[it.dispute.tone] }}>{it.dispute.label}</span>
          ) : <span />}
          <div className="flex gap-2">{it.actions}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- Bank health stat ----------
export interface AppBankStatProps {
  value: ReactNode;
  label: ReactNode;
  tone?: 'accent' | 'warn' | 'good';
  className?: string;
}
export function AppBankStat({ value, label, tone = 'accent', className }: AppBankStatProps) {
  const color = tone === 'warn' ? 'var(--warn)' : tone === 'good' ? 'var(--good)' : 'var(--ac)';
  return (
    <div className={cn('rounded-[18px] border p-4', className)} style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
      <div className="font-serif text-[34px] font-semibold leading-none" style={{ color }}>{value}</div>
      <div className="mt-1.5 text-[12px]" style={{ color: 'var(--ink-3)' }}>{label}</div>
    </div>
  );
}
