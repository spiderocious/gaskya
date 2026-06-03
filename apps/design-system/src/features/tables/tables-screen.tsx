import { AppTable, AppPill, AppTag, type AppTableColumn } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

interface Attempt {
  when: string;
  practice: string;
  family: string;
  score: string;
  scoreTone: 'good' | 'warn' | 'plain';
  perQ: string;
}

const ROWS: Attempt[] = [
  { when: '2h ago', practice: 'Number-series drill', family: 'Numerical', score: '7/10', scoreTone: 'good', perQ: '52s' },
  { when: 'Yesterday', practice: 'Full numerical mock', family: 'Numerical', score: '28/40', scoreTone: 'plain', perQ: '1m 14s' },
  { when: '3 days ago', practice: 'Verbal drill', family: 'Verbal', score: '5/10', scoreTone: 'warn', perQ: '41s' },
  { when: 'Last week', practice: 'Sample mock (no account)', family: 'Numerical', score: '4/10', scoreTone: 'plain', perQ: '48s' },
];

const COLUMNS: AppTableColumn<Attempt>[] = [
  { key: 'when', header: 'When', render: (r) => <span className="font-mono" style={{ color: 'var(--ink-3)' }}>{r.when}</span> },
  { key: 'practice', header: 'Practice', render: (r) => r.practice },
  { key: 'family', header: 'Family', render: (r) => <AppTag>{r.family}</AppTag> },
  {
    key: 'score',
    header: 'Score',
    align: 'num',
    render: (r) => (
      <span style={{ color: r.scoreTone === 'good' ? 'var(--good)' : r.scoreTone === 'warn' ? 'var(--warn)' : 'var(--ink)', fontWeight: 600 }}>
        {r.score}
      </span>
    ),
  },
  { key: 'perQ', header: 'Time / Q', align: 'num', render: (r) => r.perQ },
];

export function TablesScreen() {
  return (
    <div>
      <ScreenHeader num="20 · Data & state" title="Tables" blurb="Your practice history — a worklist, not a leaderboard." />

      <Scene title="Practice history" subtitle="AppTable">
        <AppTable columns={COLUMNS} rows={ROWS} rowKey={(r, i) => `${r.practice}-${i}`} />
        <Note>Scores are mono and tabular so they align down the column. Sage marks improvement, amber marks “keep going” — never a harsh red for a low score.</Note>
      </Scene>

      <Scene title="Cohort aggregate (partner view — no PII, ever)" subtitle="AppTable">
        <AppTable
          columns={[
            { key: 'c', header: 'Cohort', render: (r: { c: string; n: string; start: string; now: string; ready: string }) => r.c },
            { key: 'n', header: 'Students', align: 'num', render: (r) => r.n },
            { key: 'start', header: 'Avg start', align: 'num', render: (r) => r.start },
            { key: 'now', header: 'Avg now', align: 'num', render: (r) => r.now },
            { key: 'ready', header: 'Mock-ready', align: 'num', render: (r) => <span style={{ color: 'var(--good)', fontWeight: 600 }}>{r.ready}</span> },
          ]}
          rows={[
            { c: 'BUK 2026 · numerical', n: '412', start: '38%', now: '56%', ready: '63%' },
            { c: 'BUK 2026 · video', n: '228', start: '—', now: '—', ready: '41%' },
          ]}
          rowKey={(r) => r.c}
        />
        <div className="mt-3">
          <AppPill dot>counts &amp; averages only · never a single student</AppPill>
        </div>
      </Scene>
    </div>
  );
}
