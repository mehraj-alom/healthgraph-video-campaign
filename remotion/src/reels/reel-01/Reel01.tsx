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

import timingEn from '../../generated/timings/reel-01/en.json';
import timingDe from '../../generated/timings/reel-01/de.json';

const NARRATION_EN = {
  "id": "reel-01",
  "language": "en",
  "concept": "fragmentation",
  "cluster": "A",
  "hook": "Your health data is probably everywhere.",
  "cta": "Explore HealthGraph.",
  "thumbnail": "Your health, finally connected",
  "caption": "Your blood report. Your notes. Your measurements. Your medications. Your calendar. Usually they live in six different places, and no place connects them. HealthGraph keeps them as one connected history: every entry sits next to the others, so your records, measurements and days read as one thread. Your data, one place, in your hand. Explore HealthGraph at healthgraph.shop. #healthgraph #healthhistory #healthapp #wellness #selfcare #healthjourney #digitalhealth #personalhealth #datainoneplace #healthmanagement",
  "lines": [
    {
      "id": "l1",
      "text": "Your health data is probably everywhere.",
      "beat": "Title card; fragments adrift in the dark"
    },
    {
      "id": "l2",
      "text": "A blood report in one folder.",
      "beat": "PDF fragment label floats left"
    },
    {
      "id": "l3",
      "text": "Notes in your phone.",
      "beat": "Phone notes fragment label floats right"
    },
    {
      "id": "l4",
      "text": "Medications in a third app.",
      "beat": "Medication fragment label drifts in"
    },
    {
      "id": "l5",
      "text": "Measurements in a spreadsheet.",
      "beat": "Measurement fragment label drifts in"
    },
    {
      "id": "l6",
      "text": "Screenshots and reminders, scattered.",
      "beat": "Screenshot and calendar fragments scatter on screen"
    },
    {
      "id": "l7",
      "text": "Each one alone, and none of them speaking.",
      "beat": "Fragments held apart by a slow zoom out"
    },
    {
      "id": "l8",
      "text": "Now they all arrive in one place.",
      "beat": "Fragments stream into the records upload screen"
    },
    {
      "id": "l9",
      "text": "And each entry becomes a node in your graph.",
      "beat": "health-graph screen: 12 nodes, 22 connections, edges draw"
    },
    {
      "id": "l10",
      "text": "Now it's one connected history.",
      "beat": "Push-in across the health graph to the connected nodes"
    },
    {
      "id": "l11",
      "text": "Explore HealthGraph.",
      "beat": "End card with wordmark and CTA"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-01",
  "language": "de",
  "concept": "fragmentierung",
  "cluster": "A",
  "hook": "Deine Gesundheitsdaten liegen vermutlich überall.",
  "cta": "Entdecke HealthGraph.",
  "thumbnail": "Deine Gesundheit, endlich verbunden",
  "caption": "Dein Blutbefund in einem Ordner. Deine Notizen im Handy. Deine Messwerte woanders. Deine Medikamente wieder woanders. Meistens liegen sie an sechs Orten, und keiner verbindet sie. HealthGraph hält sie an einem Ort: Jeder Eintrag steht neben den anderen, aus Einzeleinträgen wird ein fortlaufender Verlauf. Deine Daten, ein Ort, in deiner Hand – DSGVO-konform, ohne Werbung. Entdecke HealthGraph auf healthgraph.shop. #gesundheit #gesundheitsapp #gesundheitstracking #wohlbefinden #sichsorgen #gesundheitstracker #digitalegesundheit #persönlichegesundheit #einortaldiejedat #gesundheitsmanagement",
  "lines": [
    {
      "id": "l1",
      "text": "Deine Gesundheitsdaten liegen vermutlich überall.",
      "beat": "Titelkarte; Fragmente im Dunkeln treibend"
    },
    {
      "id": "l2",
      "text": "Dein Blutbefund liegt in einem Ordner.",
      "beat": "PDF-Fragmente-Label schwebt links"
    },
    {
      "id": "l3",
      "text": "Deine Notizen liegen im Handy.",
      "beat": "Notiz-Fragmente-Label schwebt rechts"
    },
    {
      "id": "l4",
      "text": "Deine Medikamente liegen in einer anderen App.",
      "beat": "Medikament-Fragmente-Label schwebt hinein"
    },
    {
      "id": "l5",
      "text": "Deine Messwerte liegen in einer Tabelle.",
      "beat": "Messwert-Fragmente-Label schwebt hinein"
    },
    {
      "id": "l6",
      "text": "Und Screenshots plus Erinnerungen liegen verstreut.",
      "beat": "Screenshot- und Kalenderfragmente verteilen sich im Bild"
    },
    {
      "id": "l7",
      "text": "Jedem einzelnen fehlt der andere.",
      "beat": "Fragmente bleiben getrennt, langsames Zoomen heraus"
    },
    {
      "id": "l8",
      "text": "Jetzt kommen sie an einem Ort zusammen.",
      "beat": "Fragmente strömen in den Records-Upload-Bildschirm"
    },
    {
      "id": "l9",
      "text": "Jeder Eintrag wird zu einem Knoten im Graphen.",
      "beat": "health-graph-Bildschirm: 12 Knoten, 22 Verbindungen, Kanten zeichnen sich"
    },
    {
      "id": "l10",
      "text": "Aus Einzeleinträgen wird ein Zusammenhang.",
      "beat": "Hineinzoomen über den Gesundheitsgraphen zu den verbundenen Knoten"
    },
    {
      "id": "l11",
      "text": "Entdecke HealthGraph.",
      "beat": "Endkarte mit Wortmarke und CTA"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "One graph. Your health." : "Ein Graph. Ihre Gesundheit.";
const screenshots = ["home-dashboard.jpg"];

const Reel01 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-01" timing={t} />
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
          <Overline text="The Fragmented Reality" start={5} />
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
        <Overline text="The Fragmented Reality" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel01;
