/**
 * The fragmentation motif: disconnected health-information objects.
 * PDF, NOTE, MEDICATION, SYMPTOM, MEASUREMENT, MEAL, SLEEP, HEART RATE,
 * TIMELINE EVENT — each a small labelled card that floats with a tiny
 * deterministic drift. The recurring campaign motif is these objects
 * scattering, then connecting into the HealthGraph.
 */
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FONT, weight} from './fonts';
import {easeGlide} from './easing';
import {theme} from './theme';

export type FragmentKind =
  | 'pdf'
  | 'note'
  | 'medication'
  | 'symptom'
  | 'measurement'
  | 'meal'
  | 'sleep'
  | 'heartRate'
  | 'timelineEvent';

export interface FragmentSpec {
  kind: FragmentKind;
  label: string;
  sub?: string;
  x: number; // 0..1 of container
  y: number;
  w?: number;
  rot?: number;
  seed?: number;
}

const KIND_META: Record<FragmentKind, {color: string; icon: string}> = {
  pdf: {color: theme.cat.heart, icon: 'PDF'},
  note: {color: theme.cat.activity, icon: '✎'},
  medication: {color: theme.cat.medication, icon: 'Rx'},
  symptom: {color: theme.cat.mood, icon: '~'},
  measurement: {color: theme.cat.heart, icon: '67'},
  meal: {color: theme.cat.nutrition, icon: '●'},
  sleep: {color: theme.cat.sleep, icon: '☾'},
  heartRate: {color: theme.cat.heart, icon: '♥'},
  timelineEvent: {color: theme.green, icon: '•'},
};

export const Fragment: React.FC<{
  spec: FragmentSpec;
  containerW: number;
  containerH: number;
  start: number;
  /** -1 = drift apart, 0 = neutral float, 1 = converge toward center */
  converge?: number;
  convergeTo?: {x: number; y: number};
}> = ({spec, containerW, containerH, start, converge = 0, convergeTo}) => {
  const frame = useCurrentFrame();
  const m = KIND_META[spec.kind];
  const seed = spec.seed ?? 1;
  const w = spec.w ?? 240;
  const h = spec.kind === 'pdf' ? w * 1.28 : w * 0.52;
  const appear = interpolate(frame, [start + seed * 2, start + seed * 2 + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeGlide,
  });
  const drift =
    Math.sin(frame * 0.03 + seed * 2.1) * 10 + Math.cos(frame * 0.021 + seed) * 6;
  const driftY = Math.cos(frame * 0.026 + seed * 1.7) * 8;
  const rot = (spec.rot ?? 0) * (1 - Math.abs(converge)) + Math.sin(frame * 0.02 + seed) * 1.6;

  let x = spec.x * containerW;
  let y = spec.y * containerH;
  if (Math.abs(converge) > 0.01 && convergeTo) {
    const cx = convergeTo.x * containerW;
    const cy = convergeTo.y * containerH;
    const k = 1 - converge * converge * 0.86;
    x = x * k + cx * (1 - k);
    y = y * k + cy * (1 - k);
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        transform: `translate(-50%,-50%) translate(${drift}px, ${driftY}px) rotate(${rot}deg)`,
        opacity: appear,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: spec.kind === 'pdf' ? 14 : 999,
          backgroundColor:
            spec.kind === 'pdf' ? theme.creamSurface : 'rgba(20,27,38,0.92)',
          border: `1.5px solid ${spec.kind === 'pdf' ? theme.paperHairline : theme.line}`,
          boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: spec.kind === 'pdf' ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: 14,
          boxSizing: 'border-box',
        }}
      >
        {spec.kind === 'pdf' ? (
          <>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 26,
                fontWeight: 700,
                color: m.color,
                letterSpacing: '0.06em',
              }}
            >
              {m.icon}
            </div>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 24,
                fontWeight: 600,
                color: theme.ink,
                letterSpacing: '0.02em',
              }}
            >
              {spec.label}
            </div>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 16,
                color: theme.inkFaint,
              }}
            >
              {spec.sub ?? 'document'}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: m.color,
                color: '#0B0F16',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 17,
              }}
            >
              {m.icon}
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 25,
                  fontWeight: 700,
                  color: theme.text,
                  letterSpacing: '-0.01em',
                }}
              >
                {spec.label}
              </div>
              {spec.sub && (
                <div style={{fontFamily: FONT.mono, fontSize: 16, color: theme.textMuted}}>
                  {spec.sub}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/** Standard scattered layout for the fragmentation motif. */
export const FRAGMENTS_9: FragmentSpec[] = [
  {kind: 'pdf', label: 'Blood report', sub: 'PDF · 2 pages', x: 0.2, y: 0.16, rot: -8, seed: 1, w: 230},
  {kind: 'note', label: 'Note', sub: 'phone memo', x: 0.66, y: 0.12, rot: 6, seed: 2, w: 220},
  {kind: 'medication', label: 'Medication', sub: '8:00 AM', x: 0.82, y: 0.3, rot: -5, seed: 3, w: 250},
  {kind: 'measurement', label: '67 BPM', sub: 'fingertip · fair', x: 0.16, y: 0.4, rot: 5, seed: 4, w: 230},
  {kind: 'symptom', label: 'Symptom', sub: 'logged today', x: 0.55, y: 0.38, rot: -4, seed: 5, w: 230},
  {kind: 'meal', label: 'Meal', sub: '977 kcal', x: 0.3, y: 0.62, rot: 7, seed: 6, w: 220},
  {kind: 'sleep', label: 'Sleep', sub: '7 h', x: 0.72, y: 0.6, rot: -6, seed: 7, w: 220},
  {kind: 'heartRate', label: 'Heart rate', sub: '59 bpm', x: 0.18, y: 0.82, rot: 4, seed: 8, w: 240},
  {kind: 'timelineEvent', label: 'Timeline', sub: 'Oct 3', x: 0.6, y: 0.84, rot: -7, seed: 9, w: 240},
];
