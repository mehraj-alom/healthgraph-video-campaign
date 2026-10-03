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

import timingEn from '../../generated/timings/reel-19/en.json';
import timingDe from '../../generated/timings/reel-19/de.json';

const NARRATION_EN = {
  "id": "reel-19",
  "language": "en",
  "concept": "cinematic-3d-graph",
  "cluster": "H",
  "hook": "What does your health history look like when everything connects?",
  "cta": "Your health, connected. Explore HealthGraph at healthgraph.shop.",
  "thumbnail": "Your health, connected in 3D",
  "caption": "What does your health history look like when everything connects? Sleep, meals, pulse, mood, orbiting your own timeline, connected around your own story. No fake scans, no predictions, just your trail. Your health, connected. Explore HealthGraph at healthgraph.shop. #healthgraph #connectedhealth #selftracking #3dvisualization #healthtimeline #digitaldiary #datastorytelling #healthtech #personalhistory #mindfultracking",
  "lines": [
    {
      "id": "l1",
      "text": "What does your health history look like when everything connects?",
      "beat": "dark space, a single warm light rises, the question hangs over a slowly turning point of light"
    },
    {
      "id": "l2",
      "text": "Start with a person. A life, not a chart.",
      "beat": "human silhouette fades in center frame, quiet, no UI anywhere"
    },
    {
      "id": "l3",
      "text": "Around them, everything they have logged: sleep, meals, pulse, mood.",
      "beat": "orbit motif: SLEEP, MEALS, PULSE, MOOD chips and document cards orbit the figure in slow rings"
    },
    {
      "id": "l4",
      "text": "Every point is a real entry, not a decoration.",
      "beat": "push-in: orbiting chips resolve into real data chips, 67 BPM, 977 kcal, 7h sleep, mood Very good"
    },
    {
      "id": "l5",
      "text": "Some points link. The connection was waiting to be seen.",
      "beat": "camera dives into the orbit and emerges inside the health graph, 12 nodes 22 connections, green edges draw"
    },
    {
      "id": "l6",
      "text": "A pulse one day, a document another, sleep in between.",
      "beat": "document to node: a cream paper report card flattens into a graph node, camera travels along the timeline axis"
    },
    {
      "id": "l7",
      "text": "Fly through the graph and the history assembles itself.",
      "beat": "continuous flight through node space, time filters sweep, nodes and edges assemble behind the camera"
    },
    {
      "id": "l8",
      "text": "No fake scans. No predictions. Just your trail, connected.",
      "beat": "orbit recedes around the silhouette, lights settle, clean dark frame"
    },
    {
      "id": "l9",
      "text": "Your health, connected. Explore HealthGraph at healthgraph.shop.",
      "beat": "end card: Your health, connected. healthgraph.shop wordmark"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-19",
  "language": "de",
  "concept": "cinematic-3d-graph",
  "cluster": "H",
  "hook": "Wie sieht deine Gesundheitshistorie aus, wenn alles verbunden ist?",
  "cta": "Deine Gesundheit, verbunden. Erlebe HealthGraph auf healthgraph.shop.",
  "thumbnail": "Deine Gesundheit, verbunden in 3D",
  "caption": "Wie sieht deine Gesundheitshistorie aus, wenn alles verbunden ist? Schlaf, Mahlzeiten, Puls, Stimmung, im Umlauf um deine eigene Timeline, verbunden rund um deine Geschichte. Keine simulierten Scans, keine Vorhersagen, nur dein eigener Verlauf. Deine Gesundheit, verbunden. Erlebe HealthGraph auf healthgraph.shop. #healthgraph #selftracking #3dvisualisierung #gesundheitstimeline #digitalarchiv #visualisierung #healthtech #datenverlauf #bewusstesleben #gesundheit",
  "lines": [
    {
      "id": "l1",
      "text": "Wie sieht deine Gesundheitshistorie aus, wenn alles verbunden ist?",
      "beat": "dark space, a single warm light rises, the question hangs over a slowly turning point of light"
    },
    {
      "id": "l2",
      "text": "Beginne bei einer Person. Ein Leben, keine Kurve.",
      "beat": "human silhouette fades in center frame, quiet, no UI anywhere"
    },
    {
      "id": "l3",
      "text": "Rundherum alles, was du erfasst hast: Schlaf, Mahlzeiten, Puls, Stimmung.",
      "beat": "orbit motif: SLEEP, MEALS, PULSE, MOOD chips and document cards orbit the figure in slow rings"
    },
    {
      "id": "l4",
      "text": "Jeder Punkt ist ein echter Eintrag, keine Dekoration.",
      "beat": "push-in: orbiting chips resolve into real data chips, 67 BPM, 977 kcal, 7h sleep, mood Very good"
    },
    {
      "id": "l5",
      "text": "Manche Punkte verknüpfen sich. Die Verbindung wartete darauf, gesehen zu werden.",
      "beat": "camera dives into the orbit and emerges inside the health graph, 12 nodes 22 connections, green edges draw"
    },
    {
      "id": "l6",
      "text": "Ein Puls an einem Tag, ein Dokument am anderen, dazwischen der Schlaf.",
      "beat": "document to node: a cream paper report card flattens into a graph node, camera travels along the timeline axis"
    },
    {
      "id": "l7",
      "text": "Fliege durch den Graphen und die Geschichte ordnet sich selbst.",
      "beat": "continuous flight through node space, time filters sweep, nodes and edges assemble behind the camera"
    },
    {
      "id": "l8",
      "text": "Keine simulierten Scans. Keine Vorhersagen. Nur dein eigener Verlauf, verbunden.",
      "beat": "orbit recedes around the silhouette, lights settle, clean dark frame"
    },
    {
      "id": "l9",
      "text": "Deine Gesundheit, verbunden. Erlebe HealthGraph auf healthgraph.shop.",
      "beat": "end card: Deine Gesundheit, verbunden. healthgraph.shop wordmark"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Your health, connected." : "Ihre Gesundheit, verbunden.";
const screenshots = ["graph-hero.jpg"];

const Reel19 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-19" timing={t} />
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
          <Overline text="A Life, Not a Chart" start={5} />
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
        <Overline text="A Life, Not a Chart" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel19;
