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

import timingEn from '../../generated/timings/reel-03/en.json';
import timingDe from '../../generated/timings/reel-03/de.json';

const NARRATION_EN = {
  "id": "reel-03",
  "language": "en",
  "concept": "not-a-tracker",
  "cluster": "A",
  "hook": "This isn't another health tracker.",
  "cta": "Discover HealthGraph.",
  "thumbnail": "Context, not just counting",
  "caption": "A tracker counts one thing at a time. HealthGraph keeps the thread instead: the visit next to the pulse, the pulse next to the day. Not isolated numbers, but your health history as connected context, growing as you live. Wellness info only, not medical advice. Discover HealthGraph at healthgraph.shop. #healthgraph #healthhistory #healthapp #digitalhealth #selfcare #healthdata #personalhealth #wellness #selftracking #connectedhistory",
  "lines": [
    {
      "id": "l1",
      "text": "This isn't another health tracker.",
      "beat": "Title card with wordmark, calm hold"
    },
    {
      "id": "l2",
      "text": "A tracker counts one thing at a time.",
      "beat": "Single metric labels drift past in isolation"
    },
    {
      "id": "l3",
      "text": "Sleep here, food there, steps somewhere else.",
      "beat": "SLEEP, FOOD, STEPS labels adrift, not connected"
    },
    {
      "id": "l4",
      "text": "It tells you where you stand today.",
      "beat": "daily-report card shows one day's summary"
    },
    {
      "id": "l5",
      "text": "It rarely shows you where you've been.",
      "beat": "The card alone, no neighbors, slow zoom out"
    },
    {
      "id": "l6",
      "text": "This is a connected history instead.",
      "beat": "Transition: fragments line up toward the center"
    },
    {
      "id": "l7",
      "text": "Every entry sits next to the others.",
      "beat": "health-graph screen: adjacent nodes with short edges"
    },
    {
      "id": "l8",
      "text": "The visit connects to the pulse.",
      "beat": "health-graph: edge draws from the visit node to the heart node"
    },
    {
      "id": "l9",
      "text": "The pulse connects to the day.",
      "beat": "health-graph: edge draws from the heart node to the sleep and day nodes"
    },
    {
      "id": "l10",
      "text": "You see your history as one thread.",
      "beat": "health-graph: drag across time, the graph travels"
    },
    {
      "id": "l11",
      "text": "That's the difference: context over counting.",
      "beat": "Push-in across the full graph, '12 nodes, 22 connections'"
    },
    {
      "id": "l12",
      "text": "Discover HealthGraph.",
      "beat": "End card with wordmark and CTA"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-03",
  "language": "de",
  "concept": "kein-tracker",
  "cluster": "A",
  "hook": "Das ist kein weiterer Gesundheitstracker.",
  "cta": "Entdecke HealthGraph.",
  "thumbnail": "Kein weiterer Tracker",
  "caption": "Ein Tracker zählt eine Sache. HealthGraph hält stattdessen den Faden: der Besuch neben dem Puls, der Puls neben dem Tag. Nicht isolierte Zahlen, sondern dein Gesundheitsverlauf als verbundener Kontext – wächst mit, wie du lebst. Wellness-Informationen, kein medizinischer Rat. Kostenlos · DSGVO-konform · Ohne Werbung. Entdecke HealthGraph auf healthgraph.shop. #gesundheit #gesundheitsapp #gesundheitsverlauf #kontext #digitalegesundheit #persönlichegesundheit #datenschutz #wohlbefinden #sichsorgen #eigendaten",
  "lines": [
    {
      "id": "l1",
      "text": "Das ist kein weiterer Gesundheitstracker.",
      "beat": "Titelkarte mit Wortmarke, ruhige Haltedauer"
    },
    {
      "id": "l2",
      "text": "Ein Tracker zählt immer nur eine Sache.",
      "beat": "Einzelwerte Labels treiben isoliert vorbei"
    },
    {
      "id": "l3",
      "text": "Schlaf hier, Essen da, Schritte woanders.",
      "beat": "Labels SLEEP, FOOD, STEPS treiben getrennt"
    },
    {
      "id": "l4",
      "text": "Er zeigt dir, wie es heute steht.",
      "beat": "daily-report-Karte zeigt die Tageszusammenfassung"
    },
    {
      "id": "l5",
      "text": "Er zeigt selten, wo dein Weg bisher ging.",
      "beat": "Karte allein, keine Nachbarn, langsames Herauszoomen"
    },
    {
      "id": "l6",
      "text": "Hier entsteht stattdessen ein verbundener Verlauf.",
      "beat": "Übergang: Fragmente rücken aneinander"
    },
    {
      "id": "l7",
      "text": "Jeder Eintrag steht direkt neben den anderen.",
      "beat": "health-graph screen: benachbarte Knoten mit kurzen Kanten"
    },
    {
      "id": "l8",
      "text": "Der Besuch verbindet sich mit dem Puls.",
      "beat": "health-graph: Kante vom Visit-Knoten zum Heart-Knoten zeichnet sich"
    },
    {
      "id": "l9",
      "text": "Der Puls mit dem Tag, an dem er war.",
      "beat": "health-graph: Kante vom Heart-Knoten zu den Sleep- und Tagesknoten"
    },
    {
      "id": "l10",
      "text": "Du siehst deine Geschichte als einen Faden.",
      "beat": "health-graph: Ziehen durch die Zeit, der Graph wandert"
    },
    {
      "id": "l11",
      "text": "Der Unterschied: Zusammenhang statt bloßem Zählen.",
      "beat": "Hineinzoomen auf den vollständigen Graphen, 12 Knoten, 22 Verbindungen"
    },
    {
      "id": "l12",
      "text": "Entdecke HealthGraph.",
      "beat": "Endkarte mit Wortmarke und CTA"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Your day, summarized." : "Ihr Tag, zusammengefasst.";
const screenshots = ["daily-report.jpg"];

const Reel03 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-03" timing={t} />
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
          <Overline text="The Daily Report" start={5} />
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
        <Overline text="The Daily Report" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel03;
