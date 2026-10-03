/**
 * <Timeline> — horizontal health timeline: days as nodes, categories as
 * coloured dots, a moving playhead. Matches the app's Health Graph concept
 * ("drag to travel through time").
 */
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FONT, weight} from './fonts';
import {easeGlide} from './easing';
import {theme} from './theme';

export interface TimelineEvent {
  label: string;
  /** 0..1 position along the axis */
  t: number;
  /** category color */
  color: string;
  /** days since start (for the mono label) */
  day?: number;
}

export interface TimelineProps {
  events: TimelineEvent[];
  start: number;
  width?: number;
  height?: number;
  /** index of the event to highlight (or -1) */
  highlight?: number;
  /** playhead target index (-1 = off) */
  playhead?: number;
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  start,
  width = 880,
  height = 300,
  highlight = -1,
  playhead = -1,
}) => {
  const frame = useCurrentFrame();
  const midY = height * 0.5;
  const axisW = width * 0.92;
  const x0 = width * 0.04;

  const axisW_prog = interpolate(frame, [start, start + 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeGlide,
  });

  const ph =
    playhead >= 0
      ? x0 + axisW * events[playhead].t
      : interpolate(frame, [start, start + 240], [x0, x0 + axisW], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  return (
    <div style={{position: 'relative', width, height}}>
      <svg width={width} height={height}>
        <line
          x1={x0}
          y1={midY}
          x2={x0 + axisW * axisW_prog}
          y2={midY}
          stroke={theme.line}
          strokeWidth={3}
        />
        {events.map((e, i) => {
          const x = x0 + axisW * e.t;
          const appear = interpolate(
            frame,
            [start + 10 + i * 8, start + 10 + i * 8 + 14],
            [0, 1],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
          );
          const isHl = i === highlight;
          const labelUp = i % 2 === 0;
          return (
            <g key={i} opacity={appear}>
              {isHl && (
                <circle cx={x} cy={midY} r={26} fill={theme.glowGreen} />
              )}
              <circle
                cx={x}
                cy={midY}
                r={isHl ? 15 : 11}
                fill={e.color}
                stroke={theme.bg}
                strokeWidth={4}
              />
              <line
                x1={x}
                y1={midY + (labelUp ? -1 : 1) * 16}
                x2={x}
                y2={midY + (labelUp ? -1 : 1) * 44}
                stroke={theme.line}
                strokeWidth={2}
              />
              <text
                x={x}
                y={midY + (labelUp ? -1 : 1) * 66}
                textAnchor="middle"
                fontFamily={FONT.display}
                fontSize={isHl ? 26 : 22}
                fontWeight={isHl ? 800 : 600}
                fill={isHl ? theme.text : theme.textSecondary}
              >
                {e.label}
              </text>
              {e.day !== undefined && (
                <text
                  x={x}
                  y={midY + (labelUp ? -1 : 1) * 92}
                  textAnchor="middle"
                  fontFamily={FONT.mono}
                  fontSize={17}
                  fill={theme.textMuted}
                >
                  {e.day === 0 ? 'today' : `day ${e.day}`}
                </text>
              )}
            </g>
          );
        })}
        {playhead >= 0 && (
          <g opacity={interpolate(frame, [start + 20, start + 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}>
            <line x1={ph} y1={midY - 70} x2={ph} y2={midY + 70} stroke={theme.greenBright} strokeWidth={2} strokeDasharray="6 6" />
            <circle cx={ph} cy={midY - 78} r={6} fill={theme.greenBright} />
          </g>
        )}
      </svg>
    </div>
  );
};
