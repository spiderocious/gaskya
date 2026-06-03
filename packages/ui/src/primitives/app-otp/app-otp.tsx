import { cn } from '../../utils/cn.ts';

/**
 * AppOtp — phone-OTP code entry (presentational cells).
 *
 * Visual spec: design-system/projects/gaskya/preview/11-inputs.html (.otp)
 *
 * Renders `length` cells reflecting `value`. Wire keystroke handling in the
 * app; this is the visual primitive.
 */
export interface AppOtpProps {
  value: string;
  length?: number;
  className?: string;
}

export function AppOtp({ value, length = 6, className }: AppOtpProps) {
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');
  const firstEmpty = value.length;
  return (
    <div className={cn('flex gap-2.5', className)}>
      {chars.map((c, i) => (
        <div
          key={i}
          className={cn(
            'grid h-14 w-12 place-items-center rounded-[14px] border bg-[var(--sheet)] font-mono text-[22px] font-semibold',
            c ? 'border-[var(--ac)] text-[var(--ink)]' : 'border-[var(--hair)] text-[var(--ink-4)]',
            i === firstEmpty ? 'shadow-[0_0_0_4px_var(--ac-soft)] border-[var(--ac)]' : '',
          )}
        >
          {c || '·'}
        </div>
      ))}
    </div>
  );
}
