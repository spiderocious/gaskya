import { type ReactNode } from 'react';

import { Play, Pause, Circle } from '../../icons/index.ts';
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

export type AudioPlayerVariant = 'full' | 'inline' | 'recording';

export interface AppAudioPlayerProps {
  progressPct: number;
  time: string;
  speed?: string;
  playing?: boolean;
  /** full = the default review player · inline = a compact history-row player · recording = live capture (crimson). */
  variant?: AudioPlayerVariant;
  className?: string;
}

export function AppAudioPlayer({ progressPct, time, speed = '1.0×', playing, variant = 'full', className }: AppAudioPlayerProps) {
  // Static waveform bars (the visual). Heights are deterministic, not random.
  const bars = [12, 26, 18, 34, 22, 40, 16, 44, 28, 20, 36, 14, 30, 22, 38, 10, 26, 18, 32, 12];
  const playedCount = variant === 'recording' ? Math.round(bars.length * 0.55) : Math.round((progressPct / 100) * bars.length);
  const rec = variant === 'recording';
  const inline = variant === 'inline';
  const fill = rec ? 'var(--crit)' : 'var(--ac)';
  return (
    <div
      className={cn('flex items-center rounded-[18px] border', inline ? 'gap-3 p-2.5' : 'gap-3.5 p-4', className)}
      style={{
        borderColor: rec ? 'var(--crit-edge)' : 'var(--hair)',
        background: rec ? 'var(--crit-soft)' : 'var(--paper)',
      }}
    >
      <span
        className={cn('grid shrink-0 place-items-center rounded-full text-white', inline ? 'h-9 w-9 text-[13px]' : 'h-[46px] w-[46px] text-[16px]')}
        style={{ background: fill, boxShadow: `0 3px 0 0 ${rec ? '#7a1d15' : 'var(--ac-deep)'}` }}
      >
        {rec ? <Circle size={inline ? 11 : 14} fill="currentColor" strokeWidth={0} /> : playing ? <Pause size={inline ? 13 : 16} fill="currentColor" strokeWidth={0} /> : <Play size={inline ? 13 : 16} fill="currentColor" strokeWidth={0} />}
      </span>
      <div className={cn('flex flex-1 items-center gap-[2.5px]', inline ? 'h-7' : 'h-11')}>
        {(inline ? bars.slice(0, 10) : bars).map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-[2px]"
            style={{ height: inline ? h * 0.6 : h, background: i < playedCount ? fill : 'var(--hair)' }}
          />
        ))}
      </div>
      <span className="whitespace-nowrap font-mono text-[12px]" style={{ color: rec ? 'var(--crit)' : 'var(--ink-3)' }}>
        {time}
      </span>
      {!inline && !rec ? (
        <span className="cursor-pointer rounded-full border px-2.5 py-1 font-mono text-[12px]" style={{ borderColor: 'var(--hair)' }}>
          {speed}
        </span>
      ) : null}
      {rec ? (
        <span className="rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold" style={{ background: 'var(--crit)', color: '#fff' }}>
          REC
        </span>
      ) : null}
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
        <span className="absolute grid h-14 w-14 place-items-center rounded-full bg-white/90" style={{ color: 'var(--ac)' }}>
          <Play size={20} fill="currentColor" strokeWidth={0} />
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
