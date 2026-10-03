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

import timingEn from '../../generated/timings/reel-20/en.json';
import timingDe from '../../generated/timings/reel-20/de.json';

const NARRATION_EN = {
  "id": "reel-20",
  "language": "en",
  "concept": "meet-healthgraph",
  "cluster": "H",
  "hook": "Meet HealthGraph.",
  "cta": "Learn more at healthgraph.shop.",
  "thumbnail": "Meet HealthGraph, your health connected",
  "caption": "Meet HealthGraph. One place for the pieces of your health history: the daily report, your records, fingertip measurements, answers you can check, and voice check-ins. Your history, connected in one graph. Learn more at healthgraph.shop. #healthgraph #meethealthgraph #selftracking #healthdiary #pulsetracking #digitaldiary #healthtech #connectedhealth #wellness #personalhistory",
  "lines": [
    {
      "id": "l1",
      "text": "Meet HealthGraph.",
      "beat": "brand open: healthgraph wordmark and graph-pulse mark form on deep navy, warm charcoal vignette"
    },
    {
      "id": "l2",
      "text": "Your health history is scattered: notes, files, half-remembered days.",
      "beat": "fragmented objects float: PDF, NOTE, MEDICATION, SYMPTOM, MEASUREMENT cards drift in depth layers"
    },
    {
      "id": "l3",
      "text": "The idea is simple: connected context, not disconnected entries.",
      "beat": "fragments are pulled into one HEALTHGRAPH hub node, green edges draw between them"
    },
    {
      "id": "l4",
      "text": "Start anywhere: twenty health areas on one screen.",
      "beat": "explore grid: 20 health-area tiles ripple into place, header healthgraph graph-pulse mark"
    },
    {
      "id": "l5",
      "text": "The daily report opens each day: pulse, sleep, mood, on one card.",
      "beat": "daily-report: cream paper card 3 OCT lifts up, Pulse 59 BPM Fair entry, tabs Daily Logs Records Symptoms"
    },
    {
      "id": "l6",
      "text": "Records stay real files, ready to ask about.",
      "beat": "records-upload: teal upload button, PDF PNG JPG max 50 MB, file cards dock into Past uploads"
    },
    {
      "id": "l7",
      "text": "Measure pulse on your fingertip, then watch it land on the timeline.",
      "beat": "pulse-measurement: green sensor trace, 67 BPM FINGERTIP, Saved and synced, node drops into the health graph"
    },
    {
      "id": "l8",
      "text": "Ask your records a question and open the entries behind the answer.",
      "beat": "ai-chat: question typed, answer card slides in, source cards appear behind it with connector lines"
    },
    {
      "id": "l9",
      "text": "When typing isn't enough, speak to the pulse button instead.",
      "beat": "home-dashboard: red voice pulse FAB pulses, drawer shows Voice check-in tile"
    },
    {
      "id": "l10",
      "text": "Your history, connected in one place, one graph.",
      "beat": "health-graph: camera glides through 12 nodes and 22 connections, legend Event Visit Heart Sleep Nutrition"
    },
    {
      "id": "l11",
      "text": "No ads, no noise. Just your health, connected.",
      "beat": "orbit recedes, clean dark frame, wordmark centered"
    },
    {
      "id": "l12",
      "text": "Learn more at healthgraph.shop.",
      "beat": "end card: healthgraph.shop wordmark, Learn more"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-20",
  "language": "de",
  "concept": "meet-healthgraph",
  "cluster": "H",
  "hook": "Lernen wir HealthGraph kennen.",
  "cta": "Erfahre mehr auf healthgraph.shop.",
  "thumbnail": "Deine Gesundheit, endlich an einem Ort",
  "caption": "Lernen wir HealthGraph kennen. Ein Ort für die Bausteine deiner Gesundheitshistorie: der Tagesbericht, deine Dokumente, Messungen am Finger, Antworten, die du nachprüfen kannst, und Sprach-Check-ins. Deine Gesundheit, verbunden in einem Graphen. Erfahre mehr auf healthgraph.shop. #healthgraph #meethealthgraph #selftracking #gesundheitstagebuch #pulsemessung #digitalarchiv #healthtech #vernetztegesundheit #wellness #gesundheitsverlauf",
  "lines": [
    {
      "id": "l1",
      "text": "Lernen wir HealthGraph kennen.",
      "beat": "brand open: healthgraph wordmark and graph-pulse mark form on deep navy, warm charcoal vignette"
    },
    {
      "id": "l2",
      "text": "Deine Gesundheitshistorie ist verstreut: Notizen, Dateien, nur halb erinnerbare Tage.",
      "beat": "fragmented objects float: PDF, NOTE, MEDICATION, SYMPTOM, MEASUREMENT cards drift in depth layers"
    },
    {
      "id": "l3",
      "text": "Die Idee ist einfach: verbundener Kontext statt loser Einträge.",
      "beat": "fragments are pulled into one HEALTHGRAPH hub node, green edges draw between them"
    },
    {
      "id": "l4",
      "text": "Starte überall: zwanzig Bereiche auf einem Bildschirm.",
      "beat": "explore grid: 20 health-area tiles ripple into place, header healthgraph graph-pulse mark"
    },
    {
      "id": "l5",
      "text": "Der Tagesbericht öffnet den Tag: Puls, Schlaf, Stimmung auf einer Karte.",
      "beat": "daily-report: cream paper card 3 OCT lifts up, Pulse 59 BPM Fair entry, tabs Daily Logs Records Symptoms"
    },
    {
      "id": "l6",
      "text": "Dokumente bleiben echte Dateien, die du jederzeit abfragen kannst.",
      "beat": "records-upload: teal upload button, PDF PNG JPG max 50 MB, file cards dock into Past uploads"
    },
    {
      "id": "l7",
      "text": "Puls am Finger messen, dann zusehen, wie er in die Timeline einläuft.",
      "beat": "pulse-measurement: green sensor trace, 67 BPM FINGERTIP, Saved and synced, node drops into the health graph"
    },
    {
      "id": "l8",
      "text": "Frag deine Aufzeichnungen eine Frage und öffne die Einträge hinter der Antwort.",
      "beat": "ai-chat: question typed, answer card slides in, source cards appear behind it with connector lines"
    },
    {
      "id": "l9",
      "text": "Wenn Tippen zu viel ist, sprich mit dem pulsierenden Button.",
      "beat": "home-dashboard: red voice pulse FAB pulses, drawer shows Voice check-in tile"
    },
    {
      "id": "l10",
      "text": "Kostenlos, DSGVO-konform, ohne Werbung.",
      "beat": "trust card: three calm chips Kostenlos, DSGVO-konform, Ohne Werbung on the dark frame"
    },
    {
      "id": "l11",
      "text": "Deine Gesundheit, verbunden an einem Ort.",
      "beat": "health-graph: camera glides through 12 nodes and 22 connections, legend Event Visit Heart Sleep Nutrition"
    },
    {
      "id": "l12",
      "text": "Erfahre mehr auf healthgraph.shop.",
      "beat": "end card: healthgraph.shop wordmark, Erfahre mehr"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Learn more at healthgraph.shop" : "Erfahren Sie mehr auf healthgraph.shop";
const screenshots = ["home-dashboard.jpg"];

const Reel20 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-20" timing={t} />
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
          <Overline text="Meet HealthGraph" start={5} />
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
        <Overline text="Meet HealthGraph" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel20;
