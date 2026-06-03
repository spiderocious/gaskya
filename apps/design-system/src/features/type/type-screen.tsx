import { AppText } from '@gaskya/ui';

import { ScreenHeader, SectionBreak, Note } from '@shared/preview-canvas.tsx';

/** Visual spec: design-system/projects/gaskya/preview/02-type.html */
function RoleRow({ role, sub, children }: { role: string; sub: string; children: React.ReactNode }) {
  return (
    <div
      className="grid grid-cols-[130px_1fr] items-baseline gap-6 border-b py-[18px]"
      style={{ borderColor: 'var(--hair)' }}
    >
      <div className="pt-2 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--ink-3)' }}>
        {role}
        <br />
        {sub}
      </div>
      <div>{children}</div>
    </div>
  );
}

export function TypeScreen() {
  return (
    <div>
      <ScreenHeader num="02 · Foundation" title="Type" blurb="Three families, three jobs. Fraunces thinks and coaches; Inter is chrome; JetBrains Mono is the record." />

      <RoleRow role="Fraunces" sub="the thinking">
        <div className="font-serif text-[40px] font-semibold leading-[1.05]" style={{ color: 'var(--ink)' }}>
          You're mock-ready on numerical.
        </div>
        <Note>The coach voice — every sentence spoken to the student, and any number that's an achievement.</Note>
      </RoleRow>

      <RoleRow role="Inter" sub="the chrome">
        <div className="text-[24px] font-semibold" style={{ color: 'var(--ink)' }}>
          Start a timed mock · Review answers · Your target
        </div>
        <Note>Every label, button, field caption, menu, nav item. Quiet, legible at 11px on a cracked screen.</Note>
      </RoleRow>

      <RoleRow role="JetBrains Mono" sub="the record">
        <div className="font-mono text-[24px] font-semibold" style={{ color: 'var(--ink)' }}>
          08:24 left · Q07/40 · +234 80 ··· · 7/10
        </div>
        <Note>Timers, question counts, phone/OTP, raw scores. An achievement is Fraunces; a datum is mono.</Note>
      </RoleRow>

      <SectionBreak label="The scale, via AppText" />
      <div className="flex flex-col gap-2">
        <AppText variant="display-1">Display one</AppText>
        <AppText variant="heading-1">Heading one</AppText>
        <AppText variant="heading-3">Heading three</AppText>
        <AppText variant="body">Body — the readable paragraph face for longer explanation.</AppText>
        <AppText variant="caption">Caption · overline</AppText>
      </div>
    </div>
  );
}
