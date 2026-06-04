import { useState } from 'react';

import { AppModal, AppCriticalModal, AppCustomModal, AppButton, type ModalPosition } from '@gaskya/ui';

import { ScreenHeader, Scene, SectionBreak, Note } from '@shared/preview-canvas.tsx';

export function ModalsScreen() {
  const [confirm, setConfirm] = useState(false);
  const [danger, setDanger] = useState(false);
  const [critical, setCritical] = useState(false);
  const [custom, setCustom] = useState(false);
  const [pos, setPos] = useState<ModalPosition | null>(null);

  return (
    <div>
      <ScreenHeader num="40 · Overlays" title="Modals" blurb="Standard, destructive, the mandatory type-to-confirm critical, and custom bodies — at five positions." />

      <SectionBreak label="The four kinds" />
      <Scene title="Standard · destructive · critical · custom">
        <div className="flex flex-wrap gap-3">
          <AppButton onClick={() => setConfirm(true)}>Submit this mock</AppButton>
          <AppButton variant="danger" onClick={() => setDanger(true)}>Delete attempt</AppButton>
          <AppButton variant="danger" onClick={() => setCritical(true)}>Delete account</AppButton>
          <AppButton variant="ghost" onClick={() => setCustom(true)}>Custom body</AppButton>
        </div>
      </Scene>

      <SectionBreak label="Five positions — sheets & drawers" />
      <Scene title="position: center · top · bottom · left · right">
        <div className="flex flex-wrap gap-3">
          {(['center', 'top', 'bottom', 'left', 'right'] as const).map((p) => (
            <AppButton key={p} size="sm" variant="secondary" onClick={() => setPos(p)}>
              {p}
            </AppButton>
          ))}
        </div>
        <Note>center = confirm dialog · top/bottom = sheets · left/right = side drawers. All driven by the same component.</Note>
      </Scene>

      {/* standard */}
      <AppModal
        open={confirm}
        title="Submit this mock now?"
        description="You've answered 36 of 40. The 4 unanswered will be marked blank — same as the real test."
        confirmLabel="Submit mock"
        cancelLabel="Keep going"
        onConfirm={() => setConfirm(false)}
        onClose={() => setConfirm(false)}
      />

      {/* destructive */}
      <AppModal
        open={danger}
        intent="danger"
        title="Delete this attempt?"
        description="Your recording and its feedback will be gone for good. This can't be undone."
        confirmLabel="Delete attempt"
        cancelLabel="Keep it"
        onConfirm={() => setDanger(false)}
        onClose={() => setDanger(false)}
      />

      {/* critical — type to confirm */}
      <AppCriticalModal
        open={critical}
        title="Delete your account and everything in it?"
        description="Your recordings, drafts, scores and history will be permanently erased. There is no recovery after this."
        confirmPhrase="DELETE"
        confirmPrompt={<>Type <strong>DELETE</strong> to confirm</>}
        confirmLabel="Delete account"
        cancelLabel="Keep my account"
        onConfirm={() => setCritical(false)}
        onClose={() => setCritical(false)}
      />

      {/* custom body */}
      <AppCustomModal open={custom} onClose={() => setCustom(false)}>
        <div className="font-serif text-[18px] font-medium" style={{ color: 'var(--ink)' }}>
          A custom body
        </div>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>
          Any JSX — an image preview, a long form, a tutorial overlay. The frame, scrim, X button and
          dismiss behaviour come from the system; the body is yours.
        </p>
      </AppCustomModal>

      {/* positions */}
      <AppCustomModal open={pos !== null} position={pos ?? 'center'} onClose={() => setPos(null)}>
        <div className="font-serif text-[18px] font-medium">
          Position: <span style={{ color: 'var(--ac)' }}>{pos}</span>
        </div>
        <p className="mt-2 text-[13px]" style={{ color: 'var(--ink-3)' }}>
          Same component, different anchor — a sheet or a side drawer.
        </p>
      </AppCustomModal>
    </div>
  );
}
