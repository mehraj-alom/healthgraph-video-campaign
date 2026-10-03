/**
 * <MeasurementDial> — health instrumentation: gauge + value + status.
 * Matches the app's pulse-check aesthetic (58% arc gauge, quality tag).
 */
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FONT, weight} from './fonts';
import {easeDial} from './easing';
import {theme} from './theme';

export interface MeasurementDialProps {
  /** 0..1 fill of the gauge */
  value: number;
  start: number;
  size?: number;
  label: string;
  unit: string;
  sub?: string;
  color?: string;
}

export const MeasurementDial: React.FC<MeasurementDialProps> = ({
  value,
  start,
  size = 420,
  label,
  unit,
  sub,
  color = theme.green,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeDial,
  });
  const r = size * 0.36;
  const c = size / 2;
  // gauge spans 240° from -210° to +30°
  const a0 = (-210 * Math.PI) / 180;
  const a1 = (30 * Math.PI) / 180;
  const arc = a0 + (a1 - a0) * p;
  const ticks = 9;

  const polar = (a: number, rr: number) => ({
    x: c + rr * Math.cos(a),
    y: c + rr * Math.sin(a),
  });
  const p0 = polar(a0, r);
  const p1 = polar(arc, r);
  const large = arc - a0 > Math.PI ? 1 : 0;

  const digit = Math.round(value * 100 * p);
  const valuePulse = 1 + 0.04 * Math.sin(Math.max(0, frame - start - 50) * 0.15);

  return (
    <div style={{position: 'relative', width: size, height: size}}>
      <svg width={size} height={size}>
        <circle cx={c} cy={c} r={r} fill="none" stroke={theme.line} strokeWidth={14} strokeDasharray={`${Math.PI * 2 * r * (300 / 360)} ${Math.PI * 2 * r}`} transform={`rotate(150 ${c} ${c})`} opacity={0.55} />
        <path
          d={`M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
        />
        {Array.from({length: ticks}).map((_, i) => {
          const a = a0 + ((a1 - a0) * i) / (ticks - 1);
          const q0 = polar(a, r - 26);
          const q1 = polar(a, r - 38);
          return (
            <line
              key={i}
              x1={q0.x}
              y1={q0.y}
              x2={q1.x}
              y2={q1.y}
              stroke={theme.textMuted}
              strokeWidth={3}
              opacity={0.6}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${valuePulse})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.display,
            fontWeight: weight.black,
            fontSize: size * 0.26,
            letterSpacing: '-0.03em',
            color: theme.text,
          }}
        >
          {digit}
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: size * 0.05,
            letterSpacing: '0.14em',
            color: theme.textSecondary,
            textTransform: 'uppercase',
          }}
        >
          {unit}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: size + 18,
          textAlign: 'center',
          fontFamily: FONT.display,
          fontWeight: 600,
          fontSize: 28,
          color: theme.textSecondary,
          opacity: interpolate(frame, [start + 30, start + 46], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        }}
      >
        {label}
        {sub && <span style={{color: theme.textMuted, fontFamily: FONT.mono, fontSize: 20}}> · {sub}</span>}
      </div>
    </div>
  );
};
