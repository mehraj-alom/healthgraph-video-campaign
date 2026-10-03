/**
 * <CTA> — end card. Logo + one CTA line + healthgraph.shop.
 * Deterministic entrance; no fake social proof, no urgency.
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {FONT, weight} from './fonts';
import {easeGlide} from './easing';
import {theme} from './theme';
import {HealthGraphLogo} from './HealthGraphLogo';

export interface CTAProps {
  start: number;
  /** CTA sentence, e.g. "Explore HealthGraph." */
  line?: string;
  /** show "Follow for the next part." style follow-ups */
  secondary?: string;
  size?: number;
  top?: number;
}

export const CTA: React.FC<CTAProps> = ({
  start,
  line = 'Explore HealthGraph.',
  secondary,
  size = 420,
  top,
}) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [start, start + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeGlide,
  });
  const y = interpolate(frame, [start, start + 24], [22, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeGlide,
  });
  const siteOp = interpolate(frame, [start + 16, start + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bgDeep,
        justifyContent: top === undefined ? 'center' : 'flex-start',
        paddingTop: top,
      }}
    >
      <div
        style={{
          opacity: op,
          transform: `translateY(${y}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <HealthGraphLogo size={size} progress={interpolate(frame, [start, start + 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
        <div
          style={{
            fontFamily: FONT.display,
            fontWeight: weight.bold,
            fontSize: 54,
            letterSpacing: '-0.015em',
            color: theme.text,
            textAlign: 'center',
            padding: '0 60px',
          }}
        >
          {line}
        </div>
        <div
          style={{
            opacity: siteOp,
            fontFamily: FONT.mono,
            fontWeight: 500,
            fontSize: 30,
            letterSpacing: '0.08em',
            color: theme.greenBright,
          }}
        >
          healthgraph.shop
        </div>
        {secondary && (
          <div
            style={{
              opacity: siteOp * 0.8,
              fontFamily: FONT.display,
              fontWeight: weight.medium,
              fontSize: 28,
              color: theme.textSecondary,
            }}
          >
            {secondary}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
