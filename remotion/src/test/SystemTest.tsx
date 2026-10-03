/**
 * SystemTest — smoke test for the visual system. Renders the full component
 * library quickly to verify fonts, theme, Three.js, and assets before
 * building the real videos.
 */
import React from 'react';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {
  CTA,
  DailyReportPage,
  Fragment,
  FRAGMENTS_9,
  FontGate,
  GraphNetwork,
  KineticHeadline,
  MeasurementDial,
  Overline,
  ParticleField,
  PhoneMockup,
  theme,
  Timeline,
  VoiceWave,
} from '../system';

const TestComponent: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <FontGate />
      {frame < 30 && (
        <AbsoluteFill>
          <Overline text="fragmented by default" start={4} />
          <KineticHeadline
            text="Your health, connected."
            start={6}
            duration={40}
            size={120}
            accentWord={2}
          />
        </AbsoluteFill>
      )}
      {frame >= 25 && frame < 85 && (
        <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
          <ParticleField seed={7} amount={0.8} />
          {FRAGMENTS_9.map((f, i) => (
            <Fragment
              key={i}
              spec={f}
              containerW={1080}
              containerH={1400}
              start={28 + i * 3}
              converge={
                interpolate(frame, [50, 80], [0, 0.5], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              }
              convergeTo={{x: 0.5, y: 0.5}}
            />
          ))}
          <div style={{position: 'absolute', top: 640, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
            <MeasurementDial
              value={0.62}
              start={30}
              size={360}
              label="Pulse"
              unit="BPM · Fingertip"
              sub="Fair · 60s"
            />
          </div>
        </AbsoluteFill>
      )}
      {frame >= 80 && frame < 140 && (
        <AbsoluteFill
          style={{
            backgroundColor: theme.bg,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PhoneMockup
            screenshot="daily-report.jpg"
            start={82}
            scaleFrom={90}
            scaleTo={104}
            pushFrames={40}
            rotateY={4}
            focus={{x: 100, y: 560, w: 560, h: 320}}
          />
          <DailyReportPage start={96} width={520} />
        </AbsoluteFill>
      )}
      {frame >= 135 && frame < 195 && (
        <GraphNetwork start={136} travelF={56} highlight={2} />
      )}
      {frame >= 190 && frame < 250 && (
        <AbsoluteFill style={{backgroundColor: theme.bg, padding: 80, boxSizing: 'border-box'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 60, height: '100%', justifyContent: 'center'}}>
            <VoiceWave start={192} energy={0.8} size={300} />
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Timeline
                start={194}
                width={940}
                events={[
                  {label: 'Aug 28', t: 0.05, color: theme.cat.nutrition, day: 0},
                  {label: 'Sep 12', t: 0.35, color: theme.cat.sleep, day: 3},
                  {label: 'Oct 2', t: 0.65, color: theme.cat.heart, day: 6},
                  {label: 'Oct 3', t: 0.95, color: theme.green, day: 7},
                ]}
                highlight={3}
              />
            </div>
          </div>
        </AbsoluteFill>
      )}
      {frame >= 245 && (
        <CTA start={246} line="Explore HealthGraph." />
      )}
    </AbsoluteFill>
  );
};

export default TestComponent;
