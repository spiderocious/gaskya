import { cn } from '../../utils/cn.ts';

/**
 * AppBubble — the A/B/C/D answer mark. The signature graft from the exam-slip.
 *
 * Visual spec: design-system/projects/gaskya/preview/11-inputs.html (.bub)
 *
 * States: idle · on (chosen) · right (the key, sage ring) · was (your wrong
 * pick, struck through crimson). The test made tactile and fair.
 */
export type AppBubbleState = 'idle' | 'on' | 'right' | 'was';

export interface AppBubbleProps {
  letter: string;
  state?: AppBubbleState;
  size?: 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const STATE_STYLE: Record<AppBubbleState, string> = {
  idle: 'border-[#CDBFB1] text-[var(--ink-3)] bg-[var(--sheet)] hover:border-[var(--ac)] hover:text-[var(--ac)]',
  on: 'bg-[var(--ac)] text-white border-[var(--ac)]',
  right: 'border-[var(--good)] text-[var(--good)] shadow-[0_0_0_3px_var(--good-soft)]',
  was: 'border-[var(--crit)] text-[var(--crit)] line-through',
};

export function AppBubble({ letter, state = 'idle', size = 'md', onClick, className }: AppBubbleProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex select-none items-center justify-center rounded-full border-[1.5px] font-mono font-semibold transition-all',
        size === 'lg' ? 'h-10 w-10 text-[14px]' : 'h-[34px] w-[34px] text-[12.5px]',
        onClick ? 'cursor-pointer' : '',
        STATE_STYLE[state],
        className,
      )}
    >
      {letter}
    </span>
  );
}
