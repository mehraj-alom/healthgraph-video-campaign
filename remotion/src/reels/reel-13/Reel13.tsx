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

import timingEn from '../../generated/timings/reel-13/en.json';
import timingDe from '../../generated/timings/reel-13/de.json';

const NARRATION_EN = {
  "id": "reel-13",
  "language": "en",
  "concept": "measurement-context",
  "cluster": "E",
  "hook": "Your health history should remember the context.",
  "cta": "See how your health history could connect.",
  "thumbnail": "Your health data, connected in context",
  "caption": "A single measurement fades. The same number with its day, its logs, and its documents stays meaningful. HealthGraph keeps every entry attached to the context it was recorded in, so your history grows connected, not scattered. See how your health history could connect. #HealthGraph #HealthData #HealthTracking #HealthHistory #ConnectedHealth #HealthJournal #DigitalHealth #WellnessTracking #DailyLog",
  "lines": [
    {
      "id": "l1",
      "text": "Your health history should remember the context.",
      "beat": "open on pulse-measurement screen, green sensor trace drawing itself; a '3 OCT' date stamp lands beside 67 BPM · FINGERTIP"
    },
    {
      "id": "l2",
      "text": "A single number, like sixty seven beats per minute, fades fast.",
      "beat": "isolate the 67 BPM result card on pulse-measurement; everything else dims, camera holds still"
    },
    {
      "id": "l3",
      "text": "But it was measured on a specific day.",
      "beat": "mono date label '3 OCT' draws a thin line from the measurement into the frame"
    },
    {
      "id": "l4",
      "text": "The app remembers the medication you took that morning.",
      "beat": "medication card from home-dashboard slides in; a controlled edge line connects it to the measurement"
    },
    {
      "id": "l5",
      "text": "The daily log from the same day sits right next to it.",
      "beat": "daily-log screen (mood 'Very good', sleep 7h) rotates in; drawn edge closes between it and the measurement"
    },
    {
      "id": "l6",
      "text": "And the documents you uploaded belong to the same story.",
      "beat": "records-upload screen joins the group; document edge completes the motif"
    },
    {
      "id": "l7",
      "text": "In HealthGraph, each piece stays attached to its context.",
      "beat": "the four objects (measurement, medication, daily log, document) orbit one small hub node; edges pulse"
    },
    {
      "id": "l8",
      "text": "Zoom out, and the connections become a health history.",
      "beat": "cut to health-graph screen '12 nodes · 22 connections'; graph edges draw between nodes over time"
    },
    {
      "id": "l9",
      "text": "Nothing gets filed away and forgotten.",
      "beat": "slow pull-back over health-graph; a node is tapped and its links highlight"
    },
    {
      "id": "l10",
      "text": "See how your health history could connect.",
      "beat": "end card on warm charcoal with the graph motif behind the CTA"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-13",
  "language": "de",
  "concept": "messung-kontext",
  "cluster": "E",
  "hook": "Deine Gesundheitsgeschichte sollte den Kontext im Blick behalten.",
  "cta": "Sieh dir an, wie deine Gesundheitsgeschichte verbunden werden könnte.",
  "thumbnail": "Gesundheitsdaten behalten ihren Kontext",
  "caption": "Eine einzelne Messung verblasst schnell. Dieselbe Zahl mit Datum, Einträgen und Unterlagen bleibt verständlich. HealthGraph verbindet jede Information mit dem Kontext, in dem sie entstanden ist, damit deine Geschichte wächst, statt verstreut zu bleiben. Sieh dir an, wie deine Gesundheitsgeschichte verbunden werden könnte. #HealthGraph #Gesundheitsdaten #Gesundheitstracking #Gesundheitsgeschichte #DigitaleGesundheit #Gesundheitstagebuch #Tagebuch #Wellness #Gesundheitswissen",
  "lines": [
    {
      "id": "l1",
      "text": "Deine Gesundheitsgeschichte sollte den Kontext im Blick behalten.",
      "beat": "Einstieg auf dem Pulsmess-Screen, grüner Sensorenverlauf zeichnet sich; ein Datumsstempel '3. OKT' setzt sich neben 67 BPM · FINGERTIP"
    },
    {
      "id": "l2",
      "text": "Eine einzelne Zahl, sagen wir 67 Schläge pro Minute, verblasst schnell.",
      "beat": "die Ergebniskarte mit 67 BPM wird isoliert, alles andere dimmt ab, Kamera steht"
    },
    {
      "id": "l3",
      "text": "Gemessen wurde sie aber an einem bestimmten Tag.",
      "beat": "das monospace-Datum '3. OKT' zieht eine feine Linie von der Messung ins Bild"
    },
    {
      "id": "l4",
      "text": "HealthGraph erinnert sich an die Medikamente, die du an diesem Morgen eingenommen hast.",
      "beat": "die Medikamentenkarte aus dem Home-Dashboard schiebt sich dazu; eine kontrollierte Kante verbindet sie mit der Messung"
    },
    {
      "id": "l5",
      "text": "Der tägliche Eintrag von demselben Tag liegt direkt daneben.",
      "beat": "der Tageslog-Screen (Stimmung 'Sehr gut', Schlaf 7h) dreht sich hinein; die Kante schließt sich zur Messung"
    },
    {
      "id": "l6",
      "text": "Auch hochgeladene Unterlagen gehören zur selben Geschichte.",
      "beat": "der Hochladescreen für Unterlagen schließt sich der Gruppe an; die Dokument-Kante vollendet das Motiv"
    },
    {
      "id": "l7",
      "text": "Jedes Stück bleibt in HealthGraph fest an seinen Kontext verknüpft.",
      "beat": "die vier Objekte (Messung, Medikament, Tageslog, Dokument) kreisen um einen kleinen Hub-Knoten; Kanten pulsieren"
    },
    {
      "id": "l8",
      "text": "Zoomst du raus, werden die Verbindungen zu einer Gesundheitsgeschichte.",
      "beat": "Schnitt zum Health-Graph-Screen '12 nodes · 22 connections'; Kanten zeichnen sich zwischen den Knoten"
    },
    {
      "id": "l9",
      "text": "Nichts wird abgelegt und vergessen.",
      "beat": "langes Zurückzoomen über den Health-Graph; ein Knoten wird angeklickt, seine Verbindungen leuchten auf"
    },
    {
      "id": "l10",
      "text": "Sieh dir an, wie deine Gesundheitsgeschichte verbunden werden könnte.",
      "beat": "Endkarte auf warmem Charcoal, im Hintergrund die Graphik"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Connections you didn't see." : "Verbindungen, die Sie nicht sahen.";
const screenshots = ["graph-view.jpg"];

const Reel13 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-13" timing={t} />
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
          <Overline text="The Connection Layer" start={5} />
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
        <Overline text="The Connection Layer" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel13;
