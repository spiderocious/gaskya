import {
  AppSparkline,
  AppTrendLine,
  AppFunnelStepper,
  AppBarChart,
  AppStackedBar,
  AppDonut,
  AppHeatmap,
  AppBullet,
  AppRadar,
  AppDistribution,
  AppPill,
  AppCard,
} from '@gaskya/ui';

import { ScreenHeader, Scene, SectionBreak, Note } from '@shared/preview-canvas.tsx';

export function ChartsScreen() {
  return (
    <div>
      <ScreenHeader num="22 · Data & state" title="Charts" blurb="The full set — hairline by default, aubergine fills. Proof that practice pays." />

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

      <SectionBreak label="Comparisons & distributions" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Scene title="Bar — score by family" subtitle="AppBarChart">
          <AppBarChart
            data={[
              { label: 'NUM', value: 0.9 },
              { label: 'VRB', value: 0.55 },
              { label: 'DIA', value: 0.4, muted: true },
              { label: 'ABS', value: 0.65 },
              { label: 'CRT', value: 0.75 },
            ]}
          />
        </Scene>

        <Scene title="Stacked bar — answers per mock" subtitle="AppStackedBar">
          <AppStackedBar
            rows={[
              { label: 'M1', segments: [{ value: 40, tone: 'good' }, { value: 35, tone: 'crit' }, { value: 25, tone: 'muted' }] },
              { label: 'M3', segments: [{ value: 62, tone: 'good' }, { value: 23, tone: 'crit' }, { value: 15, tone: 'muted' }] },
              { label: 'M6', segments: [{ value: 78, tone: 'good' }, { value: 12, tone: 'crit' }, { value: 10, tone: 'muted' }] },
            ]}
          />
          <div className="mt-3 flex gap-4">
            <AppPill tone="good" dot>correct</AppPill>
            <AppPill tone="crit" dot>missed</AppPill>
            <AppPill dot>blank</AppPill>
          </div>
        </Scene>

        <Scene title="Heatmap — practice by day & family" subtitle="AppHeatmap">
          <AppHeatmap
            columns={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
            rows={[
              { label: 'Num', cells: [0.9, 0.5, 0.25, 0, 0.7, 1, 0.4] },
              { label: 'Vrb', cells: [0, 0.4, 0.6, 0, 0.3, 0, 0.5] },
            ]}
          />
        </Scene>

        <Scene title="Distribution — where you sit in the cohort" subtitle="AppDistribution">
          <AppDistribution marker={0.7} />
          <Note>Above the cohort median — encouragement, never ranking. (Cohort comparison is opt-in.)</Note>
        </Scene>
      </div>

      <SectionBreak label="Readiness & shape" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Scene title="Donut — readiness" subtitle="AppDonut">
          <AppDonut value={70}>
            <span className="font-serif text-[26px] font-semibold" style={{ color: 'var(--ac)' }}>
              70<span className="text-[13px]">%</span>
            </span>
          </AppDonut>
        </Scene>

        <Scene title="Radar — your shape" subtitle="AppRadar">
          <AppRadar values={[0.9, 0.6, 0.4, 0.5, 0.75]} labels={['NUM', 'VRB', 'DIA', 'ABS', 'CRT']} />
        </Scene>

        <Scene title="Sparkline — inline" subtitle="AppSparkline">
          <div className="flex items-center gap-3">
            <AppSparkline values={[3, 4, 4, 6, 6, 8, 9]} />
            <span className="font-serif text-[24px] font-semibold" style={{ color: 'var(--ac)' }}>
              7<span className="font-mono text-[12px]" style={{ color: 'var(--ink-3)' }}>/10</span>
            </span>
          </div>
        </Scene>
      </div>

      <Scene title="Bullet — score vs the mock-ready target" subtitle="AppBullet">
        <div className="max-w-[420px]">
          <AppBullet value={70} target={70} />
          <div className="mt-2 flex justify-between font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
            <span>you · 7.0</span>
            <span style={{ color: 'var(--ink)' }}>target · 7.0 ✓</span>
          </div>
        </div>
      </Scene>

      <SectionBreak label="The funnel" />
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
        <Note>Progress, not pressure. None of it is locked — practise any stage, any time.</Note>
      </Scene>
    </div>
  );
}
