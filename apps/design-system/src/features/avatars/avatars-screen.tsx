import { AppAvatar, AppAvatarStack, AppLogo, AppPill, AppTag } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function AvatarsScreen() {
  return (
    <div>
      <ScreenHeader num="26 · Data & state" title="Avatars · pills · status" blurb="People as people; the status taxonomy; partner marks." />

      <Scene title="Avatars — initials default, sizes" subtitle="AppAvatar">
        <div className="flex items-end gap-4">
          <AppAvatar initials="HB" size="sm" />
          <AppAvatar initials="HB" size="md" />
          <AppAvatar initials="HB" size="lg" />
          <AppAvatar initials="HB" size="lg" ring="good" />
        </div>
        <Note>No photos by default — a low-income graduate shouldn't need a headshot.</Note>
      </Scene>

      <Scene title="Shapes — circle · squircle · rounded · square" subtitle="AppAvatar shape">
        <div className="flex items-end gap-5">
          {(['circle', 'squircle', 'rounded', 'square'] as const).map((s) => (
            <div key={s} className="text-center">
              <AppAvatar initials="HB" size="lg" shape={s} />
              <div className="mt-1.5 font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
                {s}
              </div>
            </div>
          ))}
        </div>
      </Scene>

      <Scene title="Group stack — a cohort, anonymised" subtitle="AppAvatarStack">
        <AppAvatarStack items={[{ initials: 'HB' }, { initials: 'AO' }, { initials: 'CU' }]} extra={409} />
        <Note>A partner sees the count, never the faces or names.</Note>
      </Scene>

      <Scene title="Partner / employer marks" subtitle="AppLogo">
        <div className="flex gap-3.5">
          <AppLogo tone="accent">AB</AppLogo>
          <AppLogo tone="good">D</AppLogo>
          <AppLogo tone="warn">SH</AppLogo>
          <AppLogo>BUK</AppLogo>
        </div>
      </Scene>

      <Scene title="Readiness & status pills" subtitle="AppPill">
        <div className="flex flex-wrap gap-2.5">
          <AppPill tone="good" dot>Mock-ready</AppPill>
          <AppPill tone="accent" dot>Improving</AppPill>
          <AppPill tone="warn" dot>Keep drilling</AppPill>
          <AppPill dot>Not started</AppPill>
          <AppPill tone="crit" dot>Missed</AppPill>
          <AppPill tone="ink">Graded · one shot</AppPill>
        </div>
        <div className="mt-3">
          <AppTag>Numerical · Number series</AppTag>
        </div>
      </Scene>
    </div>
  );
}
