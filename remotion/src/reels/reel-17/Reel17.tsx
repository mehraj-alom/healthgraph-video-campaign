import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {
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
} from '../../system';
import {V, H} from '../../system/layout';

import timingEn from '../../generated/timings/reel-17/en.json';
import timingDe from '../../generated/timings/reel-17/de.json';

const NARRATION_EN = {
  "id": "reel-17",
  "language": "en",
  "concept": "one-place-montage",
  "cluster": "A",
  "hook": "One place for the pieces of your health history.",
  "cta": "Explore HealthGraph.",
  "thumbnail": "Your health, all in one place",
  "caption": "Your health history shouldn't live in five different apps. Sleep, meals, medication, symptoms, measurements, documents, one place that actually connects them. Explore HealthGraph. #healthgraph #healthtimeline #selftracking #healthdiary #wellnessjournal #digitaldiary #pulsehealth #healthtech #mindfultracking #connectedhealth",
  "lines": [
    {
      "id": "l1",
      "text": "One place for the pieces of your health history.",
      "beat": "explore grid montage: 20 health-area tiles ripple into place over warm charcoal, healthgraph graph-pulse mark settles top, voice FAB pulse visible"
    },
    {
      "id": "l2",
      "text": "Sleep. Nutrition. Medication. Symptoms. Measurements. Documents.",
      "beat": "fast succession, one tile per word: sleep, nutrition ring, medication card, symptom map, pulse result, document cards, each a masked reveal"
    },
    {
      "id": "l3",
      "text": "Usually they live scattered across five different places.",
      "beat": "fragmented objects float: PDF, NOTE, MEDICATION, SYMPTOM, MEASUREMENT, MEAL cards drift apart in depth layers"
    },
    {
      "id": "l4",
      "text": "HealthGraph keeps them side by side.",
      "beat": "all fragment cards are pulled into one HEALTHGRAPH hub node, green edges draw between them"
    },
    {
      "id": "l5",
      "text": "A pulse reading on your fingertip, saved and synced.",
      "beat": "pulse-measurement screen: green sensor trace draws, 67 BPM FINGERTIP gauge at 58 percent, Saved and synced chip"
    },
    {
      "id": "l6",
      "text": "Estimated calories from today's scans, clearly marked as estimates.",
      "beat": "nutrition-calories screen: ring fills to 977 of 3000 kcal, Scans estimate. Not measured, not a target. line"
    },
    {
      "id": "l7",
      "text": "Mood, sleep, and meals from a single daily log.",
      "beat": "daily-log screen: mood Very good, sleep 7h, recent history row with 3 events"
    },
    {
      "id": "l8",
      "text": "Documents uploaded once, kept with everything else.",
      "beat": "records-upload screen: teal upload button, PDF PNG JPG file cards dock into Past uploads"
    },
    {
      "id": "l9",
      "text": "And the timeline shows how each day connects to the next.",
      "beat": "health-graph screen: camera drags through time across 12 nodes and 22 connections, legend Event Visit Heart Sleep Nutrition"
    },
    {
      "id": "l10",
      "text": "Explore HealthGraph.",
      "beat": "end card: healthgraph wordmark centered, Explore HealthGraph"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-17",
  "language": "de",
  "concept": "one-place-montage",
  "cluster": "A",
  "hook": "Ein Ort für die Bausteine deiner Gesundheit.",
  "cta": "Erlebe HealthGraph.",
  "thumbnail": "Deine Gesundheit an einem Ort",
  "caption": "Deine Gesundheitshistorie gehört nicht in fünf verschiedene Apps. Schlaf, Essen, Medikamente, Beschwerden, Messungen, Dokumente, an einem Ort, der sie wirklich verbindet. Erlebe HealthGraph. #healthgraph #gesundheitstracking #selftracking #gesundheitstagebuch #wellnessjournal #digitaldiary #pulsemessung #healthtech #bewusstesTracking #vernetzteGesundheit",
  "lines": [
    {
      "id": "l1",
      "text": "Ein Ort für die Bausteine deiner Gesundheit.",
      "beat": "explore grid montage: 20 health-area tiles ripple into place over warm charcoal, healthgraph graph-pulse mark settles top, voice FAB pulse visible"
    },
    {
      "id": "l2",
      "text": "Schlaf. Ernährung. Medikamente. Beschwerden. Messungen. Dokumente.",
      "beat": "fast succession, one tile per word: sleep, nutrition ring, medication card, symptom map, pulse result, document cards, each a masked reveal"
    },
    {
      "id": "l3",
      "text": "Normalerweise liegen sie verstreut in fünf verschiedenen Apps.",
      "beat": "fragmented objects float: PDF, NOTE, MEDICATION, SYMPTOM, MEASUREMENT, MEAL cards drift apart in depth layers"
    },
    {
      "id": "l4",
      "text": "HealthGraph hält sie nebeneinander.",
      "beat": "all fragment cards are pulled into one HEALTHGRAPH hub node, green edges draw between them"
    },
    {
      "id": "l5",
      "text": "Der Puls am Finger, gemessen, gespeichert, synchronisiert.",
      "beat": "pulse-measurement screen: green sensor trace draws, 67 BPM FINGERTIP gauge at 58 percent, Saved and synced chip"
    },
    {
      "id": "l6",
      "text": "Geschätzte Kalorien aus den Scans, klar als Schätzung markiert.",
      "beat": "nutrition-calories screen: ring fills to 977 of 3000 kcal, Scans estimate. Not measured, not a target. line"
    },
    {
      "id": "l7",
      "text": "Stimmung, Schlaf und Mahlzeiten in einem Tagesprotokoll.",
      "beat": "daily-log screen: mood Very good, sleep 7h, recent history row with 3 events"
    },
    {
      "id": "l8",
      "text": "Dokumente einmal hochgeladen, dann immer dabei.",
      "beat": "records-upload screen: teal upload button, PDF PNG JPG file cards dock into Past uploads"
    },
    {
      "id": "l9",
      "text": "Die Timeline zeigt, wie sich jeder Tag mit dem nächsten verbindet.",
      "beat": "health-graph screen: camera drags through time across 12 nodes and 22 connections, legend Event Visit Heart Sleep Nutrition"
    },
    {
      "id": "l10",
      "text": "Erlebe HealthGraph.",
      "beat": "end card: healthgraph wordmark centered, Erlebe HealthGraph"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Take it anywhere." : "Nehmen Sie es mit.";
const screenshots = ["export.jpg"];

const Reel17 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-17" timing={t} />
      <Subtitles timing={t} />
      <VisualSequence frame={frame} timing={t} lines={lines} lang={lang} lineIndex={lineIndex} screenshots={screenshots} />
      {frame >= t.totalFrames - 90 && (
        <CTA start={t.totalFrames - 90} line={cta(lang)} />
      )}
    </AbsoluteFill>
  );
};

const VisualSequence = ({frame, timing, lines, lang, lineIndex, screenshots}: {
  frame: number;
  timing: Timing;
  lines: NarrationLine[];
  lang: 'en' | 'de';
  lineIndex: number;
  screenshots: string[];
}) => {
  if (lineIndex >= 0 && lineIndex <= 1) {
    return (
      <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
        <ParticleField seed={7} amount={0.7} />
        {FRAGMENTS_9.map((f, i) => (
          <Fragment
            key={i}
            spec={f}
            containerW={1080}
            containerH={1400}
            start={lineIndex === 0 ? 0 : 15 + i * 2}
            converge={interpolate(frame, [15, 45], [0, 0.6], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
            convergeTo={{x: 0.5, y: 0.5}}
          />
        ))}
        <div style={{position: 'absolute', top: 540, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
          <Overline text="Export & Ownership" start={5} />
        </div>
      </AbsoluteFill>
    );
  }

  if (lineIndex >= 2 && lineIndex <= 4 && screenshots[0]) {
    return (
      <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <PhoneMockup
          screenshot={screenshots[0]}
          start={lineIndex === 2 ? 0 : 10}
          scaleFrom={90}
          scaleTo={104}
          pushFrames={40}
          rotateY={4}
          focus={{x: 100, y: 560, w: 560, h: 320}}
        />
        {lineIndex === 2 && <DailyReportPage start={20} width={520} />}
      </AbsoluteFill>
    );
  }

  if (lineIndex >= 5 && lineIndex <= 6) {
    return (
      <GraphNetwork start={lineIndex === 5 ? 0 : 10} travelF={60} highlight={lineIndex - 5} />
    );
  }

  if (lineIndex === 7) {
    return (
      <AbsoluteFill style={{backgroundColor: theme.bg, padding: 80, boxSizing: 'border-box'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 60, height: '100%', justifyContent: 'center'}}>
          <VoiceWave start={0} energy={0.7} size={300} />
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Timeline
              start={10}
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
    );
  }

  if (lineIndex >= 8) {
    return (
      <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 40}}>
        <HealthGraphLogo start={0} size={120} />
        <Overline text="Export & Ownership" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel17;
