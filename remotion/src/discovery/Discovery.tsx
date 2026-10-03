import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {
  Scene,
  CampaignAudio,
  Subtitles,
  KineticHeadline,
  Overline,
  HealthGraphLogo,
  CTA,
  PhoneMockup,
  DailyReportPage,
  Fragment,
  ParticleField,
  MeasurementDial,
  Timeline,
  VoiceWave,
  GraphNetwork,
  theme,
  FRAGMENTS_9,
  type Timing,
  type NarrationLine,
  lineAt,
  lineProgress,
  voiceSrc,
} from '../system';
import {H} from '../system/layout';

import timingEn from '../generated/timings/discovery/en.json';

const NARRATION_EN = {
  "id": "discovery",
  "language": "en",
  "concept": "Your Health, Connected",
  "cluster": "Discovery",
  "hook": "Your health history is fragmented. Notes in one app. Lab results in a portal. Sleep data on a watch. The story never comes together.",
  "cta": "Your health, connected. Explore HealthGraph at healthgraph.shop",
  "lines": [
    {"id": "l1", "text": "Your health history is fragmented.", "beat": "hook"},
    {"id": "l2", "text": "Notes in one app. Lab results in a portal. Sleep data on a watch.", "beat": "fragment"},
    {"id": "l3", "text": "The story never comes together.", "beat": "fragment"},
    {"id": "l4", "text": "HealthGraph changes that.", "beat": "turn"},
    {"id": "l5", "text": "Twenty health areas. One screen. No cloud required.", "beat": "reveal"},
    {"id": "l6", "text": "The daily report opens each day: pulse, sleep, medications, nutrition, movement.", "beat": "report"},
    {"id": "l7", "text": "Documents stay real files — PDFs, images, CSVs — ready to ask about.", "beat": "docs"},
    {"id": "l8", "text": "Measure pulse on your fingertip, then watch it land in the graph.", "beat": "pulse"},
    {"id": "l9", "text": "Ask your records a question and open the entries that answer it.", "beat": "ask"},
    {"id": "l10", "text": "When typing isn't enough, speak to the pulsing button and log by voice.", "beat": "voice"},
    {"id": "l11", "text": "Connections form automatically: a meal before a glucose spike, sleep before HRV.", "beat": "connect"},
    {"id": "l12", "text": "Fly through the graph and the history assembles around the life, not the chart.", "beat": "fly"},
    {"id": "l13", "text": "No fake scans. No predictions. Just your trail, connected.", "beat": "truth"},
    {"id": "l14", "text": "Your health, connected. Explore HealthGraph at healthgraph.shop", "beat": "cta"}
  ]
};

const timing = timingEn;
const lines = NARRATION_EN.lines;
const cta = NARRATION_EN.cta;

