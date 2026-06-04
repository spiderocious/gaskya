import { useState } from 'react';

import {
  AppTable,
  AppComparisonTable,
  AppPagination,
  AppPill,
  AppTag,
  AppButton,
  type AppTableColumn,
} from '@gaskya/ui';

import { ScreenHeader, Scene, SectionBreak, Note } from '@shared/preview-canvas.tsx';

interface Attempt {
  when: string;
  practice: string;
  family: string;
  score: number;
  outOf: number;
  scoreTone: 'good' | 'warn' | 'plain';
  perQ: string;
  note: string;
}

const ROWS: Attempt[] = [
  { when: '2h ago', practice: 'Number-series drill', family: 'Numerical', score: 7, outOf: 10, scoreTone: 'good', perQ: '52s', note: 'Lost 2 to the clock, not the maths.' },
  { when: 'Yesterday', practice: 'Full numerical mock', family: 'Numerical', score: 28, outOf: 40, scoreTone: 'plain', perQ: '1m 14s', note: 'Strong on ratios; number series still soft.' },
  { when: '3 days ago', practice: 'Verbal drill', family: 'Verbal', score: 5, outOf: 10, scoreTone: 'warn', perQ: '41s', note: 'Syllogisms tripping you up.' },
  { when: 'Last week', practice: 'Sample mock', family: 'Numerical', score: 4, outOf: 10, scoreTone: 'plain', perQ: '48s', note: 'Your starting point.' },
];

const scoreColor = (t: Attempt['scoreTone']) => (t === 'good' ? 'var(--good)' : t === 'warn' ? 'var(--warn)' : 'var(--ink)');

const COLUMNS: AppTableColumn<Attempt>[] = [
  { key: 'when', header: 'When', sortBy: (r) => r.when, render: (r) => <span className="font-mono" style={{ color: 'var(--ink-3)' }}>{r.when}</span> },
  { key: 'practice', header: 'Practice', sortBy: (r) => r.practice, render: (r) => r.practice },
  { key: 'family', header: 'Family', render: (r) => <AppTag>{r.family}</AppTag> },
  { key: 'score', header: 'Score', align: 'num', sortBy: (r) => r.score / r.outOf, render: (r) => <span style={{ color: scoreColor(r.scoreTone), fontWeight: 600 }}>{r.score}/{r.outOf}</span> },
  { key: 'perQ', header: 'Time / Q', align: 'num', render: (r) => r.perQ },
];

export function TablesScreen() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <ScreenHeader num="20 · Data & state" title="Tables" blurb="Your history — sortable, expandable, comparable. A worklist, not a leaderboard." />

      <Scene title="Sortable + expandable — practice history" subtitle="AppTable (click a header to sort, a row to expand)">
        <AppTable
          columns={COLUMNS}
          rows={ROWS}
          rowKey={(r, i) => `${r.practice}-${i}`}
          renderExpanded={(r) => (
            <div className="flex items-center gap-3">
              <span className="text-[13px]" style={{ color: 'var(--ink-2)' }}>{r.note}</span>
              <AppButton size="sm" className="ml-auto">Review</AppButton>
              <AppButton size="sm" variant="ghost">Retake</AppButton>
            </div>
          )}
        />
        <Note>Scores are mono/tabular so they align; sage marks improvement, amber “keep going” — never a harsh red for a low score.</Note>
      </Scene>

      <SectionBreak label="Comparison — two attempts side by side" />
      <Scene title="AppComparisonTable">
        <AppComparisonTable
          headers={{ a: 'Attempt 1', b: 'Attempt 6' }}
          rows={[
            { metric: 'Score', a: '4/10', b: '7/10', delta: '+3', deltaTone: 'good' },
            { metric: 'Avg time / question', a: '1m 48s', b: '1m 14s', delta: '−34s', deltaTone: 'good' },
            { metric: 'Number series', a: '0/4', b: '2/4', delta: '+2', deltaTone: 'good' },
            { metric: 'Left blank', a: '3', b: '0', delta: '−3', deltaTone: 'good' },
          ]}
        />
      </Scene>

      <SectionBreak label="Cohort aggregate (partner view — no PII)" />
      <Scene title="AppTable — counts & averages only">
        <AppTable
          columns={[
            { key: 'c', header: 'Cohort', render: (r: { c: string; n: string; start: string; now: string; ready: string }) => r.c },
            { key: 'n', header: 'Students', align: 'num', sortBy: (r) => Number(r.n), render: (r) => r.n },
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
        <div className="mt-3"><AppPill dot>counts &amp; averages only · never a single student</AppPill></div>
      </Scene>

      <SectionBreak label="Pagination" />
      <Scene title="AppPagination">
        <AppPagination page={page} pageCount={5} total={47} onPage={setPage} />
      </Scene>
    </div>
  );
}
