import { AppTopBar, AppTabBar, AppCommandMenu, AppPill, AppAvatar } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function NavigationScreen() {
  return (
    <div>
      <ScreenHeader num="29 · Data & state" title="Navigation · shell" blurb="How a student moves through it — phone-first." />

      <Scene title="Desktop top bar" subtitle="AppTopBar">
        <AppTopBar
          tabs={[
            { label: 'Funnel', active: true },
            { label: 'Practise' },
            { label: 'History' },
            { label: 'Settings' },
          ]}
          right={
            <>
              <AppPill tone="good" dot>Banks · 72 days</AppPill>
              <AppAvatar initials="HB" size="sm" />
            </>
          }
        />
      </Scene>

      <Scene title="Phone — the bottom tab bar (the real surface)" subtitle="AppTabBar">
        <div className="max-w-[380px] overflow-hidden rounded-[28px] border" style={{ borderColor: 'var(--hair)', background: 'var(--paper)' }}>
          <div className="flex h-[200px] flex-col justify-center px-6">
            <div className="font-serif text-[21px] font-medium leading-snug">
              Welcome back, Halima. You're <b style={{ color: 'var(--ac)' }}>72 days</b> out — and ahead of where you were.
            </div>
          </div>
          <AppTabBar
            items={[
              { label: 'Funnel', active: true },
              { label: 'Practise' },
              { label: 'Video' },
              { label: 'History' },
            ]}
          />
        </div>
        <Note>Phone-first means the bottom tab bar is the primary navigation, thumb-reachable. The desktop top bar is the secondary case.</Note>
      </Scene>

      <Scene title="Quick jump" subtitle="AppCommandMenu">
        <AppCommandMenu
          items={[
            { icon: '◆', label: 'Drill number series', shortcut: '↵', active: true },
            { icon: '▶', label: 'Start a numerical mock' },
            { icon: '◉', label: 'Record a video answer' },
            { icon: '✎', label: 'Draft a “why this firm” answer' },
          ]}
        />
      </Scene>
    </div>
  );
}
