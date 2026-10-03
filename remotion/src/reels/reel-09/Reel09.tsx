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

import timingEn from '../../generated/timings/reel-09/en.json';
import timingDe from '../../generated/timings/reel-09/de.json';

const NARRATION_EN = {
  "id": "reel-09",
  "language": "en",
  "concept": "not-a-spreadsheet",
  "cluster": "H",
  "hook": "Your health isn't a spreadsheet.",
  "cta": "See how your health history could connect.",
  "thumbnail": "Your health, not a spreadsheet",
  "caption": "Your health data isn't rows and columns. It's a story with dates, and in the Health Graph that story has a shape you can move through. Drag to travel through time, pinch to zoom. Twelve nodes, twenty two connections, all your own days. See how your health history could connect. #HealthGraph #HealthData #HealthHistory #DigitalHealth #DataVisualization #SelfTracking #PersonalHealth #ConnectedHealth",
  "lines": [
    {
      "id": "l1",
      "text": "Your health isn't a spreadsheet.",
      "beat": "abstract spreadsheet-style grid of generic health entries fills the frame, rows flickering"
    },
    {
      "id": "l2",
      "text": "It's not rows and columns. It's a story with dates.",
      "beat": "cell values blur into highlighted dates; the grid loses its spreadsheet feel"
    },
    {
      "id": "l3",
      "text": "Every visit, every measurement, every logged day lives in your history.",
      "beat": "scattered document, measurement, and sleep cards drift in from the frame edges"
    },
    {
      "id": "l4",
      "text": "In a spreadsheet, that story hides in cells.",
      "beat": "the cards snap into a rigid table grid, then dim under cold light"
    },
    {
      "id": "l5",
      "text": "In a graph, it has a shape.",
      "beat": "the grid dissolves; glowing edges begin to draw between the cards"
    },
    {
      "id": "l6",
      "text": "This is the Health Graph: twelve nodes, twenty two connections.",
      "beat": "real health-graph screen reveals, showing 12 nodes and 22 connections"
    },
    {
      "id": "l7",
      "text": "All of it from your own logged days.",
      "beat": "slow push-in on health-graph nodes; the legend Event, Visit, Heart, Sleep, Nutrition stays in frame"
    },
    {
      "id": "l8",
      "text": "Drag, and travel through time. Pinch, and zoom into one day.",
      "beat": "drag gesture on the health-graph, nodes slide through time; pinch gesture zooms into the 3 OCT node"
    },
    {
      "id": "l9",
      "text": "Same data. Now you can see it move.",
      "beat": "split compare: faded spreadsheet on the left, living graph on the right"
    },
    {
      "id": "l10",
      "text": "See how your health history could connect.",
      "beat": "end card on warm charcoal, graph motif behind the CTA"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-09",
  "language": "de",
  "concept": "not-a-spreadsheet",
  "cluster": "H",
  "hook": "Deine Gesundheit ist keine Tabelle.",
  "cta": "Sieh nach, wie sich dein Gesundheitsverlauf verbinden könnte.",
  "thumbnail": "Deine Gesundheit ist keine Tabelle",
  "caption": "Deine Gesundheitsdaten sind keine Zeilen und Spalten. Sie sind eine Geschichte mit Datum, und im Health Graph hat diese Geschichte eine Form, durch die du dich bewegen kannst. Ziehen, um durch die Zeit zu reisen. Reinzoomen auf einen Tag. Zwölf Knoten, zweiundzwanzig Verbindungen, deine eigenen Tage. #HealthGraph #Gesundheit #Gesundheitsdaten #DigitaleGesundheit #Datenvisualisierung #SelfTracking #Gesundheitsverlauf #DeineDaten\nSieh nach, wie sich dein Gesundheitsverlauf verbinden könnte.",
  "lines": [
    {
      "id": "l1",
      "text": "Deine Gesundheit ist keine Tabelle.",
      "beat": "abstraktes Tabellenraster mit generischen Gesundheitseinträgen füllt den Bildausschnitt, Zeilen flackern"
    },
    {
      "id": "l2",
      "text": "Keine Zeilen, keine Spalten. Eine Geschichte mit Datum.",
      "beat": "Zellenwerte werden zu hervorgehobenen Daten; das Raster verliert seinen Tabellencharakter"
    },
    {
      "id": "l3",
      "text": "Jeder Besuch, jede Messung, jeder protokollierte Tag ist Teil deiner Geschichte.",
      "beat": "gestreute Dokument-, Mess- und Schlafkarten gleiten von den Bildrändern ein"
    },
    {
      "id": "l4",
      "text": "In einer Tabelle versteckt sich diese Geschichte in Zellen.",
      "beat": "die Karten rutschen in ein starres Tabellenraster und dimmen unter kaltem Licht"
    },
    {
      "id": "l5",
      "text": "Im Graphen hat sie eine Form.",
      "beat": "das Raster löst sich auf; leuchtende Kanten beginnen, sich zwischen den Karten zu zeichnen"
    },
    {
      "id": "l6",
      "text": "Das ist der Health Graph: zwölf Knoten, zweiundzwanzig Verbindungen.",
      "beat": "echter health-graph-Screen erscheint und zeigt 12 nodes und 22 connections"
    },
    {
      "id": "l7",
      "text": "Alle aus deinen eigenen Tagen.",
      "beat": "langsames Herangezoomen an die Health-Graph-Knoten; die Legende Event, Visit, Heart, Sleep, Nutrition bleibt im Bild"
    },
    {
      "id": "l8",
      "text": "Ziehen, um durch die Zeit zu reisen. Reinzoomen auf einen Tag.",
      "beat": "Zug-Geste auf dem Health Graph, die Knoten gleiten durch die Zeit; Pinch-Geste zoomt auf den Knoten 3 OCT"
    },
    {
      "id": "l9",
      "text": "Denselbe Datenbestand. Jetzt sieht man ihn bewegen.",
      "beat": "Vergleich geteilter Bildfläche: links die verblasste Tabelle, rechts der lebendige Graph"
    },
    {
      "id": "l10",
      "text": "Sieh nach, wie sich dein Gesundheitsverlauf verbinden könnte.",
      "beat": "Endkarte auf warmem Anthrazit, Graph-Motiv hinter dem CTA"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Your nervous system speaks." : "Ihr Nervensystem spricht.";
const screenshots = ["hrv.jpg"];

const Reel09 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-09" timing={t} />
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
          <Overline text="HRV & Recovery" start={5} />
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
        <Overline text="HRV & Recovery" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel09;
