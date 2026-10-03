/**
 * <DailyReportPage> — the hero Daily Health Diary element.
 * A physical paper document (cream, ink, hairlines) that opens with real
 * daily data. Sections reveal with a stagger. Content uses ONLY verified
 * values from references/screen-inventory.md.
 */
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FONT, weight} from './fonts';
import {easeGlide} from './easing';
import {theme} from './theme';

export interface ReportData {
  date: string; // "3 OCT"
  dateLong: string; // "Saturday, October 3"
  title?: string;
  sections: {
    label: string;
    value: string;
    detail?: string;
    color?: string;
  }[];
  footer?: string;
}

/** The default report — matches the real Daily Report screen. */
export const TODAY_REPORT: ReportData = {
  date: '3 OCT',
  dateLong: 'Saturday, October 3',
  title: 'Daily Report',
  sections: [
    {label: 'Pulse', value: '59 BPM', detail: 'Fair · 5:14 PM', color: theme.cat.heart},
    {label: 'Pulse — Fingertip', value: '61 BPM', detail: 'Fair', color: theme.cat.heart},
    {label: 'Sleep', value: '7 h', detail: 'restful', color: theme.cat.sleep},
    {label: 'Wellbeing', value: '5 / 5', detail: 'steady', color: theme.cat.wellbeing},
    {label: 'Meals', value: '4 logged', detail: '977 kcal estimated', color: theme.cat.nutrition},
    {label: 'Water', value: '1.9 L', detail: 'of daily goal', color: theme.cat.hydration},
  ],
  footer: 'Log ×6 · tap to open',
};

export interface DailyReportPageProps {
  data?: ReportData;
  /** 0..1 open progress; undefined = auto from start */
  progress?: number;
  start?: number;
  width?: number;
  /** rotate slightly like paper */
  angle?: number;
  riseFrom?: number; // px it rises from
}

export const DailyReportPage: React.FC<DailyReportPageProps> = ({
  data = TODAY_REPORT,
  progress,
  start = 0,
  width = 720,
  angle = 0,
  riseFrom = 90,
}) => {
  const frame = useCurrentFrame();
  const p =
    progress !== undefined
      ? progress
      : interpolate(frame, [start, start + 40], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: easeGlide,
        });
  const h = (width / 720) * 1040;
  const rise = interpolate(p, [0, 0.6], [riseFrom, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rot = angle * (1 - p);
  const pad = width * 0.075;

  const sec = (i: number) =>
    interpolate(
      frame,
      [start + 26 + i * 7, start + 26 + i * 7 + 16],
      [0, 1],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeGlide}
    );

  return (
    <div
      style={{
        width,
        height: h,
        transform: `translateY(${rise}px) rotate(${rot}deg)`,
        opacity: interpolate(p, [0, 0.25], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        position: 'relative',
      }}
    >
      {/* page stack behind */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate(14px, 18px) rotate(1.4deg)',
          backgroundColor: theme.paperDim,
          borderRadius: 10,
          boxShadow: '0 18px 60px rgba(0,0,0,0.45)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate(7px, 9px) rotate(0.7deg)',
          backgroundColor: theme.creamSurface,
          borderRadius: 10,
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: theme.paper,
          borderRadius: 10,
          boxShadow: '0 30px 90px rgba(0,0,0,0.55)',
          padding: pad,
          fontFamily: FONT.display,
          color: theme.ink,
          overflow: 'hidden',
        }}
      >
        {/* left accent spine */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: pad * 0.28,
            backgroundColor: theme.paperDeep,
          }}
        />
        {/* header */}
        <div style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
          <div style={{fontSize: width * 0.11, fontWeight: weight.black, letterSpacing: '0.02em'}}>
            {data.date}
          </div>
          <div style={{fontSize: width * 0.045, fontWeight: 600, color: theme.inkSoft}}>
            Today
          </div>
        </div>
        <div
          style={{
            marginTop: pad * 0.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: `2px solid ${theme.ink}`,
            paddingBottom: pad * 0.4,
          }}
        >
          <div style={{fontSize: width * 0.062, fontWeight: weight.bold, letterSpacing: '-0.01em'}}>
            {data.title ?? 'Daily Report'}
          </div>
          <div style={{fontSize: width * 0.038, color: theme.inkSoft, fontWeight: 500}}>
            {data.dateLong}
          </div>
        </div>
        {/* sections */}
        <div style={{marginTop: pad * 0.6, display: 'flex', flexDirection: 'column', gap: pad * 0.42}}>
          {data.sections.map((s, i) => (
            <div
              key={i}
              style={{
                opacity: sec(i),
                transform: `translateY(${(1 - sec(i)) * 14}px)`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1.5px solid ${theme.paperHairline}`,
                paddingBottom: pad * 0.34,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: s.color ?? theme.paperGreen,
                  }}
                />
                <div style={{fontSize: width * 0.042, fontWeight: 600, color: theme.inkSoft, textTransform: 'uppercase', letterSpacing: '0.08em'}}>
                  {s.label}
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 12}}>
                <div style={{fontSize: width * 0.056, fontWeight: weight.bold, letterSpacing: '-0.01em'}}>
                  {s.value}
                </div>
                {s.detail && (
                  <div style={{fontSize: width * 0.036, color: theme.inkFaint}}>
                    {s.detail}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {data.footer && (
          <div
            style={{
              marginTop: pad * 0.5,
              fontSize: width * 0.036,
              fontWeight: 600,
              color: theme.paperGreen,
              opacity: sec(data.sections.length),
            }}
          >
            {data.footer} →
          </div>
        )}
      </div>
    </div>
  );
};

/** <ReportStack> — stacked paper pages behind the open one. */
export const ReportStack: React.FC<{
  start: number;
  width: number;
  pages?: number;
}> = ({start, width, pages = 4}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeGlide,
  });
  const h = (width / 720) * 1040;
  return (
    <div style={{position: 'relative', width, height: h, opacity: p}}>
      {Array.from({length: pages}).map((_, i) => {
        const t = i / pages;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: i % 2 ? theme.paperDim : theme.creamSurface,
              borderRadius: 10,
              transform: `translate(${t * 26 - 13}px, ${t * 30 - 15}px) rotate(${
                (i % 2 ? 1 : -1) * (t * 2.6)
              }deg)`,
              boxShadow: '0 14px 50px rgba(0,0,0,0.4)',
            }}
          />
        );
      })}
    </div>
  );
};
