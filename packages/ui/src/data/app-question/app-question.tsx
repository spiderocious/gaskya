import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';
import { AppBubble, type AppBubbleState } from '../../primitives/app-bubble/index.ts';
import { AppTag } from '../../display/app-pill/index.ts';

/**
 * Question & answer-review components — the teaching core.
 *
 * Visual spec: 21-question.html · 30-questions-text.html · 35-answer-review.html
 * Single-select MCQ rendering, the worked solution, the whole-mock answer grid,
 * and a bubble review row (your pick vs the key).
 */

export interface QuestionOption {
  letter: string;
  text: ReactNode;
  state?: 'idle' | 'chosen' | 'key' | 'wrong';
}

export interface AppQuestionCardProps {
  family: string;
  stem: ReactNode;
  options: ReadonlyArray<QuestionOption>;
  provenance?: string;
  onPick?: (letter: string) => void;
  className?: string;
}

const OPT_STYLE: Record<NonNullable<QuestionOption['state']>, { border: string; bg: string }> = {
  idle: { border: 'var(--hair)', bg: 'var(--sheet)' },
  chosen: { border: 'var(--ac)', bg: 'var(--ac-soft)' },
  key: { border: 'var(--good-edge)', bg: 'var(--good-soft)' },
  wrong: { border: 'var(--crit-edge)', bg: 'var(--crit-soft)' },
};

const BUBBLE_FOR: Record<NonNullable<QuestionOption['state']>, AppBubbleState> = {
  idle: 'idle',
  chosen: 'on',
  key: 'right',
  wrong: 'was',
};

export function AppQuestionCard({
  family,
  stem,
  options,
  provenance,
  onPick,
  className,
}: AppQuestionCardProps) {
  return (
    <div
      className={cn('overflow-hidden rounded-[18px] border', className)}
      style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
    >
      <div className="flex items-center gap-2.5 border-b px-[18px] py-3" style={{ borderColor: 'var(--hair-2)' }}>
        <AppTag>{family}</AppTag>
        {provenance ? (
          <span className="ml-auto font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
            {provenance}
          </span>
        ) : null}
      </div>
      <div className="p-[18px]">
        <div className="font-serif text-[16px] leading-relaxed" style={{ color: 'var(--ink)' }}>
          {stem}
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          {options.map((o) => {
            const st = o.state ?? 'idle';
            return (
              <button
                key={o.letter}
                type="button"
                onClick={() => onPick?.(o.letter)}
                className="flex items-center gap-3.5 rounded-[14px] border px-3.5 py-3 text-left text-[14px]"
                style={{ borderColor: OPT_STYLE[st].border, background: OPT_STYLE[st].bg }}
              >
                <AppBubble letter={o.letter} state={BUBBLE_FOR[st]} />
                <span>{o.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export interface SolutionStep {
  text: ReactNode;
}

export interface AppWorkedSolutionProps {
  steps: ReadonlyArray<SolutionStep>;
  method?: ReactNode;
  className?: string;
}

/** The signature: the method, in the coach's voice, not just the letter. */
export function AppWorkedSolution({ steps, method, className }: AppWorkedSolutionProps) {
  return (
    <div
      className={cn('rounded-[14px] border p-[18px]', className)}
      style={{ borderColor: 'var(--ac-edge)', background: 'var(--ac-soft)' }}
    >
      <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--ac)' }}>
        ◆ How to get there — so you own it next time
      </div>
      {steps.map((s, i) => (
        <div key={i} className="grid grid-cols-[26px_1fr] gap-3 py-2">
          <span className="font-mono text-[12px] font-semibold" style={{ color: 'var(--ac)' }}>
            {i + 1}
          </span>
          <span className="text-[14px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
            {s.text}
          </span>
        </div>
      ))}
      {method ? (
        <div
          className="mt-3.5 border-t pt-3.5 font-serif text-[14.5px] italic leading-relaxed"
          style={{ borderColor: 'var(--ac-edge)', color: 'var(--ac-deep)' }}
        >
          {method}
        </div>
      ) : null}
    </div>
  );
}

export type AnswerCellState = 'right' | 'wrong' | 'skip';

export interface AppAnswerGridProps {
  cells: ReadonlyArray<{ n: number; state: AnswerCellState; flagged?: boolean }>;
  className?: string;
}

const CELL: Record<AnswerCellState, { color: string; bg: string; border: string }> = {
  right: { color: 'var(--good)', bg: 'var(--good-soft)', border: 'var(--good-edge)' },
  wrong: { color: 'var(--crit)', bg: 'var(--crit-soft)', border: 'var(--crit-edge)' },
  skip: { color: 'var(--ink-4)', bg: 'var(--paper-2)', border: 'var(--hair)' },
};

export function AppAnswerGrid({ cells, className }: AppAnswerGridProps) {
  return (
    <div className={cn('grid max-w-[460px] grid-cols-10 gap-[7px]', className)}>
      {cells.map((c) => {
        const s = CELL[c.state];
        return (
          <span
            key={c.n}
            className="grid aspect-square place-items-center rounded-[7px] border font-mono text-[11px] font-semibold"
            style={{
              color: s.color,
              background: s.bg,
              borderColor: s.border,
              boxShadow: c.flagged ? 'inset 0 0 0 2px var(--warn)' : undefined,
            }}
          >
            {c.n}
          </span>
        );
      })}
    </div>
  );
}

export interface AppBubbleReviewProps {
  qno: string;
  stem: ReactNode;
  letters: ReadonlyArray<{ letter: string; state: AppBubbleState }>;
  note?: ReactNode;
  className?: string;
}

export function AppBubbleReview({ qno, stem, letters, note, className }: AppBubbleReviewProps) {
  return (
    <div
      className={cn('flex items-center gap-3.5 border-b py-3 last:border-0', className)}
      style={{ borderColor: 'var(--hair-2)' }}
    >
      <span className="font-mono text-[12px] font-semibold" style={{ color: 'var(--ink-3)' }}>
        {qno}
      </span>
      <span className="flex-1 font-serif text-[14px]" style={{ color: 'var(--ink)' }}>
        {stem}
      </span>
      <span className="flex gap-2">
        {letters.map((l) => (
          <AppBubble key={l.letter} letter={l.letter} state={l.state} />
        ))}
      </span>
      {note ? (
        <span className="max-w-[120px] text-right text-[11px]" style={{ color: 'var(--ink-3)' }}>
          {note}
        </span>
      ) : null}
    </div>
  );
}
