/**
 * <VoiceWave> — voice interaction visual: the red pulse button from the app
 * plus a deterministic waveform. Used for voice-check-in moments.
 */
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FONT, weight} from './fonts';
import {easeGlide} from './easing';
import {theme} from './theme';

export interface VoiceWaveProps {
  start: number;
  /** 0..1 energy (amplitude) */
  energy: number;
  size?: number;
  label?: string;
}

export const VoiceWave: React.FC<VoiceWaveProps> = ({
  start,
  energy,
  size = 380,
  label = 'Voice check-in',
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeGlide,
  });
  const R = size * 0.3;
  const bars = 33;
  const bw = (size * 0.86) / bars;
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      {/* rings */}
      {[0.5, 0.78, 1.05].map((k, i) => {
        const ph = ((frame - start) * 0.014 + i * 0.33) % 1;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: R * 2 * k * (1 + ph * 0.55 * energy),
              height: R * 2 * k * (1 + ph * 0.55 * energy),
              borderRadius: '50%',
              border: `1.5px solid ${theme.red}`,
              opacity: p * (1 - ph) * 0.5 * energy,
              transform: 'translate(-50%,-50%)',
            }}
          />
        );
      })}
      {/* button */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: R * 1.16,
          height: R * 1.16,
          borderRadius: '50%',
          backgroundColor: theme.red,
          transform: `translate(-50%,-50%) scale(${interpolate(p, [0, 1], [0.8, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`,
          boxShadow: `0 0 ${60 + 40 * energy}px ${theme.glowRed}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* pulse icon */}
        <svg width={R} height={R * 0.5} viewBox="0 0 100 50">
          <path
            d="M0 25 L30 25 L40 8 L52 42 L62 25 L100 25"
            fill="none"
            stroke="#fff"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* waveform */}
      <div
        style={{
          position: 'absolute',
          left: '7%',
          right: '7%',
          bottom: 0,
          display: 'flex',
          gap: 3,
          alignItems: 'flex-end',
          height: size * 0.16,
          opacity: p,
        }}
      >
        {Array.from({length: bars}).map((_, i) => {
          const amp =
            (0.25 +
              0.75 *
                Math.abs(Math.sin(i * 0.55 + frame * 0.22)) *
                Math.abs(Math.cos(i * 0.23 + frame * 0.07))) *
            energy;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${8 + amp * 88}%`,
                borderRadius: 3,
                backgroundColor: theme.red,
                opacity: 0.5 + 0.5 * amp,
              }}
            />
          );
        })}
      </div>
      {label && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '100%',
            marginTop: 22,
            textAlign: 'center',
            fontFamily: FONT.display,
            fontWeight: weight.bold,
            fontSize: 26,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: theme.textSecondary,
            opacity: interpolate(frame, [start + 18, start + 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
