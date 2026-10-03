/**
 * <Scene> — deterministic scene container.
 * Fades a block in over `inF` frames at `from`, holds, out over `outF` ending
 * at `to`. Optional vertical travel on enter/exit.
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {easeInCubic, easeOutQuart} from './easing';
import {theme} from './theme';

export interface SceneProps {
  from: number;
  to: number; // exclusive end frame
  inF?: number;
  outF?: number;
  /** vertical travel (px) on enter (0 = pure fade) */
  travel?: number;
  bg?: string;
  children: React.ReactNode;
}

export const Scene: React.FC<SceneProps> = ({
  from,
  to,
  inF = 14,
  outF = 12,
  travel = 0,
  bg = theme.bg,
  children,
}) => {
  const frame = useCurrentFrame();
  if (frame < from - 1 || frame >= to) return null;
  const opacity = interpolate(
    frame,
    [from, from + inF, to - outF, to],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: [easeOutQuart, easeOutQuart, easeInCubic, easeInCubic],
    }
  );
  const y =
    travel === 0
      ? 0
      : interpolate(
          frame,
          [from, from + inF, to - outF, to],
          [travel, 0, 0, -travel * 0.4],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: [easeOutQuart, easeOutQuart, easeInCubic, easeInCubic],
          }
        );
  return (
    <AbsoluteFill
      style={{backgroundColor: bg, opacity, transform: `translateY(${y}px)`}}
    >
      {children}
    </AbsoluteFill>
  );
};
