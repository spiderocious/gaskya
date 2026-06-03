import { useState } from 'react';

import { AppModal, AppTypedConfirmModal, AppButton } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function ModalsScreen() {
  const [confirm, setConfirm] = useState(false);
  const [del, setDel] = useState(false);

  return (
    <div>
      <ScreenHeader num="40 · Overlays" title="Modals" blurb="Calm confirm; the mandatory irreversible behind a typed word." />

      <Scene title="Confirm — the safe choice carries weight" subtitle="AppModal">
        <AppButton onClick={() => setConfirm(true)}>Submit this mock</AppButton>
        <AppModal
          open={confirm}
          title="Submit this mock now?"
          onClose={() => setConfirm(false)}
          footer={
            <>
              <AppButton variant="secondary" onClick={() => setConfirm(false)}>
                Keep going
              </AppButton>
              <AppButton className="ml-auto" onClick={() => setConfirm(false)}>
                Submit mock
              </AppButton>
            </>
          }
        >
          You've answered 36 of 40. The 4 unanswered will be marked blank — same as the real test.
        </AppModal>
      </Scene>

      <Scene title="The irreversible — delete account & all data" subtitle="AppTypedConfirmModal">
        <AppButton variant="danger" onClick={() => setDel(true)}>
          Delete my account
        </AppButton>
        <AppTypedConfirmModal
          open={del}
          title="Delete your account and everything in it?"
          body={
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>
              Your recordings, drafts, scores and history will be permanently erased. Your data is
              yours — including the right to take it all back. There is no recovery after this.
            </p>
          }
          confirmWord="DELETE"
          onConfirm={() => setDel(false)}
          onClose={() => setDel(false)}
        />
        <Note>
          Crimson appears only here, where it's earned — guarded by both a typed DELETE and the
          ghosted destructive button. No two-person verification: a student needs no one's
          permission to delete their own work.
        </Note>
      </Scene>
    </div>
  );
}
