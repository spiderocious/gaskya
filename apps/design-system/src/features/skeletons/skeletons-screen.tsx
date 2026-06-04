import { AppSkeleton, AppEmptyState, AppErrorState, AppButton } from '@gaskya/ui';
import { CheckCheck } from '@icons';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

export function SkeletonsScreen() {
  return (
    <div>
      <ScreenHeader num="25 · Data & state" title="Skeletons & empty" blurb="The in-between, made kind — and built for Halima's network." />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Scene title="Skeleton — a question card" subtitle="AppSkeleton">
          <AppSkeleton className="mb-3.5 h-[11px] w-[30%]" />
          <AppSkeleton className="mb-2 h-[18px] w-[85%]" />
          <AppSkeleton className="mb-[18px] h-[18px] w-[60%]" />
          <div className="grid grid-cols-2 gap-2.5">
            <AppSkeleton className="h-[42px]" />
            <AppSkeleton className="h-[42px]" />
            <AppSkeleton className="h-[42px]" />
            <AppSkeleton className="h-[42px]" />
          </div>
        </Scene>

        <Scene title="Skeleton — the video player" subtitle="AppSkeleton">
          <AppSkeleton className="mb-3 aspect-[16/10] w-full rounded-[12px]" />
          <AppSkeleton className="mb-3 h-[6px] w-full" />
          <div className="flex gap-2">
            <AppSkeleton className="h-[14px] w-10" />
            <AppSkeleton className="h-[14px] w-10" />
            <AppSkeleton className="ml-auto h-[14px] w-10" />
          </div>
        </Scene>

        <Scene title="Empty — no practice yet" subtitle="AppEmptyState">
          <AppEmptyState
            title="Your funnel is waiting."
            body="Run a sample mock — ten questions, eight minutes, no signup. See where you stand in three minutes."
            action={<AppButton size="sm">Start the sample</AppButton>}
          />
        </Scene>

        <Scene title="Empty — nothing to drill (a good problem)" subtitle="AppEmptyState ✓">
          <AppEmptyState
            icon={<CheckCheck size={20} strokeWidth={2} />}
            title="Nothing flagged to drill."
            body="You're scoring evenly across every sub-skill. Try a full timed mock to find your real ceiling."
            action={
              <AppButton size="sm" variant="ghost">
                Take a full mock
              </AppButton>
            }
          />
        </Scene>
      </div>

      <Scene title="Error & offline — never a dead end" subtitle="AppErrorState">
        <div className="flex flex-col gap-3.5">
          <AppErrorState
            title="Video couldn't upload"
            body="But your audio made it through — so here's your full transcript coaching. We'll retry the video in the background."
          />
          <AppErrorState
            title="You're offline"
            body="Your mock is saved on this phone. Keep going — we'll sync your answers the moment you're back."
          />
        </div>
        <Note>The video failing is an amber inconvenience that still delivers 90% of the value, never a crimson catastrophe.</Note>
      </Scene>
    </div>
  );
}
