import { AppAudioPlayer, AppVideoPlayer, AppTranscript, AppButton } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function MediaScreen() {
  return (
    <div>
      <ScreenHeader num="33 · Data & state" title="Media players" blurb="Re-watch your own answer. Audio is the cheap default path; video is stored whole, processed in a handful of frames." />

      <Scene title="Audio player — the cheap, fast default" subtitle="AppAudioPlayer">
        <div className="max-w-[520px]">
          <AppAudioPlayer progressPct={42} time="0:42 / 1:00" playing />
        </div>
        <Note>Practice mode is audio-only — instant feedback, retakes allowed, no expensive video pipeline.</Note>
      </Scene>

      <Scene title="Video player — frame strip = the cost model, visible" subtitle="AppVideoPlayer">
        <div className="max-w-[460px]">
          <AppVideoPlayer
            progressPct={42}
            time="0:42 / 1:00"
            flagsPct={[42, 70]}
            frames={[
              { time: '0:00' },
              { time: '0:08', tied: true },
              { time: '0:18' },
              { time: '0:42', tied: true },
              { time: '0:52' },
              { time: '1:00' },
            ]}
          />
          <div className="mt-3 flex gap-3">
            <AppButton size="sm" variant="secondary">
              ↻ Re-watch
            </AppButton>
            <AppButton size="sm">Retake</AppButton>
          </div>
        </div>
        <Note>Only a handful of frames go to the vision model, timed to transcript events (◆). Storage is pennies; whole-video inference is forbidden.</Note>
      </Scene>

      <Scene title="Transcript — tap a line to jump there" subtitle="AppTranscript">
        <div className="max-w-[640px]">
          <AppTranscript
            segments={[
              { time: '0:00', text: 'So there was a time during my final-year project when our data got corrupted two days before the deadline.' },
              { time: '0:18', text: 'I had to decide quickly whether to restart or recover it, under real pressure.', current: true },
              { time: '0:42', text: 'I wrote a script to rebuild the dataset from our backups and tested it overnight…' },
              { time: '0:58', text: 'and yeah, it worked out in the end.' },
            ]}
          />
        </div>
        <Note>90% of the coaching value lives here — words, pace, fillers, structure. The transcript is the cheap signal.</Note>
      </Scene>
    </div>
  );
}
