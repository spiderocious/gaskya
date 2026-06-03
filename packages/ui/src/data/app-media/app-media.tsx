import { type ReactNode } from 'react';

import { cn } from '../../utils/cn.ts';

/**
 * Media players — presentational chrome for re-watching answers.
 *
 * Visual spec: 33-media-video.html · 34-media-audio.html
 * These render the controls / waveform / frame strip / transcript UI. Actual
 * playback wiring (audio/video elements, currentTime) is application code —
 * pass `progressPct` and the strings/segments to drive the visuals. This keeps
 * the library presentational and the cost-model honest.
 */

export interface AppAudioPlayerProps {
  progressPct: number;
  time: string;
  speed?: string;
  playing?: boolean;
  className?: string;
}

export function AppAudioPlayer({ progressPct, time, speed = '1.0×', playing, className }: AppAudioPlayerProps) {
  // Static waveform bars (the visual). Heights are deterministic, not random.
  const bars = [12, 26, 18, 34, 22, 40, 16, 44, 28, 20, 36, 14, 30, 22, 38, 10, 26, 18, 32, 12];
  const playedCount = Math.round((progressPct / 100) * bars.length);
  return (
    <div
      className={cn('flex items-center gap-3.5 rounded-[18px] border p-4', className)}
      style={{ borderColor: 'var(--hair)', background: 'var(--paper)' }}
    >
      <span
        className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full text-[16px] text-white"
        style={{ background: 'var(--ac)', boxShadow: '0 3px 0 0 var(--ac-deep)' }}
      >
        {playing ? '❚❚' : '▶'}
      </span>
      <div className="flex h-11 flex-1 items-center gap-[2.5px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-[2px]"
            style={{ height: h, background: i < playedCount ? 'var(--ac)' : 'var(--hair)' }}
          />
        ))}
      </div>
      <span className="whitespace-nowrap font-mono text-[12px]" style={{ color: 'var(--ink-3)' }}>
        {time}
      </span>
      <span
        className="cursor-pointer rounded-full border px-2.5 py-1 font-mono text-[12px]"
        style={{ borderColor: 'var(--hair)' }}
      >
        {speed}
      </span>
    </div>
  );
}

export interface FrameMark {
  time: string;
  tied?: boolean;
}

export interface AppVideoPlayerProps {
  progressPct: number;
  time: string;
  frames?: ReadonlyArray<FrameMark>;
  flagsPct?: ReadonlyArray<number>;
  className?: string;
}

export function AppVideoPlayer({ progressPct, time, frames, flagsPct, className }: AppVideoPlayerProps) {
  return (
    <div className={cn('overflow-hidden rounded-[18px] border', className)} style={{ borderColor: 'var(--hair)' }}>
      <div
        className="relative grid aspect-[16/10] place-items-center"
        style={{ background: 'linear-gradient(165deg,#2a2330,#3c3040)' }}
      >
        <span className="h-[88px] w-[88px] rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <span className="absolute grid h-14 w-14 place-items-center rounded-full bg-white/90 text-[20px]" style={{ color: 'var(--ac)' }}>
          ▶
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[12px] text-white">
          {time}
        </span>
      </div>
      <div className="p-3.5">
        <div className="relative h-1.5 rounded-full" style={{ background: 'var(--paper-2)' }}>
          <span className="absolute left-0 top-0 bottom-0 rounded-full" style={{ width: `${progressPct}%`, background: 'var(--ac)' }} />
          {(flagsPct ?? []).map((p, i) => (
            <span key={i} className="absolute -top-[2px] h-2.5 w-[3px] rounded-[2px]" style={{ left: `${p}%`, background: 'var(--warn)' }} />
          ))}
          <span
            className="absolute top-[-3px] h-3 w-3 -translate-x-1/2 rounded-full border-2 bg-[var(--sheet)]"
            style={{ left: `${progressPct}%`, borderColor: 'var(--ac)' }}
          />
        </div>
        {frames && frames.length > 0 ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {frames.map((f, i) => (
              <div
                key={i}
                className="w-[84px] shrink-0 overflow-hidden rounded-[10px] border"
                style={{ borderColor: f.tied ? 'var(--ac)' : 'var(--hair)' }}
              >
                <div className="h-[58px]" style={{ background: 'linear-gradient(165deg,#2a2330,#3c3040)' }} />
                <div
                  className="border-t py-1 text-center font-mono text-[10px]"
                  style={{
                    borderColor: 'var(--hair)',
                    color: f.tied ? 'var(--ac)' : 'var(--ink-3)',
                    background: f.tied ? 'var(--ac-soft)' : undefined,
                  }}
                >
                  {f.time}
                  {f.tied ? ' ◆' : ''}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export interface TranscriptSegment {
  time: string;
  text: ReactNode;
  current?: boolean;
}

export interface AppTranscriptProps {
  segments: ReadonlyArray<TranscriptSegment>;
  className?: string;
}

export function AppTranscript({ segments, className }: AppTranscriptProps) {
  return (
    <div className={cn('text-[14px] leading-[1.9]', className)}>
      {segments.map((s, i) => (
        <span
          key={i}
          className="cursor-pointer rounded-[4px] px-1 py-[1px]"
          style={s.current ? { background: 'var(--ac-soft)', color: 'var(--ac-deep)', fontWeight: 500 } : undefined}
        >
          <span className="mr-1 font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
            {s.time}
          </span>
          {s.text}{' '}
        </span>
      ))}
    </div>
  );
}
