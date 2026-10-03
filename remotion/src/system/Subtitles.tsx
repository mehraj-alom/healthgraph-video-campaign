/**
 * <Subtitles> — burned-in captions for vertical reels.
 * Reads the current line from the timing file; splits into max 2 lines.
 * Lives in the bottom safe zone; pill scrim keeps it readable on any frame.
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {FONT, weight} from './fonts';
import {lineAt, Timing} from './narration';
import {V} from './layout';

export interface SubtitlesProps {
  timing: Timing;
  /** lead the caption slightly ahead of the voice (frames) */
  lead?: number;
  size?: number;
  showAll?: boolean; // debug
}

const splitLines = (text: string, max: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= max) {
      cur = next;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
};

export const Subtitles: React.FC<SubtitlesProps> = ({
  timing,
  lead = 4,
  size = 46,
  showAll,
}) => {
  const frame = useCurrentFrame();
  const line = lineAt(timing, frame + lead);
  if (!line && !showAll) return null;
  const text = line ? line.text : '…';
  const lines = splitLines(text, size >= 52 ? 26 : 30);

  const inF = 8;
  const appear = line
    ? interpolate(
        frame,
        [line.startFrame + lead - 1, line.startFrame + lead - 1 + inF],
        [0.25, 1],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
      )
    : 1;
  const slide = line
    ? interpolate(
        frame,
        [line.startFrame + lead - 1, line.startFrame + lead - 1 + inF],
        [14, 0],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
      )
    : 0;

  const top = Math.min(
    V.subBottom - lines.length * (size * 1.35 + 18) - 24,
    1480
  );

  return (
    <AbsoluteFill style={{justifyContent: 'flex-end'}}>
      <div
        style={{
          position: 'absolute',
          left: 48,
          right: 48,
          top,
          opacity: appear,
          transform: `translateY(${slide}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONT.display,
              fontWeight: weight.semibold,
              fontSize: size,
              lineHeight: size * 1.35,
              color: '#FFFFFF',
              textAlign: 'center',
              padding: '6px 26px',
              borderRadius: 22,
              backgroundColor: 'rgba(6,10,16,0.58)',
              textShadow: '0 2px 14px rgba(0,0,0,0.55)',
              maxWidth: V.width - 96,
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