const Discovery: React.FC<{lang: 'en'}> = ({lang}) => {
  const frame = useCurrentFrame();
  const t = timingEn as Timing;
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="discovery" timing={t} />
      <Subtitles timing={t} />

        {/* Act 1: The Problem - Fragmentation (lines 0-2) */}
        {lineIndex >= 0 && lineIndex <= 2 && (
          <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
            <ParticleField seed={7} amount={0.8} />
            {FRAGMENTS_9.map((f, i) => (
              <Fragment
                key={i}
                spec={f}
                containerW={1920}
                containerH={1080}
                start={lineIndex === 0 ? 0 : 20 + i * 3}
                converge={interpolate(frame, [20, 80], [0, 0.4], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
                convergeTo={{x: 0.5, y: 0.5}}
              />
            ))}
            <div style={{position: 'absolute', top: '50%', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-50%)'}}>
              <Overline text="THE FRAGMENTED REALITY" start={10} />
              <KineticHeadline
                text="Your health history\nis fragmented."
                start={20}
                duration={80}
                size={96}
                accentWord={3}
              />
            </div>
          </AbsoluteFill>
        )}

        {/* Act 2: The Turn - HealthGraph enters (line 3) */}
        {lineIndex === 3 && (
          <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 40}}>
            <HealthGraphLogo start={0} size={160} />
            <Overline text="THE TURN" start={15} />
            <KineticHeadline
              text="HealthGraph\nchanges that."
              start={25}
              duration={60}
              size={100}
              accentWord={1}
            />
          </AbsoluteFill>
        )}

        {/* Act 3: The Reveal - 20 areas, one screen (line 4) */}
        {lineIndex === 4 && (
          <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PhoneMockup
              screenshot="health-areas.jpg"
              start={0}
              scaleFrom={80}
              scaleTo={100}
              pushFrames={60}
              rotateY={6}
              focus={{x: 200, y: 400, w: 1120, h: 640}}
            />
            <div style={{position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
              <Overline text="TWENTY AREAS, ONE SCREEN" start={30} />
            </div>
          </AbsoluteFill>
        )}

        {/* Act 4: Daily Report (line 5) */}
        {lineIndex === 5 && (
          <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PhoneMockup
              screenshot="daily-report.jpg"
              start={0}
              scaleFrom={90}
              scaleTo={104}
              pushFrames={40}
              rotateY={4}
              focus={{x: 100, y: 560, w: 560, h: 320}}
            />
            <DailyReportPage start={20} width={520} />
            <div style={{position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
              <Overline text="THE DAILY REPORT" start={30} />
            </div>
          </AbsoluteFill>
        )}

        {/* Act 5: Documents (line 6) */}
        {lineIndex === 6 && (
          <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PhoneMockup
              screenshot="documents.jpg"
              start={0}
              scaleFrom={90}
              scaleTo={104}
              pushFrames={40}
              rotateY={-4}
              focus={{x: 100, y: 560, w: 560, h: 320}}
            />
            <div style={{position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
              <Overline text="DOCUMENTS THAT STAY DOCUMENTS" start={30} />
            </div>
          </AbsoluteFill>
        )}

        {/* Act 6: Pulse Measurement (line 7) */}
        {lineIndex === 7 && (
          <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PhoneMockup
              screenshot="pulse-oximeter.jpg"
              start={0}
              scaleFrom={90}
              scaleTo={104}
              pushFrames={40}
              rotateY={4}
              focus={{x: 100, y: 560, w: 560, h: 320}}
            />
            <div style={{position: 'absolute', top: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
              <MeasurementDial
                value={0.72}
                start={10}
                size={400}
                label="Pulse"
                unit="BPM · Fingertip"
                sub="Good · 30s"
              />
            </div>
          </AbsoluteFill>
        )}

        {/* Act 7: Ask Records (line 8) */}
        {lineIndex === 8 && (
          <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PhoneMockup
              screenshot="ask-records.jpg"
              start={0}
              scaleFrom={90}
              scaleTo={104}
              pushFrames={40}
              rotateY={-4}
              focus={{x: 100, y: 560, w: 560, h: 320}}
            />
            <div style={{position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
              <Overline text="ASK YOUR RECORDS" start={30} />
            </div>
          </AbsoluteFill>
        )}

        {/* Act 8: Voice Input (line 9) */}
        {lineIndex === 9 && (
          <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 60}}>
            <VoiceWave start={0} energy={0.8} size={400} />
            <Overline text="VOICE INTO THE GRAPH" start={20} />
            <PhoneMockup
              screenshot="voice-button.jpg"
              start={30}
              scaleFrom={100}
              scaleTo={110}
              pushFrames={30}
              rotateY={0}
            />
          </AbsoluteFill>
        )}

        {/* Act 9: Connections & Graph Flight (lines 10-12) */}
        {(lineIndex >= 10 && lineIndex <= 12) && (
          <GraphNetwork start={lineIndex === 10 ? 0 : 20} travelF={120} highlight={Math.max(0, lineIndex - 10)} />
        )}

        {/* Act 10: Truth & CTA (lines 13+) */}
        {lineIndex >= 13 && (
          <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 40}}>
            <HealthGraphLogo start={0} size={160} />
            <Overline text="YOUR HEALTH, CONNECTED" start={20} />
            <KineticHeadline
              text="No fake scans.\nNo predictions.\nJust your trail,\nconnected."
              start={30}
              duration={100}
              size={80}
              accentWord={6}
            />
          </AbsoluteFill>
        )}

        {/* CTA */}
        {frame >= t.totalFrames - 180 && (
          <CTA start={t.totalFrames - 180} line={cta} />
        )}
      </AbsoluteFill>
    );
  };

export default Discovery;