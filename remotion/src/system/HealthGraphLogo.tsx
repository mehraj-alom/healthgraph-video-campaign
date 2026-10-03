/**
 * <HealthGraphLogo> — campaign logo mark.
 * Rebuilds the app mark as vectors: three connected nodes with a pulse
 * waveform running through them, plus the lowercase wordmark.
 * The real mark reference lives in references/logo-reference.png.
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {FONT, weight} from './fonts';
import {easeGlide} from './easing';
import {theme} from './theme';

export interface HealthGraphLogoProps {
  /** total size of the lockup (wordmark width ~ size) */
  size?: number;
  /** 0..1 reveal progress; pass undefined for auto from `start` */
  progress?: number;
  start?: number;
  showWordmark?: boolean;
  color?: string;
  center?: boolean;
  top?: number;
}

export const LogoMark: React.FC<{
  size: number;
  progress: number;
  color?: string;
}> = ({size, progress, color = theme.text}) => {
  const c = size / 2;
  const r = size * 0.09;
  const nodes = [
    {x: c - size * 0.22, y: c - size * 0.1, col: theme.green},
    {x: c + size * 0.2, y: c - size * 0.16, col: color},
    {x: c + size * 0.06, y: c + size * 0.14, col: theme.apricot},
  ];
  const pulseW = interpolate(progress, [0.35, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* connecting edges */}
        <line
          x1={nodes[0].x}
          y1={nodes[0].y}
          x2={nodes[1].x}
          y2={nodes[1].y}
          stroke={theme.line}
          strokeWidth={size * 0.02}
        />
        <line
          x1={nodes[1].x}
          y1={nodes[1].y}
          x2={nodes[2].x}
          y2={nodes[2].y}
          stroke={theme.line}
          strokeWidth={size * 0.02}
        />
        {/* pulse waveform through the mark */}
        <path
          d={`M ${c - size * 0.42} ${c} L ${c - size * 0.18} ${c} L ${
            c - size * 0.1
          } ${c - size * 0.22} L ${c + size * 0.02} ${
            c + size * 0.2
          } L ${c + size * 0.1} ${c} L ${c + size * 0.42} ${c}`}
          fill="none"
          stroke={theme.green}
          strokeWidth={size * 0.035}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={size * 1.6}
          strokeDashoffset={size * 1.6 * (1 - pulseW)}
          opacity={0.95}
        />
        {nodes.map((n, i) => {
          const p = interpolate(progress, [i * 0.12, i * 0.12 + 0.3], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: easeGlide,
          });
          return (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={r * p}
              fill={n.col}
              opacity={0.95}
            />
          );
        })}
      </svg>
    </div>
  );
};

export const HealthGraphLogo: React.FC<HealthGraphLogoProps> = ({
  size = 560,
  progress,
  start = 0,
  showWordmark = true,
  color = theme.text,
  center = true,
  top,
}) => {
  const frame = useCurrentFrame();
  const p =
    progress !== undefined
      ? progress
      : interpolate(frame, [start, start + 34], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: easeGlide,
        });
  const wordOp = interpolate(p, [0.55, 0.85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wordY = interpolate(p, [0.55, 0.9], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const markSize = size * 0.3;
  return (
    <AbsoluteFill
      style={{
        justifyContent: center ? 'center' : 'flex-start',
        paddingTop: top,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: size * 0.055,
        }}
      >
        <LogoMark size={markSize} progress={p} color={color} />
        {showWordmark && (
          <div
            style={{
              fontFamily: FONT.display,
              fontWeight: weight.semibold,
              fontSize: size * 0.19,
              letterSpacing: '-0.02em',
              color,
              opacity: wordOp,
              transform: `translateY(${wordY}px)`,
            }}
          >
            healthgraph
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
