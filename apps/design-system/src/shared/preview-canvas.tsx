import { type ReactNode } from 'react';

/** Page header for a specimen screen — mirrors the Studio `.stamp`. */
export function ScreenHeader({
  num,
  title,
  blurb,
}: {
  num: string;
  title: string;
  blurb?: string;
}) {
  return (
    <div className="mb-9 border-b pb-4" style={{ borderColor: 'var(--ink)' }}>
      <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--ink-4)' }}>
        {num}
      </div>
      <div
        className="mt-1 font-serif text-[30px] font-semibold leading-none"
        style={{ color: 'var(--ink)' }}
      >
        {title}
      </div>
      {blurb ? (
        <p
          className="mt-2 max-w-[70ch] font-serif text-[14px] italic leading-relaxed"
          style={{ color: 'var(--ink-3)' }}
        >
          {blurb}
        </p>
      ) : null}
    </div>
  );
}

/** A named situation (a scene), not a catalogue cell. */
export function Scene({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-baseline gap-3 border-b pb-2" style={{ borderColor: 'var(--hair)' }}>
        <span className="text-[13px]" style={{ color: 'var(--ink-2)' }}>
          {title}
        </span>
        {subtitle ? (
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
            {subtitle}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function SectionBreak({ label }: { label: string }) {
  return (
    <div className="mb-5 mt-8 flex items-center gap-3">
      <span
        className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em]"
        style={{ color: 'var(--ink-4)' }}
      >
        {label}
      </span>
      <div className="h-px flex-1" style={{ background: 'var(--hair)' }} />
    </div>
  );
}

/** A labelled row for showing one component instance. */
export function Row({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      {label ? (
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--ink-4)' }}>
          {label}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/** A serif-italic note in the coach voice. */
export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 max-w-[64ch] font-serif text-[13px] italic leading-relaxed" style={{ color: 'var(--ink-2)' }}>
      {children}
    </p>
  );
}
