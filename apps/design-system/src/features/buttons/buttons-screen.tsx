import { AppButton } from '@gaskya/ui';

import { ScreenHeader, Scene, SectionBreak, Row, Note } from '@shared/preview-canvas.tsx';

/**
 * Visual spec: design-system/projects/gaskya/preview/10-buttons.html
 */
export function ButtonsScreen() {
  return (
    <div>
      <ScreenHeader
        num="10 · Primitives"
        title="Buttons"
        blurb="The physical key press — the system's single tactile flourish. Rendered in the moments they live, then the full set, small."
      />

      <Scene title="Scene · the no-signup sample, after the score" subtitle="primary · ghost · skip">
        <div
          className="max-w-[420px] rounded-[18px] border p-5"
          style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
        >
          <div className="mb-4 font-serif text-[17px]" style={{ color: 'var(--ink)' }}>
            You scored <b style={{ color: 'var(--ac)' }}>4 / 10</b> — a real starting point. Let's
            build it up, free.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <AppButton size="lg">Create a free account</AppButton>
            <AppButton variant="ghost">See my worked solutions</AppButton>
            <AppButton variant="skip">Maybe later</AppButton>
          </div>
        </div>
      </Scene>

      <Scene title="Scene · a modal foot with the irreversible action" subtitle="secondary + danger">
        <div
          className="max-w-[420px] rounded-[18px] border p-5"
          style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
        >
          <div className="mb-1 font-serif text-[17px]" style={{ color: 'var(--ink)' }}>
            Delete this attempt?
          </div>
          <p className="mb-4 text-[13px]" style={{ color: 'var(--ink-3)' }}>
            Your recording and its feedback will be gone for good. This can't be undone.
          </p>
          <div className="flex gap-3">
            <AppButton variant="secondary">Keep it</AppButton>
            <AppButton variant="danger">Delete attempt</AppButton>
          </div>
        </div>
        <Note>
          The destructive button is crimson but ghosted by default — outlined, not filled — so red
          can't read as decoration. The calmer “Keep it” carries the visual weight.
        </Note>
      </Scene>

      <SectionBreak label="The full set, small — reference" />
      <Row label="Variants">
        <AppButton variant="primary" size="sm">
          Primary
        </AppButton>
        <AppButton variant="secondary" size="sm">
          Secondary
        </AppButton>
        <AppButton variant="ghost" size="sm">
          Tinted
        </AppButton>
        <AppButton variant="skip" size="sm">
          Skip
        </AppButton>
        <AppButton variant="danger" size="sm">
          Delete
        </AppButton>
      </Row>
      <Row label="Sizes">
        <AppButton size="sm">Small</AppButton>
        <AppButton size="md">Default</AppButton>
        <AppButton size="lg">Large</AppButton>
      </Row>
      <Row label="States">
        <AppButton loading>Submitting</AppButton>
        <AppButton disabled>Disabled</AppButton>
        <AppButton block>Block</AppButton>
      </Row>
      <Note>Click any button to feel the press — it drops onto its coloured edge and lands.</Note>
    </div>
  );
}
