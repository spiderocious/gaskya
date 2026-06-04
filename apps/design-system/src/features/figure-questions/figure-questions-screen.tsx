import { AppShapeSequence, AppFlowRule, AppMatrix3x3, AppQuestionCard } from '@gaskya/ui';

import { ScreenHeader, Scene, SectionBreak, Note } from '@shared/preview-canvas.tsx';

const stroke = { fill: 'none', stroke: 'var(--ink)', strokeWidth: 2 } as const;

export function FigureQuestionsScreen() {
  return (
    <div>
      <ScreenHeader num="31 · Data & state" title="Question types — figure families" blurb="Diagrammatic, abstract & data-interpretation — crisp SVG that pans/zooms on a small phone." />

      <SectionBreak label="Diagrammatic" />
      <div className="flex flex-col gap-5">
        <Scene title="Shape sequence — what comes next?" subtitle="AppShapeSequence">
          <div className="max-w-[600px]">
            <AppShapeSequence
              provenance="Generated #DG-2207"
              stem="The shape gains a side each step. What comes next?"
              sequence={[
                <svg key="1" width="44" height="44" viewBox="0 0 44 44"><polygon points="22,8 30,30 14,30" {...stroke} /></svg>,
                <svg key="2" width="44" height="44" viewBox="0 0 44 44"><rect x="11" y="11" width="22" height="22" {...stroke} /></svg>,
                <svg key="3" width="44" height="44" viewBox="0 0 44 44"><polygon points="22,8 34,18 30,33 14,33 10,18" {...stroke} /></svg>,
              ]}
              options={[
                { label: 'A', figure: <svg width="40" height="40" viewBox="0 0 44 44"><polygon points="22,7 31,14 34,25 28,34 16,34 10,25 13,14" {...stroke} /></svg> },
                { label: 'B', state: 'key', figure: <svg width="40" height="40" viewBox="0 0 44 44"><polygon points="22,7 32,12 36,23 30,33 14,33 8,23 12,12" fill="none" stroke="var(--good)" strokeWidth={2} /></svg> },
                { label: 'C', figure: <svg width="40" height="40" viewBox="0 0 44 44"><circle cx="22" cy="22" r="13" {...stroke} /></svg> },
                { label: 'D', figure: <svg width="40" height="40" viewBox="0 0 44 44"><rect x="10" y="10" width="24" height="24" {...stroke} /></svg> },
              ]}
            />
          </div>
        </Scene>

        <Scene title="Process / flow rule" subtitle="AppFlowRule">
          <div className="max-w-[600px]">
            <AppFlowRule
              stem="If ◐ = rotate 180° and ◑ = mirror, what does the input become?"
              steps={[
                <svg key="i" width="44" height="44" viewBox="0 0 44 44"><path d="M12 12 L32 12 L12 32 Z" fill="var(--ac)" opacity="0.85" /></svg>,
                '→ ◐ →',
                <svg key="m" width="44" height="44" viewBox="0 0 44 44"><path d="M32 32 L12 32 L32 12 Z" fill="var(--ink-3)" /></svg>,
                '→ ◑ →',
              ]}
              options={[
                { label: 'A', state: 'key', figure: <svg width="40" height="40" viewBox="0 0 44 44"><path d="M12 32 L32 32 L12 12 Z" fill="var(--good)" /></svg> },
                { label: 'B', figure: <svg width="40" height="40" viewBox="0 0 44 44"><path d="M12 12 L32 12 L12 32 Z" fill="var(--ink-3)" /></svg> },
                { label: 'C', figure: <svg width="40" height="40" viewBox="0 0 44 44"><path d="M32 12 L32 32 L12 32 Z" fill="var(--ink-3)" /></svg> },
              ]}
            />
          </div>
        </Scene>
      </div>

      <SectionBreak label="Abstract reasoning" />
      <Scene title="3×3 matrix — find the missing tile" subtitle="AppMatrix3x3">
        <div className="max-w-[600px]">
          <AppMatrix3x3
            provenance="Generated #AB-1180"
            stem="Dots increase along each row; the shape darkens down each column. Which tile completes the grid?"
            cells={[
              <svg key="1" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="3" fill="var(--ink)" /></svg>,
              <svg key="2" width="40" height="40" viewBox="0 0 40 40"><circle cx="13" cy="20" r="3" fill="var(--ink)" /><circle cx="27" cy="20" r="3" fill="var(--ink)" /></svg>,
              <svg key="3" width="40" height="40" viewBox="0 0 40 40"><circle cx="10" cy="20" r="3" fill="var(--ink)" /><circle cx="20" cy="20" r="3" fill="var(--ink)" /><circle cx="30" cy="20" r="3" fill="var(--ink)" /></svg>,
              <svg key="4" width="40" height="40" viewBox="0 0 40 40"><rect x="16" y="16" width="8" height="8" fill="var(--ink-3)" /></svg>,
              <svg key="5" width="40" height="40" viewBox="0 0 40 40"><rect x="9" y="16" width="8" height="8" fill="var(--ink-3)" /><rect x="23" y="16" width="8" height="8" fill="var(--ink-3)" /></svg>,
              <svg key="6" width="40" height="40" viewBox="0 0 40 40"><rect x="6" y="16" width="8" height="8" fill="var(--ink-3)" /><rect x="16" y="16" width="8" height="8" fill="var(--ink-3)" /><rect x="26" y="16" width="8" height="8" fill="var(--ink-3)" /></svg>,
              <svg key="7" width="40" height="40" viewBox="0 0 40 40"><polygon points="20,15 25,25 15,25" fill="var(--ac)" /></svg>,
              <svg key="8" width="40" height="40" viewBox="0 0 40 40"><polygon points="13,15 18,25 8,25" fill="var(--ac)" /><polygon points="27,15 32,25 22,25" fill="var(--ac)" /></svg>,
            ]}
            options={[
              { label: 'A', figure: <svg width="40" height="40" viewBox="0 0 40 40"><polygon points="20,15 25,25 15,25" fill="var(--ac)" /></svg> },
              { label: 'B', state: 'key', figure: <svg width="40" height="40" viewBox="0 0 40 40"><polygon points="10,15 14,25 6,25" fill="var(--ac)" /><polygon points="20,15 24,25 16,25" fill="var(--ac)" /><polygon points="30,15 34,25 26,25" fill="var(--ac)" /></svg> },
              { label: 'C', figure: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="6" y="16" width="8" height="8" fill="var(--ink-3)" /><rect x="16" y="16" width="8" height="8" fill="var(--ink-3)" /><rect x="26" y="16" width="8" height="8" fill="var(--ink-3)" /></svg> },
              { label: 'D', figure: <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="3" fill="var(--ink)" /></svg> },
            ]}
          />
        </div>
      </Scene>

      <SectionBreak label="Data interpretation (figure + MCQ)" />
      <div className="flex flex-col gap-5">
        <Scene title="Read a chart" subtitle="AppQuestionCard + inline SVG passage">
          <div className="max-w-[600px]">
            <AppQuestionCard
              family="Data interpretation · Bar"
              passage={
                <svg width="100%" height="150" viewBox="0 0 420 150" style={{ maxWidth: 420 }}>
                  <line x1="40" y1="120" x2="410" y2="120" stroke="var(--hair)" />
                  <rect x="70" y="40" width="40" height="80" fill="var(--ac)" rx="3" /><text x="90" y="135" fontSize="10" fill="var(--ink-3)" textAnchor="middle" fontFamily="monospace">Lagos</text><text x="90" y="34" fontSize="10" fill="var(--ink-2)" textAnchor="middle" fontFamily="monospace">155</text>
                  <rect x="170" y="68" width="40" height="52" fill="var(--ac-mid)" rx="3" /><text x="190" y="135" fontSize="10" fill="var(--ink-3)" textAnchor="middle" fontFamily="monospace">Kano</text><text x="190" y="62" fontSize="10" fill="var(--ink-2)" textAnchor="middle" fontFamily="monospace">100</text>
                  <rect x="270" y="80" width="40" height="40" fill="var(--ac-mid)" rx="3" /><text x="290" y="135" fontSize="10" fill="var(--ink-3)" textAnchor="middle" fontFamily="monospace">PH</text><text x="290" y="74" fontSize="10" fill="var(--ink-2)" textAnchor="middle" fontFamily="monospace">78</text>
                </svg>
              }
              stem="By how many ₦m did Lagos lead Kano in Q4?"
              twoColumn
              options={[
                { letter: 'A', text: '45' },
                { letter: 'B', text: '55', state: 'key' },
                { letter: 'C', text: '22' },
                { letter: 'D', text: '77' },
              ]}
            />
          </div>
        </Scene>
      </div>
      <Note>Figure questions reuse the same answer language as the text families — options become SVG tiles or numbers read off a crisp chart. The dashed aubergine “?” is the consistent “your answer goes here” mark.</Note>
    </div>
  );
}
