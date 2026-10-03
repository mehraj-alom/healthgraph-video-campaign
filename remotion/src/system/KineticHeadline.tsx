/**
 * <KineticHeadline> — editorial kinetic type.
 * Per-word reveal inside a line mask; slight tracking convergence; optional
 * accent color for a highlighted word. Intentional, not flashy.
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {FONT, weight} from './fonts';
import {easeGlide, easeOutQuart} from './easing';
import {theme} from './theme';

export interface KineticHeadlineProps {
  text: string;
  start: number;
  /** frames for the whole reveal to finish */
  duration?: number;
  size?: number;
  weightClass?: number;
  color?: string;
  align?: 'center' | 'left';
  top?: number;
  bottom?: number;
  maxWidth?: number;
  /** 0-based index of a word to accent (theme.green) */
  accentWord?: number;
  tracking?: number; // em
}

export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  text,
  start,
  duration = 26,
  size = 96,
  weightClass = weight.black,
  color = theme.text,
  align = 'center',
  top,
  bottom,
  maxWidth = 960,
  accentWord,
  tracking = -0.015,
}) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  const per = duration / Math.max(1, words.length);
  return (
    <AbsoluteFill
      style={{
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <div
        style={{
          fontFamily: FONT.display,
          fontWeight: weightClass,
          fontSize: size,
          lineHeight: 1.12,
          letterSpacing: `${tracking}em`,
          color,
          textAlign: align,
          maxWidth,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          gap: '0 0.22em',
          padding: '0 60px',
        }}
      >
        {words.map((w, i) => {
          const t0 = start + i * per * 0.7;
          const reveal = interpolate(
            frame,
            [t0, t0 + duration * 0.55],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: easeGlide,
            }
          );
          const y = interpolate(reveal, [0, 1], [1.15, 0]);
          const op = interpolate(reveal, [0, 0.6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const isAccent = accentWord === i;
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateY(${y * size}px)`,
                  opacity: op,
                  color: isAccent ? theme.greenBright : undefined,
                }}
              >
                {w}
              </span>
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Small editorial overline + subhead pairing used across the campaign. */
export const Overline: React.FC<{
  text: string;
  start?: number;
  color?: string;
  size?: number;
}> = ({text, start = 0, color, size = 22}) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [start, start + 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutQuart,
  });
  const track = interpolate(frame, [start, start + 22], [0.34, 0.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        opacity: op,
        fontFamily: FONT.display,
        fontWeight: weight.bold,
        fontSize: size,
        letterSpacing: `${track}em`,
        textTransform: 'uppercase',
        color: color ?? theme.greenBright,
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  );
};
