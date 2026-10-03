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

import timingEn from '../../generated/timings/reel-08/en.json';
import timingDe from '../../generated/timings/reel-08/de.json';

const NARRATION_EN = {
  "id": "reel-08",
  "language": "en",
  "concept": "daily-report-opening",
  "cluster": "C",
  "hook": "What happened to my health on Tuesday?",
  "cta": "Explore the health diary at healthgraph.shop.",
  "thumbnail": "A full day, one page",
  "caption": "Every day deserves a report. The HealthGraph daily report opens like a paper card: pulse 59 BPM, fair, at 5:14 PM; fingertip 61 BPM; eight entries logged; six logs one tap away. No scrolling through apps, one page per day, in order. #HealthGraph #DailyReport #HealthDiary #HealthHistory #Pulse #SelfTracking #HealthData #Wellness #Longitudinal #PersonalData\nExplore the health diary at healthgraph.shop.",
  "lines": [
    {
      "id": "l1",
      "text": "What happened to my health on Tuesday?",
      "beat": "Question overlays the dimmed daily-report list; the cream paper card 3 OCT Today waits behind, slightly out of focus"
    },
    {
      "id": "l2",
      "text": "On HealthGraph, the answer is a daily report.",
      "beat": "The real daily-report paper card, 3 OCT Today, Daily Report Saturday October 3, lifts and faces the camera; user name cropped"
    },
    {
      "id": "l3",
      "text": "Open it, and the day lays itself out.",
      "beat": "The paper report opens with a page motion, revealing the real daily-report layout"
    },
    {
      "id": "l4",
      "text": "Pulse: 59 beats per minute, fair, at 5:14 PM.",
      "beat": "Focus on the real Pulse 59 BPM Fair 5:14 PM line on the open paper card"
    },
    {
      "id": "l5",
      "text": "Plus a fingertip reading: 61 beats, also fair.",
      "beat": "Focus slides to the real ALSO Pulse Fingertip 61 BPM Fair line, same open report"
    },
    {
      "id": "l6",
      "text": "Eight entries were logged that day.",
      "beat": "Top stats settle in above the card: 8 entries logged, 0 records, 0 observations, from the real daily-report screen"
    },
    {
      "id": "l7",
      "text": "Six logs sit behind it, one tap away.",
      "beat": "Footer Log ×6, tap to open gets tapped; a soft ring pulse confirms the tap"
    },
    {
      "id": "l8",
      "text": "No scrolling through apps. One page per day.",
      "beat": "Quick pass over the real daily-report list tabs All, Daily Logs, Records, Symptoms, then back to the single card"
    },
    {
      "id": "l9",
      "text": "That's what a day of health looks like, told in full.",
      "beat": "The open paper report holds centered, October 2026, 1 of 1 header visible, warm light on the cream card"
    },
    {
      "id": "l10",
      "text": "Explore the health diary at healthgraph.shop.",
      "beat": "End card: CTA over the softly focused daily-report paper card"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-08",
  "language": "de",
  "concept": "daily-report-opening",
  "cluster": "C",
  "hook": "Was ist mit meiner Gesundheit am Dienstag passiert?",
  "cta": "Entdecke das Gesundheits-Tagebuch auf healthgraph.shop.",
  "thumbnail": "Ein Tag, eine Seite",
  "caption": "Jeder Tag verdient einen Bericht. Der Tagesbericht von HealthGraph öffnet sich wie eine Papierkarte: Puls 59 Schläge pro Minute um 17:14 Uhr, Fingermesswert 61, acht Einträge erfasst, sechs Protokolle mit einem Antippen erreichbar. Kein Suchen in verschiedenen Apps, pro Tag eine Seite in der richtigen Reihenfolge. #HealthGraph #Tagesbericht #Gesundheits-Tagebuch #Gesundheitsverlauf #Puls #Wohlbefinden #Selbsterkenntnis #DeineDaten #DigitalGesund #Vorbeugung\nEntdecke das Gesundheits-Tagebuch auf healthgraph.shop.",
  "lines": [
    {
      "id": "l1",
      "text": "Was ist mit meiner Gesundheit am Dienstag passiert?",
      "beat": "Frage über der gedämpften daily-report-Liste; die cremefarbene Papierkarte 3 Okt. Heute liegt im Hintergrund, leicht unscharf"
    },
    {
      "id": "l2",
      "text": "Bei HealthGraph ist die Antwort ein Tagesbericht.",
      "beat": "Die echte daily-report-Papierkarte, 3 Okt. Heute, Tagesbericht, Samstag, 3. Oktober, hebt sich und wendet sich zur Kamera; Nutzername cropped"
    },
    {
      "id": "l3",
      "text": "Öffne ihn, und der Tag stellt sich vor.",
      "beat": "Der Papierbericht öffnet sich mit einer Seitenbewegung und zeigt das echte daily-report-Layout"
    },
    {
      "id": "l4",
      "text": "Puls: 59 Schläge pro Minute, um 17:14 Uhr.",
      "beat": "Fokus auf die echte Zeile Pulse 59 BPM Fair 5:14 PM auf der geöffneten Papierkarte"
    },
    {
      "id": "l5",
      "text": "Dazu ein Messwert am Finger: 61 Schläge pro Minute.",
      "beat": "Fokus gleitet auf die echte Zeile ALSO Pulse Fingertip 61 BPM Fair im selben Bericht"
    },
    {
      "id": "l6",
      "text": "An diesem Tag: acht Einträge erfasst.",
      "beat": "Die oberen Werte rücken über die Karte ein: 8 entries logged, 0 records, 0 observations, vom echten daily-report-Screen"
    },
    {
      "id": "l7",
      "text": "Sechs Protokolle liegen dahinter, ein Antippen entfernt.",
      "beat": "Fußzeile Log ×6, tap to open wird angetippt; ein weicher Ring-Puls bestätigt den Tipp"
    },
    {
      "id": "l8",
      "text": "Kein Suchen in verschiedenen Apps. Pro Tag eine Seite.",
      "beat": "Kurzer Blick über die Tabs All, Daily Logs, Records, Symptoms der echten daily-report-Liste, dann zurück zur einzelnen Karte"
    },
    {
      "id": "l9",
      "text": "So sieht ein Gesundheitstag in voller Länge aus.",
      "beat": "Die geöffnete Papierkarte liegt mittig, Header October 2026, 1 of 1 sichtbar, warmes Licht auf der cremefarbenen Karte"
    },
    {
      "id": "l10",
      "text": "Entdecke das Gesundheits-Tagebuch auf healthgraph.shop.",
      "beat": "Endkarte: CTA über der weich geblürten daily-report-Papierkarte"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "See your sleep, not just hours." : "Sehen Sie Ihren Schlaf, nicht nur Stunden.";
const screenshots = ["sleep-stages.jpg"];

const Reel08 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-08" timing={t} />
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
          <Overline text="Sleep Architecture" start={5} />
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
        <Overline text="Sleep Architecture" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel08;
