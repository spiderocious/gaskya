import { AppSparkline, AppTrendLine, AppFunnelStepper, AppProgressRing, AppPill, AppCard } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function ChartsScreen() {
  return (
    <div>
      <ScreenHeader num="22 · Data & state" title="Charts & trend" blurb="Proof that practice pays. Hairline by default, aubergine fills." />

      <Scene title="Your climb — numerical, last 6 mocks" subtitle="AppTrendLine">
        <AppCard size="lg">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--ink-3)' }}>
              Numerical · last 6 mocks
            </span>
            <AppPill tone="good" dot>▲ 12 points</AppPill>
          </div>
          <AppTrendLine values={[4, 4.5, 6, 6.5, 8, 8.5]} startLabel="4/10 → start" endLabel="7/10 → now" />
        </AppCard>
      </Scene>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Scene title="Sparkline — inline trend" subtitle="AppSparkline">
          <div className="flex items-center gap-4">
            <AppSparkline values={[3, 4, 4, 6, 6, 8, 9]} />
            <span className="font-serif text-[24px] font-semibold" style={{ color: 'var(--ac)' }}>
              7<span className="font-mono text-[12px]" style={{ color: 'var(--ink-3)' }}>/10</span>
            </span>
          </div>
        </Scene>

        <Scene title="Readiness — numerical" subtitle="AppProgressRing">
          <div className="flex items-center gap-4">
            <AppProgressRing value={70}>
              <span className="font-serif text-[20px] font-semibold" style={{ color: 'var(--ac)' }}>
                70<span className="text-[12px]">%</span>
              </span>
            </AppProgressRing>
            <span className="font-serif text-[16px] font-medium">Almost there</span>
          </div>
        </Scene>
      </div>

      <Scene title="Your funnel — where you stand" subtitle="AppFunnelStepper">
        <AppCard>
          <AppFunnelStepper
            stages={[
              { label: 'Sample', state: 'done' },
              { label: 'Account', state: 'done' },
              { label: 'Aptitude', state: 'now' },
              { label: 'Video', state: 'todo' },
              { label: 'Written', state: 'todo' },
            ]}
          />
        </AppCard>
        <Note>A funnel that shows progress, not pressure. None of it is locked — you can practise any stage, any time.</Note>
      </Scene>
    </div>
  );
}
